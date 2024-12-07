<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Http\Resources\ReviewsResource;
use Illuminate\Http\Request;
use App\Models\Rating;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class RatingController extends Controller
{
    //admin
    public function index(Request $request)
    {
        $ratings = Rating::query()->paginate($request->input('per-page', 10), page: $request->input('page', 1));
        // return response()->json($ratings, 200);
        return ReviewsResource::collection($ratings);
    }

    //admin
    public function show($id)
    {
        $rating = Rating::find($id);
        if (!$rating) {
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }
        return response()->json(new ReviewsResource($rating),200);
    }

    //client
    public function store(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'artisan_id' => 'required',
            'Contenu' => 'required',
            'etoile' => 'required|integer|min:1|max:5',
        ]);
        try {
            Rating::query()->create(
                array_merge($data, ['client_id' => $user->id])
            );
            return response()->json(__('message.store_access'), 201);
        } catch (\Throwable $th) {
            throw new HttpException(__('message.error_catch'), 400);
        }
    }
    //client
    public function update(Request $request, $id)
    {
        $user = $request->user();
        $rating = Rating::find($id);
        if (!$rating) {
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }
        if ($rating->client_id != $user->id) {
            //mayamknch
            return response()->json(__('message.update_review_impossible'), 403);
        }
        $data = $request->validate([
            'artisan_id' => 'required',
            'Contenu' => 'required',
            'etoile' => 'required|integer|min:1|max:5',
        ]);
        try {
            $rating->update($data);
            return response()->json(__('message.update_success'), 200);
        } catch (\Throwable $th) {
            throw new HttpException(__('message.error_catch'), 400);
        }
    }
    //client

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $rating = Rating::find($id);
        if (!$rating) {
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }
        
        if ($rating->client_id != $user->id) {
            //mayamknch
            return response()->json(__('message.delete_review_impossible'), 403);
        }

        try {
            $rating->delete();
            return response()->json(null, 204);
        } catch (\Throwable $th) {
            throw new HttpException(__('message.error_catch'), 400);
        }
    }

    //list rates by artisan
    public function listReviewsByArtisans($id)  // à modifier
    { // ychofha mohammed
        $rating = Rating::where('artisan_id', $id)->cursorPaginate(10);
        return ReviewResource::collection($rating);
    }
}
