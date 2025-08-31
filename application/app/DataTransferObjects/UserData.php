<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\TypeScriptTransformer\Attributes\Optional as TypeScriptOptional;

#[TypeScript]
final class UserData extends Data
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
        public ?int $cohort_id,

        #[TypeScriptOptional]
        public ?string $student_number,

        #[TypeScriptOptional]
        public ?string $phone_number,

        #[TypeScriptOptional]
        public ?string $profile_image,

        #[TypeScriptOptional]
        public ?string $date_of_birth,

        #[TypeScriptOptional]
        public ?string $bio,

        #[TypeScriptOptional]
        public ?string $status,

        #[TypeScriptOptional]
        public ?string $last_login,

        #[TypeScriptOptional]
        public ?string $email_verified_at,

        public bool $is_admin,

        #[TypeScriptOptional]
        public ?bool $is_student,

        #[TypeScriptOptional]
        public ?bool $is_technical_mentor,

        #[TypeScriptOptional]
        public ?bool $is_department_head,

        #[TypeScriptOptional]
        public ?bool $is_super_admin,

        #[TypeScriptOptional]
        public ?string $created_at,

        #[TypeScriptOptional]
        public ?string $updated_at,
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
            cohort_id: $user->cohort_id,
            student_number: $user->student_number,
            phone_number: $user->phone_number,
            profile_image: $user->profile_image,
            date_of_birth: $user->date_of_birth?->toDateString(),
            bio: $user->bio,
            status: $user->status,
            last_login: $user->last_login?->toISOString(),
            email_verified_at: $user->email_verified_at?->toISOString(),
            is_admin: $user->isAdmin(),
            is_student: $user->isStudent(),
            is_technical_mentor: $user->isTechnicalMentor(),
            is_department_head: $user->isDepartmentHead(),
            is_super_admin: $user->isSuperAdmin(),
            created_at: $user->created_at?->toISOString(),
            updated_at: $user->updated_at?->toISOString(),
        );
    }
}
