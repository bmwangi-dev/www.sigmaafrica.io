<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Department;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get departments
        $dataAnalytics = Department::where('name', 'Data Analytics')->first();
        $softwareEngineering = Department::where('name', 'Software Engineering')->first();
        $marketing = Department::where('name', 'Marketing')->first();
        $businessConsulting = Department::where('name', 'Business Consulting')->first();

        $courses = [
            // Data Analytics Courses
            [
                'name' => 'Data Analytics Fundamentals',
                'description' => 'Introduction to data analytics, statistics, and data visualization using tools like Excel, Tableau, and basic SQL.',
                'department_id' => $dataAnalytics->id,
                'duration_weeks' => 12,
                'price' => 1500.00,
                'is_active' => true,
            ],
            [
                'name' => 'Advanced Data Science',
                'description' => 'Machine learning, Python programming, advanced analytics, and AI applications for business solutions.',
                'department_id' => $dataAnalytics->id,
                'duration_weeks' => 16,
                'price' => 2500.00,
                'is_active' => true,
            ],

            // Software Engineering Courses
            [
                'name' => 'Software Development',
                'description' => 'Full-stack web development covering HTML, CSS, JavaScript, and modern frameworks like React or Vue.js.',
                'department_id' => $softwareEngineering->id,
                'duration_weeks' => 20,
                'price' => 2000.00,
                'is_active' => true,
            ],
            [
                'name' => 'Mobile App Development',
                'description' => 'Native and cross-platform mobile app development using React Native, Flutter, or native technologies.',
                'department_id' => $softwareEngineering->id,
                'duration_weeks' => 16,
                'price' => 2200.00,
                'is_active' => true,
            ],

            // Marketing Courses
            [
                'name' => 'Digital Marketing Mastery',
                'description' => 'Comprehensive digital marketing covering SEO, SEM, social media marketing, and content marketing strategies.',
                'department_id' => $marketing->id,
                'duration_weeks' => 12,
                'price' => 1200.00,
                'is_active' => true,
            ],
            [
                'name' => 'Brand Strategy & Management',
                'description' => 'Brand development, positioning, customer journey mapping, and brand management best practices.',
                'department_id' => $marketing->id,
                'duration_weeks' => 10,
                'price' => 1000.00,
                'is_active' => true,
            ],

            // Business Consulting Courses
            [
                'name' => 'Business Consulting Essentials',
                'description' => 'Consulting methodologies, business analysis, strategy development, and client management.',
                'department_id' => $businessConsulting->id,
                'duration_weeks' => 14,
                'price' => 1800.00,
                'is_active' => true,
            ],
            [
                'name' => 'Project Management Professional',
                'description' => 'Project management principles, Agile methodologies, risk management, and stakeholder communication.',
                'department_id' => $businessConsulting->id,
                'duration_weeks' => 12,
                'price' => 1600.00,
                'is_active' => true,
            ],
        ];

        foreach ($courses as $course) {
            Course::firstOrCreate(
                [
                    'name' => $course['name'],
                    'department_id' => $course['department_id']
                ],
                $course
            );
        }
    }
}
