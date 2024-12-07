<?php

use App\Http\Controllers\ContactezNousController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix("contactezNous")->group(function() {
    Route::middleware('gate:liste contacts')->get('/listContactes',[ContactezNousController::class, 'index']);
    Route::middleware('gate:details contact')->get('/showContact/{id}',[ContactezNousController::class, 'show']);
    Route::post('/addContacte',[ContactezNousController::class, 'store']);
});
