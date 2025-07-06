<?php
session_start(); // if using session for user identification

// DB config
$host = 'localhost';
$db = 'bear_bull';
$user = 'root';
$pass = 'password'; // adjust for your setup

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user ID (example from session)
$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    die("User not logged in.");
}

// Get deposit amount from POST (validate it properly in production)
$deposit_amount = $_POST['amount'] ?? 0;
$deposit_amount = floatval($deposit_amount);
if ($deposit_amount <= 0) {
    die("Invalid deposit amount.");
}

// Prepare and execute update query
$sql = "UPDATE users SET deposit_amount = deposit_amount + ?, last_deposit_date = NOW() WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}
$stmt->bind_param("di", $deposit_amount, $user_id);

if ($stmt->execute()) {
    echo "Deposit updated successfully.";
} else {
    echo "Error updating deposit: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
