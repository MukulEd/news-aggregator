<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;

class UserCategoryController extends Controller
{



    public function store(Request $request)
    {
        $rules = [
            'category_id' => 'required|string',
            'category_name' => 'required|string',
        ];

        $v = Validator::make($request->all(), $rules);
        if ($v->fails()) return ResponseBuilder::error(422, [], $v->errors()->messages());

        $user = Auth::guard()->user();
        if (!$user) {
            return ResponseBuilder::asError(404)->withMessage('user_not_found')->build();
        }

        $inputs = $request->all();
        $inputs['user_id'] = $user->id;
        $userCategory = new UserCategory($inputs);

        if ($userCategory->save()) {
            return ResponseBuilder::success($userCategory->toArray());
        }
        return ResponseBuilder::error(422, [], $v->errors()->messages());
    }


    public function destroy($id)
    {
        $userCategory = UserCategory::find($id);
        if (!$userCategory) return ResponseBuilder::asError(404)->withMessage('userCategory not found')->build();

        $userCategory->delete();

        return ResponseBuilder::success();
    }
}
