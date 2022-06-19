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
     * Método que retorna toda a informação do usuário logado
     * GET /api/auth/user
    */
    public function authUser()
    {
        $user = Auth::user();

        return $user;
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
     * Método para autorização de usuario e client oauth2
     * POST /api/auth/login
     *
     * @param Request $request
    */
    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            $token = $user->createToken('access')->accessToken;

            $cookie = cookie('jwt', $token, 3600);

            return response([
                'access' => $token
            ])->withCookie($cookie);
        }

        return response([
            'error' => 'Invalid credentials provided'
        ], Response::HTTP_UNAUTHORIZED);
    }
}
