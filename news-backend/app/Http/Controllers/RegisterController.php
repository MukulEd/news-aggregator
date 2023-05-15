<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;

class RegisterController extends Controller
{

    public function register(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8'
        ];

        $v = Validator::make($request->all(), $rules);
        if ($v->fails()) {
            return ResponseBuilder::error(422, [], $v->errors()->messages(), 422);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = new User($input);
        $user->save();
        if (!$user->save()) {
            return ResponseBuilder::asSuccess()->withHttpCode(500)->build();
        }


        $token = auth()->login($user);
        return ResponseBuilder::asSuccess()->withData([
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60
        ])->withHttpCode(201)->build();
    }
}
