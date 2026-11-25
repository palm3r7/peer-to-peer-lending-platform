
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

$loan_id = $data['loan_id'];
$amount_paid = $data['amount_paid'];

if ($amount_paid <= 0) {
    echo json_encode(["message" => "Enter a valid payment amount"]);
    exit;
}

// Check the loan and its remaining balance
$sql = "SELECT loans.amount,
        COALESCE(SUM(repayments.amount_paid), 0) AS paid
        FROM loans
        LEFT JOIN repayments ON loans.loan_id = repayments.loan_id
        WHERE loans.loan_id = ?
        GROUP BY loans.loan_id";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $loan_id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(["message" => "Loan not found"]);
    exit;
}

$loan = $result->fetch_assoc();

$balance = $loan['amount'] - $loan['paid'];

if ($amount_paid > $balance) {
    echo json_encode(["message" => "Payment cannot be greater than the remaining balance"]);
    exit;
}

// Save repayment
$sql = "INSERT INTO repayments (loan_id, amount_paid, payment_date)
        VALUES (?, ?, CURDATE())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("id", $loan_id, $amount_paid);

if ($stmt->execute()) {
    echo json_encode(["message" => "Payment recorded successfully"]);
} else {
    echo json_encode(["message" => "Failed to record payment"]);
}

$stmt->close();
$conn->close();

?>
