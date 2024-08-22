<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use App\Models\File;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Session;

class FileController extends Controller
{

    public function index(Request $request)
    {
        $query = File::query();

        if ($request->has('fileName')) {
            $query->where('original_name', 'like', '%' . $request->input('fileName') . '%');
        }

        $items = $query->paginate(10)->withQueryString();

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
            Session::flash('success', 'File uploaded and stored to DB successfully!');
            sleep(2);
            return Inertia::render('Files/List');
        }else{
            Session::flash('error', 'Unable to store in DB. Please try again!');
            return response()->json(['success' => false, 'message' => 'Unable to store in DB. Please try again']);
        }

    }
}
