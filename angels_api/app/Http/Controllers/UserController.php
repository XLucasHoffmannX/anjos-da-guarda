<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userFilter = User::query();
        $ordem = 'DESC';

        if (request('term')) {
            $userFilter->where('name', 'Like', '%' . request('term') . '%');
        }

        if (request('ordem')) {
            $ordem = $request->ordem;
        }

        return response($userFilter->orderBy('id', $ordem)->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::create($request->only('name', 'email', 'description', 'cpf', 'description', 'image')
            + ["password" => Hash::make($request->password)] + ["role_id" => 3]);

        return response($user, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $userFind = User::find($id);

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
        $user = User::find($id);

        $user->update($request->only('name', 'email', 'description', 'cpf', 'description', 'image', 'role_id'));

        return response($user, Response::HTTP_ACCEPTED);
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
