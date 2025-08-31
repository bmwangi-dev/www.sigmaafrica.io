<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\Course;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\TypeScriptTransformer\Attributes\Optional as TypeScriptOptional;

#[TypeScript]
final class CourseData extends Data
{
    public function __construct(
        public int $id,

        public string $name,

        #[TypeScriptOptional]
        public ?string $description,

        public int $department_id,

        #[TypeScriptOptional]
        public ?int $duration_weeks,

        #[TypeScriptOptional]
        public ?float $price,

        public bool $is_active,

        #[TypeScriptOptional]
        public ?string $created_at,

        #[TypeScriptOptional]
        public ?string $updated_at,
    ) {}

    public static function fromModel(Course $course): self
    {
        return new self(
            id: $course->id,
            name: $course->name,
            description: $course->description,
            department_id: $course->department_id,
            duration_weeks: $course->duration_weeks,
            price: $course->price ? (float) $course->price : null,
            is_active: (bool) $course->is_active,
            created_at: $course->created_at?->toISOString(),
            updated_at: $course->updated_at?->toISOString(),
        );
    }
}
