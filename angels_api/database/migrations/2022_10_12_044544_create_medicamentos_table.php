<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medicamentos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('type')->default('comprimidos');
            $table->string('type_mat')->default('caixa');
            $table->string('description')->nullable()->default('Deve ser anexado uma ficha!');
            $table->bigInteger('user_created');
            $table->bigInteger('patient_owner');
            $table->integer('qtd_amount');
            $table->boolean('activated')->default(1);
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
        Schema::dropIfExists('medicamentos');
    }
}
