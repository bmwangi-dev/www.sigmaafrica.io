<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cohort;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CohortController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Cohorts/Index', [
            'cohorts' => Cohort::with('course')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Cohorts/Create', [
            'courses' => Course::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'fee' => 'required|numeric',
            'mode' => 'required|in:hybrid,online',
            'status' => 'required|in:active,inactive',
            'course_id' => 'required|exists:courses,id',
        ]);

        Cohort::create($validated);

        return redirect()->route('admin.cohorts.index')->with('success', 'Cohort created successfully.');
    }

    public function edit(Cohort $cohort)
    {
        return Inertia::render('Admin/Cohorts/Edit', [
            'cohort' => $cohort,
            'courses' => Course::all(),
        ]);
    }

    public function update(Request $request, Cohort $cohort)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'fee' => 'required|numeric',
            'mode' => 'required|in:hybrid,online',
            'status' => 'required|in:active,inactive',
            'course_id' => 'required|exists:courses,id',
        ]);

        $cohort->update($validated);

        return redirect()->route('admin.cohorts.index')->with('success', 'Cohort updated successfully.');
    }

    public function destroy(Cohort $cohort)
    {
        $cohort->delete();

        return redirect()->route('admin.cohorts.index')->with('success', 'Cohort deleted successfully.');
    }
}
