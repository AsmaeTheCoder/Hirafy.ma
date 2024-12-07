<?php

namespace App\Http\Controllers;

use App\Models\ContactezNous;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class ContactezNousController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $contacteznous = ContactezNous::query()->paginate($request->input('per-page', 10), page: $request->input('page', 1));
        return response()->json($contacteznous, 200);
    }

    public function show($id){
        $contact = ContactezNous::find($id);
        if(!$contact){
            throw new NotFoundResourceException(__('message.show_contact_notFound'), 404);
        }
        return response()->json($contact,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'fname' => 'required|string',
            'lname' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|phone:MA',
            'description' => 'required|string'
        ]);

        try {
            ContactezNous::query()->create($data);
            $data['locale'] = app()->getLocale();
            Http::post(rtrim(config('app.email_url'), '/').'/contactUS', $data);
            return response()->json(__('message.store_access'), 201);
        } catch (\Throwable $th) {
            throw new HttpException(400, __('message.error_catch'));
        }
    }

}
