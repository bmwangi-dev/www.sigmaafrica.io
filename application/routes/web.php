<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\TeamController;
use App\Models\Team;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Index');
})->name('home');

// TEMPORARY: Database setup route - REMOVE AFTER USE!
Route::get('/setup-database', function () {
    $secret = request()->query('secret');
    if ($secret !== env('SETUP_SECRET', 'change-me-12345')) {
        abort(403, 'Unauthorized');
    }

    try {
        $results = [];
        
        // Run migrations
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        $results['migrations'] = 'Completed';
        
        // Run seeders
        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
        $results['seeders'] = 'Completed';
        
        return response()->json([
            'success' => true,
            'message' => 'Database setup completed!',
            'results' => $results,
            'warning' => 'REMOVE this route after use!'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
});

Route::get('/about', function () {
    try {
        $teams = Team::active()->ordered()->get();
    } catch (\Exception $e) {
        \Log::warning('Teams could not be loaded: ' . $e->getMessage());
        $teams = [];
    }
    
    return Inertia::render('AboutUs/Index', [
        'teams' => $teams
    ]);
})->name('about');

Route::get('/academy', function () {
    return Inertia::render('Academy/Index');
})->name('academy');

Route::get('/community', function () {
    return Inertia::render('Community/Index');
})->name('community');

Route::get('/blogs', function () {
    return Inertia::render('Blogs/Index');
})->name('blogs');

Route::get('/contact', function () {
    return Inertia::render('ContactUs/Index');
})->name('contact');

Route::get('/notifications/active', [NotificationController::class, 'getActiveNotifications'])
    ->name('notifications.active');

Route::post('/notifications/{notification}/mark-viewed', [NotificationController::class, 'markAsViewed'])
    ->name('notifications.markViewed');

Route::post('/notifications/{notification}/dismiss', [NotificationController::class, 'dismiss'])
    ->name('notifications.dismiss');

// Team management API routes
Route::prefix('api/teams')->name('api.teams.')->group(function () {
    Route::get('/', [TeamController::class, 'index'])->name('index');
    Route::post('/', [TeamController::class, 'store'])->name('store');
    Route::get('/{team}', [TeamController::class, 'show'])->name('show');
    Route::put('/{team}', [TeamController::class, 'update'])->name('update');
    Route::delete('/{team}', [TeamController::class, 'destroy'])->name('destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (\Illuminate\Http\Request $request) {
        $user = $request->user();
        $user->load('department');

        // Role-based dashboard routing
        if ($user->isSuperAdmin() || $user->isAdmin()) {
            // Admin/Super Admin Dashboard
            $stats = [
                'total_students' => \App\Models\User::where('role', 'student')->count(),
                'total_mentors' => \App\Models\User::where('role', 'technical_mentor')->count(),
                'total_departments' => \App\Models\Department::count(),
                'total_courses' => \App\Models\Course::count(),
                'total_cohorts' => \App\Models\Cohort::where('status', 'active')->count(),
            ];

            return Inertia::render('Admin/AdminDashboard', [
                'auth' => [
                    'user' => \App\DataTransferObjects\AuthUserData::fromModel($user),
                ],
                'stats' => $stats,
            ]);
        } elseif ($user->isTechnicalMentor()) {
            // Technical Mentor Dashboard
            return Inertia::render('Admin/MentorDashboard', [
                'auth' => [
                    'user' => \App\DataTransferObjects\AuthUserData::fromModel($user),
                ],
            ]);
        } elseif ($user->isDepartmentHead()) {
            // Department Head Dashboard
            return Inertia::render('Admin/DepartmentHeadDashboard', [
                'auth' => [
                    'user' => \App\DataTransferObjects\AuthUserData::fromModel($user),
                ],
            ]);
        } else {
            // Student Dashboard (default)
            return Inertia::render('Admin/dashboard', [
                'auth' => [
                    'user' => \App\DataTransferObjects\AuthUserData::fromModel($user),
                ],
            ]);
        }
    })->name('dashboard');

    // Super Admin Routes - Protected by SuperAdmin middleware
    Route::middleware(['super_admin'])->prefix('admin')->name('admin.')->group(function () {
        // User Management Routes
        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/', [\App\Http\Controllers\Admin\UserManagementController::class, 'index'])->name('index');
            Route::get('/create', [\App\Http\Controllers\Admin\UserManagementController::class, 'create'])->name('create');
            Route::post('/', [\App\Http\Controllers\Admin\UserManagementController::class, 'store'])->name('store');
            Route::get('/{user}', [\App\Http\Controllers\Admin\UserManagementController::class, 'show'])->name('show');
            Route::get('/{user}/edit', [\App\Http\Controllers\Admin\UserManagementController::class, 'edit'])->name('edit');
            Route::put('/{user}', [\App\Http\Controllers\Admin\UserManagementController::class, 'update'])->name('update');
            Route::patch('/{user}', [\App\Http\Controllers\Admin\UserManagementController::class, 'update']);
            Route::delete('/{user}', [\App\Http\Controllers\Admin\UserManagementController::class, 'destroy'])->name('destroy');
            Route::post('/bulk-action', [\App\Http\Controllers\Admin\UserManagementController::class, 'bulkAction'])->name('bulk-action');
        });

        // Department Management Routes (for future implementation)
        Route::prefix('departments')->name('departments.')->group(function () {
            Route::get('/', function () {
                return redirect()->route('dashboard');
            })->name('index');
        });

        // Course Management Routes (for future implementation)
        Route::prefix('courses')->name('courses.')->group(function () {
            Route::get('/', function () {
                return redirect()->route('dashboard');
            })->name('index');
        });

        // Cohort Management Routes (for future implementation)
        Route::prefix('cohorts')->name('cohorts.')->group(function () {
            Route::get('/', function () {
                return redirect()->route('dashboard');
            })->name('index');
        });

        // System Settings Routes (for future implementation)
        Route::prefix('system')->name('system.')->group(function () {
            Route::get('/settings', function () {
                return redirect()->route('dashboard');
            })->name('settings');
        });
    });

    // Settings Routes (Available to all authenticated users)
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/appearance', function () {
            return Inertia::render('Settings/Appearance');
        })->name('appearance');

        Route::get('/profile', function () {
            return Inertia::render('Settings/Profile');
        })->name('profile');

        Route::get('/password', function () {
            return Inertia::render('Settings/Password');
        })->name('password');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
