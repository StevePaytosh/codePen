var leading_team=true;
$(document).ready(function(){
  
  //default test values
 // runTest();

  $("#calculate").on("click", function(){
  var values=getFormValues();
  if(values == -1)
  {
	  //if there is a bad form value, display an error
	     $("#result").html("Error<br>Invalid Input");
  }
  else
  {
	  //if all the values are good, attempt to calculate a magic number
		var results=calculateMagicNumber(values);
  
		if(results==-1)
		{
			$("#result").html("Error<br>Invalid Input");
		}
		else
		{
			$("#result").html("Magic Number <br>" + "Team " + getLeadingTeam() + ": "  + results);
		}
  }
  })
  
   $("#clear").on("click", function(){
    $("#result").html("");
	document.getElementById("total_games").value="games per season";
  document.getElementById("team_a_wins").value="wins";    
  document.getElementById("team_a_losses").value="losses";  
  document.getElementById("team_b_wins").value="wins";
  document.getElementById("team_b_losses").value="losses";
  leading_team=true;
  })
 	
  
});  


function runTest(){
  document.getElementById("total_games").value=162;
  document.getElementById("team_a_wins").value=83;    
  document.getElementById("team_a_losses").value=59;  
  document.getElementById("team_b_wins").value=76;
  document.getElementById("team_b_losses").value=66;

};

function getFormValues()
{
    var values=[];
    values.push( document.getElementById("total_games").value);
    values.push( document.getElementById("team_a_wins").value);
     values.push( document.getElementById("team_a_losses").value);
     values.push( document.getElementById("team_b_wins").value);
     values.push( document.getElementById("team_b_losses").value);
	 
	 for(var i=0; i<values.length; i++)
	 {
		if(!isNaN(values[i]))
		{
			values[i]=parseInt(values[i]);
		}
		else
		{
			return -1;
		}
	 }
  
  return values;
}

function getElementValue(elementID)
{
  return document.getElementById(elementID).value;
}

function calculateMagicNumber(values)
{
  console.log("total games: " + values[0]);
  console.log("Team A Wins: "+ values[1]);
  console.log("Team B Losses: "+ values[4]);
  
  if(values[1]+values[2]>values[0] || values[3]+values[4]>values[0] )
  {
	  //reurn an error if either team has played more games than the schedule dictates
	  console.log("A Team Has Played More Games Than Possible");
	  return -1;
  }
  //check that team a is leading team b, if not switch them
  if(values[1]<values[3])
  {
	  values=swapTeams(values);
	  return calculateMagicNumber(values);
	  
  }
  //check if team a and team b are tied for wins
  if(values[1]==values[3])
  {
	  //if team b has fewer losses, swap teams in the array
	  if(values[2]>values[4])
	  values=swapTeams(values);
	  return calculateMagicNumber(values);
  }
  return values[0]-values[1]-values[4]+1; 
}

function getLeadingTeam()
{
	return leading_team?"A":"B";
}
function swapTeams(values)
{
	 var temp=values[1];
	  values[1]=values[3];
	  values[3]=temp;
	  
	  leading_team!= leading_team;
	  
	  return values;
}