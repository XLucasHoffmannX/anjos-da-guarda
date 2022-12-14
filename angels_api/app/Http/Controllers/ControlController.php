<?php

namespace App\Http\Controllers;

use App\Models\Control;
use App\Models\FrequencyControl;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ControlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $controlFilter = Control::query();
        $ordem = 'DESC';

        if (request('term')) {
            $controlFilter->where('description', 'Like', '%' . request('term') . '%');
        }

        if (request('ordem')) {
            $ordem = $request->ordem;
        }

        return response($controlFilter->orderBy('id', $ordem)->paginate(10));
    }

    public function getAll()
    {
        $controls = Control::all();
        return response($controls);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $controlCreated = Control::create($request->only(
            'user_created',
            'patient_id',
            'medicamento',
            'description'
        )
            + ['medicamento_id' => $request->medicamento_id ? $request->medicamento_id : null]
            + ['inventory_qtd' => 1]);

        return response($controlCreated, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $control = Control::find($id);

        if (!$control) {
            return response(["error" => "não econtrado"], Response::HTTP_BAD_REQUEST);
        }

        $frequencys = FrequencyControl::where("control_id", $control->id)->get();
        $control['frequencys'] = $frequencys;

        return response($control, Response::HTTP_ACCEPTED);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
