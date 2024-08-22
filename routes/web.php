<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [FileController::class, 'index']);

Route::get('/add', function () {
    return Inertia::render('Files/Create');
});

Route::post('/upload_file', [FileController::class, 'upload']);
