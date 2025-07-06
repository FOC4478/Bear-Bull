<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ini_set('display_errors', 0);
// error_reporting(E_ALL);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
require 'vendor/autoload.php'; // Make sure Composer's autoload is included

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Get JSON input from request body
$data = json_decode(file_get_contents('php://input'), true);

// Required fields from JSON
$email      = $data['email'] ?? null;


if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Recipient email "to" is required']);
    exit;
}

// Generate random 6-digit verification code
$verification_code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

// ✅ Connect to MySQL
$mysqli = new mysqli('localhost', 'root', 'password', 'bear_bull');
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// ✅ Update the resetpassword field
$stmt = $mysqli->prepare("UPDATE users SET resetCode = ? WHERE email = ?");
$stmt->bind_param("ss", $verification_code, $email);
$stmt->execute();

if ($stmt->affected_rows === 0) {
    echo json_encode(['error' => 'No user found with that email']);
    exit;
}
$stmt->close();
$mysqli->close();

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username = $_ENV['GMAIL_USERNAME'];
    $mail->Password = $_ENV['GMAIL_APP_PASSWORD'];       // Your Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom('sarahalbert3210@gmail.com', 'Bear_Bull');
    $mail->addAddress($email); // Change this

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Bear Bull Password Recovery';
    $mail->Body    = "<h3>Hello!</h3><p>Your code to reset the password  <h2>{$verification_code}</h2> </p>";
    $mail->AltBody = 'Your code to reset the password = kkkk ';

    $mail->send();
    // Success
    echo json_encode([
        'success' => true,
        'message' => 'Reset code sent to your email.',
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => "Mailer Error: {$mail->ErrorInfo}",
        'debug' => $e->getMessage()
    ]);
}
