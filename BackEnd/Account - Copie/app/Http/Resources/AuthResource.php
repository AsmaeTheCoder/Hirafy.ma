<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'fname' => $this->fname,
            'lname' => $this->lname,
            'email' => $this->email,
            'telephone' => $this->telephone,
            'profil' => $this->profil,
            'role' => $this->getRoleNames()->get(0),
            'gates' => $this?->getAllPermissions()?->pluck('name'),
        ];
    }
}
