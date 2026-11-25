
<?php

header("Access-Control-Allow-Origin: http://localhost:5184");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$full_name = $data['full_name'];
$email = $data['email'];
$phone_number = $data['phone_number'];

$sql = "UPDATE users
        SET full_name = ?, email = ?, phone_number = ?
        WHERE user_id = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssi",
    $full_name,
    $email,
    $phone_number,
    $user_id
);

if ($stmt->execute()) {

    if ($stmt->affected_rows >= 0) {
        echo json_encode([
            "message" => "Profile updated successfully!"
        ]);
    }

} else {

    echo json_encode([
        "message" => "Failed to update profile."
    ]);

}

$stmt->close();
$conn->close();

?>
