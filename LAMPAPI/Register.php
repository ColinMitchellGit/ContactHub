<?php
	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];
	$secQ1 = $inData["secQuestion1"];
	$secQ2 = $inData["secQuestion2"];

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		# First we check to make sure the user doesnt already exist
		$stmt = $conn->prepare("SELECT UserID,FirstName,LastName FROM Users WHERE Login=?");
		$stmt->bind_param("s", $login);
		$stmt->execute();
		$result = $stmt->get_result();

		# If the user exists, we throw an error back
		if( $row = $result->fetch_assoc()  )
		{
			returnWithError("User already exists");
		}
		else
		{
			$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Login, Password, SecQ1, SecQ2) VALUES(?,?,?,?,?,?)");
			$stmt->bind_param("ssssss", $firstName, $lastName, $login, $password, $secQ1, $secQ2);
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
