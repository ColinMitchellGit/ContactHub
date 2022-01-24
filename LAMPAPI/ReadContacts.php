<?php
	$inData = getRequestInfo();

	$userid = $inData["userID"];
	$search = $inData["search"];
	$string = "%" . $search . "%";

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT UserID,FirstName,LastName FROM Users WHERE Login=? AND Password=?");
		$stmt->bind_param("si", $string, $userid);
		$stmt->execute();

		$result = $stmt->get_result();

		if ($result->num_rows() > 0)
		{
			returnWithError("Not working");
		}
		else
		{
			returnWithError("No Contacts Found");
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
