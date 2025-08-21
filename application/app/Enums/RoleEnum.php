<?php

declare(strict_types=1);

namespace App\Enums;

use Spatie\Enum\Enum;

/**
 * @method static self technical_mentor()
 * @method static self student()
 * @method static self admin()
 * @method static self super_admin()
 */
final class RoleEnum extends Enum
{
    use Traits\HasValues;
}
