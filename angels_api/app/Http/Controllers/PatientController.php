<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $patientFilter = Patient::query();
        $ordem = 'DESC';

        if (request('term')) {
            $patientFilter->where('name', 'Like', '%' . request('term') . '%');
        }

        if (request('ordem')) {
            $ordem = $request->ordem;
        }

        return response($patientFilter->orderBy('id', $ordem)->paginate(10));
    }

    public function getAll()
    {
        $patients = Patient::all();

        return response($patients, Response::HTTP_ACCEPTED);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $patientFind = Patient::find($id);

        return response($patientFind);
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
        try {
            /* error model, query builder ok */
            DB::table('patients')->where('id', $id)->delete();

            return response(null, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }
}
