<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized: No session found']);
    exit;
}

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Connect to DB
$mysqli = new mysqli('localhost', 'root', 'password', 'bear_bull');
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
session_start();
$userId = $_SESSION['user_id'];


// Fetch user info
$stmt = $mysqli->prepare("SELECT email, role, deposit_amount, last_deposit_date FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();
$mysqli->close();

if (!$user) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found']);
    exit;
}

if ($user['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden: Admin access required']);
    exit;
}

// Return user data
echo json_encode([
    'email' => $user['email'],
    'role' => $user['role'],
    'deposit_amount' => $user['deposit_amount'],
    'last_deposit_date' => $user['last_deposit_date']
]);
