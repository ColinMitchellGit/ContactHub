
function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

window.onload() = function()
{
	doReadContacts();
}

function doReadContacts()
{
    let searchTerm = document.getElementById("searchBar").value;

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

				if (jsonObject.error != "")
				{
					return;
				}

				let contactArray = jsonObject.results;

				console.log(contactArray);
				/*
				for (var i = 0; i < contactArray.length; i++) {
					let firstName = contactArray[i].firstName;
					let lastName = contactArray[i].lastName;
					let phoneNumber = contactArray[i].phoneNumber;
					let email = contactArray[i].email;
					let contactID = contactArray[i].contactID;
				}*/
            }
        };
    }
    catch(err)
    {
		console.log(err);
    }

}
