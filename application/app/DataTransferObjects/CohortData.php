<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\Cohort;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\TypeScriptTransformer\Attributes\Optional as TypeScriptOptional;

#[TypeScript]
final class CohortData extends Data
{
    public function __construct(
        public int $id,

        public string $title,

        public string $cohort_number,

        public int $duration_weeks,

        public int $max_students,

        public int $current_students,

        public int $department_id,

        public int $course_id,

        public string $start_date,

        public string $end_date,

        public string $status,

        public bool $is_active,

        #[TypeScriptOptional]
        public ?int $available_spots,

        #[TypeScriptOptional]
        public ?float $completion_percentage,

        #[TypeScriptOptional]
        public ?bool $is_currently_active,

        #[TypeScriptOptional]
        public ?string $created_at,

        #[TypeScriptOptional]
        public ?string $updated_at,
    ) {}

    public static function fromModel(Cohort $cohort): self
    {
        return new self(
            id: $cohort->id,
            title: $cohort->title,
            cohort_number: $cohort->cohort_number,
            duration_weeks: $cohort->duration_weeks,
            max_students: $cohort->max_students,
            current_students: $cohort->current_students,
            department_id: $cohort->department_id,
            course_id: $cohort->course_id,
            start_date: $cohort->start_date->toDateString(),
            end_date: $cohort->end_date->toDateString(),
            status: $cohort->status,
            is_active: (bool) $cohort->is_active,
            available_spots: $cohort->availableSpots(),
            completion_percentage: $cohort->completionPercentage(),
            is_currently_active: $cohort->isCurrentlyActive(),
            created_at: $cohort->created_at?->toISOString(),
            updated_at: $cohort->updated_at?->toISOString(),
        );
    }
}
