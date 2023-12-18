<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hardware', function (Blueprint $table) {
            $table->id();
            $table->string('codigoPatrimonial')->unique();
            $table->string('serie')->nullable();
            $table->string('tipo')->nullable();
            $table->string('marca')->nullable();
            $table->string('modelo')->nullable();
            $table->string('descripcion')->nullable();
            $table->date('fechaAdquisicion')->nullable();
            $table->double('costoAdquisicion')->nullable();
            $table->string('especificaciones')->nullable();
            $table->string('estado');
            $table->string('so')->nullable();
            $table->date('fechaAsignacion')->nullable();
            $table->date('fechaDevolucion')->nullable();
            $table->string('responsable')->nullable();
            $table->string('ubicacion');
            $table->string('observacion')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('area_id')->nullable();
            $table->foreign('area_id')->references('id')->on('areas');
            // codigoPatrimonial: "",
            // serie: "",
            // tipo: "",
            // marca: "",
            // modelo: "",
            // descripcion: "",
            // fechaAdquisicion: "",
            // costoAdquisicion: "",
            // especificaciones: "",
            // estado: "Inoperativo",
            // so: "",
            // fechaAsignacion: "",
            // fechaDevolucion: "",
            // responsable: "",
            // ubicacion: "",
            // observacion: "",
            // area_id: 1, // Valor por defecto para el select
            // user_id: user?.id,
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hardware');
    }
};
