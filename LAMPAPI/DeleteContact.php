<?php
	$inData = getRequestInfo();

	$userID = $inData["userID"];
	$contactID = $inData["contactID"];

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		# No need to check if contact exists since the user is currently viewing the contact's page
		$stmt = $conn->prepare("DELETE FROM `Contacts` WHERE `UserID`=? AND `ContactID`=?");
		$stmt->bind_param("ii", $userID, $contactID);

		if($stmt->execute() == true)
		{
			returnWithError("");
		}
		else
		{
			returnWithError("Deletion did not work.");
		}
		
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
