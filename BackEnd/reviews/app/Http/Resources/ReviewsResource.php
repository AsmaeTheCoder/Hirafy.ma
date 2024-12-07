<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'artisan_id' => $this->artisan_id,
            'Contenu' => $this->Contenu,
            'etoile' => $this->etoile,
            'created_at' => $this->created_at->format('d/m/Y'),
            'client_id' => $this->client_id,
            'client' => $this->getClient(),
            'artisan' => $this->getArtisan(),
        ];
    }
}
