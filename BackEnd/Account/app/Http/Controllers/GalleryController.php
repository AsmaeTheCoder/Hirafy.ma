<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class GalleryController extends Controller
{
    // Galleries for everyone
    public function allGalleries()
    {
        $images = Gallery::cursor();
        return response()->json($images, 200);
    }

    // Admin and artisan
    public function index(Request $request)
    {
        $images = Gallery::query()->paginate($request->input('per-page', 10), page: $request->input('page', 1));
        return response()->json($images, 200);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
//wach khassna ndiro test 3la role dyal user connecter
        $data = $request->validate([
            // 'name' => 'required|string',
            // 'description' => 'required',
            'image_path' => 'required|string'
        ]);

        try {
            Gallery::query()->create(array_merge(
                $data, 
                ['artisan_id' => $user->id]
            ));
            return response()->json(__('message.ajout_gallery_success'), 201);
        } catch (\Throwable $th) {
            throw new HttpException(400,__('message.error_catch') );
        }
    }

    public function show($id)
    {
        $image = Gallery::find($id);
        if (!$image) {
            throw new NotFoundResourceException(__('message.gallery_not_found'), 404);
        }
        return response()->json($image, 200);
    }


    public function update(Request $request, $id)
    {
        $user = auth()->user();
 
        $image = Gallery::find($id);
        if (!$image) {
            throw new NotFoundResourceException(__('message.gallery_not_found'), 404);
        }

        if ($image->artisan_id != $user->id) {
            //mayamknch
            return response()->json(__('message.update_image_pas_possible'), 403);
        }
        $data = $request->validate([
            // 'name' => 'required|string',
            // 'description' => 'required',
            'image_path' => 'required|string',
        ]);
        try {
            // $image->name = $data['name'];
            // $image->description = $data['description'];
            // $image->image_path = $data['image_path'];
            // $image->save();
            $image->update($data);

            return response()->json(__('message.update_Gallery_success'), 200);
        } catch (\Throwable $th) {
            throw new HttpException(400,__('message.error_catch') );
        }
    }

    public function destroy($id)
    {
        $user = auth()->user();

        $image = Gallery::find($id);

        if (!$image) {
            throw new NotFoundResourceException(__('message.gallery_not_found'), 404);
        }

        if ($image->artisan_id != $user->id) {
            //mayamknch
            return response()->json(__('message.delete_image_pas_possible'), 403);
        }
        try {
            $image->delete();
            return response()->json(null, 204);
        } catch (\Throwable $th) {
            throw new HttpException(400,__('message.error_catch') );
        }
    }
}
