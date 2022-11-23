<?php

use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ControlController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', [Controller::class, 'appStatus']);

Route::prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::get('send', function () {
    return event(new \App\Events\EventTest('palmeiras não tem mundial'));
});

/**
 * Rotas autenticadas
 */
Route::group(['middleware' => 'auth:api'], function () {

    /**
     * Retorna usuário
     */
    Route::prefix('auth')->group(function () {
        Route::get('/user', [AuthController::class, 'authUser']);
    });

    Route::post('/upload-image', [ArchiveController::class, 'imageUpload']);
    Route::post('/delete-image', [ArchiveController::class, 'imageDelete']);

    Route::apiResource('/user', UserController::class);
    Route::apiResource('/patient', PatientController::class);

    Route::apiResource('/control', ControlController::class);
});
