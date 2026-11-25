
<?php

header("Access-Control-Allow-Origin: http://localhost:5184");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["message" => "No registration data received"]);
    exit;
}

$full_name = $data["full_name"] ?? '';
$email = $data["email"] ?? '';
$phone_number = $data["phone_number"] ?? '';
$password = $data["password"] ?? '';

if (empty($full_name) || empty($email) || empty($phone_number) || empty($password)) {
    echo json_encode(["message" => "Please fill in all fields"]);
    exit;
}

// Check if email already exists
$checkEmail = $conn->prepare("SELECT email FROM users WHERE email = ?");
$checkEmail->bind_param("s", $email);
$checkEmail->execute();
$result = $checkEmail->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["message" => "Email already exists"]);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Save user details
$sql = $conn->prepare(
    "INSERT INTO users (full_name, email, phone_number, password)
     VALUES (?, ?, ?, ?)"
);

$sql->bind_param("ssss", $full_name, $email, $phone_number, $hashedPassword);

if ($sql->execute()) {
    echo json_encode(["message" => "Registration successful!"]);
} else {
    echo json_encode(["message" => "Registration failed"]);
}

?>

