<?php

namespace App\Http\Controllers;

use App\Models\Cruds;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Faker\Generator;

class CrudsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function read()
    {
        $crud = new Cruds();
        return response()->json($crud->paginate(5));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Generator $faker)
    {
        $crud = new Cruds();
        $crud->color = $faker->boolean ? 'red' : 'green';
        $crud->name = $faker->lexify('????????');
        $crud->save();

        return response($crud->paginate(5)->jsonSerialize(), Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cruds  $cruds
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $crud = Cruds::find($id);
        $crud->color = $request->color;
        $crud->save();

        return response(null, Response::HTTP_OK);
    }

    public function updateName(Request $request, $id) {
        $crud = Cruds::find($id);
        $crud->name = $request->name;
        $crud->save();

        return response(Cruds::paginate(5)->jsonSerialize(), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cruds  $cruds
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $crud = Cruds::find($id);
        $crud->delete();

        return response(Cruds::paginate(5)->jsonSerialize(), Response::HTTP_OK);
    }
}
