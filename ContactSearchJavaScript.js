//Global
var UserId = '0';

//------------------------------------------------------------------------

function doLogout(){

//go to 

}

//------------------------------------------------------------------------

function searchContact(){

var searchTextStr = document.getElementById("searchText").value;

var jsonSearchPayload = '{"userID": '+ UserId + '"search": '+ searchTextStr +"'}';

var xhr = new XMLHttpRequest();
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
xhr.send(jsonSearchPayload);

UnpackPayload();
}

//Note: payload format
{
  "userID": 1,
  "search": "gmail"
}
//------------------------------------------------------------------------

UnpackPayload(){







return TableArray
}

//note 
//------------------------------------------------------------------------
function addNewContact(){

var newFname = document.getElementById("NewContactFirstName").value;
var newLname = document.getElementById("NewContactLastName").value;
var newNumber = document.getElementById("NewContactNumber").value;
var newEmail = document.getElementById("NewContactEmail").value;

//cleaning text
if(validateFormEmpty(newFname) && validateFormEmpty(newLname) && validateFormEmpty(newNumber) && validateFormEmpty(newEmail))
{
	if(validateFormNumber(newNumber) && )
	{
		var jsonNewContactPayload = 
		'{
		"firstName":"'+ newFname +'",
		"lastName":"'+ newLname +'",
		"phoneNumber":"'+ newNumber +'",
		"email":"'+ newEmail +'",
		"userID":"'+ UserId +"
		'}';

		document.getElementById("NewContactFirstName").innerHTML("");
		document.getElementById("NewContactLastName").innerHTML("");
		document.getElementById("NewContactNumber").innerHTML("");
		document.getElementById("NewContactEmail").innerHTML("");

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		xhr.send(jsonNewContactPayload);

	}

}

//note new contact payload
'{ 
  "firstName": "fred",
  "lastName": "jones",
  "phoneNumber": "3219493444",
  "email": "example@gmail.com",
  "userID": 1
}';
//-------------------------------------------------------------------------------
//Helper text cleaners

function validateFormEmpty(String y) {
  var x = y
  if (x == "") {
    alert("All fields must be filled out");
    return false;
  }
  else { return true; }
}

function validateFormNumber(String y) {
  var x = y
  var numbers = /^[0-9]+$/;
      
  if (x.match(numbers)) {
    return true;
  }
  else { alert("Phone Numbers must be all digits");
    return false; }
}

function validateFormEmail(String y) {
  var x = y
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)) {
    return true;
  }
  else { alert("That is not a vaild Email");
    return false; }
}

//-------------------------------------------------------------------------------