<?php

namespace App\Http\Controllers;

use App\Http\Resources\SoftwareCollection;
use App\Models\Software;
use Illuminate\Http\Request;

class SoftwareController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new SoftwareCollection(Software::with('area')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $software = new Software();
        $software->nombre = $request->input('nombre');
        $software->descripcion = $request->input('descripcion');
        $software->fabricante = $request->input('fabricante');
        $software->fechaInstalacion = $request->input('fechaInstalacion');
        $software->tipoLicencia = $request->input('tipoLicencia');
        $software->ubicacion = $request->input('ubicacion');
        $software->observacion = $request->input('observacion');
        $software->responsable = $request->input('responsable');
        $software->area_id = $request->input('area_id');
        $software->user_id = $request->input('user_id');
        $software->save();
        return [
            'software' => $software,


        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Software $software)
    {
        //
        return [
            'software' => $software,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Software $software)
    {
        //
        // $name =  $request->nombre;
        $software->nombre = $request->nombre;
        $software->descripcion = $request->descripcion;
        $software->fabricante = $request->fabricante;
        $software->fechaInstalacion = $request->fechaInstalacion;
        $software->tipoLicencia = $request->tipoLicencia;
        $software->ubicacion = $request->ubicacion;
        $software->observacion = $request->observacion;
        $software->responsable = $request->responsable;
        $software->save();
        return [
            'software' => $software,
            // 'software' => $software,

        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Software $software)
    {
        //
        $software->delete();
        return [
            'software' => $software,
            // 'software' => $software,

        ];
    }
}
