<?php

namespace App\Http\Controllers;

use App\Models\Medicamento;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class MedicamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $medicamentoFilter = Medicamento::query();
        $ordem = 'DESC';

        if (request('term')) {
            $medicamentoFilter->where('name', 'Like', '%' . request('term') . '%');
        }

        if (request('ordem')) {
            $ordem = $request->ordem;
        }

        return response($medicamentoFilter->orderBy('id', $ordem)->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $medicamento = Medicamento::create($request->only('name', 'user_created', 'patient_owner', 'qtd_amount'));

        return response($medicamento, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $userFind = Medicamento::find($id);

        return response($userFind);
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
        $medicamento = Medicamento::find($id);

        $medicamento->update($request->only('name', 'user_created', 'patient_owner', 'qtd_amount'));

        return response($medicamento, Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            /* error model, query builder ok */
            DB::table('users')->where('id', $id)->delete();

            return response(null, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }
}
