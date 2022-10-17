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
            $table->bigInteger('patient_owner');
            $table->string('description')->nullable();
            $table->string('type')->default('comprimidos');
            $table->integer('inventory_qtd');
            $table->boolean('activated')->default(1);
            $table->unsignedBigInteger('medicamento_id');

            $table->foreign('medicamento_id')->references('id')->on('medicamentos')->onDelete('cascade');

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
