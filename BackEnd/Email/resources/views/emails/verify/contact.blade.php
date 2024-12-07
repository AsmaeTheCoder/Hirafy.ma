<x-mail::message>

{{ __('message.name') }} {{ $fname }} {{ $lname }}<br>
{{ __('message.email') }} {{ $email }}<br>
{{ __('message.telephone') }} {{ $telephone }}<br>
{{ __('message.message') }} {{ $description }}<br>

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

{{ __('message.cordialement') }}<br>
Hirafy.com
</x-mail::message>
