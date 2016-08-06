var input="";
var current_word="cat";
var _MAX_SIZE=15;
var _MAX_TIME=20; //time is seconds to enter the given value
var round_time=20;
var current_time=20;
var timer;
var rounds_played=0;
var rounds_won=0;
var match=false;
var phase=0; // phase 0=welcome, phase 1= info, phase 2=gameplay, phase 3=round over
var paste=false;
var no_scramble=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]; //this can removed in favor of math i+65
var current_scramble; //contains the 1-to-1 mapping of characters used to dechipher a keys true value in the game, only capital A-Z are listed
var diff_scramble; //highlights the differces in the current and no scramble
var showScramble=false;

//ascii A-Z = 41 - 5A hex or 65-90 decimal for capital letters
$(document).ready(function(){
	
	
	//phase 0, welcome
	setPhase0();
	
	$(".restart-btn").on("click", function(){
		switch(phase)
		{
		case 1: setPhase2(); break;
		case 0: setPhase1(); break;
		case 2: lose(); break;
		case 3: setPhase1(); break;
		default: setPhase0(); break;
		}
	} );
	
	$(".scramble-btn").on("click", function()
	{
		//while in phase 2 (game play), if the user clicks the view scramble button, show the current scramble settings
		if(phase!=2)
			return;
		
		if(showScramble)
		{
			//set the text box with the current input
			setTextBox();
			document.getElementsByClassName("text-box")[0].value=input;
			$(".scramble-btn").html("View Scramble");
			showScramble=false;
		}
		else
		{
			//hide the text box and show the scramble
			$("#play-block").html(displayDiff() );
			$(".scramble-btn").html("Go Back");
			showScramble=true;
		}
	} );
	
	
});

function letterPress()
{
	if(phase!=2)
	{
		document.getElementsByClassName("text-box")[0].value="";
		input=text_box_value;
		$(".text-box").disabled=true;
		//$(".text-box").hide
		return;
	}
	
	if(paste)
	{
		paste=false;
		return;
	}
	
	//get the newest letter typed
	var text_box_value=document.getElementsByClassName("text-box")[0].value;
	var text_box_length=text_box_value.length;
	var new_char=text_box_value.charAt(text_box_length-1); //letter typed
	new_char=new_char.toUpperCase();//force the new char into uppercase
	
	var char_val=new_char.charCodeAt(0)-65; //get the ascii value of the typed letter, subtract 65 to get the appropriate index
	
	if(char_val>=0 && char_val<26)
	{
		//if the value is in the range of uppercase 
		new_char=String.fromCharCode(current_scramble[char_val]);
	}
	
	input+=new_char;
	
	//truncate the text box value if it exceeds the maximum character size
	if(input.length>_MAX_SIZE)
	{
		input=input.slice(text_box_length-_MAX_SIZE,text_box_length);
	}
	
	//text_box_value=text_box_value.toUpperCase();
	document.getElementsByClassName("text-box")[0].value=input;
	//input=text_box_value;
	
	//check for a match
	
	if(input.includes(current_word.toUpperCase()) )
	{
			match=true;
	}
}

function win()
{
	match=false;
	clearInterval(timer);
	//updateTimer("");
	input="";
	$(".restart-btn").html("Next");
	$("#info-block").html("WINNER!");
	phase=3;
}

function lose(){
	clearInterval(timer);
//	updateTimer("");
	input="";
	$(".restart-btn").html("Next");
	$("#info-block").html("LOSER!");
	phase=3;
}

function setPhase0(){
	//phase 0, welcome
	$("#play-block").html("Welcome to TYPE SET FAIL:<p>The name of the game is to type whatever word comes up.<br><p>Simple Right?<br>"+
	"The catch is that the keys you type are scrambled.<br><br>You can do that, can't you?<br>"+
	"You'll only have a few seconds to do it.<p> While playing, don't worry about deleting wrong characters:<br>"
	+" As long as you have the right characters in the right order, you'll be fine.<p>You'll also be able to view which letters" +
	" are scrambled. <p> Don't cry, it'll be over quickly");
	
	$(".restart-btn").html("Let's Play");
	phase=0;
}

