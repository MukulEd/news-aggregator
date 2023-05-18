<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Api;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;

class AuthorController extends Controller
{

    public function getAllAuthors()
    {
        $api = new Api;
        $authors = $api->getAllAuthors();

        $data = ['authors' => $authors];
        return ResponseBuilder::asSuccess()->withData($data)->build();
    }
}
