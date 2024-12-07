<?php

use App\Http\Controllers\ReclametionController;
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


Route::prefix('reclamations')->group(function(){
    Route::middleware('gate:liste reclamation')->get('/listReclamations',[ReclametionController::class, 'index']);
    Route::middleware('gate:envoyer reclamation')->post('/addReclamation',[ReclametionController::class, 'store']);
    Route::middleware('gate:details reclamation')->get('/showReclamation/{id}',[ReclametionController::class, 'show']);
    Route::middleware('gate:changer etat reclamation')->put('/editReclamation/{id}',[ReclametionController::class, 'update']);
    Route::middleware('gate:supprimer reclamation')->delete('/deleteReclamation/{id}',[ReclametionController::class, 'destroy']);
});
