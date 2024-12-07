<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;
    protected $fillable = [
        // 'id',
        // 'name',
        // 'description',
        'image_path',
        'artisan_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
