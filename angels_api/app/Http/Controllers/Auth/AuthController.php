<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    /**
     * Realiza autenticação
     * POST /api/auth
     *
     * @param Request $request
     * @return Response
     */
    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            $token = $user->createToken('access')->accessToken;

            $cookie = cookie('jwt', $token, 3600);

            return response([
                'token' => $token,
            ])->withCookie($cookie);
        }

        return response([
            'error' => 'Invalid Credentials!',
        ], Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Método de tirar a autorização do cliente e do usuário
     * GET /api/auth/logout
    */
    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'success'
        ])->withCookie($cookie);
    }

    /**
     * Método que retorna toda a informação do usuário logado
     * GET /api/auth/user
    */
    public function authUser()
    {
        $user = Auth::user();

        return $user;
    }
}
