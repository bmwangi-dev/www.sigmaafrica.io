<?php

namespace Database\Seeders;

use Database\Seeders\NotificationSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}
