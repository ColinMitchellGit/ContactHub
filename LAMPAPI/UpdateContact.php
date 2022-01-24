<?php
	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNumber = $inData["phoneNumber"];
	$email = $inData["email"];
	$userID = $inData["userID"];
	$contactID = $inData["contactID"];

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
    else
    {
		# There's no need to check if the contact exists if they are on the contact
		$stmt = $conn->prepare("UPDATE `Contacts` SET `FirstName`=?, `LastName`=?, `PhoneNumber`=?, `Email`=?
		                        WHERE (`UserID`=? AND `ContactID`=?)");
		$stmt->bind_param("ssisii", $firstName, $lastName, $phoneNumber, $email,
                                    $userID, $contactID);
		$stmt->execute();
		$result = $stmt->get_result()

		if (mysqli_affected_rows($conn) == 1)
		{
			returnInfo("Update successful!");
		}
		else
		{
			returnWithError("Update failed!");
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

	function returnInfo( $info )
	{
		$retValue = '{"info":"' . $info . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
