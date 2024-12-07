<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RatingController;
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

Route::prefix('reviews')->group(function () {
    Route::get('/listReview', [ RatingController::class, 'index']);
    Route::get('/listReviewsByArtisans/{id}', [ RatingController::class, 'listReviewsByArtisans']);
    Route::middleware('gate:donner avis')->post('/addReview', [ RatingController::class, 'store']);
    Route::get('/detailsReview/{id}', [ RatingController::class, 'show']);
    Route::middleware('gate')->put('/modifiereReview/{id}', [ RatingController::class, 'update']);
    Route::middleware('gate')->delete('/supprimerReview/{id}', [ RatingController::class, 'destroy']);
});