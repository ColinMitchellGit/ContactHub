<?php
	$inData = getRequestInfo();

	$userid = $inData["userID"];
	$string = "%" . $inData["search"] . "%";

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT FirstName,LastName,PhoneNumber,Email,ContactID FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR PhoneNumber LIKE ? OR Email LIKE ?) AND (UserID=?)");
		$stmt->bind_param("ssssi", $string, $string, $string, $string, $userid);
		$stmt->execute();

		$result = $stmt->get_result();

		if ($result->num_rows() > 0)
		{
			convertResults($result);
		}
		else
		{
			returnWithError("No Contacts Found");
		}

		$stmt->close();
		$conn->close();
	}

	function convertResults( $result )
	{
		$data = array();

		while ($row = $result->fetch_assoc())
		{
			$data[] = [
				'FirstName' => $row['FirstName'],
		        'LastName' => $row['LastName'],
				'PhoneNumber' => $row['PhoneNumber'],
				'Email' => $row['Email'],
				'ContactID' =>  $row['ContactID']
    		];
		}

		sendResultInfoAsJson($data);
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
