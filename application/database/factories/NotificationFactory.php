<?php
// database/factories/NotificationFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Notification;
use App\Models\User;

class NotificationFactory extends Factory
{
    protected $model = Notification::class;

    public function definition(): array
    {
        // Find an admin user
        $admin = User::where('is_admin', true)->first();

        return [
            'created_by' => $admin ? $admin->id : User::factory()->admin(),
            'title' => 'SKILL SPARK TRAINING',
            'description' => 'Join us for a transformative 3-day training program designed to enhance your skills and knowledge in various fields. This event is perfect for professionals looking to advance their careers and gain new insights.',
            'image_url' => $this->faker->imageUrl(640, 480, 'business', true),
            'redirect_url' => 'https://tinyurl.com/mpvs2pta',
            'is_active' => true,
            'start_date' => null,
            'end_date' => null,
        ];
    }
}
