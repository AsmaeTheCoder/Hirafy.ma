<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class GateMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$abilities): Response
    {
        $token = $request->header('Authorization', null);
        if (!$token) {
            throw new  AuthenticationException(
                'Unauthenticated.'
            );
        }
        $response = Http::withHeader('Authorization', "$token")->acceptJson()->baseUrl(config('app.account_url'))
            ->get('/auth/current');
        if ($response->status() == 200) {
            $data = $response->json();
            $request->merge(['user' => $data]);
            $request->setUserResolver(function() use ($data) {
                return (object) $data;
            });
            $gates = (array) $data['gates'];
            $op = 'AND';
            if (count($abilities) == 1) {
                $permissions = explode('|', $abilities[0]);
                $op = 'OR';
            } else {
                $permissions = $abilities;
            }
            $can = true;
            foreach ($permissions as $permi) {
                if ($op == 'OR') {
                    if (in_array($permi, $gates)) {
                        $can = true;
                        break;
                    } else {
                        $can = false;
                    }
                } else {
                    $can = in_array($permi, $gates) && $can;
                }
            }
            if (!$can) {
                return response()->json('access denied 1', 403);
            }
        } else {
            return response()->json($response->body(), $response->status());
        }
        return $next($request);
    }
}
