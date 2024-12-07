<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;



class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
   
    public function register(): void
        {
    
            $this->renderable(function (RepoException $e, Request $request) {
                return response()->json($e->errors(), $e->getStatusCode(), $e->getHeaders());
            });
    
            $this->renderable(function (HttpException $e, Request $request) {
                return response()->json($e->getMessage(), $e->getStatusCode(), $e->getHeaders());
            });
    
            $this->renderable(function (ValidationException $e, Request $request) {
                return response()->json($e->errors(), $e->status, []);
            });
    
            $this->renderable(function (AuthenticationException $e, Request $request) {
                return response()->json($e->getMessage(), 401, []);
            });
    
            $this->renderable(function (Exception $e, Request $request) {
                return response()->json($e->getMessage(), 500, []);
            });
        }
}
