<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Database credentials
$host = 'localhost';
$dbUser = 'your_db_user';
$dbPass = 'your_db_password';
$dbName = 'your_database_name';

// Create MySQLi connection
$conn = new mysqli($host, $dbUser, $dbPass, $dbName);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed.']));
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

    if (!$email) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
        exit;
    }

    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email not found.']);
        exit;
    }

    // Generate a 6-digit reset code
    $resetCode = strval(random_int(100000, 999999));

    // Update resetCode in users table
    $stmt = $conn->prepare("UPDATE users SET resetCode = ? WHERE email = ?");
    $stmt->bind_param("ss", $resetCode, $email);
    $stmt->execute();

    // Send email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com';       // Your Gmail address
        $mail->Password = 'your-app-password';          // Your Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('your-email@gmail.com', 'Your App Name');
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = 'Your Password Reset Code';
        $mail->Body = "<p>Hello,</p><p>Your password reset code is: <strong>$resetCode</strong></p><p>This code will expire soon. Please use it to reset your password.</p>";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Reset code sent successfully.']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
}
?>
