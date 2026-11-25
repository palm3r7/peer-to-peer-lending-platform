
<?php

header("Access-Control-Allow-Origin: http://localhost:5184");
header("Content-Type: application/json");

include 'db.php';

$lender_id = $_GET['lender_id'];

$sql = "SELECT loans.*, users.full_name AS borrower_name
        FROM loans
        JOIN users ON loans.borrower_id = users.user_id
        WHERE loans.lender_id = ?
        ORDER BY loans.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $lender_id);
$stmt->execute();

$result = $stmt->get_result();

$lending = array();

while ($row = $result->fetch_assoc()) {
    $lending[] = $row;
}

echo json_encode($lending);

$stmt->close();
$conn->close();

?>
