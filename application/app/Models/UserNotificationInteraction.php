<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserNotificationInteraction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'notification_id',
        'is_viewed',
        'is_dismissed',
    ];

    protected $casts = [
        'is_viewed' => 'boolean',
        'is_dismissed' => 'boolean',
    ];

    /**
     * Relationship: The user who interacted with the notification.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: The notification being interacted with.
     */
    public function notification()
    {
        return $this->belongsTo(Notification::class);
    }
}
