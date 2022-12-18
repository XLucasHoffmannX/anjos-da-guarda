<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogControls extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log_controls', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('date');
            $table->time('time');
            $table->bigInteger('medicamento');
            $table->bigInteger('medicamento_id')->nullable();
            $table->bigInteger('pacient_id');
            $table->bigInteger('user_accepeted');
            $table->string('status');

            $table->unsignedBigInteger('control_id');
            $table->unsignedBigInteger('frequency_id');

            $table->foreign('control_id')->references('id')->on('controls')->onDelete('cascade');
            $table->foreign('frequency_id')->references('id')->on('frequency_controls')->onDelete('cascade');

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
        Schema::dropIfExists('log_controls');
    }
}
