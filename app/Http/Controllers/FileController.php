<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $validatedData = $request->validate([
            'file' => 'required|file|mimes:jpg,png,jpeg|max:8096',
        ]);

        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $fileName);

        return response()->json(['success' => true, 'message' => 'File uploaded successfully']);
    }
}
