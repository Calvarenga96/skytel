<?php

class User
{
    private $names;
    private $lastNames;
    private $phone;
    private $email;

    public function __construct($names, $lastNames, $phone, $email)
    {
        $this->names        = $names;
        $this->lastNames    = $lastNames;
        $this->phone        = $phone;
        $this->email        = $email;
    }

    public function validate()
    {
        // Verificar que todos los campos estén llenos
        if (empty($this->names) || empty($this->lastNames) || empty($this->phone) || empty($this->email)) {
            return false;
        }

        // Verificar que el correo electrónico no sea "john@smith.com"
        if ($this->email == "john@smith.com") {
            return false;
        }

        return true;
    }

    public function generateToken()
    {
        // Obtener las vocales del nombre
        $vowels = preg_replace('/[^aeiou]/i', '', $this->names);

        // Obtener la primera letra del apellido
        $firstLetter = substr($this->lastNames, 0, 1);

        // Obtener la última letra del apellido
        $lastLetter = substr($this->lastNames, -1);

        // Generar un número aleatorio de 3 dígitos
        $randomNumber = str_pad(rand(0, 999), 3, '0', STR_PAD_LEFT);

        // Concatenar todo para generar el token
        $token = $vowels . $firstLetter . $lastLetter . $randomNumber;

        return $token;
    }
}
