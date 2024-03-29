// Setting up query link for ease of use in functions.
const urlBase = 'https://rectangular-toothsome-stoat.glitch.me/LAMPAPI';
const extension = 'php';

// Declaring variables to store user info once logged in.
let userId = 0;
let firstName = "";
let lastName = "";
let globalContactID = 0;

function doForgot()
{
    let username = document.getElementById("verifyUser").value;
    let secq1 = document.getElementById("verifySecQ1").value;
    let secq2 = document.getElementById("verifySecQ2").value;

    var option = 1;

    let temp = {option:option,login:username,secQuestion1:secq1,secQuestion2:secq2};
    let jsonPayload = JSON.stringify( temp );

    console.log(JSON.stringify( temp ));
    let url = urlBase + '/ForgotPassword.' + extension;
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        console.log("Hit the try");
        xhr.send(jsonPayload)
	    console.log("json payload in the air");
        xhr.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status === 200)
            {
                console.log("Status good!");
                let jsonObject = JSON.parse( xhr.responseText );
                error = jsonObject.info;
                console.log(jsonObject);

                if (error != "")
                {
                    console.log(error);
                    return;
                }

                console.log("Success!");

                saveCookie();

                // take to the place where you tupe new password
                setTimeout(function(){document.location.href = "resetPassword.html"},200);
            }

        }
    }
    catch (err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doReset()
{
    let username = document.getElementById("confirmUser").value;
    let newPassword = document.getElementById("resetPassword").value;
    var option = 2;

    let temp = {option:option,login:username,newPassword:newPassword};
    let jsonPayload = JSON.stringify( temp );

    console.log(JSON.stringify( temp ));
    let url = urlBase + '/ForgotPassword.' + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        console.log("Hit the try");
        xhr.send(jsonPayload)
	    console.log("json payload in the air");
        xhr.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status === 200)
            {
                console.log("Status good!");
                let jsonObject = JSON.parse( xhr.responseText );
                error = jsonObject.info;

                if (error != "Password updated")
                {
                    console.log("Failed...returning");
                    return;
                }

                console.log("Success!");

                saveCookie();

                window.location.href = "index.html";
            }

        }
    }
    catch (err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doRegister()
{
    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    let firstName = document.getElementById("newFirstName").value;
    let lastName = document.getElementById("newLastName").value;
    let secq1 = document.getElementById("secQuestion1").value;
    let secq2 = document.getElementById("secQuestion2").value;

	// If any of the fields are blank, we abort out of registering since every field is required.
	if (username == "" || password == "" || firstName == "" || lastName == "" || secq1 == "" || secq2 == "")
	{
		console.log("A required field for registration is missing.");
		return;
	}

    let temp = {firstName:firstName,lastName:lastName,login:username,password:password,secQuestion1:secq1,secQuestion2:secq2};
    let jsonPayload = JSON.stringify( temp );

    console.log(JSON.stringify( temp ));
    let url = urlBase + '/Register.' + extension;
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        console.log("Hit the try");
        xhr.send(jsonPayload)
		console.log("json payload in the air");
        xhr.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status === 200)
            {
                console.log("Status good!");
                let jsonObject = JSON.parse( xhr.responseText );
                error = jsonObject.error;

                if (error != "")
                {
                    console.log("Failed...returning");
                    // register failed for some reason
                    return;
                }

                console.log("Success!");

                saveCookie();
                setTimeout(function(){document.location.href = "index.html"},200);
            }

        }
    }
    catch (err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doLogin()
{
	// Grabbing the username and password from the input fields.
    let login = document.getElementById("usernameField").value;
    let password = document.getElementById("passwordField").value;

	//var hash = md5( password );

    //document.getElementById("loginResult").innerHTML = "";

	// Setting up JSON object to be sent to the API, looks like this:
	// {
	//    "login": login,
	//	  "password": password
    // }
    let tmp = {login:login,password:password};
    //var tmp = {login:login,password:hash};

	// Converting the simple string version of the object to actual JSON.
    let jsonPayload = JSON.stringify( tmp );

	// Setting up the full link for the Login API query.
    let url = urlBase + '/Login.' + extension;

	// Creating a new API request object.
    let xhr = new XMLHttpRequest();

	// Giving the API object the link to the Login API and other necessary info.
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
		// We send the API query and wait for it to return.
		// The API queries are "asynchronous", which means that other
		// code can run in the background while the query is pending.
		xhr.send(jsonPayload);

		// Once the API query returns and is noted as ready, this function triggers.
        xhr.onreadystatechange = function()
        {
			// This tells if the query has returned and everything is correct with it.
            if (this.readyState === 4 && this.status === 200)
            {
				// Parsing the returned information from the query to a JSON object.
                let jsonObject = JSON.parse( xhr.responseText );

				// Getting the user's ID from the JSON object and storing it.
                userId = jsonObject.id;

				// If the user ID is less than 1, the API query found that no user exists in the database
				// with the given username and password.
                if( userId < 1 )
                {
                    //document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					// If we did not find any user, we exit the function.
                    return;
                }

				// Getting here means we successfully found a user in the database, so we save the user's information.
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

				// We save a cookie so that the user that logged in will have a max of 20 minutes on the website before
				// automatically getting logged out.
                saveCookie();

                window.location.href = "cover.html";
            }
        };
    }
    catch(err)
    {
		// This is just catching any error that may have occurred while sending a query to the API.
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doAddContact()
{
    let firstName = document.getElementById("addFirst").value;
    let lastName = document.getElementById("addLast").value;
    let phoneNumber = document.getElementById("addPhone").value;
    let email = document.getElementById("addEmail").value;

    let temp = {firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,email:email,userID:userId};
    let jsonPayload = JSON.stringify( temp );
    let url = urlBase + '/CreateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(jsonPayload);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                error = jsonObject.error;
                if (error != "") {
                    console.log(error);
                    return;
                }

                resetContactTable();
                doReadContacts();

                window.location.href = "cover.html";
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

function doEditContact()
{
    let firstName = document.getElementById("newFirst").value;
    let lastName = document.getElementById("newLast").value;
    let phoneNumber = document.getElementById("newPhone").value;
    let email = document.getElementById("newEmail").value;

    let temp = {firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,email:email,userID:userId,contactID:globalContactID};
    let jsonPayload = JSON.stringify( temp );
    let url = urlBase + '/UpdateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.send(jsonPayload);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                error = jsonObject.info;
                if (error != "") {
                    console.log(error);
                    return;
                }

                resetContactTable();
                doReadContacts();
            }
        }
    }
    catch (err)
    {
        console.log(err);
    }
}

