<?php
	$inData = getRequestInfo();

	$login = $inData["login"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		# We need to first query for the user's ID in order to get all their contacts
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=? AND Password=?");
		$stmt->bind_param("ss", $login, $password);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			# Once we have the user's ID, we just query for all contacts with that specific UserID
			$stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID=?");
			$stmt->bind_param("s", $row['ID']);
			$stmt->execute();

			$result = $stmt->get_result();

			if ($jsonOBJ = $result->fetch_all())
			{
				sendResultInfoAsJson($jsonOBJ);
			}
			else
			{
				returnWithError("No Contacts Found");
			}

		}
		else
		{
			/*
			* Not sure if this is needed since at this point the user has already logged in,
			* but I'm leaving it here just in case
			*/
			returnWithError("User not found");
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
