<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Le champ: Attribut doit être accepté.',
    'accepted_if' => 'Le champ: Attribut doit être accepté lorsque: l\'autre est: valeur.',
    'active_url' => 'Le champ: Attribut doit être une URL valide.',
    'after' => 'Le champ: Attribut doit être une date après: date.',
    'after_or_equal' => 'Le champ: Attribut doit être une date après ou égale à: Date.',
    'alpha' => 'Le champ: Attribut ne doit contenir que des lettres.',
    'alpha_dash' => 'Le champ: Attribut ne doit contenir que des lettres, des chiffres, des tirets et des soulignements.',
    'alpha_num' => 'Le champ: Attribut ne doit contenir que des lettres et des numéros.',
    'array' => 'Le champ: Attribut doit être un tableau.',
    'ascii' => 'Le champ: Attribut ne doit contenir que des caractères et des symboles alphanumériques à un octet.',
    'before' => 'Le champ: Attribut doit être une date avant: Date.',
    'before_or_equal' => 'Le champ: Attribut doit être une date avant ou égale à: Date.',
    'between' => [
        'array' => 'Le champ d\'attribut doit avoir entre: min et: éléments max.',
        'file' => 'Le champ: Attribut doit être entre: min et: kiloBytes max.',
        'numeric' => 'Le champ: Attribut doit être entre: min et: max.',
        'string' => 'Le champ: Attribut doit être entre: min et: caractères max.',
    ],
    'boolean' => 'Le champ: Attribut doit être vrai ou faux.',
    'can' => 'Le champ: Attribut contient une valeur non autorisée.',
    'confirmed' => 'La confirmation du champ d\'attribut ne correspond pas.',
    'current_password' => 'Le mot de passe est incorrect.',
    'date' => 'Le champ: Attribut doit être une date valide.',
    'date_equals' => 'Le champ: Attribut doit être une date égale à: Date.',
    'date_format' => 'Le champ: Attribut doit correspondre au format: format.',
    'decimal' => 'Le champ d\'attribut doit avoir: décimal décimal.',
    'declined' => 'Le champ: Attribut doit être refusé.',
    'declined_if' => 'Le champ: Attribut doit être refusé lorsque: l\'autre est: valeur.',
    'different' => 'Le champ: Attribut et: Autre doit être différent.',
    'digits' => 'Le champ: Attribut doit être: chiffres des chiffres.',
    'digits_between' => 'Le champ d\'attribut doit être entre: min et: chiffres max.',
    'dimensions' => 'Le champ: Attribut a des dimensions d\'image non valides.',
    'distinct' => 'Le champ: Attribut a une valeur en double.',
    'doesnt_end_with' => 'Le champ: Attribut ne doit pas se terminer par l\'un des éléments suivants :: Valeurs.',
    'doesnt_start_with' => 'Le champ: Attribut ne doit pas commencer par l\'un des éléments suivants:: Valeurs.',
    'email' => 'Le champ: Attribut doit être une adresse e-mail valide.',
    'ends_with' => 'Le champ: Attribut doit se terminer par l\'un des éléments suivants :: Valeurs.',
    'enum' => 'L\'attribut sélectionné n\'est pas valide.',
    'exists' => 'L\'attribut sélectionné n\'est pas valide.',
    'file' => 'Le champ: Attribut doit être un fichier.',
    'filled' => 'Le champ: Attribut doit avoir une valeur.',
    'gt' => [
        'array' => 'Le champ: Attribut doit avoir plus que: les éléments de valeur.',
        'file' => 'Le champ: Attribut doit être supérieur à: Kilobytes de valeur.',
        'numeric' => 'Le champ: Attribut doit être supérieur à: valeur.',
        'string' => 'Le champ: Attribut doit être supérieur aux caractères de valeur.',
    ],
    'gte' => [
        'array' => 'Le champ: Attribut doit avoir: des éléments de valeur ou plus.',
        'file' => 'Le champ: Attribut doit être supérieur ou égal à: KiloBytes de valeur.',
        'numeric' => 'Le champ: Attribut doit être supérieur ou égal à: valeur.',
        'string' => 'Le champ: Attribut doit être supérieur ou égal à: les caractères de valeur.',
    ],
    'image' => 'Le champ: Attribut doit être une image.',
    'in' => 'L\'attribut sélectionné n\'est pas valide.',
    'in_array' => 'Le champ: Attribut doit exister dans: Autre.',
    'integer' => 'Le champ: Attribut doit être un entier.',
    'ip' => 'Le champ: Attribut doit être une adresse IP valide.',
    'ipv4' => 'Le champ: Attribut doit être une adresse IPv4 valide.',
    'ipv6' => 'Le champ: Attribut doit être une adresse IPv6 valide.',
    'json' => 'Le champ: Attribut doit être une chaîne JSON valide.',
    'lowercase' => 'Le champ: Attribut doit être minuscule.',
    'lt' => [
        'array' => 'Le champ: Attribut doit avoir moins de: éléments de valeur.',
        'file' => 'Le champ: Attribut doit être inférieur à: Kilobytes de valeur.',
        'numeric' => 'Le champ: Attribut doit être inférieur à: Valeur.',
        'string' => 'Le champ: Attribut doit être inférieur à: les caractères de valeur.',
    ],
    'lte' => [
        'array' => 'Le champ: Attribut ne doit pas avoir plus que: les éléments de valeur.',
        'file' => 'Le champ: Attribut doit être inférieur ou égal à: Valeur kilobytes.',
        'numeric' => 'Le champ: Attribut doit être inférieur ou égal à: valeur.',
        'string' => 'Le champ: Attribut doit être inférieur ou égal à: les caractères de valeur.',
    ],
    'mac_address' => 'Le champ: Attribut doit être une adresse MAC valide.',
    'max' => [
        'array' => 'Le champ: Attribut ne doit pas avoir plus que: les éléments max.',
        'file' => 'Le champ: Attribut ne doit pas être supérieur à: Max Kilobytes.',
        'numeric' => 'Le champ: Attribut ne doit pas être supérieur à: Max.',
        'string' => 'Le champ: Attribut ne doit pas être plus grand que: les caractères maximaux.',
    ],
    'max_digits' => 'Le champ: Attribut ne doit pas avoir plus de: chiffres maximaux.',
    'mimes' => 'Le champ: Attribut doit être un fichier de type :: valeurs.',
    'mimetypes' => 'Le champ: Attribut doit être un fichier de type :: valeurs.',
    'min' => [
        'array' => 'Le champ: Attribut doit avoir au moins: les éléments min.',
        'file' => 'Le champ d\'attribut doit être au moins: kilobytes min.',
        'numeric' => 'Le champ: Attribut doit être au moins: min.',
        'string' => 'Le champ: Attribut doit être au moins: les caractères min.',
    ],
    'min_digits' => 'Le champ: Attribut doit avoir au moins: des chiffres min.',
    'missing' => 'Le champ: Attribut doit être manqué.',
    'missing_if' => 'Le champ: Attribut doit être manquant lorsque: l\'autre est: valeur.',
    'missing_unless' => 'Le champ: Attribut doit être manquant à moins que: l\'autre est: valeur.',
    'missing_with' => 'Le champ: Attribut doit être manquant lorsque: des valeurs sont présentes.',
    'missing_with_all' => 'Le champ: Attribut doit être manquant lorsque: des valeurs sont présentes.',
    'multiple_of' => 'Le champ: Attribut doit être un multiple de: valeur.',
    'not_in' => 'L\'attribut sélectionné n\'est pas valide.',
    'not_regex' => 'Le format de champ d\'attribut n\'est pas valide.',
    'numeric' => 'Le champ: Attribut doit être un nombre.',
    'password' => [
        'letters' => 'Le champ: Attribut doit contenir au moins une lettre.',
        'mixed' => 'Le champ: Attribut doit contenir au moins une lettre majuscule et une lettre minuscule.',
        'numbers' => 'Le champ: Attribut doit contenir au moins un numéro.',
        'symbols' => 'Le champ: Attribut doit contenir au moins un symbole.',
        'uncompromised' => 'L\'attribut donné est apparu dans une fuite de données.Veuillez choisir un autre: attribut.',
    ],
    'present' => 'Le champ d\'attribut doit être présent.',
    'prohibited' => 'Le champ: Attribut est interdit.',
    'prohibited_if' => 'Le champ: Attribut est interdit lorsque: l\'autre est: valeur.',
    'prohibited_unless' => 'Le champ: Attribut est interdit à moins que: l\'autre est dans: les valeurs.',
    'prohibits' => 'Le champ d\'attribut interdit: autres d\'être présents.',
    'regex' => 'Le format de champ d\'attribut n\'est pas valide.',
    'required' => 'Le champ: Attribut est requis.',
    'required_array_keys' => 'Le champ: Attribut doit contenir des entrées pour :: valeurs.',
    'required_if' => 'Le champ: Attribut est requis lorsque: l\'autre est: valeur.',
    'required_if_accepted' => 'Le champ d\'attribut est requis lorsque: l\'autre est accepté.',
    'required_unless' => 'Le champ: Attribut est requis à moins que: l\'autre est dans: VALEURS.',
    'required_with' => 'Le champ: Attribut est requis lorsque: des valeurs sont présentes.',
    'required_with_all' => 'Le champ: Attribut est requis lorsque: des valeurs sont présentes.',
    'required_without' => 'Le champ: Attribut est requis lorsque: les valeurs ne sont pas présentes.',
    'required_without_all' => 'Le champ: Attribut est requis lorsqu\'aucune des valeurs n\'est présente.',
    'same' => 'Le champ d\'attribut doit correspondre: Autre.',
    'size' => [
        'array' => 'Le champ: Attribut doit contenir: Éléments de taille.',
        'file' => 'Le champ: Attribut doit être: Taille kiloBytes.',
        'numeric' => 'Le champ d\'attribut doit être: taille.',
        'string' => 'Le champ: Attribut doit être: les caractères de taille.',
    ],
    'starts_with' => 'Le champ: Attribut doit commencer par l\'un des éléments suivants :: Valeurs.',
    'string' => 'Le champ: Attribut doit être une chaîne.',
    'timezone' => 'Le champ: Attribut doit être un fuseau horaire valide.',
    'unique' => 'L\'attribut a déjà été pris.',
    'uploaded' => 'L\'attribut n\'a pas réussi à télécharger.',
    'uppercase' => 'Le champ: Attribut doit être majuscule.',
    'url' => 'Le champ: Attribut doit être une URL valide.',
    'ulid' => 'Le champ d\'attribut doit être un ulide valide.',
    'uuid' => 'Le champ: Attribut doit être un UUID valide.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'message personnalisé',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
