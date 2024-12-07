<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    LoginController,
    RegisterController
};
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArtisanController;
use App\Http\Controllers\GalleryController;
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

Route::prefix('auth')->group(function () {
    Route::post('register', [RegisterController::class, 'register']);
    Route::post('verify', [RegisterController::class, 'verify']);
    Route::post('login', [LoginController::class, 'login']);
    Route::post('refresh',[LoginController::class, 'refresh']);

    Route::middleware('auth')->group(function () {
        Route::middleware('permission:modifier password')->post('resetPassword', [RegisterController::class, 'resetPassword']);
        Route::get('/profile', [Logincontroller::class, 'profile']);
        Route::middleware('permission:gerer profil')->put('/profile', [Logincontroller::class, 'update']);
        Route::get('/current', [Logincontroller::class, 'current']);
        Route::post('logout', [LoginController::class, 'logout']);
    });

    Route::prefix('password')->group(function () {
        Route::post('request', [RegisterController::class, 'generateToken']);
        Route::post('verify', [RegisterController::class, 'verifyToken']);
        Route::post('change', [RegisterController::class, 'forgotpassword']);
    });
});

Route::prefix("accounts")->group(function() {
    Route::middleware('auth')->group(function() {
        //liste des admines et les supporteurs
        Route::middleware('permission:liste supporteurs')->get('/list',[UserController::class, 'index']);
        //liste des clients
        Route::middleware('permission:liste clients')->get('/listeClient',[UserController::class, 'listeClient']);
        //liste des artisans
        Route::middleware('permission:liste artisans')->get('/listeArtisan',[UserController::class, 'listeArtisan']);
        Route::middleware('permission:ajouter supporteur')->post('/ajouterAccount',[UserController::class, 'store']);
        Route::middleware('permission:details client|details artisans|details supporteur')->get('/detailsAccount/{id}',[UserController::class, 'show']);
        // Route::middleware('permission:modifier client|modifier artisan|modifier supporteur')->put('/modifierAccount/{id}',[UserController::class, 'update']);
        Route::middleware('permission:modifier supporteur')->put('/modifiereUser/{id}', [UserController::class, 'updateSupp_Ad']);
        Route::middleware('permission:modifier client|modifier artisan')->put('/EditUser/{id}', [UserController::class, 'updateCl_Ar']);
        Route::middleware('permission:supprimer client|supprimer artisan|supprimer supporteur')->delete('/supprimerAccount/{id}',[UserController::class, 'destroy']);
    });
    Route::get('/get/{id}',[UserController::class, 'getUser']);
    Route::get('/getEmeteur/{id}',[UserController::class, 'getEmeteur']);
});

Route::prefix("categories")->group(function() {
    Route::middleware('auth')->group(function()  {
        Route::middleware('permission:liste categories')->get('/list',[CategoryController::class, 'index']);
        Route::middleware('permission:ajouter categorie')->post('/add',[CategoryController::class, 'store']);
        Route::middleware('permission:details categorie')->get('/show/{id}',[CategoryController::class, 'show']);
        Route::middleware('permission:modifier categorie')->put('/edit/{id}',[CategoryController::class, 'update']);
        Route::middleware('permission:supprimer categorie')->delete('/delete/{id}',[CategoryController::class, 'destroy']);
    });
    Route::get('/collection', [CategoryController::class, 'allCategories']); //mafihach permissions
});

Route::prefix("Artisans")->group(function() {
    Route::get('/listeArtisans/{id}', [ArtisanController::class, 'index']); // nssawal m
    Route::get("/show/{id}", [ArtisanController::class, "show"]);
});

Route::prefix("galleries")->group(function() {
    Route::get('/listeGaleries', [GalleryController::class, 'allGalleries']);
    Route::get('/listeGallery', [GalleryController::class, 'index']);
    Route::get("/show/{id}", [GalleryController::class, "show"]);
    Route::post('/add', [GalleryController::class, 'store']);
    Route::put('/modifierGallery/{id}', [GalleryController::class, 'update']);
    Route::delete('/supprimerGallery/{id}', [GalleryController::class, 'destroy']);

});