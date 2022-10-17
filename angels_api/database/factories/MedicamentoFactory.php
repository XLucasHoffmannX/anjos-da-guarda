<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MedicamentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'qtd_amount' => $this->faker->randomNumber(2, true),
            'user_created' => \App\Models\User::inRandomOrder()->first()->id,
            'patient_owner' => \App\Models\Patient::inRandomOrder()->first()->id
        ];
    }
}
