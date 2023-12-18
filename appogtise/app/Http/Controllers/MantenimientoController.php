<?php

namespace App\Http\Controllers;

use App\Http\Resources\MantenimientoCollection;
use App\Models\Mantenimiento;
use Illuminate\Http\Request;

class MantenimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new MantenimientoCollection(Mantenimiento::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $mant = new Mantenimiento();
        $mant->tipo = $request->input('tipo');
        $mant->tecnico = $request->input('tecnico');
        $mant->fecha = $request->input('fecha');
        $mant->hardware_id = $request->input('hardware_id');
        $mant->save();
        return [
            'mant' => $mant,
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Mantenimiento $mantenimiento)
    {
        //
        return [
            'mantenimiento' => $mantenimiento,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mantenimiento $mantenimiento)
    {
        //
        $mantenimiento->tipo = $request->input('tipo');
        $mantenimiento->tecnico = $request->input('tecnico');
        $mantenimiento->fecha = $request->input('fecha');
        $mantenimiento->hardware_id = $request->input('hardware_id');
        $mantenimiento->save();
        return [
            'mantenimiento' => $mantenimiento,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mantenimiento $mantenimiento)
    {
        //
        $mantenimiento->delete();
        return [
            'mantenimiento' => $mantenimiento,
            // 'software' => $software,

        ];
    }
}
