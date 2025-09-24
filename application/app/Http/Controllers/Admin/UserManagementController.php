<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Traits\HasPagination;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Department;
use App\Enums\RoleEnum;
use App\DataTransferObjects\UserData;
use App\DataTransferObjects\DepartmentData;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    use HasPagination;
    /**
     * Display a listing of users.
     */
    public function index(Request $request): Response
    {
        $query = User::with('department');

        // Apply search
        $searchableFields = [
            'name',
            'email',
            'student_number',
            'phone_number',
            'department.name'
        ];
        $query = $this->applySearch($query, $request, $searchableFields);

        // Apply filters
        $filterableFields = [
            'role' => 'exact',
            'department_id' => 'exact',
            'status' => 'exact',
        ];
        $query = $this->applyFilters($query, $request, $filterableFields);

        // Apply sorting
        $sortableFields = [
            'name',
            'email',
            'role',
            'status',
            'created_at',
            'last_login',
            'department.name'
        ];
        $query = $this->applySorting($query, $request, $sortableFields, 'created_at', 'desc');

        // Paginate
        $users = $this->paginateQuery($query, $request, 15, [10, 15, 25, 50, 100]);

        $departments = Department::active()->get();
        $roles = RoleEnum::options();

        return Inertia::render('Admin/UserManagement/Index', [
            'users' => $this->createPaginatedResponse($users),
            'departments' => DepartmentData::collect($departments),
            'roles' => $roles,
            'filters' => $request->only(['search', 'role', 'department_id', 'status', 'sort', 'direction']),
            'stats' => [
                'total_users' => User::count(),
                'total_active_users' => User::where('status', 'active')->count(),
                'total_students' => User::where('role', 'student')->count(),
                'total_mentors' => User::where('role', 'mentor')->count(),
                'total_cohorts' => \App\Models\Cohort::count(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        $departments = Department::active()->get();
        $roles = RoleEnum::options();

        return Inertia::render('Admin/UserManagement/Create', [
            'departments' => DepartmentData::collect($departments),
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', Rule::in(array_keys(RoleEnum::options()))],
            'department_id' => 'required|exists:departments,id',
            'phone_number' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date|before:today',
            'bio' => 'nullable|string|max:1000',
            'status' => 'required|in:active,inactive,suspended',
        ]);

        // Generate student number for students
        $additionalData = [];
        if ($request->role === 'student') {
            $department = Department::find($request->department_id);
            $lastStudent = User::where('role', 'student')
                ->where('department_id', $request->department_id)
                ->orderBy('id', 'desc')
                ->first();

            $nextNumber = $lastStudent ? ((int) substr($lastStudent->student_number, -4)) + 1 : 1;
            $additionalData['student_number'] = strtoupper(substr($department->name, 0, 3)) . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
        }

        $user = User::create(array_merge([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'department_id' => $request->department_id,
            'phone_number' => $request->phone_number,
            'date_of_birth' => $request->date_of_birth,
            'bio' => $request->bio,
            'status' => $request->status,
            'is_admin' => in_array($request->role, ['admin', 'super_admin']),
            'email_verified_at' => now(),
        ], $additionalData));

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified user.
     */
    public function show(User $user): Response
    {
        // Load all relationships
        $user->load([
            'department',
            'adminDepartments',
            'headsOfDepartments',
            'courses.department',
            'cohorts.course',
            'cohorts.department',
        ]);

        // Get additional data based on user role
        $additionalData = [];

        if ($user->isStudent()) {
            // For students, get their cohort and course information
            $studentCohort = $user->studentCohort()->with(['course', 'department', 'mentors'])->first();
            if ($studentCohort) {
                $additionalData['student_cohort'] = \App\DataTransferObjects\CohortData::fromModel($studentCohort);
                $additionalData['student_course'] = \App\DataTransferObjects\CourseData::fromModel($studentCohort->course);
                $additionalData['cohort_mentors'] = UserData::collect($studentCohort->mentors);
            }

            // Get other students in the same cohort
            if ($studentCohort) {
                $cohortStudents = User::where('role', 'student')
                    ->where('cohort_id', $studentCohort->id)
                    ->where('id', '!=', $user->id)
                    ->with('department')
                    ->get();
                $additionalData['cohort_peers'] = UserData::collect($cohortStudents);
            }
        }

        if ($user->isTechnicalMentor()) {
            // For technical mentors, get their assigned courses and cohorts
            $mentorCourses = $user->courses()->with('department')->get();
            $mentorCohorts = $user->cohorts()->with(['course', 'department'])->get();

            $additionalData['mentor_courses'] = \App\DataTransferObjects\CourseData::collect($mentorCourses);
            $additionalData['mentor_cohorts'] = \App\DataTransferObjects\CohortData::collect($mentorCohorts);

            // Get students they are mentoring
            $cohortIds = $mentorCohorts->pluck('id');
            $mentorStudents = User::where('role', 'student')
                ->whereIn('cohort_id', $cohortIds)
                ->with('department')
                ->get();
            $additionalData['mentoring_students'] = UserData::collect($mentorStudents);
        }

        if ($user->isDepartmentHead()) {
            // For department heads, get departments they manage
            $managedDepartments = $user->headsOfDepartments()->with(['courses', 'users'])->get();
            $additionalData['managed_departments'] = \App\DataTransferObjects\DepartmentData::collect($managedDepartments);
        }

        if ($user->isAdmin() || $user->isSuperAdmin()) {
            // For admins, get departments they admin
            $adminDepartments = $user->adminDepartments()->with(['courses', 'users'])->get();
            $additionalData['admin_departments'] = \App\DataTransferObjects\DepartmentData::collect($adminDepartments);

            // Get recent system activity
            $additionalData['recent_activities'] = \App\Models\UserActivity::recentForUser($user->id, 10)
                ->map(function ($activity) {
                    return [
                        'id' => $activity->id,
                        'action' => $activity->action,
                        'description' => $activity->description,
                        'created_at' => $activity->created_at?->toISOString(),
                        'created_at_human' => $activity->created_at?->diffForHumans(),
                    ];
                })
                ->toArray();
        }

        // Get user statistics
        $stats = [
            'total_login_days' => 0, // Placeholder for actual login tracking
            'account_age_days' => $user->created_at ? $user->created_at->diffInDays(now()) : 0,
            'last_activity' => $user->last_login ? $user->last_login->diffForHumans() : 'Never',
        ];

        if ($user->isStudent()) {
            $stats['cohort_progress'] = $studentCohort ? $studentCohort->completionPercentage() : 0;
            $stats['cohort_peers_count'] = isset($additionalData['cohort_peers']) ? count($additionalData['cohort_peers']) : 0;
        }

        if ($user->isTechnicalMentor()) {
            $stats['courses_count'] = $mentorCourses ? $mentorCourses->count() : 0;
            $stats['cohorts_count'] = $mentorCohorts ? $mentorCohorts->count() : 0;
            $stats['students_mentoring'] = isset($additionalData['mentoring_students']) ? count($additionalData['mentoring_students']) : 0;
        }

        return Inertia::render('Admin/UserManagement/Show', [
            'user' => UserData::fromModel($user),
            'additional_data' => $additionalData,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user): Response
    {
        $user->load('department');
        $departments = Department::active()->get();
        $roles = RoleEnum::options();

        return Inertia::render('Admin/UserManagement/Edit', [
            'user' => UserData::fromModel($user),
            'departments' => DepartmentData::collect($departments),
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        // Prevent super admin from changing their own role
        if ($user->isSuperAdmin() && $request->user()->id === $user->id && $request->role !== 'super_admin') {
            return back()->withErrors(['role' => 'You cannot change your own super admin role.']);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', Rule::in(array_keys(RoleEnum::options()))],
            'department_id' => 'required|exists:departments,id',
            'phone_number' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date|before:today',
            'bio' => 'nullable|string|max:1000',
            'status' => 'required|in:active,inactive,suspended',
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'department_id' => $request->department_id,
            'phone_number' => $request->phone_number,
            'date_of_birth' => $request->date_of_birth,
            'bio' => $request->bio,
            'status' => $request->status,
            'is_admin' => in_array($request->role, ['admin', 'super_admin']),
        ];

        // Only update password if provided
        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        // Handle student number generation if role changed to student
        if ($request->role === 'student' && $user->role !== 'student') {
            $department = Department::find($request->department_id);
            $lastStudent = User::where('role', 'student')
                ->where('department_id', $request->department_id)
                ->where('id', '!=', $user->id)
                ->orderBy('id', 'desc')
                ->first();

            $nextNumber = $lastStudent ? ((int) substr($lastStudent->student_number, -4)) + 1 : 1;
            $updateData['student_number'] = strtoupper(substr($department->name, 0, 3)) . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
        }

        $user->update($updateData);

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        // Prevent super admin from deleting themselves
        if ($user->isSuperAdmin() && Auth::user()->id === $user->id) {
            return back()->withErrors(['error' => 'You cannot delete your own super admin account.']);
        }

        // Prevent deletion of the last super admin
        if ($user->isSuperAdmin()) {
            $superAdminCount = User::where('role', 'super_admin')->count();
            if ($superAdminCount <= 1) {
                return back()->withErrors(['error' => 'Cannot delete the last super admin account.']);
            }
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Bulk actions for users
     */
    public function bulkAction(Request $request): RedirectResponse
    {
        $request->validate([
            'action' => 'required|in:activate,deactivate,suspend,delete',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $users = User::whereIn('id', $request->user_ids)->get();
        $currentUserId = Auth::user()->id;

        // Prevent actions on super admin accounts (except by other super admins)
        $superAdminIds = $users->filter(fn($user) => $user->isSuperAdmin())->pluck('id');

        if ($superAdminIds->isNotEmpty()) {
            // Check if trying to perform action on self
            if ($superAdminIds->contains($currentUserId)) {
                return back()->withErrors(['error' => 'You cannot perform bulk actions on your own account.']);
            }

            // For delete action, ensure we don't delete all super admins
            if ($request->action === 'delete') {
                $totalSuperAdmins = User::where('role', 'super_admin')->count();
                if ($superAdminIds->count() >= $totalSuperAdmins) {
                    return back()->withErrors(['error' => 'Cannot delete all super admin accounts.']);
                }
            }
        }

        switch ($request->action) {
            case 'activate':
                User::whereIn('id', $request->user_ids)->update(['status' => 'active']);
                $message = 'Users activated successfully.';
                break;
            case 'deactivate':
                User::whereIn('id', $request->user_ids)->update(['status' => 'inactive']);
                $message = 'Users deactivated successfully.';
                break;
            case 'suspend':
                User::whereIn('id', $request->user_ids)->update(['status' => 'suspended']);
                $message = 'Users suspended successfully.';
                break;
            case 'delete':
                User::whereIn('id', $request->user_ids)->delete();
                $message = 'Users deleted successfully.';
                break;
        }

        return redirect()->route('admin.users.index')
            ->with('success', $message);
    }
}
