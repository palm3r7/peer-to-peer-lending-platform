
<?php

header("Access-Control-Allow-Origin: http://localhost:5184");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

require_once "db.php";

// Receive data from React
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "message" => "No loan request data received"
    ]);
    exit;
}

// Get the loan details
$borrower_id = $data["borrower_id"] ?? '';
$amount = $data["amount"] ?? '';
$purpose = $data["purpose"] ?? '';
$repayment_period = $data["repayment_period"] ?? '';
$description = $data["description"] ?? '';

// Check that all fields are filled
if (
    empty($borrower_id) ||
    empty($amount) ||
    empty($purpose) ||
    empty($repayment_period) ||
    empty($description)
) {
    echo json_encode([
        "message" => "Please fill in all fields"
    ]);
    exit;
}

// Save the loan request in the database
$sql = $conn->prepare(
    "INSERT INTO loanrequests
    (borrower_id, amount, purpose, repayment_period, description)
    VALUES (?, ?, ?, ?, ?)"
);

$sql->bind_param(
    "idsss",
    $borrower_id,
    $amount,
    $purpose,
    $repayment_period,
    $description
);

// Check whether the loan request was saved
if ($sql->execute()) {

    echo json_encode([
        "message" => "Your loan request has been submitted successfully!"
    ]);

} else {

    echo json_encode([
        "message" => "Loan request could not be submitted"
    ]);

}

$sql->close();
$conn->close();

?>
