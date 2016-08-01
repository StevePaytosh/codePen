var input="";

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
	var x=document.getElementsByClassName("text-box")[0].value;
	var l=x.length;
	$("#test").html(x.charAt(l-1));
	input=x;
}