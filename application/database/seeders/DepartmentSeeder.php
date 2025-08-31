<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Data Analytics',
                'description' => 'Department focused on data science, analytics, machine learning, and business intelligence. Students learn to extract insights from data and make data-driven decisions.',
                'is_active' => true,
            ],
            [
                'name' => 'Software Engineering',
                'description' => 'Department dedicated to software development, programming, web development, and technical skills. Students learn to build applications, websites, and software solutions.',
                'is_active' => true,
            ],
            [
                'name' => 'Marketing',
                'description' => 'Department focused on digital marketing, brand management, social media marketing, and customer engagement strategies.',
                'is_active' => true,
            ],
            [
                'name' => 'Business Consulting',
                'description' => 'Department dedicated to business strategy, consulting methodologies, project management, and organizational development.',
                'is_active' => true,
            ],
        ];

        foreach ($departments as $department) {
            Department::firstOrCreate(
                ['name' => $department['name']],
                $department
            );
        }
    }
}
