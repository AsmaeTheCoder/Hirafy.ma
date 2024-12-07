<?php

namespace App\Http\Controllers\Api;

use App\Enum\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class Logincontroller extends Controller
{
    public function checkStatus($user) {
        if( call_user_func([$user, 'hasAnyRole'], ['artisan', 'client']) ) {
            return $user->status == UserStatus::Active->value;
        }

        return true;
    }

    public function login(LoginRequest $request)
    {
        $user = User::query()->where('email', $request->email)->first();

        if (!$user) {
            throw new NotFoundResourceException(__('passwords.user'), 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            throw new HttpException(400, __('auth.password'));
        }

        if (!$this->checkStatus($user)) {
            throw new HttpException(400, __('auth.account_not_active'));
        }

        $token = Auth::login($user);
        if ($token) {
            return response()->json($token, 200)->withCookie(cookie('AUTH_TOKEN', $token, 60 * 24 * 30, secure: true, sameSite: 'none'));
        }
        throw new HttpException(400, __('errors.error'));
    }

    public function current()
    {
        $user = auth()->user();

        if (!$this->checkStatus($user)) {
            throw new HttpException(400, __('auth.account_not_active'));
        }
        
        return response()->json(new AuthResource($user));
    }

    // return profil de l'utilisateur connecter
    public function profile()
    {
        $user = auth()->user();
        if (!$user) {
            throw new NotFoundResourceException(__('message.show_account_notFound'), 404);
        }
        return response()->json($user, 200);
    }

    // Gérer profil de l'utilisateur connecter
    public function update(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            throw new NotFoundResourceException(__('message.show_account_notFound'), 404);
        }

        $data = $this->validate($request, [
            'fname' => 'required|string',
            'lname' => 'required|string',
            'telephone' => 'required|phone:MA',
            'adresse' => 'required',
            'ville' => 'required',
            'profil' => 'nullable',
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],

        ]);
        try {
            $user->fname = $data['fname'];
            $user->lname = $data['lname'];
            $user->telephone = $data['telephone'];
            $user->adresse = $data['adresse'];
            $user->ville = $data['ville'];
            $user->profil = @$data['profil'] ?: $user->profil;
            $user->email = $data['email'];

            call_user_func([$user, 'save']);
            return response()->json(__('message.update_account_success'), 200);
        } catch (\Throwable $th) {
            throw new HttpException(400, $th->getMessage());
            // throw new HttpException(400, __('message.error_catch'));

        }
    }

    public function refresh(Request $request) {
        if(!$request->header('authorization')) {
            return response()->json(__('error.none'), 400);
        }

        $name = config('app.name');
        $guard = auth('user');
        $auth = call_user_func([$guard, 'claims'], ['iss' => $name, 'aud' => $name]);
        $token = call_user_func([$auth, 'refresh']);

        $user = auth('user')->user();

        $this->checkStatus($user);

        return response()->json('', 200)->withCookie(cookie('AUTH_TOKEN', $token, 60 * 24 * 30, secure: true, sameSite: 'none'));
    }


    public function logout(Request $request)
    {
        $cookie = cookie()->forget('AUTH_TOKEN');
        if(auth()->check()){
            auth()->logout();
        }   
        return response()->json(__('auth.logout'))->withCookie($cookie);         
    }

    
}
