<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

header('Content-Type: application/json');
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? null;
$code = $data['code'] ?? null;
$newPassword = $data['new_password'] ?? null;

// Validate input
if (!$email || !$code || !$newPassword) {
    http_response_code(400);
    echo json_encode(['error' => 'Email, code, and new password are required']);
    exit;
}

// Connect to DB
$mysqli = new mysqli('localhost', 'root', 'password', 'bear_bull');
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Check if code matches
$stmt = $mysqli->prepare("SELECT resetCode FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || $user['resetCode'] !== $code) {
    echo json_encode(['error' => 'Invalid reset code or email']);
    exit;
}
$stmt->close();

// ✅ Store password as plain text (not secure)
$update = $mysqli->prepare("UPDATE users SET password = ?, resetCode = NULL WHERE email = ?");
$update->bind_param("ss", $newPassword, $email);
$update->execute();
$update->close();
$mysqli->close();

echo json_encode(['success' => true, 'message' => 'Password has been reset successfully']);