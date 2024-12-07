<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArtisanResource;
use App\Http\Resources\ShowResource;
use App\Models\User;
use Illuminate\Http\Request;

class ArtisanController extends Controller
{
    public function index(Request $request, $id)
    {
        $ville = $request->query('ville');
        $users = User::ville($ville)->role('artisan')->whereMeta('category_id', $id)->cursorPaginate(10);
        return ArtisanResource::collection($users);
    }

    public function show($id)
    {
        // wach khassna ndiro test 3la user connecter wach khasso ykon artisan
        return response()->json(new ShowResource(User::find($id)), 200);
    }
}
