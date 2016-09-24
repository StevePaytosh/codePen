var leading_team="A";
$(document).ready(function(){
  
  //default test values
 // runTest();

  $("#calculate").on("click", function(){
  var values=getFormValues();
  var results=calculateMagicNumber(values);
  $("#result").html("Magic Number <br>" + "Team " + leading_team + ": "  + results);
  })
  
   $("#clear").on("click", function(){
    $("#result").html("");
	document.getElementById("total_games").value="games per season";
  document.getElementById("team_a_wins").value="wins";    
  document.getElementById("team_a_losses").value="losses";  
  document.getElementById("team_b_wins").value="wins";
  document.getElementById("team_b_losses").value="losses";
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
 // values.push(getElementValue("team_a_wins"));
    values.push( document.getElementById("total_games").value);
    values.push( document.getElementById("team_a_wins").value);
    
     values.push( document.getElementById("team_a_losses").value);
    
     values.push( document.getElementById("team_b_wins").value);
    
     values.push( document.getElementById("team_b_losses").value);
  
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
  return values[0]-values[1]-values[4]+1; 
}