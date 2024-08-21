<?php

use Illuminate\Support\Facades\Route;
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

Route::get('/', function (Request $request) {
    $queryString = http_build_query($request);
    return Inertia::render('Files/List', ['query' => $queryString]);
});

Route::get('/add', function () {
    return Inertia::render('Files/Create');
});
