<?php
	$inData = getRequestInfo();

	$oldFirstName = $inData["oldFirstName"];
	$oldLastName = $inData["oldLastName"];
	$oldPhoneNumbe = $inData["oldPhoneNumber"];
	$oldEmail = $inData["oldEmail"];
	$newFirstName = $inData["newFirstName"];
	$newLastName = $inData["newLastName"];
	$newPhoneNumber = $inData["newPhoneNumber"];
	$newEmail = $inData["newEmail"];
	$userID = $inData["userID"];

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
    else
    {
		# There's no need to check if the contact exists if they are on the contact
		$stmt = $conn->prepare("UPDATE Contacts SET `FirstName`=?, `LastName`=?, `PhoneNumber`=?, `Email`=? 
		                        WHERE `FirstName`=? AND `LastName`=? AND `PhoneNumber`=? AND `Email`=? AND `UserID`=?");
		$stmt->bind_param("ssisssisi", $newFirstName, $newLastName, $newPhoneNumber, $newEmail, 
                                       $oldFirstName, $oldLastName, $oldPhoneNumber, $oldEmail, $userid);
		$stmt->execute();

        $stmt->close();
        $conn->close();
    }


	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
