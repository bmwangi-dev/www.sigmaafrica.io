<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'department_id',
        'duration_weeks',
        'price',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'price' => 'decimal:2',
            'duration_weeks' => 'integer',
        ];
    }

    // Relationships

    /**
     * Get the department this course belongs to
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get all cohorts for this course
     */
    public function cohorts(): HasMany
    {
        return $this->hasMany(Cohort::class);
    }

    /**
     * Get technical mentors assigned to this course
     */
    public function mentors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_courses')
            ->wherePivot('status', 'active')
            ->withPivot(['assigned_date', 'is_lead_mentor', 'status', 'notes'])
            ->withTimestamps();
    }

    /**
     * Get lead mentors for this course
     */
    public function leadMentors(): BelongsToMany
    {
        return $this->mentors()->wherePivot('is_lead_mentor', true);
    }

    /**
     * Get active cohorts
     */
    public function activeCohorts(): HasMany
    {
        return $this->cohorts()->where('is_active', true);
    }

    /**
     * Scope for active courses
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for courses by department
     */
    public function scopeByDepartment($query, $departmentId)
    {
        return $query->where('department_id', $departmentId);
    }
}
