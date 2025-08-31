<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\TypeScriptTransformer\Attributes\Optional as TypeScriptOptional;

#[TypeScript]
final class AuthUserData extends Data
{
    public function __construct(
        public int $id,

        public string $name,

        public string $email,

        #[TypeScriptOptional]
        public ?string $role,

        #[TypeScriptOptional]
        public ?string $role_label,

        #[TypeScriptOptional]
        public ?int $department_id,

        #[TypeScriptOptional]
        public ?string $student_number,

        #[TypeScriptOptional]
        public ?DepartmentData $department,

        public bool $is_admin,

        #[TypeScriptOptional]
        public ?bool $is_student,

        #[TypeScriptOptional]
        public ?bool $is_technical_mentor,

        #[TypeScriptOptional]
        public ?bool $is_department_head,

        #[TypeScriptOptional]
        public ?bool $is_super_admin,
    ) {}

    public static function fromModel(User $user): self
    {
        $roleEnum = $user->getRoleEnum();
        
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            role: $user->role,
            role_label: $roleEnum?->label(),
            department_id: $user->department_id,
            student_number: $user->student_number,
            department: $user->relationLoaded('department') && $user->department
                ? DepartmentData::fromModel($user->department) 
                : null,
            is_admin: $user->isAdmin(),
            is_student: $user->isStudent(),
            is_technical_mentor: $user->isTechnicalMentor(),
            is_department_head: $user->isDepartmentHead(),
            is_super_admin: $user->isSuperAdmin(),
        );
    }
}
