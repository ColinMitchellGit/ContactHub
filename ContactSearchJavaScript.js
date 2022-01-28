//Global
var UserId = '0'; //not sure how I am getting this...
const urlBase = 'http://contactmanager15.xyz/LAMPAPI';
const extension = 'php';
let url = urlBase + '/ReadContacts.' + extension;

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

var searchTextStr = document.getElementById("searchText").value;

let jsonSearchPayload = {userID:UserId,search:searchTextStr};
let jsonPayload = JSON.stringify( jsonSearchPayload );

let url = urlBase + '/ReadContacts.' + extension;

var xhr = new XMLHttpRequest();
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
xhr.send(jsonPayload);

var TableContents = UnpackPayload();

SetTable(TableContents);
}

//Note: payload format

  //"userID": 1,
  //"search": "gmail"

//-------------------------------------------------------------------------

SetTable(var tableElements){


//http://www.jquery-bootgrid.com/Examples#data
//refering to this for table management, many questions
var grid = $("#grid-command-buttons").bootgrid({
    ajax: true,
    post: function ()
    {
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/api/data/basic",
    formatters: {
        "commands": function(column, row)
        {
            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash-o\"></span></button>";
        }
    }
}).on("loaded.rs.jquery.bootgrid", function()
{
    /* Executes after data is loaded and rendered */
    grid.find(".command-edit").on("click", function(e)
    {
        //alert("You pressed edit on row: " + $(this).data("row-id"));



    }).end().find(".command-delete").on("click", function(e)
    {
        alert("You pressed delete on row: " + $(this).data("row-id"));


    });
});

}

//------------------------------------------------------------------------

UnpackPayload(){


//can I use a json fuction.... to parse into a 2d array.




return TableArray;
}


//------------------------------------------------------------------------

//needs edit html box
UpdateContact(){

var EditFname = document.getElementById("EditContactFirstName").value;
var EditLname = document.getElementById("EditContactLastName").value;
var EditNumber = document.getElementById("EditContactNumber").value;
var EditEmail = document.getElementById("EditContactEmail").value;
var SelectedContactID = document.getElementById("ContactID").value;

if(validateFormEmpty(EditFname) && validateFormEmpty(EditLname) && validateFormEmpty(EditNumber) && validateFormEmpty(EditEmail))
{
	if(validateFormNumber(EditNumber) && validateFormEmail(EditEmail))
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
		xhr.send(jsonPayload);

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
if(validateFormEmpty(newFname) && validateFormEmpty(newLname) && validateFormEmpty(newNumber) && validateFormEmpty(newEmail))
{
	if(validateFormNumber(newNumber) && validateFormEmail(newEmail))
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

function validateFormEmpty(String y) {
  var x = y
  if (x == "") {
	//alert("All fields must be filled out");
	
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
  else 
  { 
	//alert("Phone Numbers must be all digits");
	
	return false; 
  }
}

function validateFormEmail(String y) {
  var x = y
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)) {
    	return true;
  }
  else 
  { 
	//alert("That is not a vaild Email");
	
	return false; 
  }
}

//-------------------------------------------------------------------------------