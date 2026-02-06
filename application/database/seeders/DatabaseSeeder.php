<?php

namespace Database\Seeders;

use Database\Seeders\UserSeeder;
// use Database\Seeders\CourseSeeder; 
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            // CourseSeeder::class,
        ]);
    }
}
