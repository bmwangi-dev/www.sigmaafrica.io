<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\Department;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\TypeScriptTransformer\Attributes\Optional as TypeScriptOptional;

#[TypeScript]
final class DepartmentData extends Data
{
    public function __construct(
        public int $id,

        public string $name,

        #[TypeScriptOptional]
        public ?string $description,

        #[TypeScriptOptional]
        public ?int $department_head_id,

        public bool $is_active,

        #[TypeScriptOptional]
        public ?string $created_at,

        #[TypeScriptOptional]
        public ?string $updated_at,
    ) {}

    public static function fromModel(Department $department): self
    {
        return new self(
            id: $department->id,
            name: $department->name,
            description: $department->description,
            department_head_id: $department->department_head_id,
            is_active: (bool) $department->is_active,
            created_at: $department->created_at?->toISOString(),
            updated_at: $department->updated_at?->toISOString(),
        );
    }
}
