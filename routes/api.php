<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [UserController::class, 'create']);
Route::get('/users', [UserController::class, 'index']);

Route::get('/roles', [RoleController::class, 'index']);
Route::delete('/users/{id}', [UserController::class, 'delete']);
Route::put('/users/{id}', [UserController::class, 'update']);


