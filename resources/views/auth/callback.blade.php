<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name') }} | Third Party Authorization </title>
    </head>
    <body>
        <script>
          parent.postMessage({
            tokens: @json($auth),
            user: @json($user)
          }, "{{ config('app.url') }}");
        </script>
    </body>
</html>
