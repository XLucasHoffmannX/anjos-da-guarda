<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MedicamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Medicamento::factory(10)->create();
    }
}
