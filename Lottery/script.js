//powerball rules 5 white balls (1-69) 1 red (1-26)
var games_played=0;
var total_won=0;
var total_spent=0;
var current_wager=0;
var won_this_draw=0;
$(document).ready(function(){
	var ticket=playPowerBall();
	setTicket(ticket);
	/*$("ticket1").html(ticket[0]);
	$("ticket2").html(ticket[1]);
	$("ticket3").html(ticket[2]);
	$("ticket4").html(ticket[3]);
	$("ticket5").html(ticket[4]);
	$("ticket6").html(ticket[5]);
	*/
	$("#single-play").on("click", function() {
		current_wager=2;
		games_played++;
		total_spent+=current_wager;
		var arr=playPowerBall();

		setTicket(ticket); //clear any marks from the ticket
		setPull(arr);
		
		//calculate winnings
		var results=calculateMatches(ticket,arr,"powerball");
		
		if(results!=0)
		{
				for(var i=0;i<(results.highlight_ticket).length;i++)
				{
					$("#ticket"+results.highlight_ticket[i]).html("<mark>"+ticket[results.highlight_ticket[i]]+"</mark>");
					$("#num"+results.highlight_pull[i]).html("<mark>"+arr[results.highlight_pull[i]]+"</mark>");
				}
		}
		
		//print out stats
		$("#wager").html("$"+current_wager);
		$("#games-played").html(games_played);
		$("#amount-won").html("$"+total_won);
		$("#amount-played").html("$"+total_spent);
		$("#draw-won").html("$"+won_this_draw);
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

function calculateMatches(ticket,pull,game)
{	
	var matchesPB= ticket[ticket.length-1]==pull[ticket.length-1];
	var whiteBallCount=0;
	var results={ highlight_ticket:[], highlight_pull:[], payout:0,pbMatch:matchesPB};
	
	for(var i=0; i<ticket.length-1; i++)
	{
		for(var j=0; j<ticket.length-1; j++)
		{
			if(ticket[i]==pull[j])
			{
				whiteBallCount++;
				results.highlight_ticket[whiteBallCount-1]=i;
				results.highlight_pull[whiteBallCount-1]=j;
			}
		}
	}
	
	if(matchesPB)
		whiteBallCount--;
	
	if (whiteBallCount==0 && !matchesPB) //if nothing matches, return 0
		return 0;
	
	//if something matches, determine what is won based on the game
	results.payout=calculateWinnings(whiteBallCount,matchesPB,game);
	return results;
	
}

function calculateWinnings(whiteBallCount,matchesPB,game)
{
		/*
	5+PB = Grand Prize
	5 = 1,000,000
	4+PB = 50,000
	4 = 100
	3+PB = 100
	3 = 7
	2+PB = 7
	1 + PB = 4
	PB = 4
	*/
	
	if(game=="powerball" && matchesPB)
	{
		switch(whiteBallCount)
		{
			case 0: 
			case 1: return 4;
			case 2: return 7;
			case 3: return 100;
			case 4: return 50000;
			case 5: return "Jackpot";
			default: return 0;
		}
	}
	else if(game=="powerball")
	{
		switch(whiteBallCount)
		{
			case 0:
			case 1: 
			case 2: return 0;
			case 3: return 7;
			case 4: return 100;
			case 5: return 1000000;
			default: return 0;
		}
	}
		
}

function setTicket(ticket)
{
	for(var i=0;i<ticket.length;i++)
	{
		$("#ticket"+(i+1)).html(ticket[i]);
	}
}

function setPull(pull)
{
	for(var i=0;i<pull.length;i++)
	{
		$("#num"+(i+1)).html(pull[i]);
	}
}