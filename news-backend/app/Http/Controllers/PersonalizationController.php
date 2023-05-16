<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAuthors;
use App\Models\UserCategory;
use App\Models\UserSources;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;

class PersonalizationController extends Controller
{
    public function getUserPreferences(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return ResponseBuilder::asError(404)->withMessage('user not found')->withHttpCode(404)->build();
        }

        $data = [];
        $userAuthor = UserAuthors::orderBy('created_at', 'desc')->where([
            ['user_id', $user->id],
        ])->selectRaw('author_id as reference , author_name as name');

        $data['authors'] = $userAuthor->get()->toArray();


        $userSource = UserSources::orderBy('created_at', 'desc')->where([
            ['user_id', $user->id],
        ])->selectRaw('source_id as reference , source_name as name');

        $data['sources'] = $userSource->get()->toArray();


        $userCategory = UserCategory::orderBy('created_at', 'desc')->where([
            ['user_id', $user->id],
        ])->selectRaw('category_id as reference , category_name as name');

        $data['categories'] = $userCategory->get()->toArray();



        return ResponseBuilder::asSuccess(200)->withData($data)->withHttpCode(200)->build();
    }

    public function updatePreferences(Request $request)
    {

        $data = $request->all();
        if (!isset($data['sources']) || !isset($data['categories']) || !isset($data['authors'])) {
            return ResponseBuilder::error(422, [], 'Invalid Data Provided', 400);
        }


        $user = Auth::guard()->user();
        if (!$user) {
            return ResponseBuilder::asError(404)->withMessage('user not found')->withHttpCode(404)->build();
        }

        auth()->user()->authors()->delete();
        auth()->user()->sources()->delete();
        auth()->user()->categories()->delete();


        if (count($data['authors']) > 0) {
            $newData = $this->sanitizeData($data['authors'], 'author');
            UserAuthors::insert($newData);
        }
        if (count($data['sources']) > 0) {
            $newData = $this->sanitizeData($data['sources'], 'source');
            UserSources::insert($newData);
        }
        if (count($data['categories']) > 0) {

            $newData = $this->sanitizeData($data['categories'], 'category');

            UserCategory::insert($newData);
        }

        return ResponseBuilder::asSuccess(200)->withData(['message' => 'Updated'])->withHttpCode(200)->build();
    }

    private function sanitizeData($data, $prefix)
    {

        // info($data, ['santize']);
        if (count($data) == 0) return [];
        $newData = [];
        foreach ($data as $dp) {
            $newData[] = [$prefix . "_id" => $dp['value'], $prefix . '_name' => $dp['label'], 'user_id' => auth()->user()->id];
        }
        // info($newData);
        return $newData;
    }
}
