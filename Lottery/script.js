//powerball rules 5 white balls (1-69) 1 red (1-26)
$(document).ready(function(){
	var ticket=[]=playPowerBall();
	$("ticket1").html(ticket[0]);
	$("ticket2").html(ticket[1]);
	$("ticket3").html(ticket[2]);
	$("ticket4").html(ticket[3]);
	$("ticket5").html(ticket[4]);
	$("ticket6").html(ticket[5]);
	
	$("#single-play").on("click", function() {
		var arr=playPowerBall();
		
		$("#num1").html(arr[0]);
		$("#num2").html(arr[1]);
		$("#num3").html(arr[2]);
		$("#num4").html(arr[3]);
		$("#num5").html(arr[4]);
		$("#num6").html(arr[5]);
  });
  
  $("#random-ticket").on("click",function(){
	  	var arr=playPowerBall();
		
		$("#ticket1").html(arr[0]);
		$("#ticket2").html(arr[1]);
		$("#ticket3").html(arr[2]);
		$("#ticket4").html(arr[3]);
		$("#ticket5").html(arr[4]);
		$("#ticket6").html(arr[5]);
  })
 
});

function randomBall(max)
{
	return Math.ceil(Math.random()*max);
}

function playGame( game)
{
	switch(game)
	{
		case "powerball": break;
		case "mega":break;
	}
}

function playPowerBall()
{
	//powerball rules 5 white balls (1-69) 1 red (1-26)
	var arr=[randomBall(69),randomBall(69),randomBall(69),randomBall(69),randomBall(69),-1];
	
	while(true)
	{
		//check index 1 for repeats
		if(arr[0]==arr[1])
			arr[1]=randomBall(69);
		
		break;
	}
	
		while(true)
	{
		//check index 2 for repeats
		if(arr[0]==arr[2])
			arr[2]=randomBall(69);
		if(arr[1]==arr[2])
			arr[2]=randomBall(69);
		
		break;
	}
	
		while(true)
	{
		//check index 3 for repeats
		if(arr[0]==arr[3])
			arr[3]=randomBall(69);
		if(arr[1]==arr[3])
			arr[3]=randomBall(69);
		if(arr[2]==arr[3])
			arr[3]=randomBall(69);
		
		break;
	}
	
	while(true)
	{
		//check index 4 for repeats
		if(arr[0]==arr[4])
			arr[4]=randomBall(69);
		if(arr[1]==arr[4])
			arr[4]=randomBall(69);
		if(arr[2]==arr[4])
			arr[4]=randomBall(69);
		if(arr[3]==arr[4])
			arr[3]=randomBall(69);
		
		break;
	}
	
	arr[5]=randomBall(26);
	console.log("powerball: "+arr[0]+" "+ arr[1]+" " + arr[2] + " " +arr[3]+ " " + arr[4]+ " "+arr[5] );
	return arr;
}

