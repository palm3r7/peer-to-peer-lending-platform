
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

$request_id = $data['request_id'];
$lender_id = $data['lender_id'];

// Get the loan request
$sql = "SELECT * FROM loanrequests WHERE request_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $request_id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(["message" => "Loan request not found"]);
    exit;
}

$request = $result->fetch_assoc();

$borrower_id = $request['borrower_id'];
$amount = $request['amount'];
$repayment_period = $request['repayment_period'];

// Prevent a borrower from selecting their own request
if ($borrower_id == $lender_id) {
    echo json_encode(["message" => "You cannot select your own loan request"]);
    exit;
}

// Check whether the request is still pending
if ($request['status'] != 'Pending') {
    echo json_encode(["message" => "This loan request is no longer available"]);
    exit;
}

// Save the lending record
$sql = "INSERT INTO loans
        (request_id, borrower_id, lender_id, amount,
         interest_rate, repayment_period, status)
        VALUES (?, ?, ?, ?, 0, ?, 'Active')";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "iiidi",
    $request_id,
    $borrower_id,
    $lender_id,
    $amount,
    $repayment_period
);

if ($stmt->execute()) {

    // Update the original loan request
    $sql = "UPDATE loanrequests
            SET status = 'Approved'
            WHERE request_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $request_id);
    $stmt->execute();

    echo json_encode(["message" => "Loan selected successfully"]);

} else {
    echo json_encode(["message" => "Unable to select this loan"]);
}

$conn->close();

?>
