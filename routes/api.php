<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CrudsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('/cruds', CrudsController::class, [
    'except' => ['show', 'edit', 'store', 'destroy', 'index']
]);

Route::get('/cruds/delete/{id}', [ CrudsController::class, 'delete' ]);

Route::put('/cruds/update/{id}', [ CrudsController::class, 'updateName' ]);

Route::get('/cruds/paging', [ CrudsController::class, 'read' ]);

