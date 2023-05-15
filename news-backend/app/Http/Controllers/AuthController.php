<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \MarcinOrlowski\ResponseBuilder\ResponseBuilder
     */
    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required'
        ];

        $validate = Validator::make($request->all(), $rules);
        if ($validate->fails()) {
            return ResponseBuilder::error(422, [], $validate->errors()->messages());
        }

        $credentials = $request->only(['email', 'password']);

        try {
            $token = Auth::guard()->attempt($credentials);

            if (!$token) {
                return ResponseBuilder::error(403);
            }
        } catch (JWTException $e) {
            return ResponseBuilder::error(500);
        }

        return ResponseBuilder::asSuccess()->withData([
            'token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60
        ])->withHttpCode(200)->build();
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return ResponseBuilder::success(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $token = auth()->refresh();
        } catch (JWTException $e) {
            return ResponseBuilder::error(500);
        }

        $data = [
            'token' => $token,
            'expires_in' => Auth::guard()->factory()->getTTL() * 60
        ];

        return ResponseBuilder::success($data);
    }
}
