<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', [Controller::class, 'appStatus']);

Route::prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/login', [AuthController::class, 'login']);
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

    Route::apiResource('/user', UserController::class);
});
