<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Http\Resources\DetailsUser;
use App\Http\Resources\EmeteurResource;
use App\Http\Resources\ListeUser;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class UserController extends Controller
{
//liste des admin et les supporteurs
public function index(Request $request)
{
    $users = User::role(['supporteur','admin'])->paginate($request->input('per-page', 10), page : $request->input('page', 1));
    return ListeUser::collection($users);
}

//liste des clients 
public function listeClient(Request $request)
{
    $users = User::role('client')->paginate($request->input('per-page', 10), page : $request->input('page', 1));
    return ListeUser::collection($users);
}

//liste  les artisans
public function listeArtisan(Request $request)
{
    $users = User::role('artisan')->paginate($request->input('per-page', 10), page : $request->input('page', 1));
    return ListeUser::collection($users);
}

public function getUser($id)
{
    $user = User::find($id);
    if(!$user){
        throw new NotFoundResourceException(__('message.show_account_notFound'), 404);
    }
    return response()->json(new ClientResource($user),200);
}

public function getEmeteur($id)
{
    $user = User::find($id);
    if(!$user){
        throw new NotFoundResourceException(__('message.show_account_notFound'), 404);
    }
    return response()->json(new EmeteurResource($user),200);
}

public function show($id)
{
    $user = User::find($id);
    if(!$user){
        throw new NotFoundResourceException(__('message.show_account_notFound'), 404);
    }
    // return response()->json($user,200);
    return response()->json(new DetailsUser($user),200);
}

public function store(Request $request)
{
    $data = $request->validate([
        'fname' => 'required',
        'lname' => 'required',
        'telephone' => 'required|phone:MA',
        'adresse' => 'required',
        'ville' => 'required',
        'profil' => 'nullable',
        'email' => 'required|email|unique:users',
        'password' => 'required',
        'role' => 'required|in:supporteur,admin',
    ]);
    try {
        $user = new User;
        $user->setAttributes(Arr::except($data, ['role']));
        $user->assignRole($data['role']);
        $user->save();
        return response()->json(__('message.account_success'), 201);
    } catch (\Throwable $th) {
        throw new HttpException(400, __('message.error_catch'));
    }
}
//update (supporteur,admin)
public function updateSupp_Ad(Request $request, $id)
{   
    $user = User::find($id);
    if(!$user){
        throw new NotFoundResourceException(__('message.show_account_notFound'), 404);
    }
    $data = $request->validate([
        'fname' => 'required',
        'lname' => 'required',
        'telephone' => 'required|phone:MA',
        'adresse' => 'required',
        'ville' => 'required',
        'profil' => 'nullable',
        'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
        'role' => 'required|in:supporteur,admin',
    ]);
    try {
        $user->fname = $data['fname'];
        $user->lname = $data['lname'];
        $user->telephone = $data['telephone'];
        $user->adresse = $data['adresse'];
        $user->ville = $data['ville'];
        $user->profil = @$data['profil'] ?: $user->profil;
        $user->email = $data['email'];
        
        $user->syncRoles($data['role']);

        $user->save();
        return response()->json(__('message.update_account_success'), 200);
    } catch (\Throwable $th) {
        throw new HttpException(400, __('message.error_catch'));
    }
}
//update (Artisan,client)
public function updateCl_Ar(Request $request, $id)
{   
    $user = User::find($id);
    if(!$user){
        throw new NotFoundResourceException(__('message.show_account_notFound'), 404);
    }
    $data = $request->validate([
        'fname' => 'required',
        'lname' => 'required',
        'telephone' => 'required|phone:MA',
        'adresse' => 'required',
        'ville' => 'required',
        'profil' => 'nullable',
        'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
        // 'category_id' => 'required_if:role,artisan|exists:categories,id',
        //'role' => 'required|in:artisan,client',
    ]);
    try {
        $user->fname = $data['fname'];
        $user->lname = $data['lname'];
        $user->telephone = $data['telephone'];
        $user->adresse = $data['adresse'];
        $user->ville = $data['ville'];
        $user->profil = @$data['profil'] ?: $user->profil;
        $user->email = $data['email'];
        
        //$user->assignRole($data['role']);
        $user->save();
        return response()->json(__('message.update_account_success'), 200);
    } catch (\Throwable $th) {
        throw new HttpException(400, __('message.error_catch'));
    }
}




public function destroy($id)
{
    $user = User::find($id);
    if(!$user){
        throw new NotFoundResourceException(__('message.show_account_notFound'), 404);
    }

    try {
        $user->delete();
    
        return response()->json(null, 204);
        
    } catch (\Throwable $th) {
        throw new HttpException(400, __('message.error_catch'));
    }
   }

}
