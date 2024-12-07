<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UploadFile extends Controller
{
    public function image(Request $request){

        $validator = Validator::make($request->only('image'), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
    
        try {
            if ($image = $request->file('image')) {
                $url = $image->store('images', 'public');
                $url = Storage::url($url);
                return response()->json(['url' => asset($url)], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
        return response()->json(['error' => __('message.error')], 400);
    }
}
