<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new UserCollection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::where('id', '=', $id)->get();
        return [
            'user' => $user,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
        $user->name = $request->name;
        $user->email = $request->email;
        // $user->oficina_id = $request->office;
        // $user->status = $request->status;
        if ($request->password) {
            $user->password = bcrypt($request->password);
        }
        $user->save();
        return [
            'message' => 'Se actualizó correctamente',
            'id' => $user->id,

        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $user->delete();
        return [
            'user' => $user,
            // 'software' => $software,

        ];
    }
}
