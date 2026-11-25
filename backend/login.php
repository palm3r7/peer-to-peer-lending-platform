
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

$email = $data["email"] ?? '';
$password = $data["password"] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["message" => "Please enter email and password"]);
    exit;
}

$sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
$sql->bind_param("s", $email);
$sql->execute();

$result = $sql->get_result();

if ($result->num_rows === 1) {

    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {

        echo json_encode([
            "message" => "Login successful!",
            "user" => [
                "user_id" => $user["user_id"],
                "full_name" => $user["full_name"],
                "email" => $user["email"],
                "phone_number" => $user["phone_number"]
            ]
        ]);

    } else {
        echo json_encode(["message" => "Incorrect email or password"]);
    }

} else {
    echo json_encode(["message" => "Incorrect email or password"]);
}

?>
