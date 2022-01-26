Global
var UserId = '0';

//------------------------------------------------------------------------

searchContact(){

var searchTextStr = document.getElementById("searchText").value;

var jsonSearchPayload = '{"userID": '+ UserId + '"search": '+ searchTextStr +"'}';

var xhr = new XMLHttpRequest();
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
xhr.send(jsonSearchPayload);
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
addNewContact(){

var newFname = document.getElementById("NewContactFirstName").value;
var newLname = document.getElementById("NewContactLastName").value;
var newNumber = document.getElementById("NewContactNumber").value;
var newEmail = document.getElementById("NewContactEmail").value;

var jsonNewContactPayload = 
'{
"firstName":"'+ newFname +'",
"lastName":"'+ newLname +'",
"phoneNumber":"'+ newNumber +'",
"email":"'+ newEmail +'",
"userID":"'+ UserId +"
'}';

var xhr = new XMLHttpRequest();
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
xhr.send(jsonNewContactPayload);
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