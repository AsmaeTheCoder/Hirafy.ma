<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'lname' => $this->lname,
            'fname' => $this->fname,
            'email' => $this->email,
            'telephone' => $this->telephone,
            'profil' => $this->profil,
            'ville' => $this->ville,
            'Adresse' => $this->adresse,
            'category' => $this?->category?->libelle,
            'images' => $this->galleries
            // 'images' => GalleryResource::collection($this->whenLoaded('galleries'))
        ];
    }
}
