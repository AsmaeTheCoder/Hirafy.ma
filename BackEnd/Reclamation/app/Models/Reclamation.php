<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class Reclamation extends Model
{
    use HasFactory;

    protected $fillable = ['sujet', 'description', 'statut', 'utilisateur_id'];

    function getEmeteur() {
        $http = Http::accept('application/json')->baseUrl(config('app.account_url'))->get('/accounts/getEmeteur/'. $this->utilisateur_id);

        if( $http->status() == 200 ) {
            return $http->json();
        } else {
            return null;
        }
    }

}
