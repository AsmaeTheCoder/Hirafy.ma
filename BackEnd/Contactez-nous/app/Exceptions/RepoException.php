<?php

namespace App\Exceptions;
use Symfony\Component\HttpKernel\Exception\HttpException;

class RepoException extends HttpException{
    public array $errors = [];

    public function __construct(int $statusCode, string | array $message = '', \Throwable $previous = null, array $headers = [], int $code = 0){
        if( is_array( $message ) ) {
            $this->errors = $message;
            $message = array_values($message)[0];
        }

        parent::__construct($statusCode, $message = '', $previous, $headers, $code);
    }

    public function errors(){
        return $this->errors;
    }
}