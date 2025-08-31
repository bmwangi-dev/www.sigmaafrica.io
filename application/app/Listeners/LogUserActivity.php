<?php

namespace App\Listeners;

use App\Models\UserActivity;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class LogUserActivity
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        if ($event instanceof Login) {
            UserActivity::log(
                $event->user->id,
                'login',
                'User logged in',
                [
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                    'guard' => $event->guard
                ]
            );
            
            // Update user's last_login timestamp
            $event->user->update(['last_login' => now()]);
        }
        
        if ($event instanceof Logout) {
            UserActivity::log(
                $event->user->id,
                'logout',
                'User logged out',
                [
                    'ip' => request()->ip(),
                    'user_agent' => request()->userAgent(),
                    'guard' => $event->guard
                ]
            );
        }
    }
}
