//Global
const urlBase = 'http://contactmanager15.xyz/LAMPAPI';
const extension = 'php';
//var UserID = 1;

//------------------------------------------------------------------------

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

//------------------------------------------------------------------------

function searchContact(){

var searchTextStr = document.getElementById("searchText").value.trim();

let jsonSearchPayload = {userID:UserId,search:searchTextStr};
let jsonPayload = JSON.stringify( jsonSearchPayload );

let url = urlBase + '/ReadContacts.' + extension;

var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				//SetTable(jsonObject); cant pass json object
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//create a html for ErrorBox
		document.getElementById("ErrorBox").innerHTML = err.message;
	}

}

//Note: payload format

  //"userID": 1,
  //"search": "gmail"

//-------------------------------------------------------------------------

function SetTable(var tableElements){

let tbl = document.getElementById("tableElements");

let row = document.createElement("tr");

tbl.appendChild(row);
}

//------------------------------------------------------------------------

function deleteConact(var ID){

	let jsonDeletePayload = {userID:UserId,contactID:ID};
	let jsonPayload = JSON.stringify( jsonSDeletePayload );

	let url = urlBase + '/DeleteContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText )
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//create a html for ErrorBox
		document.getElementById("ErrorBox").innerHTML = err.message;
	}

}

//Note delete payload


  //"userID": 1,
  //"contactID": 11

//------------------------------------------------------------------------

function createEditContact(var ID){

	//should create pop up/dailog box with
	/*
	"EditContactFirstName" text field and label
	"EditContactLastName" text field and label
	"EditContactNumber" text field and label
	"EditContactEmail" text field and label
	add a button to confirm that runs UpdateContact(ID) on click
	*/

}


//------------------------------------------------------------------------

function UpdateContact(var ContactID){

var EditFname = document.getElementById("EditContactFirstName").value;
var EditLname = document.getElementById("EditContactLastName").value;
var EditNumber = document.getElementById("EditContactNumber").value;
var EditEmail = document.getElementById("EditContactEmail").value;
var SelectedContactID = ContactID;

if(validateFormEmpty(EditFname, 2) && validateFormEmpty(EditLname, 2) && validateFormEmpty(EditNumber, 2) && validateFormEmpty(EditEmail, 2))
{
	if(validateFormNumber(EditNumber, 2) && validateFormEmail(EditEmail, 2))
	{

		let url = urlBase + '/UpdateContact.' + extension;

		let jsonUpdateContactPayload = 
		{
		firstName:EditFname,
		lastName:EditLname,
		phoneNumber:EditNumber,
		email:EditEmail,
		userID:UserId,
		contactID:SelectedContactID
		};
		
		let jsonPayload = JSON.stringify( jsonUpdateContactPayload );

		document.getElementById("EditContactFirstName").innerHTML("");
		document.getElementById("EditContactLastName").innerHTML("");
		document.getElementById("EditContactNumber").innerHTML("");
		document.getElementById("EditContactEmail").innerHTML("");

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					let jsonObject = JSON.parse( xhr.responseText );
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			//create a html for ErrorBox
			document.getElementById("ErrorBox").innerHTML = err.message;
		}

	}

}

}

}
//Note UpdateContact Json payload

  //"firstName": "Dave",
  //"lastName": "Mitchell",
  //"phoneNumber": 3219493444,
  //"email": "example@gmail.com",
  //"userID": 1,
  //"contactID": 12


//------------------------------------------------------------------------
function addNewContact(){

var newFname = document.getElementById("NewContactFirstName").value;
var newLname = document.getElementById("NewContactLastName").value;
var newNumber = document.getElementById("NewContactNumber").value;
var newEmail = document.getElementById("NewContactEmail").value;

//cleaning text
if(validateFormEmpty(newFname,1 ) && validateFormEmpty(newLname, 1) && validateFormEmpty(newNumber, 1) && validateFormEmpty(newEmail, 1))
{
	if(validateFormNumber(newNumber, 1) && validateFormEmail(newEmail, 1))
	{

		let url = urlBase + '/CreateContact.' + extension;

		let jsonNewContactPayload = 
		{
		firstName:newFname,
		lastName:newLname,
		phoneNumber:newNumber,
		email:newEmail,
		userID:UserId
		};

		let jsonPayload = JSON.stringify( jsonNewContactPayload );

		document.getElementById("NewContactFirstName").innerHTML("");
		document.getElementById("NewContactLastName").innerHTML("");
		document.getElementById("NewContactNumber").innerHTML("");
		document.getElementById("NewContactEmail").innerHTML("");

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		xhr.send(jsonPayload);

	}
}

}

//note new contact json payload

  //"firstName": "fred",
  //"lastName": "jones",
  //"phoneNumber": "3219493444",
  //"email": "example@gmail.com",
  //"userID": 1

//-------------------------------------------------------------------------------
//Helper text cleaners

function validateFormEmpty(String y, int x) {
  var x = y
  if (x == "") {
	document.getElementById("ErrorBox").innerHTML("All fields must be filled out");
	if(x == 1)
	{
		//change color of html to on add contact to red
	}
	if(x == 2)
	{
		//change color of html to on edit contact to red
	}

	return false;
  }
  else { return true; }
}

function validateFormNumber(String y, int x) {
  var x = y
  var numbers = /^[0-9]+$/;
      
  if (x.match(numbers)) {
    return true;
  }
  else 
  { 
	document.getElementById("ErrorBox").innerHTML("Phone Numbers must be all digits");
	if(x == 1)
	{
		//change color of html to on add contact to red
	}
	if(x == 2)
	{
		//change color of html to on edit contact to red
	}
	return false; 
  }
}

function validateFormEmail(String y, int x) {
  var x = y
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)) {
    	return true;
  }
  else 
  { 
	document.getElementById("ErrorBox").innerHTML("That is not a vaild Email");
	if(x == 1)
	{
		//change color of html to on add contact to red
	}
	if(x == 2)
	{
		//change color of html to on edit contact to red
	}
	return false; 
  }
}

//-------------------------------------------------------------------------------