<?php

namespace App\Http\Controllers;

use App\Http\Requests\HardwareRequest;
use App\Http\Resources\HardwareCollection;
use App\Models\Hardware;
use Illuminate\Http\Request;

class HardwareController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new HardwareCollection(Hardware::with('area')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(HardwareRequest $request)
    {
        //

        $hardware = new Hardware();
        $hardware->codigoPatrimonial = $request->input('codigoPatrimonial');
        $hardware->serie = $request->input('serie');
        $hardware->tipo = $request->input('tipo');
        $hardware->marca = $request->input('marca');
        $hardware->modelo = $request->input('modelo');
        $hardware->descripcion = $request->input('descripcion');
        $hardware->fechaAdquisicion = $request->input('fechaAdquisicion');
        $hardware->costoAdquisicion = $request->input('costoAdquisicion');
        $hardware->especificaciones = $request->input('especificaciones');
        $hardware->estado = $request->input('estado');
        $hardware->so = $request->input('so');
        $hardware->fechaAsignacion = $request->input('fechaAsignacion');
        $hardware->fechaDevolucion = $request->input('fechaDevolucion');
        $hardware->responsable = $request->input('responsable');
        $hardware->ubicacion = $request->input('ubicacion');
        $hardware->observacion = $request->input('observacion');
        $hardware->area_id = $request->input('area_id');
        $hardware->user_id = $request->input('user_id');
        $hardware->save();
        return [
            'hardware' => $hardware,
        ];
    }


    /**
     * Display the specified resource.
     */
    public function show(Hardware $hardware)
    {
        //
        return [
            'hardware' => $hardware,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hardware $hardware)
    {
        //
        $hardware->codigoPatrimonial = $request->input('codigoPatrimonial');
        $hardware->serie = $request->input('serie');
        $hardware->tipo = $request->input('tipo');
        $hardware->marca = $request->input('marca');
        $hardware->modelo = $request->input('modelo');
        $hardware->descripcion = $request->input('descripcion');
        $hardware->fechaAdquisicion = $request->input('fechaAdquisicion');
        $hardware->costoAdquisicion = $request->input('costoAdquisicion');
        $hardware->especificaciones = $request->input('especificaciones');
        $hardware->estado = $request->input('estado');
        $hardware->so = $request->input('so');
        $hardware->fechaAsignacion = $request->input('fechaAsignacion');
        $hardware->fechaDevolucion = $request->input('fechaDevolucion');
        $hardware->responsable = $request->input('responsable');
        $hardware->ubicacion = $request->input('ubicacion');
        $hardware->observacion = $request->input('observacion');
        $hardware->area_id = $request->input('area_id');
        $hardware->user_id = $request->input('user_id');
        $hardware->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hardware $hardware)
    {
        //
        $hardware->delete();
        return [
            'hardware' => $hardware,
            // 'software' => $software,

        ];
    }
}
