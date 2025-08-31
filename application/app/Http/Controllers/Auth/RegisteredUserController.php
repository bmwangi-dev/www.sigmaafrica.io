<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Department;
use App\Enums\RoleEnum;
use App\DataTransferObjects\DepartmentData;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        $departments = Department::active()->get();
        $roles = RoleEnum::options();

        return Inertia::render('auth/register', [
            'departments' => $departments->map(fn($dept) => DepartmentData::fromModel($dept)),
            'roles' => $roles,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {

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
            'status' => 'active',
        ], $additionalData));

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
