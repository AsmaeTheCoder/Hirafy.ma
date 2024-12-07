<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReclamationResource extends JsonResource
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
            'sujet' => $this->sujet,
            'description' => $this->description,
            'statut' => $this->statut,
            'created_at' => $this->created_at->format('d/m/Y'),
            'emeteur' => $this->getEmeteur()
        ];
    }
}