function setPhase1()
{
	//create a new round. 
	var difficulty;
	if(rounds_played==0)
		difficulty=0;
	else
	{
		if( rounds_won/rounds_played < .25)
		difficulty=0;
		else if(rounds_won/rounds_played < .50)
		difficulty=1;
		else
		difficulty=2;
	}
	current_word=getWord(difficulty);
	current_scramble=getScramble(difficulty); //get a scramble and test that it is valid
	diff_scramble=getScrambledChars();
	round_time=getRoundTime();
	current_time=round_time;
	$("#info-block").html("");
	$("#type").html("TYPE:");
	$("#timer").html("TIME LEFT: --");
	$(".restart-btn").html("Start Round");
	$("#play-block").html("Scrambled Letters:<p>"+ displayDiff() +"<p>Word Length: " + current_word.length + " letters long<br>"
	+ "Time: " + round_time +" seconds");
	updateTimer("");
	phase=1;
	
	
}

function setPhase2()
{
	//move into gameplay
	$(".restart-btn").html("Give Up");
	$("#type").html("TYPE: " + current_word.toUpperCase());
	//$("#timer").html("TIME LEFT: " + max_time + " seconds");
	updateTime(round_time);
	phase=2;
	setTextBox();
	timer=setInterval(updateTime,1000);
	
}

function setTextBox()
{
	$("#play-block").html("<input type=\"text\" value=\"\" class=\"text-box\">"); //set the text box for play
		$(".text-box").focus( function() 
		{
			
			document.onpaste=function(e){
				e.preventDefault();
				//$("#test").html("CHEATER!!!");
				document.getElementsByClassName("text-box")[0].value="NO CHEATING!!!";
				paste=true;
			}
			
			document.onkeyup=function(){
				$(".text-box").blur();
				$(".text-box").focus();
			};
			
			if(document.getElementsByClassName("text-box")[0].value != input)
				letterPress();
			
			if(match)
				win();
			
			
		}
	);
	
	$(".text-box").focus();
}


function setScramble()
{
	//set an array for scrambled characters
	//var sample_scramble=[70,66,67,68,69,65,71,72,73,74,75,77,85,78,79,80,81,82,83,84,76,86,87,88,89,90];
	//return sample_scramble;
	if(rounds_played==0)
		return getScramble(1);
	if(rounds_won/rounds_played <.25)
	return getScramble(1);
	else if(rounds_won/rounds_played < .50)
		return getScramble(2);
	else
		return getScramble(3);
}

function getScrambledChars()
{
	var results=[];
	
	for(var i=0; i<26; i++)
	{
		if(no_scramble[i]!=current_scramble[i])
		{
			results.push(i); //push i, followed the scramble value
			results.push(current_scramble[i]);
		}
	}
	
	return results;
}

function displayDiff()
{
	var size=diff_scramble.length;
	var result="";
	
	for(var i=0; i<size; i++)
	{
		//read 2 values at a time. The first value is the antecedant (say A), the second will be the consquent (say R). 
		// if a usser types A they will get R instead, they will be in the array in that order {A,R,...}
	
		result+=String.fromCharCode(no_scramble[diff_scramble[i++]]) + " --> " + String.fromCharCode(diff_scramble[i]) + "<br>";
	}
	
	return result;
}

function updateTime()
{
	if(phase != 2)
		return;
	current_time--;
	if(current_time<=0)
	{
		lose();
		return;
	}
	updateTimer(current_time);
}

function updateTimer(value)
{
	if(value=="")
		$("#timer").html("TIME LEFT:");
	else
	$("#timer").html("TIME LEFT: " + value + " seconds");
}

function getRoundTime()
{
 return 20;
}