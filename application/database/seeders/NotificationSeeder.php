<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;
use App\Models\User;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch the admin user
        $admin = User::where('email', 'admin@sigmaafrica.com')->first();

        // Create one notification from the admin
        Notification::factory()->create([
            'created_by' => $admin->id,
        ]);
    }
}
