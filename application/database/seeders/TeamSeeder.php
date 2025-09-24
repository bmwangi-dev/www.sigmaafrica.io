<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create specific team members based on the legacy data
        $teamMembers = [
            [
                'name' => 'Makaka Bill',
                'contact_no' => '+233-123-456-789',
                'email' => 'billbrewood@gmail.com',
                'department' => 'Leadership',
                'position' => 'Founder & CEO',
                'image_path' => '/bill.jpeg',
                'socials' => [
                    ['type' => 'linkedin', 'url' => 'https://www.linkedin.com/in/billshikuku/'],
                ],
                'sort_order' => 1,
            ],
            [
                'name' => 'Todd Abbott',
                'contact_no' => '+254-700-123-456',
                'email' => 'toddabbott@gmail.com',
                'department' => 'Leadership',
                'position' => 'Growth & Partnerships Lead',
                'image_path' => '/toddAbott.png',
                'socials' => [
                    ['type' => 'linkedin', 'url' => 'https://www.linkedin.com/in/todd-abbott/'],
                ],
                'sort_order' => 2,
            ],
            [
                'name' => 'Neville Apondi',
                'contact_no' => '+254-722-987-654',
                'email' => 'nevilleapondi@gmail.com',
                'department' => 'Marketing',
                'position' => 'Marketing',
                'image_path' => '/neville.png',
                'socials' => [
                    ['type' => 'linkedin', 'url' => 'https://linkedin.com/in/fraiser'],
                ],
                'sort_order' => 3,
            ],
            [
                'name' => 'Mwangi Brian',
                'contact_no' => '+254-791-948-842',
                'email' => 'mwangibrian.dev@gmail.com',
                'department' => 'Engineering',
                'position' => 'CTO & Lead Developer',
                'image_path' => '/mwangi.jpeg',
                'socials' => [
                    ['type' => 'linkedin', 'url' => 'https://www.linkedin.com/in/mwangi-brian-68732527b/'],
                ],
                'sort_order' => 4,
            ],
        ];

        // Clear existing team members
        Team::query()->delete();

        // Create the team members
        foreach ($teamMembers as $member) {
            Team::create($member);
        }

        // Create additional random team members using factory
        // Team::factory(6)->create();

        // $this->command->info('Team seeded successfully with ' . Team::count() . ' members.');
    }
}
