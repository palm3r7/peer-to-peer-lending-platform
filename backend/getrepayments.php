
<?php

header("Access-Control-Allow-Origin: http://localhost:5184");
header("Content-Type: application/json");

include 'db.php';

$user_id = $_GET['user_id'];

$sql = "SELECT
            loans.loan_id,
            loans.amount,
            COALESCE(SUM(repayments.amount_paid), 0) AS paid
        FROM loans
        LEFT JOIN repayments
        ON loans.loan_id = repayments.loan_id
        WHERE loans.borrower_id = ?
        GROUP BY loans.loan_id, loans.amount
        ORDER BY loans.created_at DESC";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $user_id);

$stmt->execute();

$result = $stmt->get_result();

$repayments = array();

while ($row = $result->fetch_assoc()) {
    $repayments[] = $row;
}

echo json_encode($repayments);

$stmt->close();
$conn->close();

?>
