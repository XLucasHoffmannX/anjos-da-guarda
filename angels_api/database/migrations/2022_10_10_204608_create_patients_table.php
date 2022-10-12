<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('cpf');
            $table->string('rg');
            $table->string('address');
            $table->string('description');
            $table->string('reason');
            $table->string('habits');
            $table->string('health_problems');
            $table->string('culture');
            $table->string('routine_call');
            $table->string('systemic_drug');
            $table->string('auto_caution');
            $table->string('financial');
            $table->boolean('activated')->default(1);
            $table->integer('status_m')->default(0);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
}
