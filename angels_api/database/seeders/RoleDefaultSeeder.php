<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class RoleDefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        Role::create(['uuid' => $faker->uuid(), 'name' => 'admin_access']);
        Role::create(['uuid' => $faker->uuid(), 'name' => 'edit_access']);
        Role::create(['uuid' => $faker->uuid(), 'name' => 'viewer_access']);
    }
}
