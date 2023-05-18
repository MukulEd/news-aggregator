<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\CategoryRepository;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getAllCategories(Request $request)
    {
        $categories = CategoryRepository::getCategories();
        $data = ['categories' => $categories];

        return ResponseBuilder::asSuccess()->withData($data)->build();
    }
}
