<?php

namespace App\Http\Controllers;

use App\Mail\ContactUS;
use App\Mail\ForgotPassword;
use App\Mail\VerifyAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function verifyAccount(Request $request){
        $fname=$request->fname;
        $lname=$request->lname;
        $email=$request->email;
        $token=$request->token;
        $locale=$request->input('locale', 'fr');
        Mail::to($email)->locale($locale)->queue(new VerifyAccount($fname, $lname, $email, $token));
        return response()->json(null, 204);
    }

    public function forgotPassword(Request $request){
        $fname=$request->fname;
        $lname=$request->lname;
        $email=$request->email;
        $token=$request->token;
        $locale=$request->input('locale', 'fr');
        Mail::to($email)->locale($locale)->queue(new ForgotPassword($fname, $lname, $email, $token));
        return response()->json(null, 204);
    }

    public function contactUS(Request $request){
        $emailA=config('app.admin_email');
        $fname=$request->fname;
        $lname=$request->lname;
        $email=$request->email;
        $telephone=$request->telephone;
        $description=$request->description;
        $locale=$request->input('locale', 'fr');
        Mail::to($emailA)->locale($locale)->queue(new ContactUS($fname, $lname, $email, $telephone, $description));
        return response()->json(null, 204);
    }
}