function doDeleteContact(contactID)
{
	if (confirm("Are you sure you want to delete this contact?"))
	{
  	} else {
    	return;
  	}

    let temp = {userID:userId,contactID:contactID};
    let jsonPayload = JSON.stringify( temp );

    let url = urlBase + '/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(jsonPayload);

        xhr.onreadystatechange = function()
        {
            if (this.readyState === 4 && this.status === 200)
            {
                let jsonObject = JSON.parse( xhr.responseText );
                error = jsonObject.error;

                if (error != "")
                {
                    console.log(error);
                    resetContactTable();
                    return;
                }

				// Resetting the table and reading the updated list of contacts back into it.
				resetContactTable();
				doReadContacts();
            }
        }
    }
    catch (err)
    {
        console.log(err);
    }
}

function doReadContacts()
{
	// Reading cookie so we can get the User's ID
	readCookie();

	let searchTerm = document.getElementById("searchBar").value;

	console.log("UserID: " + userId);
	console.log("Search term: " + searchTerm);

	let tmp = {userID:userId,search:searchTerm};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/ReadContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		// We send the API query and wait for it to return.
		// The API queries are "asynchronous", which means that other
		// code can run in the background while the query is pending.
		xhr.send(jsonPayload);

		// Once the API query returns and is noted as ready, this function triggers.
		xhr.onreadystatechange = function()
		{
			// This tells if the query has returned and everything is correct with it.
			if (this.readyState === 4 && this.status === 200)
			{
				// Parsing the returned information from the query to a JSON object.
				let jsonObject = JSON.parse( xhr.responseText );

				// If we encounter an error we know its because no contacts where found.
				// So we just empty the table and return.
				if (jsonObject.error != "")
				{
					console.log(jsonObject.error);
					resetContactTable();
					return;
				}

				// Storing just the contacts in their own array.
				let contactArray = jsonObject.results;
				console.log(contactArray + "\n");

				// Resetting the contact table to be empty so we don't have any repeating
				// contacts in the list when we append new ones.
				resetContactTable();

				// Grabbing the table to add/delete rows.
				let table = document.getElementById("myTable");

				for (var i = 0; i < contactArray.length; i++)
				{
					// Adding a max number of contacts that can be added to the table
					if (i == 30)
					{
						break;
					}

					// Grabbing contact info
					let contactFirstName = contactArray[i].firstName;
					let contactLastName = contactArray[i].lastName;
                    let phone = contactArray[i].phoneNumber;
					let phoneNumber = convertNumber(contactArray[i].phoneNumber);
					let email = contactArray[i].email;
					let contactID = contactArray[i].contactID;

					// Inserting in the second row slot since we have a header row.
					let row = table.insertRow(i + 1);

					row.onclick = function()
					{
						row.setAttribute("data-bs-toggle", "modal");
						row.setAttribute("data-bs-target", "#myModal3");
                        globalContactID = contactID;
						document.getElementById("contactFirst").value = contactFirstName;
					    document.getElementById("contactLast").value = contactLastName;
					    document.getElementById("contactPhone").value = phoneNumber;
					    document.getElementById("contactEmail").value = email;
					}

					// Adding the first cell which is just the contact's full name.
					let data1 = row.insertCell(0);
					data1.innerHTML = contactFirstName + " " + contactLastName;

                    let data3 = row.insertCell(1);
					data3.innerHTML = email;

                    let data4 = row.insertCell(2);
					data4.innerHTML = phoneNumber;

					// Adding the second cell which contains the edit and delete buttons.
					let data2 = row.insertCell(3);

					// Creating and applying attributes to buttons, then appending them.
					let button1 = document.createElement("button");
					button1.type = "button";
					button1.className = "button1 mt-3 mb-5";
					button1.setAttribute("data-bs-toggle", "modal");
					button1.setAttribute("data-bs-target", "#myModal2");
					button1.innerHTML = "Edit  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-fill\" style=\"padding-bottom: 4px;\" viewBox=\"0 0 16 16\">\n" +
                        "                            <path d=\"M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z\"/>\n" +
                        "                        </svg>";
                    button1.onclick = function()
					{
						globalContactID = contactID;

						document.getElementById("newFirst").value = contactFirstName;
					    document.getElementById("newLast").value = contactLastName;
					    document.getElementById("newPhone").value = phone;
					    document.getElementById("newEmail").value = email;
					};

					button1.style.marginRight = "5px";
					data2.appendChild(button1);

					let button2 = document.createElement("button");
					button2.type = "button";
					button2.className = "button1 mt-3 mb-5";
					button2.onclick = function() {doDeleteContact(contactID);doReadContacts();};
					button2.innerHTML = "Delete <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3-fill\" style=\"padding-bottom: 4px;\" viewBox=\"0 0 16 16\">\n" +
                        "                                <path fill-rule=\"evenodd\" d=\"M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z\"/>\n" +
                        "                            </svg>";
					data2.appendChild(button2);
				}
			}
		};
	}
	catch(err)
	{
		console.log(err);
	}

}

