<?php
// login.php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit;
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Get and decode input
$input = json_decode(file_get_contents("php://input"), true);

// Check for required fields
if (!isset($input['email'], $input['password'])) {
    http_response_code(400);
    echo json_encode(["message" => "Missing email or password"]);
    exit;
}

$email = trim($input['email']);
$password = trim($input['password']);

// DB config
$host = 'localhost';
$db = 'bear_bull';
$user = 'root';
$pass = 'password'; // adjust for your setup

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed"]);
    exit;
}

// Retrieve user
$stmt = $conn->prepare("SELECT id, full_name, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
    exit;
}

$stmt->bind_result($id, $full_name, $storedPassword);
$stmt->fetch();

// Verify password
if ($password !== $storedPassword) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
    exit;
}

session_start();
$_SESSION['user_id'] = $id;
$_SESSION['user_email'] = $email;

// Return user data
echo json_encode([
    "message" => "Login successful",
    "user" => [
        "id" => $id,
        "full_name" => $full_name
    ]
]);

$stmt->close();
$conn->close();
?>
