<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use File;

class ArchiveController extends Controller
{
    public function imageUpload(Request $request)
    {
        if ($request->hasFile('imageFile') && $request->file('imageFile')->isValid()) {
            $name = Str::random(10) . "-" . date('Ymd');

            $extension = $request->imageFile->extension();


            if ($extension == 'png' || $extension == 'jpg') {
                $nameFile = "{$name}.{$extension}";

                $upload = $request->imageFile->storeAs('/public/images', $nameFile);

                if ($upload) {
                    return response()->json([
                        "url" => env("APP_URL") . Storage::url($upload),
                        "name" => $nameFile
                    ], Response::HTTP_ACCEPTED);
                }

                return response()->json(["msg" => "Falha no upload"], Response::HTTP_BAD_REQUEST);
            }

            return response()->json(["msg" => "Deve ser do tipo .png ou .jpg"], Response::HTTP_BAD_REQUEST);
        }
    }

    public function imageDelete(Request $request)
    {
        $nameFile = $request->nameFile;

        if ($nameFile) {
            $deleted = Storage::disk('public')->delete('images/' . $nameFile);

            if ($deleted) {
                return response(null, Response::HTTP_ACCEPTED);
            }

            return response()->json(["msg" => "Não foi possivel"], Response::HTTP_BAD_REQUEST);
        }

        return response()->json(["msg" => "Nome do arquivo não deve ser vazio!"], Response::HTTP_BAD_REQUEST);
    }
}
