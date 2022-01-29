<?php
	$inData = getRequestInfo();

	$option = $inData["option"];

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

/*
	when option 1 is used
	{
		"option": 1
		"login": ""
		"secQ1": ""
		"secQ2": ""
	}

	when option 2 is used
	{
		"option": 2
		"newPassword": ""
	}
*/
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
    else
    {
		if ( $option == 1 )
		{ 
			$login = $inData["login"];
			$secQ1 = $inData["secQ1"];
			$secQ2 = $inData["secQ2"];

			$stmt = $conn->prepare("SELECT * FROM Users WHERE Login=? AND SecQ1=? AND SecQ2=?");
			$stmt->bind_param("sss", $login, $secQ1, $secQ2);
			$stmt->execute();
			$result = $stmt->get_result();
			if ( $row = $result->fetch_assoc() )
			{
				returnWithInfo("User found");
			}
			else
			{
				returnWithError("Error in validation");
			}
		}
		else if ( $option == 2 )
		{
			$newPassword = $inData["newPassword"];

			$stmt = $conn->prepare("UPDATE `Users` SET `Password`=? WHERE Login=?");
			$stmt->bind_param("ss", $newPassword, $login);
			if ($stmt->execute() == true)
			{
				returnInfo("Password updated");
			}
			else
			{
				returnWithError("Failed to update password");
			}
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
