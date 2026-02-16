<?php

namespace App\Http\Controllers;

use App\Services\GoogleSheetsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SkillSparkController extends Controller
{
    protected $googleSheets;

    public function __construct(GoogleSheetsService $googleSheets)
    {
        $this->googleSheets = $googleSheets;
    }

    public function apply(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'organization' => 'nullable|string|max:255',
            'role_usage' => 'nullable|string',
            'schedule_commitment' => 'nullable|string|max:50',
            'tools_interest' => 'nullable|array',
            'discovery_source' => 'nullable|string|max:255',
            'recommendation_likelihood' => 'nullable|string|max:255',
            'additional_comments' => 'nullable|string',
        ]);

        try {
            $spreadsheetId = config('services.google.spreadsheet_id');
            $range = 'SKILLSPARKS 3.0!A:I'; 

            if ($spreadsheetId) {
                $existingData = $this->googleSheets->getValues($spreadsheetId, 'SKILLSPARKS 3.0!B:C'); // Column B is Email, C is Phone
                
                if (!empty($existingData)) {
                    foreach ($existingData as $row) {
                        $existingEmail = $row[0] ?? '';
                        $existingPhone = $row[1] ?? '';

                        if (strtolower($existingEmail) === strtolower($validated['email'])) {
                            return back()->withErrors(['email' => 'An application with this email has already been submitted.']);
                        }

                        if ($existingPhone === $validated['phone']) {
                            return back()->withErrors(['phone' => 'An application with this phone number has already been submitted.']);
                        }
                    }
                }
            }
            
            // Map the tools_interest array to a string
            $tools = isset($validated['tools_interest']) ? implode(', ', $validated['tools_interest']) : '';

            $values = [
                $validated['name'],
                $validated['email'],
                $validated['phone'],
                $validated['organization'] ?? '',
                $validated['schedule_commitment'] ?? '',
                $validated['discovery_source'] ?? '',
                $tools,
                $validated['role_usage'] ?? '',
                now()->toDateTimeString(),
            ];

            if ($spreadsheetId) {
                $this->googleSheets->appendRow($spreadsheetId, $range, $values);
            }

            return back()->with('success', 'Application submitted successfully!');
        } catch (\Exception $e) {
            Log::error('Google Sheets Error: ' . $e->getMessage());
            return back()->with('error', 'Error submitting application.');
        }
    }
}
