<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashController;
use App\Http\Controllers\HardwareController;
use App\Http\Controllers\MantenimientoController;
use App\Http\Controllers\SoftwareController;
use App\Http\Controllers\UserController;
use App\Models\Hardware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|agrts
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/software', SoftwareController::class);
    Route::apiResource('/hardware', HardwareController::class);
    Route::apiResource('/areas', AreaController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/mantenimiento', MantenimientoController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/dash', [DashController::class, 'getData']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//
Route::post('/login', [AuthController::class, 'login']);
Route::post('/registro', [AuthController::class, 'register']);