function convertNumber(number)
{
    let dashPhoneNumber = "(";
    for (var i = 0; i < number.length; i++)
    {
        if (i == 3)
        {
            dashPhoneNumber += ")-";
        }
        if (i == 6)
        {
            dashPhoneNumber += "-";
        }
        dashPhoneNumber += number[i];
    }

    return dashPhoneNumber;
}

function doWelcome()
{
    document.getElementById("welcome").innerHTML = "Welcome, " + firstName + "!"
}

function resetContactTable()
{
	let table = document.getElementById("myTable");

	// This is just deleting every row but the table header row
	for (var i = 1; i< table.rows.length;){
		table.deleteRow(i);
    }
}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++)
    {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if( tokens[0] === "firstName" )
        {
            firstName = tokens[1];
        }
        else if( tokens[0] === "lastName" )
        {
            lastName = tokens[1];
        }
        else if( tokens[0] === "userId" )
        {
            userId = parseInt( tokens[1].trim() );
        }
    }

    // if( userId < 0 )
    // {
    //     window.location.href = "index.html";
    // }
    // else
    // {
    //     //document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
    // }
}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function addColor()
{
    let newColor = document.getElementById("colorText").value;
    document.getElementById("colorAddResult").innerHTML = "";

    let tmp = {color:newColor,userId,userId};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/AddColor.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                document.getElementById("colorAddResult").innerHTML = "Color has been added";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("colorAddResult").innerHTML = err.message;
    }

}

function searchColor()
{
    let srch = document.getElementById("searchText").value;
    document.getElementById("colorSearchResult").innerHTML = "";

    let colorList = "";

    let tmp = {search:srch,userId:userId};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/SearchColors.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
                let jsonObject = JSON.parse( xhr.responseText );

                for( let i=0; i<jsonObject.results.length; i++ )
                {
                    colorList += jsonObject.results[i];
                    if( i < jsonObject.results.length - 1 )
                    {
                        colorList += "<br />\r\n";
                    }
                }

                document.getElementsByTagName("p")[0].innerHTML = colorList;
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("colorSearchResult").innerHTML = err.message;
    }

}
