<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateControlsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('controls', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_created');
            $table->unsignedBigInteger('patient_id');
            $table->string('medicamento');
            $table->unsignedBigInteger('medicamento_id')->nullable();
            $table->string('description')->nullable();
            $table->string('type_treatment')->default('Medicamento');
            $table->string('type')->default('comprimidos');
            $table->integer('inventory_qtd')->nullable();
            $table->boolean('activated')->default(1);

            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');

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
        Schema::dropIfExists('controls');
    }
}
