<?php

namespace App\Http\Controllers;

use App\Models\Hardware;
use App\Models\Software;
use App\Models\User;
use Illuminate\Http\Request;

class DashController extends Controller
{
    //
    public function getData()
    {
        //
        $users = User::count();
        $software = Software::count();
        $hardware = Hardware::count();
        $equipos = Hardware::withCount('mantenimientos')
            ->orderByDesc('mantenimientos_count')
            ->take(3)
            ->get();
        return response()->json([
            'users' => $users,
            'software' => $software,
            'hardware' => $hardware,
            'equipos' => $equipos,
        ]);
    }
}
