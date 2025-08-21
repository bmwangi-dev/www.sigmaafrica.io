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
            $this->command->info('Super admin already exists: ' . $superUser->email);
            return;
        }

        // Prepare super admin credentials
        $superUserCred = collect($superAdminConfig)->map(function ($value, $key) {
            return $key === 'password' ? Hash::make($value) : $value;
        });

        // Create the Super Admin
        $superUser = User::create($superUserCred->toArray());

        // Attach role if roles table exists
        if (Schema::hasTable('roles')) {
            $role = Role::where('name', RoleEnum::super_admin())->first();
            if ($role) {
                $superUser->assignRole($role);
                $this->command->info('Assigned super admin role.');
            } else {
                $this->command->warn('Super admin role not found in roles table.');
            }
        }

        $this->command->info('Super admin created successfully: ' . $superAdminConfig['email']);
    }
}
