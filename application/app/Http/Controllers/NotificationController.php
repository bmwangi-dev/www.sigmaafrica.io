<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\UserNotificationInteraction;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NotificationController extends Controller

{
    use AuthorizesRequests;
    /**
     * Admin: list notifications
     */
    public function index()
    {
        $this->authorize('viewAny', Notification::class);

        $notifications = Notification::with('creator')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Notifications/Index', [
            'notifications' => $notifications
        ]);
    }

    /**
     * Admin: create notification form
     */
    public function create()
    {
        $this->authorize('create', Notification::class);

        return Inertia::render('Admin/Notifications/Create');
    }

    /**
     * Admin: store notification
     */
    public function store(Request $request)
    {
        $this->authorize('create', Notification::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
            'redirect_url' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['redirect_url'] = $validated['redirect_url'] ?? '/blogs';

        Notification::create($validated);

        return redirect()->route('admin.notifications.index')
            ->with('success', 'Notification created successfully!');
    }

    /**
     * Public: get active notifications
     */
    public function getActiveNotifications()
    {
        $userId = Auth::id();

        $notifications = Notification::active()
            ->latest()
            ->take(5) // show last 5, adjust if needed
            ->get();

        if ($userId) {
            // Attach interaction info for logged-in users
            $notifications->load(['userInteractions' => fn($q) => $q->where('user_id', $userId)]);
        }

        return response()->json($notifications);
    }

    /**
     * User: mark as viewed
     */
    public function markAsViewed(Notification $notification)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        UserNotificationInteraction::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'notification_id' => $notification->id,
            ],
            [
                'is_viewed' => true,
            ]
        );

        return response()->json(['success' => true]);
    }

    /**
     * User: dismiss notification
     */
    public function dismiss(Notification $notification)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        UserNotificationInteraction::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'notification_id' => $notification->id,
            ],
            [
                'is_dismissed' => true,
            ]
        );

        return response()->json(['success' => true]);
    }
}
