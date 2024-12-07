<x-mail::message>
{{ __('message.salut') }} {{ $fname }} {{$lname}},

{{ __('message.body') }}

<x-mail::button :url="$url">
{{ __('message.button') }}
</x-mail::button>

{{ __('message.cordialement') }}<br>
Hirafy.ma 
</x-mail::message>