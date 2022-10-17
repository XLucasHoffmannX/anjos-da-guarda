<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFamilyLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('family_links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('cpf');
            $table->string('rg');
            $table->string('phone');
            $table->string('address')->nullable();
            $table->string('kinship')->nullable();
            $table->string('telphone')->nullable();
            $table->string('profession')->nullable();
            $table->boolean('legal_rep')->default(0);
            $table->unsignedBigInteger('patient_id');

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
        Schema::dropIfExists('family_links');
    }
}
