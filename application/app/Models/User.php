<?php
// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    // use HasRoles; // Uncomment if using Spatie Permission

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    // Check if user is admin
    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    // Check if user is super admin
    public function isSuperAdmin(): bool
    {
        // If using Spatie Permission
        // return $this->hasRole('super admin');

        // Simple check using email (adjust as needed)
        return $this->email === config('app.super_admin.email');
    }

    // Notifications relationship
    public function notifications()
    {
        return $this->hasMany(\App\Models\Notification::class);
    }

    // Created notifications relationship (for admin users)
    public function createdNotifications()
    {
        return $this->hasMany(\App\Models\Notification::class, 'user_id');
    }
}
