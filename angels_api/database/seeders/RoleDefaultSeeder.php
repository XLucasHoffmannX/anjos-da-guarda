<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleDefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => 'admin_access']);
        Role::create(['name' => 'edit_access']);
        Role::create(['name' => 'viewer_access']);
    }
}
