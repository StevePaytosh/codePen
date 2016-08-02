var input="";
var current_word="cat";
var _MAX_SIZE=15;
var _MAX_TIME=10; //time is seconds to enter the given value
var match=0;
var phase=0; // phase 0=welcome, phase 1= info, phase 2=gameplay, phase 3=round over
var paste=false;
//var no_scramble=[ ["A","A"],["B","B"],["C","C"],["D","D"],["E","E"],["F","F"],["G","G"],["H","H"],["I","I"],["J","J"],["K","K"],["L","L"],
//	["M","M"],["N","N"],["O","O"],["P","P"],["Q","Q"],["R","R"],["S","S"],["T","T"],["U","U"],["V","V"],["W","W"],["X","X"],["Y","Y"],["Z","Z"] ];
//var no_scramble=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var no_scramble=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];
var current_scramble; //contains the 1-to-1 mapping of characters used to dechipher a keys true value in the game, only capital A-Z are listed
var diff_scramble; //highlights the differces in the current and no scramble

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
	
//	$("#test").html(new_char);
	input+=new_char;
	
	//truncate the text box value if it exceeds the maximum character size
	if(input.length>_MAX_SIZE)
	{
		input=input.slice(text_box_length-_MAX_SIZE,text_box_length);
		//document.getElementsByClassName("text-box")[0].value=temp;
	//	text_box_value=temp;
		
	}
	
	//text_box_value=text_box_value.toUpperCase();
	document.getElementsByClassName("text-box")[0].value=input;
	//input=text_box_value;
	
	//check for a match
	
	if(input.includes(current_word.toUpperCase()) )
	{
			match=1;
	}
}

function win()
{
	$("#info-block").html("winner!");
	$(".restart-btn").html("Next");
	//$("#test").html("winner!");
//	$(".text-box").html("Winner!!");
	phase=3;
}

function lose(){
	//$("#test").html("loser!");
	$(".restart-btn").html("Next");
	$("#info-block").html("loser!");
//	$(".text-box").html("Winner!!");
	phase=3;
}

function setPhase0(){
	//phase 0, welcome
	$("#play-block").html("Welcome to TYPE SET FAIL:<p>The name of the game is to type whatever word comes up.<br><p>Simple Right?<br>"+
	"The catch is that the keys you type are scrambled.<br><br>You can do that, can't you?<br>"+
	"You'll only have a few seconds to do it.<p> While playing, don't worry about deleting wrong characters:<br>"
	+" As long as you have the right characters in the right order, you'll be fine.<p>You'll also be able to view which letters" +
	" are scrambled. <p> Don't cry, it'll be over quickly");
	
	$(".scramble-btn").hide();
	$(".restart-btn").html("Let's Play");
	phase=0;
}

function setPhase1()
{
	//create a new round. 
	current_word=getWord();
	current_scramble=setScramble(); //get a scramble and test that it is valid
	diff_scramble=getScrambledChars();
	$("#info-block").html("");
	$("#type").html("TYPE: --");
	$("#timer").html("TIME LEFT: --");
	$(".restart-btn").html("Start Round");
	$("#play-block").html("Here are your scrambled letters... <p>"+ displayDiff() +"Your next word is " + current_word.length + " letters long");
	phase=1;
	
	
}

function setPhase2()
{
	//move into gameplay
	$("#play-block").html("<input type=\"text\" value=\"\" class=\"text-box\">"); //set the text box for play
	$(".restart-btn").html("Give Up");
	$("#type").html("TYPE: " + current_word);
	var max_time=10;
	$("#timer").html("TIME LEFT: " + max_time + "seconds");
	phase=2;
	
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
}

function getWord()
{
	//get a randomly selected word
	//abstract the word selection code to another piece of js
	var choices=["cat","dog", "mug", "sauna", "bath", "car"];
	var x=Math.floor(Math.random()*6);
	return choices[x];
}

function setScramble()
{
	//set an array for scrambled characters
	var sample_scramble=[70,66,67,68,69,65,71,72,73,74,75,77,85,78,79,80,81,82,83,84,76,86,87,88,89,90];
	return sample_scramble;
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
		result+=String.fromCharCode(no_scramble[diff_scramble[i++]]) + " --> " + String.fromCharCode(diff_scramble[i]) + "<p>";
	}
	
	return result;
}