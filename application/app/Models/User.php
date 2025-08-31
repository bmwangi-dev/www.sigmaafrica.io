<?php

namespace App\Models;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'department_id',
        'cohort_id',
        'student_number',
        'phone_number',
        'profile_image',
        'date_of_birth',
        'bio',
        'status',
        'last_login',
        'is_admin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'date_of_birth' => 'date',
            'last_login' => 'datetime',
        ];
    }

    // Educational Relationships

    /**
     * Get the department this user belongs to
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the cohort this student belongs to (for students only)
     */
    public function studentCohort(): BelongsTo
    {
        return $this->belongsTo(Cohort::class, 'cohort_id');
    }

    /**
     * Get departments this user is an admin of (many-to-many for admins)
     */
    public function adminDepartments(): BelongsToMany
    {
        return $this->belongsToMany(Department::class, 'user_departments')
            ->withPivot(['assigned_date', 'status', 'notes'])
            ->withTimestamps();
    }

    /**
     * Get departments this user heads (one-to-many as department head)
     */
    public function headsOfDepartments(): HasMany
    {
        return $this->hasMany(Department::class, 'department_head_id');
    }

    /**
     * Get courses this technical mentor teaches (many-to-many)
     */
    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'user_courses')
            ->withPivot(['assigned_date', 'is_lead_mentor', 'status', 'notes'])
            ->withTimestamps();
    }

    /**
     * Get courses where this user is a lead mentor
     */
    public function leadCourses(): BelongsToMany
    {
        return $this->courses()->wherePivot('is_lead_mentor', true);
    }

    /**
     * Get cohorts this technical mentor belongs to (many-to-many)
     */
    public function cohorts(): BelongsToMany
    {
        return $this->belongsToMany(Cohort::class, 'user_cohorts')
            ->withPivot(['assigned_date', 'is_lead_mentor', 'status', 'notes'])
            ->withTimestamps();
    }

    /**
     * Get cohorts where this user is a lead mentor
     */
    public function leadCohorts(): BelongsToMany
    {
        return $this->cohorts()->wherePivot('is_lead_mentor', true);
    }

    // Role-based methods

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin' || $this->role === 'super_admin' || $this->is_admin;
    }

    /**
     * Check if user is super admin
     */
    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin' || $this->email === config('app.super_admin.email');
    }

    /**
     * Check if user is a student
     */
    public function isStudent(): bool
    {
        return $this->role === 'student';
    }

    /**
     * Check if user is a technical mentor
     */
    public function isTechnicalMentor(): bool
    {
        return $this->role === 'technical_mentor';
    }

    /**
     * Check if user is a department head
     */
    public function isDepartmentHead(): bool
    {
        return $this->role === 'department_head';
    }

    /**
     * Get the role enum instance
     */
    public function getRoleEnum(): ?RoleEnum
    {
        return $this->role ? new RoleEnum($this->role) : null;
    }

    // Scopes

    /**
     * Scope users by role
     */
    public function scopeByRole($query, string $role)
    {
        return $query->where('role', $role);
    }

    /**
     * Scope for students
     */
    public function scopeStudents($query)
    {
        return $query->where('role', 'student');
    }

    /**
     * Scope for technical mentors
     */
    public function scopeTechnicalMentors($query)
    {
        return $query->where('role', 'technical_mentor');
    }

    /**
     * Scope for department heads
     */
    public function scopeDepartmentHeads($query)
    {
        return $query->where('role', 'department_head');
    }

    /**
     * Scope for active users
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope users by department
     */
    public function scopeByDepartment($query, int $departmentId)
    {
        return $query->where('department_id', $departmentId);
    }

    // Notifications relationship
    public function notifications()
    {
        return $this->hasMany(\App\Models\Notification::class);
    }

    // Created notifications relationship (for admin users)
    public function createdNotifications()
    {
        return $this->hasMany(\App\Models\Notification::class, 'user_id');
    }
}
