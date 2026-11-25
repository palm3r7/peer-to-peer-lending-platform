
<?php

header("Access-Control-Allow-Origin: http://localhost:5184");
header("Content-Type: application/json");

include 'db.php';

$sql = "SELECT loanrequests.*, users.full_name AS borrower_name
        FROM loanrequests
        JOIN users ON loanrequests.borrower_id = users.user_id
        ORDER BY loanrequests.created_at DESC";

$result = mysqli_query($conn, $sql);

$loans = array();

if ($result) {

    while ($row = mysqli_fetch_assoc($result)) {
        $loans[] = $row;
    }

    echo json_encode($loans);

} else {

    echo json_encode(["error" => "Failed to retrieve loan requests"]);

}

?>
