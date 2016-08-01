var input="";
var current_word="cat";
var _MAX_SIZE=5;

$(document).ready(function(){
	
	var phase=0; // phase 0=welcome, phase 1= info, phase 2=gameplay, phase 3=round over
  
	
		$(".text-box").focus( function() 
		{
			
			document.onkeyup=function(){
				$(".text-box").blur();
				$(".text-box").focus();
			};
			
			if(document.getElementsByClassName("text-box")[0].value != input)
				letterPress();
		}
	);
	
	
});

function letterPress()
{
	//get the newest letter typed
	var text_box_value=document.getElementsByClassName("text-box")[0].value;
	var text_box_length=text_box_value.length;
	var new_char=text_box_value.charAt(text_box_length-1); //letter typed
	$("#test").html(new_char);
	
	//truncate the text box value if it exceeds the maximum character size
	if(text_box_value.length>_MAX_SIZE)
	{
		var temp=text_box_value.slice(text_box_length-_MAX_SIZE,text_box_length);
		document.getElementsByClassName("text-box")[0].value=temp;
		text_box_value=temp;
		
	}
	
	
	//input=text_box_value;
	//input.toUpperCase();
	text_box_value=text_box_value.toUpperCase();
	document.getElementsByClassName("text-box")[0].value=text_box_value;
	
}