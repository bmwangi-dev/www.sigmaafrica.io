<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Cohort;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Applications/Index', [
            'applications' => Application::with('cohort')->get(),
        ]);
    }

    public function create()
    {
         return Inertia::render('Admin/Applications/Create', [
            'cohorts' => Cohort::all(),
        ]);
    }

    public function store(Request $request)
    {
         $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
            'organization' => 'nullable|string|max:255',
            'cohort_id' => 'required|exists:cohorts,id',
        ]);

        Application::create($validated);

        return redirect()->route('admin.applications.index')->with('success', 'Application created successfully.');
    }

    public function edit(Application $application)
    {
        return Inertia::render('Admin/Applications/Edit', [
            'application' => $application,
             'cohorts' => Cohort::all(),
        ]);
    }
    
    public function update(Request $request, Application $application)
    {
         $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
            'organization' => 'nullable|string|max:255',
            'cohort_id' => 'required|exists:cohorts,id',
        ]);

        $application->update($validated);
        
        return redirect()->route('admin.applications.index')->with('success', 'Application updated successfully.');
    }

    public function destroy(Application $application)
    {
        $application->delete();

        return redirect()->route('admin.applications.index')->with('success', 'Application deleted successfully.');
    }
}
