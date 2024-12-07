<?php

if ( !function_exists('fronturl') ){
    function fronturl($path = '/'){
        return rtrim(config('app.fronturl'), '/') . '/' . ltrim($path, '/');
    }
}

?>