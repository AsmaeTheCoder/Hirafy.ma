<x-mail::message>
    {{ __('message.message1') }}

    {{ __('message.message2') }}
    
    {{ __('message.message3') }}

<x-mail::button :url="$url">
    {{ __('message.button1') }}
</x-mail::button>
{{ __('message.message4') }}<br><br>
{{ __('message.cordialement') }}<br><br>
Hirafy.ma 
</x-mail::message>
