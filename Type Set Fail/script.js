var input="";
var current_word="cat";
var _MAX_SIZE=15;
var match=0;
var phase=2; // phase 0=welcome, phase 1= info, phase 2=gameplay, phase 3=round over
var paste=false;

$(document).ready(function(){
	
	
  
	
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
	$("#test").html(new_char);
	
	//truncate the text box value if it exceeds the maximum character size
	if(text_box_value.length>_MAX_SIZE)
	{
		var temp=text_box_value.slice(text_box_length-_MAX_SIZE,text_box_length);
		//document.getElementsByClassName("text-box")[0].value=temp;
		text_box_value=temp;
		
	}
	
	text_box_value=text_box_value.toUpperCase();
	document.getElementsByClassName("text-box")[0].value=text_box_value;
	input=text_box_value;
	
	//check for a match
	
	if(text_box_value.includes(current_word.toUpperCase()) )
	{
			match=1;
	}
}

function win()
{
	$("#test").html("winner!");
	phase=3;
}

function lose(){
	$("#test").html("loser!");
	phase=3;
}

