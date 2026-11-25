
<?php

header("Access-Control-Allow-Origin: http://localhost:5184");
header("Content-Type: application/json");

include 'db.php';

$user_id = $_GET['user_id'];

$sql = "SELECT
            repayments.repayment_id,
            repayments.loan_id,
            repayments.amount_paid,
            repayments.payment_date
        FROM repayments
        JOIN loans ON repayments.loan_id = loans.loan_id
        WHERE loans.borrower_id = ?
        ORDER BY repayments.payment_date DESC";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $user_id);

$stmt->execute();

$result = $stmt->get_result();

$history = array();

while ($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode($history);

$stmt->close();
$conn->close();

?>
