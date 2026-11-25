
<?php

header("Access-Control-Allow-Origin: http://localhost:5184");
header("Content-Type: application/json");

require_once "db.php";

$user_id = $_GET['user_id'];

$sql = "SELECT * FROM loanrequests
        WHERE borrower_id = ?
        ORDER BY created_at DESC";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $user_id);

$stmt->execute();

$result = $stmt->get_result();

$loans = array();

while ($row = $result->fetch_assoc()) {
    $loans[] = $row;
}

echo json_encode($loans);

$stmt->close();
$conn->close();

?>
