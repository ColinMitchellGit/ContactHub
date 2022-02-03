<?php
	$inData = getRequestInfo();

	$searchCount = 0;
	$searchResults = "";

	$userid = $inData["userID"];
	$string = "%" . $inData["search"] . "%";

	$conn = new mysqli("localhost", "TheBeast", "Group15LovesCOP4331", "COP4331Group15");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// If the search term is an empty string, we want to return all contacts of the user
		if ($inData["search"] == "")
		{
			$stmt = $conn->prepare("SELECT FirstName,LastName,PhoneNumber,Email,ContactID FROM Contacts WHERE UserID=?");
			$stmt->bind_param("i", $userid);
		}
		else
		{
			$stmt = $conn->prepare("SELECT FirstName,LastName,PhoneNumber,Email,ContactID FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR PhoneNumber LIKE ? OR Email LIKE ?) AND (UserID=?)");
			$stmt->bind_param("ssssi", $string, $string, $string, $string, $userid);
		}

		$stmt->execute();
		$result = $stmt->get_result();

		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{' . '"firstName": ' . '"' . $row["FirstName"] . '",';
			$searchResults .= '"lastName": ' . '"' . $row["LastName"] . '",';
			$searchResults .= '"phoneNumber": ' . '"' . $row["PhoneNumber"] . '",';
			$searchResults .= '"email": ' . '"' . $row["Email"] . '",';
			$searchResults .= '"contactID": ' . $row["ContactID"] . '}';
		}

		if( $searchCount == 0 )
		{
			returnWithError( "No Contacts Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
