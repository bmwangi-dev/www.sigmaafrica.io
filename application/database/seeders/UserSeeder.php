<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use App\Enums\RoleEnum;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create the super admin (from config/app.php)
        $this->makeSuperAdmin();

        // ✅ Removed the duplicate admin creation here

        // Create a few normal users
        User::factory(10)->create();
    }

    public function makeSuperAdmin(): void
    {
        $superAdminConfig = config('app.super_admin');

        if (!$superAdminConfig) {
            $this->command->warn('Super admin config not found. Skipping super admin creation.');
            return;
        }

        $superUser = User::where('email', $superAdminConfig['email'])->first();

        if ($superUser) {
            // Update existing super admin to ensure it has the correct role
            $superUser->update([
                'role' => 'super_admin',
                'is_admin' => true,
                'status' => 'active',
            ]);
            $this->command->info('Updated existing super admin: ' . $superUser->email);
            return;
        }

        // Get first department for super admin
        $firstDepartment = \App\Models\Department::first();

        // Create the Super Admin with all required fields
        $superUser = User::create([
            'name' => $superAdminConfig['name'],
            'email' => $superAdminConfig['email'],
            'password' => Hash::make($superAdminConfig['password']),
            'role' => 'super_admin',
            'department_id' => $firstDepartment?->id,
            'is_admin' => true,
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Attach role if roles table exists
        if (Schema::hasTable('roles')) {
            $role = Role::where('name', 'super_admin')->first();
            if ($role) {
                $superUser->assignRole($role);
                $this->command->info('Assigned super admin role.');
            }
        }

        $this->command->info('Super admin created successfully: ' . $superAdminConfig['email']);
    }
}
