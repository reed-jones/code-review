<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name') }}</title>
        <script src="{{ mix('js/main.js') }}" async defer></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
