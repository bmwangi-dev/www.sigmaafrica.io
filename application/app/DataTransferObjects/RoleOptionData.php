<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class RoleOptionData extends Data
{
    public function __construct(
        public string $value,
        public string $label,
    ) {}
}
