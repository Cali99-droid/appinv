<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // DB::table('areas')->insert([
        //     'nombre' => 'nombre 1',

        // ]);
        DB::table('areas')->insert([
            'nombre' => 'DEFENSORÍA',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'TRIBUNAL DE HONOR',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'COMITE DEL SISTEMA DE
            CONTROL INTERNO',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'COMISIÓN ESPECIAL',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'COMITÉ ELECTORAL',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'COMISIÓN PERMANENTE
            DE FISCALIZACIÓN',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FUNDASAM',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);



        // LOS AZULES
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE CONTROL INSTITUCIONAL',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'PROCURADURÍA
            UNIVERSITARIA',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'SECRETARÌA GENERAL',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            IMÁGEN INSTITUCIONAL',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            PLANIFICACIÓN Y
            PRESUPUESTO
            ',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            ASESORÍA JURÍDICA',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);


        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DE ABASTECIM. Y
            SERViCIOS. AUXILIARES',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DE RECURSOS
            HUMANOS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DE GESTIÓN
            AMB. Y BIOSEGURIDAD',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DE GESTIÓN
            FINANCIERA',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DE BIENESTAR
            UNIVERSITARIO',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);


        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE PRE INVERSIÓN.',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            RESPONSABILIDAD SOCIAL
            UNIVERSITARIA
            ',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            DESARROLLO FÍSICO',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            TECNOLOGÍAS DE INFORM.
            SISTEMAS Y ESTADÍSTICA',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'CENTROS DE PRODUCCIÓN
            DE BIENES Y SERVICIOS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);


        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DE DERECHOS
            DE AUTOR Y PATENTES',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DEL INSTITUTO
            DE INVESTIGACION
            ',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DE
            INCUBADORAS DE EMPRESAS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN DE
            REPOSITORIO
            ',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);


        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN GENERAL DE
            INSTITUTOS DE INVESTIG.
            Y EXPERIMENTACIÓN',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);


        DB::table('areas')->insert([
            'nombre' => 'DIRECCIÓN ACADÉMICA DE ESTUDIOS GENERALES',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            ESTUDIOS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            ADMISIÓN',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            CALIDAD
            UNIVERSITARIA',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'OFICINA GENERAL DE
            SERVICIOS ACADÉMICOS
            Y PUBLICACIONES
            ',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);


        DB::table('areas')->insert([
            'nombre' => 'ESCUELA DE POST GRADO',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);



        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE CIENCIAS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            CIENCIAS MÉDICAS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            CIENCIAS
            AGRARIAS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            DERECHO Y
            CIENCIAS
            POLITICAS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            ECONOMÍA Y
            CONTABILIDAD',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            ADMINISTRACIÓN Y
            TURISMO',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            CIENCIAS
            SOCIALES Y
            EDUCACIÓN
            ',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            INGENIERÍA DE MINAS,
            GEOLOGÍA Y
            METALURGIA
            ',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            INGENIERÍA DE
            INDUSTRIAS
            ALMENTARIAS',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            CIENCIAS DEL
            AMBIENTE',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('areas')->insert([
            'nombre' => 'FACULTAD DE
            INGENIERÍA CIVIL',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
