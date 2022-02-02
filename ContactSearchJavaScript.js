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
				//fill a table with the json data
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



//------------------------------------------------------------------------

function deleteContact(String fieldID){

	let jsonDeletePayload = {userID:UserId,contactID:fieldID};
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

	//should create pop up/dialog box with
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

String EditFname = document.getElementById("EditContactFirstName").value.trim;
String EditLname = document.getElementById("EditContactLastName").value.trim;
String EditNumber = document.getElementById("EditContactNumber").value.trim;
String EditEmail = document.getElementById("EditContactEmail").value.trim;
String SelectedContactID = ContactID;

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
					let jsonUpdateObject = JSON.parse( xhr.responseText );
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

	var newFname = document.getElementById("NewContactFirstName").value.trim;
	var newLname = document.getElementById("NewContactLastName").value.trim;
	var newNumber = document.getElementById("NewContactNumber").value.trim;
	var newEmail = document.getElementById("NewContactEmail").value.trim;

//cleaning text
if(validateFormEmpty(newFname,1, "NewContactFirstName", "NewContactFirstNameLabel") && validateFormEmpty(newLname, 1, "NewContactLastName", "NewContactLastNameLabel") 
	&& validateFormEmpty(newNumber, 1, "NewContactNumber", "NewContactNumberLabel") && validateFormEmpty(newEmail, 1, "NewContactEmail", "NewContactEmailLabel"))
{
	if(validateFormNumber(newNumber, 1, "NewContactNumber", "NewContactNumberLabel") && validateFormEmail(newEmail, 1, "NewContactEmail", "NewContactEmailLabel"))
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
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					let jsonNewContactObject = JSON.parse( xhr.responseText );
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			//create a html for ErrorBox
			document.getElementById("ErrorBox").innerHTML = err.message;
		}

			document.getElementById("NewContactFirstName").style.borderColor = "black";
        	document.getElementById("NewContactLastName").style.borderColor = "black";
        	document.getElementById("NewContactNumber").style.borderColor = "black";
        	document.getElementById("NewContactEmail").style.borderColor = "black";

        	document.getElementById("NewContactFirstName").style.borderStyle = "";
        	document.getElementById("NewContactLastName").style.borderStyle = "";
        	document.getElementById("NewContactNumber").style.borderStyle = "";
        	document.getElementById("NewContactEmail").style.borderStyle = "";

        	document.getElementById("NewContactFirstNameLabel").style.color = "black";
        	document.getElementById("NewContactLastNameLabel").style.color = "black";
        	document.getElementById("NewContactNumberLabel").style.color = "black";
        	document.getElementById("NewContactEmailLabel").style.color = "black";
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

function validateFormEmpty(String y, int x, String htmltag, String htmllabel) {
  
  if (y == "") {
	document.getElementById("ErrorBox").innerHTML("All fields must be filled out");
	if(x == 1)
	{
		//change color of html to on add contact to red
		document.getElementById(htmltag).style.borderColor = "red";

        	document.getElementById(htmltag).style.borderStyle = "solid";

        	document.getElementById(htmllabel).style.color = "red";
	}
	if(x == 2)
	{
		//change color of html to on edit contact to red
	}

	return false;
  }
  else { return true; }
}

function validateFormNumber(String y, int x, String htmltag, String htmllabel) {
  
  var numbers = /^[0-9]+$/;
      
  if (y.match(numbers)) {
    return true;
  }
  else 
  { 
	document.getElementById("ErrorBox").innerHTML("Phone Numbers must be all digits");
	if(x == 1)
	{
		//change color of html to on add contact to red
		document.getElementById(htmltag).style.borderColor = "red";
        	document.getElementById(htmltag).style.borderStyle = "solid";
        	document.getElementById(htmllabel).style.color = "red";
	}
	if(x == 2)
	{
		//change color of html to on edit contact to red
	}
	return false; 
  }
}

function validateFormEmail(String y, int x, String htmltag, String htmllabel) {

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(y)) {
    	return true;
  }
  else 
  { 
	document.getElementById("ErrorBox").innerHTML("That is not a valid Email");
	if(x == 1)
	{
		//change color of html to on add contact to red
		document.getElementById(htmltag).style.borderColor = "red";
        	document.getElementById(htmltag).style.borderStyle = "solid";
        	document.getElementById(htmllabel).style.color = "red";
	}
	if(x == 2)
	{
		//change color of html to on edit contact to red
	}
	return false; 
  }
}

//-------------------------------------------------------------------------------