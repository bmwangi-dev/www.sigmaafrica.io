<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $teams = Team::active()->ordered()->get();
        return response()->json($teams);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_no' => 'required|string|max:20',
            'email' => 'required|email|unique:teams,email',
            'department' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'image_path' => 'nullable|string|max:500',
            'socials' => 'nullable|array',
            'socials.*.type' => 'required_with:socials|string|in:linkedin,twitter,globe,instagram',
            'socials.*.url' => 'required_with:socials|url',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        $team = Team::create($validated);
        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team): JsonResponse
    {
        return response()->json($team);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_no' => 'required|string|max:20',
            'email' => ['required', 'email', Rule::unique('teams', 'email')->ignore($team->id)],
            'department' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'image_path' => 'nullable|string|max:500',
            'socials' => 'nullable|array',
            'socials.*.type' => 'required_with:socials|string|in:linkedin,twitter,globe,instagram',
            'socials.*.url' => 'required_with:socials|url',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        $team->update($validated);
        return response()->json($team);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team): JsonResponse
    {
        $team->delete();
        return response()->json(['message' => 'Team member deleted successfully']);
    }
}
