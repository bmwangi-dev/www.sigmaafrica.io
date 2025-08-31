<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserActivity extends Model
{
    use HasFactory;

    // Disable updated_at timestamp since we only need created_at
    public $timestamps = false;
    protected $dates = ['created_at'];

    protected $fillable = [
        'user_id',
        'action',
        'description',
        'metadata',
        'created_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'created_at' => 'datetime',
    ];

    /**
     * Get the user that performed this activity
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Log an activity for a user
     */
    public static function log(int $userId, string $action, ?string $description = null, ?array $metadata = null): self
    {
        return static::create([
            'user_id' => $userId,
            'action' => $action,
            'description' => $description,
            'metadata' => $metadata,
            'created_at' => now(),
        ]);
    }

    /**
     * Get recent activities for a user
     */
    public static function recentForUser(int $userId, int $limit = 10)
    {
        return static::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
