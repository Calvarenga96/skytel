<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json;');

require_once './User.php';

// Recibir los datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

$names      = $data['names'];
$lastNames  = $data['lastNames'];
$phone      = $data['phone'];
$email      = $data['email'];

// Crear un objeto User con los datos recibidos
$user       = new User($names, $lastNames, $phone, $email);

// Validar los datos del usuario
if (!$user->validate()) {
    // Si los datos no son válidos, devolver un mensaje de error
    echo json_encode([
        'error'     => true,
        'message'   => 'Datos invalidos.'
    ]);
} else {
    // Generar el token del usuario
    $token = $user->generateToken();

    // Simular el almacenamiento de los datos en una base de datos
    $data = "names: $names,lastNames: $lastNames,phone: $phone,email: $email,token: $token";

    file_put_contents(__DIR__ . "/users.txt", $data . PHP_EOL, FILE_APPEND);

    // Devolver el token generado
    echo json_encode([
        'message'   => 'Usuario correcto.',
        "token"     => $token
    ]);
}
