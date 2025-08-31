<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class Cohort extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'cohort_number',
        'duration_weeks',
        'max_students',
        'current_students',
        'department_id',
        'course_id',
        'start_date',
        'end_date',
        'status',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_active' => 'boolean',
            'max_students' => 'integer',
            'current_students' => 'integer',
            'duration_weeks' => 'integer',
        ];
    }

    // Relationships

    /**
     * Get the department this cohort belongs to
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the course this cohort is for
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get all students in this cohort
     */
    public function students(): HasMany
    {
        return $this->hasMany(User::class)->where('role', 'student');
    }

    /**
     * Get technical mentors assigned to this cohort
     */
    public function mentors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_cohorts')
            ->wherePivot('status', 'active')
            ->withPivot(['assigned_date', 'is_lead_mentor', 'status', 'notes'])
            ->withTimestamps();
    }

    /**
     * Get lead mentors for this cohort
     */
    public function leadMentors(): BelongsToMany
    {
        return $this->mentors()->wherePivot('is_lead_mentor', true);
    }

    // Scopes

    /**
     * Scope for active cohorts
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for cohorts by status
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope for current cohorts (active status)
     */
    public function scopeCurrent($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope for upcoming cohorts
     */
    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming');
    }

    // Helper methods

    /**
     * Check if cohort has available spots
     */
    public function hasAvailableSpots(): bool
    {
        return $this->current_students < $this->max_students;
    }

    /**
     * Get available spots count
     */
    public function availableSpots(): int
    {
        return max(0, $this->max_students - $this->current_students);
    }

    /**
     * Check if cohort is currently active
     */
    public function isCurrentlyActive(): bool
    {
        return $this->status === 'active' && 
               $this->start_date <= now() && 
               $this->end_date >= now();
    }

    /**
     * Calculate completion percentage
     */
    public function completionPercentage(): float
    {
        if ($this->status !== 'active') {
            return 0;
        }

        $totalDays = $this->start_date->diffInDays($this->end_date);
        $daysPassed = $this->start_date->diffInDays(now());
        
        return min(100, max(0, ($daysPassed / $totalDays) * 100));
    }
}
