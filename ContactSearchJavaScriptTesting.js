//Global
const urlBase = 'http://contactmanager15.xyz/LAMPAPI';
const extension = 'php';


function addNewContact(){

	document.getElementById("ErrorBox").innerHTML("All fields must be filled out");
}



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