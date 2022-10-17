<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
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
            'image' => $this->faker->imageUrl(),
            'cpf' => $this->faker->text(10),
            'rg' => $this->faker->text(10),
            'address' => $this->faker->address(),
            'description' => $this->faker->text(10),
            'reason' => $this->faker->text(10),
            'habits' => $this->faker->text(10),
            'health_problems' => $this->faker->text(10),
            'culture' => $this->faker->text(10),
            'routine_call' => $this->faker->text(10),
            'systemic_drug' => $this->faker->text(10),
            'auto_caution' => $this->faker->text(10),
            'financial' => $this->faker->text(10),
        ];
    }
}
