<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departments = ['Engineering', 'Data Science', 'Research', 'Operations', 'Marketing', 'Business Development'];
        $positions = ['Lead', 'Senior', 'Manager', 'Specialist', 'Analyst', 'Coordinator'];
        $socialTypes = ['linkedin', 'twitter', 'globe', 'instagram'];

        // Generate 1-3 random social links
        $socials = [];
        $numSocials = fake()->numberBetween(1, 3);
        $selectedTypes = fake()->randomElements($socialTypes, $numSocials);

        foreach ($selectedTypes as $type) {
            $socials[] = [
                'type' => $type,
                'url' => $type === 'globe' ? fake()->url() : 'https://' . $type . '.com/in/' . fake()->userName()
            ];
        }

        return [
            'name' => fake()->name(),
            'contact_no' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'department' => fake()->randomElement($departments),
            'position' => fake()->randomElement($positions),
            'image_path' => '/images/team/' . fake()->numberBetween(1, 10) . '.jpg',
            'socials' => $socials,
            'is_active' => fake()->boolean(90),
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
