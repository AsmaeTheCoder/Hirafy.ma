<?php

namespace App\Http\Controllers\Api;

use App\Enum\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class Registercontroller extends Controller
{
    // Inscription
    public function register(RegisterRequest $request) {
        $token = uniqid(uniqid());
        //register user
        $user = new User;
        $user->setAttributes([ 
            'fname'      => $request->fname,
            'lname'      => $request->lname,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'ville' => $request->ville,
            // 'profil' => $request->profil, 
            'email'     => $request->email,
            'password'  => $request->password,
            'category_id' => $request->category_id,
            'confirmation_token' => $token,
            'confirmation_at' => now('UTC')->addMinute(60)->toString(),
        ]);
        $user->status = UserStatus::Pending->value;
        $user->syncRoles($request->input('role'));

        $response = Http::post(rtrim(config('app.email_url'), '/').'/verifyAccount', [
            'fname' => $user->fname,
            'lname' => $user->lname,
            'email' => $user->email,
            'token' => $user->confirmation_token,
            'locale' => app()->getLocale()
        ]);

        try {
            $user->save();
            return response()->json(__('auth.user_created'), 201);
        } catch (\Throwable $th) {
            throw new HttpException(400, __('message.error_catch'));
        }
    }

    function verify(Request $request){
        $token = $request->input('token');
        $validator = Validator::make($request->only('token'),[
            'token'=>'required_without:email|string'
        ]);

        $validator->validate();

        $user = User::whereMeta('confirmation_token', $token)->first();
        
        if( !$user ) {
            throw new NotFoundResourceException(__('auth.user_not_found'), 404);
        } else if(now('UTC')->greaterThan($user->confirmation_at) ) {
            throw new HttpException(400, __('errors.token_expired'));
        }

        $user->status = UserStatus::Active->value;
        $user->unSetMeta('confirmation_at');
        $user->unSetMeta('confirmation_token');

        if(!$user->save()){
            throw new HttpException(400, __('errors.none'));         
        }
        
        return response()->json(__('auth.your_account_verified'), 200);
    }

   // Forget password
    public function generateToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
        $user = User::where('email', $request->email)->first();

        if( !$user ) {
            throw new NotFoundResourceException(__('auth.user_not_found'), 404);
        }

        $token = uniqid(uniqid());
        $user->reset_token = $token;
        $user->reset_at = now('UTC') ->addMinute(60)->toString();
        
        try {
            call_user_func([$user,'save']);

            $response = Http::post( rtrim(config('app.email_url'), '/').'/forgotPassword', [
                'fname' => $user->fname,
                'lname' => $user->lname,
                'email' => $user->email,
                'token' => $user->reset_token,
                'locale' => app()->getLocale()
            ]);

            return response()->json($token,200);
        } catch (\Throwable $th) {
            throw new HttpException(400, __('message.error_catch'));
        }
    }

    public function verifyToken(Request $request)
    {
        $token = $request->input('token');
        $validator = validator::make($request->only('token'),[
            'token' => 'required|string'
        ]);
        $validator->validate();
        $user = User::whereMeta('reset_token',$token)->first();
        if(!$user){
            throw new NotFoundResourceException(__('auth.user_not_found'),404 );
        }else if ( now('UTC') ->greaterThan($user->reset_at)){
            throw new HttpException(400, __('errors.token_expired'));
        }
        return response()->json(__('success'),200);
    }  

    public function forgotpassword(Request $request)
    {   
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:6',
            'confirm_password' => 'required|same:password',
            'token' => 'required'
        ]);

        $user = User::whereMeta('reset_token', $request->token)->first();
        if( !$user ) {
            throw new NotFoundResourceException(__('auth.user_not_found'),404 );

        } 
        $data = $validator->validate();
        try {
            $user->password = $data['password'];
            $user->unSetMeta('reset_token');
            $user->unSetMeta('reset_at');
            call_user_func([$user,'save']);   //comme save
            return response()->json(__('auth.password_has_been_updated'));
        } catch (\Exception $ex) {
            throw new HttpException(400, $ex->getMessage());
        }  
    }
      
    //Reset password
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password'
        ]);
        $data = $validator->validate();
        try {
            $user = auth()->user();
            if(!Hash::check($data['old_password'], $user->password)) {
                throw new HttpException(400, __('auth.password_incorrect'));
            }
            if(Hash::check($data['new_password'], $user->password)) {
                throw new HttpException(400, __('auth.password_must_be_diffrent_from_old_password'));
            } else {
                $user->password = $data['new_password'];
                call_user_func([$user, 'save']);
                return response()->json(__('passwords.reset'));
            }
        } catch (\Exception $ex) {
            throw new HttpException(400, $ex->getMessage());
        }
    }  
}


