<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserAuthor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;

class UserAuthorController extends Controller
{

    public function store(Request $request)
    {
        $rules = [
            'author_id' => 'required|string',
            'author_name' => 'required|string',
        ];

        $v = Validator::make($request->all(), $rules);
        if ($v->fails()) return ResponseBuilder::error(422, [], $v->errors()->messages());

        $user = Auth::guard()->user();
        if (!$user) {
            return ResponseBuilder::asError(404)->withMessage('user_not_found')->build();
        }

        $inputs = $request->all();
        $inputs['user_id'] = $user->id;
        $userAuthor = new UserAuthor($inputs);

        if ($userAuthor->save()) {
            return ResponseBuilder::success($userAuthor->toArray());
        }
        return ResponseBuilder::error(422, [], $v->errors()->messages());
    }

    public function destroy($id)
    {
        $userAuthor = UserAuthor::find($id);
        if (!$userAuthor) return ResponseBuilder::asError(404)->withMessage('$userAuthor not found')->build();

        $userAuthor->delete();

        return ResponseBuilder::success();
    }
}
