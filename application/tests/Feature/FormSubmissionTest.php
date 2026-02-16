<?php

namespace Tests\Feature;

use App\Services\GoogleSheetsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery;
use Mockery\MockInterface;

class FormSubmissionTest extends TestCase
{
    /**
     * Test generic contact form submission.
     */
    public function test_contact_form_submission()
    {
        $this->instance(
            GoogleSheetsService::class,
            Mockery::mock(GoogleSheetsService::class, function (MockInterface $mock) {
                $mock->shouldReceive('appendRow')
                    ->once()
                    ->with(
                        Mockery::any(), // spreadsheetId
                        'CONTACT US!A:E',
                        Mockery::on(function ($values) {
                            return $values[0] === 'John Doe' && $values[1] === 'john@example.com';
                        })
                    );
            })
        );

        config(['services.google.spreadsheet_id' => 'test-id']);

        $response = $this->post('/contact', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'subject' => 'Test Subject',
            'message' => 'Test Message',
        ]);

        $response->assertStatus(302);
    }

    /**
     * Test services consultation form submission.
     */
    public function test_services_consultation_submission()
    {
        $this->instance(
            GoogleSheetsService::class,
            Mockery::mock(GoogleSheetsService::class, function (MockInterface $mock) {
                $mock->shouldReceive('appendRow')
                    ->once()
                    ->with(
                        Mockery::any(),
                        'SERVICES CONSULTANCY!A:E',
                        Mockery::on(function ($values) {
                            return $values[0] === 'Jane Smith' && $values[3] === 'Website Development';
                        })
                    );
            })
        );

        config(['services.google.spreadsheet_id' => 'test-id']);

        $response = $this->post('/services/consultation', [
            'name' => 'Jane Smith',
            'phone' => '0987654321',
            'email' => 'jane@example.com',
            'service' => 'Website Development',
            'message' => 'Help with my website',
        ]);

        $response->assertStatus(302);
    }

    /**
     * Test SkillSpark application submission.
     */
    public function test_skillspark_application_submission()
    {
        $this->instance(
            GoogleSheetsService::class,
            Mockery::mock(GoogleSheetsService::class, function (MockInterface $mock) {
                $mock->shouldReceive('appendRow')
                    ->once()
                    ->with(
                        Mockery::any(),
                        'SKILLSPARKS 3.0!A:H',
                        Mockery::on(function ($values) {
                            return $values[0] === 'Alice Brown' && str_contains($values[6], 'Excel');
                        })
                    );
            })
        );

        config(['services.google.spreadsheet_id' => 'test-id']);

        $response = $this->post('/skill-sparks/apply', [
            'name' => 'Alice Brown',
            'email' => 'alice@example.com',
            'phone' => '5555555555',
            'organization' => 'Sigma',
            'role_usage' => 'Data analysis',
            'schedule_commitment' => 'Yes',
            'tools_interest' => ['Excel', 'SQL'],
            'discovery_source' => 'LinkedIn',
        ]);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Application submitted successfully!']);
    }
}
