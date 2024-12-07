<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class Rating extends Model
{
    use HasFactory;
    protected $fillable = ['client_id','artisan_id','Contenu','etoile'];

    function getClient() {
        $http = Http::accept('application/json')->baseUrl(config('app.account_url'))->get('/accounts/get/'. $this->client_id);

        if( $http->status() == 200 ) {
            return $http->json();
        } else {
            return null;
        }
    }

    function getArtisan() {
        $http = Http::accept('application/json')->baseUrl(config('app.account_url'))->get('/accounts/get/'. $this->artisan_id);

        if( $http->status() == 200 ) {
            return $http->json();
        } else {
            return null;
        }
    }

    public function scopeEtoile($query, $etoile){
        if ($etoile) {
            return $query->where('etoile', $etoile);
        }
        return $query;
    }
}
