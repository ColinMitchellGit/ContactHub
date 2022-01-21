<?php
	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNumber = $inData["phoneNumber"];
	$email = $inData["email"];
	$userID = $inData["userID"];

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		# Check if contact has the same phone number or email as the input
		$stmt = $conn->prepare("SELECT FirstName,LastName FROM Contacts WHERE(PhoneNumber=? OR Email=?) AND (UserID=?)");
		$stmt->bind_param("is", $phoneNumber,$email, $userID);
		$stmt->execute();
		$result = $stmt->get_result();

		# If the contact exists, we throw an error back
		if( $row = $result->fetch_assoc()  )
		{
			returnWithError("Contact already exists");
		}
		else
		{
			# Insert the new contact
			$stmt = $conn->prepare("INSERT into Contacts WHERE (FirstName,LastName,PhoneNumber,Email,UserID) VALUES(?,?,?,?,?)");
			$stmt->bind_param("ssisi", $firstName, $lastName, $phoneNumber, $email, $userID);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
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
