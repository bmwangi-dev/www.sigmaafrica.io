<?php

declare(strict_types=1);

namespace App\Enums;

use Spatie\Enum\Enum;

/**
 * @method static self student()
 * @method static self technical_mentor()
 * @method static self department_head()
 * @method static self admin()
 * @method static self super_admin()
 */
final class RoleEnum extends Enum
{
    use Traits\HasValues;

    public function label(): string
    {
        return match ($this->value) {
            'student' => 'Student',
            'technical_mentor' => 'Technical Mentor',
            'department_head' => 'Department Head',
            'admin' => 'Admin',
            'super_admin' => 'Super Admin',
            default => ucfirst(str_replace('_', ' ', $this->value)),
        };
    }

    public static function options(): array
    {
        return collect(self::toArray())
            ->mapWithKeys(fn($value, $key) => [$value => (new self($value))->label()])
            ->toArray();
    }
}
