<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;

class UserController extends Controller
{


    public function me()
    {
        $data = [
            'user' => $this->toArray(auth()->user())
        ];

        return ResponseBuilder::success($data);
    }

    /**
     * Transform the resource into an array.
     *
     * @param User $user
     * @return array
     */
    public function toArray(User $user)
    {
        return [
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
