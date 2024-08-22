<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use App\Models\File;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Response;
use Illuminate\Http\File as HttpFile;

class FileController extends Controller
{

    public function index(Request $request)
    {
        $query = File::query();

        if ($request->has('fileName')) {
            $query->where('original_name', 'like', '%' . $request->input('fileName') . '%');
        }

        $items = $query->orderBy('id', 'desc')->paginate(50)->withQueryString();

        $queryString = http_build_query($request);
        Session::flash('message', ['error' => 'File uploaded and stored to DB successfully!']);
        return Inertia::render('Files/List', [
            'files' => $items,
            'query' => $queryString
        ]);
    }

    public function upload(Request $request)
    {
        $validatedData = $request->validate([
            'file' => 'required|file|mimes:jpg,png,jpeg|max:1024',
        ]);

        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $fileOrgName = $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName, 'public');

        $fileData = [
            'name' => $fileName,
            'original_name' => $file->getClientOriginalName(),
            'path' => $filePath,
            'size' => $file->getSize(),
            'mime_type' => $file->getClientMimeType()
        ];

        $createNewFile = File::create($fileData);

        if($createNewFile){
            Session::flash('success', "Файл $fileOrgName успешно загружен и сохранен в БД!");
            sleep(1);
            return Inertia::render('Files/List');
        }else{
            Session::flash('error', 'Невозможно сохранить в БД. Пожалуйста, попробуйте еще раз!');
            return response()->json(['success' => false, 'message' => 'Невозможно сохранить в БД. Пожалуйста, попробуйте еще раз!']);
        }
    }

    public function download(string $filename)
    {
        $filePath = public_path('storage/uploads/'.$filename);
        $file = new HttpFile($filePath);
        return \Response::download($filePath, $filename, ['Content-Type' => $file->getMimeType()]);
    }

    public function delete($id)
    {
        $file = File::findOrFail($id);
        $file_name = $file->original_name;
        $filePath = public_path('storage/'.$file->path);
        if(file_exists($filePath)) {
            unlink($filePath);
        }
        $file->delete();

        Session::flash('success', "Файл $file_name успешно удален из сервера и из БД!");
        return response()->json(['success' => true]);
    }
}
