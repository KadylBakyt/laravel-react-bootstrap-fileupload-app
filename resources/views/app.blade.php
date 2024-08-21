<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>
        <link href="https://unpkg.com/filepond@^4/dist/filepond.css" rel="stylesheet" />
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body>
        @inertia
        <script src="https://unpkg.com/filepond@^4/dist/filepond.js"></script>
    </body>
</html>
