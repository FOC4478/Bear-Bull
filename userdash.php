<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_email'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$email = $_SESSION['user_email'];

// Database connection setup
$host = 'localhost';  
$db   = 'bear_bull';  
$user = 'root'; 
$pass = 'password';

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Prepare SQL query securely
$stmt = $conn->prepare("SELECT deposit_amount, last_deposit_date FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        'deposit_amount' => $row['deposit_amount'],
        'last_deposit_date' => $row['last_deposit_date']
    ]);
} else {
    echo json_encode(['error' => 'User not found']);
}

$stmt->close();
$conn->close();
?>
