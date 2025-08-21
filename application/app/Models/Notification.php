<?php
// app/Models/Notification.php

namespace App\Models;

use App\Enums\NotificationType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'title',
        'description',
        'image_url',
        'redirect_url',
        'is_active',
        'start_date',
        'end_date',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'type' => NotificationType::class,
        ];
    }

    // Creator relationship
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Backward compatibility
    public function user()
    {
        return $this->creator();
    }

    // Scope for active notifications
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
                    ->where(function($q) {
                        $q->whereNull('start_date')
                          ->orWhere('start_date', '<=', Carbon::now());
                    })
                    ->where(function($q) {
                        $q->whereNull('end_date')
                          ->orWhere('end_date', '>=', Carbon::now());
                    });
    }
}
