<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class CategoryController extends Controller
{

    //inscription
    #all categories cursor
    public function allCategories()
    {
        $Categories = Category::cursor();
        return response()->json($Categories, 200);
    }

    //admin
    public function index(Request $request)
    {
        $categories = Category::query()->paginate($request->input('per-page', 10), page: $request->input('page', 1));
        return response()->json($categories, 200);
    }

    //admin
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }

        return response()->json($category, 200);
    }

    //admin
    public function store(Request $request)
    {
        $data = $request->validate([
            'libelle' => 'required|string',
            'image' => 'required'
        ]);

        try {
            Category::query()->create($data);
            return response()->json(__('message.store_access'), 201);
        } catch (\Throwable $th) {
            throw new HttpException(400,__('message.error_catch') );
        }
    }

    //admin
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            // return response()->json(__('message.not_found'), 404);
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }

        $data = $request->validate([
            'libelle' => 'required|string',
            'image' => 'required|string'
        ]);

        try {
            $category->libelle = $data['libelle'];
            $category->image = $data['image'];
            $category->save();
            return response()->json(__('message.update_success'), 200);
        } catch (\Throwable $th) {
            throw new HttpException(400,__('message.error_catch') );
        }
    }

    //admin
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }
        try {
            $category->delete();

            return response()->json(null, 204);
        } catch (\Throwable $th) {
            throw new HttpException(400,__('message.error_catch') );
        }
    }
}
