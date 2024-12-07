<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReclamationResource;
use App\Models\Reclamation;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class ReclametionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $reclamations = Reclamation::query()->paginate($request->input('per_page', 10), page: $request->input('page', 1));
        // return response()->json(ReclamationResource::collection($reclamations), 200);
        return ReclamationResource::collection($reclamations);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $data = $this->validate($request, [
            'sujet' => 'required',
            'description' => 'required',
            'statut' => 'required'
        ]);

        try {
            Reclamation::query()->create(array_merge(
                [
                    'utilisateur_id' => $user->id
                ],
                $data
            ));
            return response()->json(__('message.store_access'), 201);
        } catch (\Throwable $th) {
            throw new HttpException(400, __('message.error_catch'));
        }

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $reclamation = Reclamation::find($id);

        if (!$reclamation) { 
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }

        return response()->json($reclamation, 200);
    }

  

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $reclamation = Reclamation::find($id);

        if (!$reclamation) {
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }

        $data = $this->validate($request, [
            'statut' => 'required'
        ]);

        try {
            $reclamation->statut = $data['statut'];
            $reclamation->save();
            return response()->json(__('message.update_success'), 200);
        } catch (\Throwable $th) {
            throw new HttpException(400, __('message.error_catch'));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $reclamation = Reclamation::find($id);

        if (!$reclamation) {
            throw new NotFoundResourceException(__('message.show_message'), 404);
        }

        try {
            $reclamation->delete();
            return response(null, 204);
        } catch (\Throwable $th) {
            throw new HttpException(__('message.error_catch'), 400);
        }
    }
}
