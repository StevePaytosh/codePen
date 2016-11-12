//powerball rules 5 white balls (1-69) 1 red (1-26)
var games_played=0;
var total_won=0;
var total_spent=0;
var current_wager=0;
var won_this_draw=0;
var ticket=[];
var pull=[];
var current_game="powerball";
$(document).ready(function(){
	ticket=playPowerBall();
	setTicket(ticket);

	$("#single-play").on("click", singlePlay );
	$("#win-play").on("click",playTillWin);
	$("#jackpot-play").on("click",playTillJackpot);
	$("#reset-stats").on("click",function(){
		games_played=0;
		total_won=0;
		total_spent=0;
		current_wager=0;
		won_this_draw=0;
		updateStats();
	});
	$(".game").on("click",function(){
		
		console.log(this);
	});
  
  $("#random-ticket").on("click",function(){
	  	ticket=playPowerBall();
		
		$("#ticket1").html(ticker[0]);
		$("#ticket2").html(ticket[1]);
		$("#ticket3").html(ticket[2]);
		$("#ticket4").html(ticket[3]);
		$("#ticket5").html(ticket[4]);
		$("#ticket6").html(ticket[5]);
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
	arr=[randomBall(69),randomBall(69),randomBall(69),randomBall(69),randomBall(69),-1];
	
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
//	console.log("powerball: "+arr[0]+" "+ arr[1]+" " + arr[2] + " " +arr[3]+ " " + arr[4]+ " "+arr[5] );
	return arr;
}

function calculateMatches(game)
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
				//results.highlight_ticket[whiteBallCount-1]=i;
				//results.highlight_pull[whiteBallCount-1]=j;
				results.highlight_ticket.push(i);
				results.highlight_pull.push(j);
			}
		}
	}
	
	if (whiteBallCount==0 && !matchesPB) //if nothing matches, return 0
		return 0;
	
	//if something matches, determine what is won based on the game
	results.payout=calculateWinnings(whiteBallCount,matchesPB,game);
	console.log("results:\nticket:"+results.highlight_ticket+"\npull: "+ results.highlight_pull+"\n payout: "+results.payout+"\n");
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

function setTicket()
{
	for(var i=0;i<ticket.length;i++)
	{
		$("#ticket"+(i+1)).html(ticket[i]);
	}
}

function setPull()
{
	for(var i=0;i<pull.length;i++)
	{
		$("#num"+(i+1)).html(pull[i]);
	}
}

function singlePlay()
{
	current_wager=2;
		games_played++;
		total_spent+=current_wager;
		pull=playPowerBall();

		setTicket(ticket); //clear any marks from the ticket
		setPull(pull);
		
		//calculate winnings
		var results=calculateMatches("powerball");
		if(results!=0)
		{
			highlightMatches(results);
			won_this_draw=results.payout;
			total_won+=won_this_draw;
		}
		
		//print out stats
		updateStats();
		
		won_this_draw=0; 
		return results;
}

function playTillWin()
{
	while(true)
	{
		var results=singlePlay();
		if(results.payout>0)
			break;
	}
}

function playTillJackpot()
{
	var results
	for(var i=0; i<100;i++)
	{
		current_wager=2;
		games_played++;
		total_spent+=current_wager;
		pull=playPowerBall();

		setTicket(); //clear any marks from the ticket
		setPull();
		
		//calculate winnings
		results=calculateMatches("powerball");
		if(results!=0)
		{
		//	highlightMatches(results);
			won_this_draw=results.payout;
			total_won+=won_this_draw;
		}
		
		//print out stats
		//updateStats();
		
		won_this_draw=0; 
		
		if(results.payout=="Jackpot")
			break;
	}
	
	if(results!=0)
		highlightMatches(results);
	updateStats();
}

function updateStats()
{
	$("#wager").html("&nbsp;$"+current_wager);
		$("#games-played").html("&nbsp;"+games_played);
		$("#amount-won").html("&nbsp;$"+total_won);
		$("#amount-played").html("&nbsp;$"+total_spent);
		$("#draw-won").html("&nbsp;$"+won_this_draw);
		
}

function highlightMatches(results)
{
	//input is an object that contains an array to highlight ticket and pull numbers, payout and powerball match
	
	//console.log("match found\nticket: "+results.highlight_ticket+"\npull: "+results.highlight_pull+"\nticket: "+ticket+"\npull   :"+pull+"\n");
	for(var i=0;i<(results.highlight_ticket).length;i++)
	{
		$("#ticket"+(results.highlight_ticket[i]+1)).html("<mark>"+ticket[results.highlight_ticket[i]]+"</mark>");
		$("#num"+(results.highlight_pull[i]+1)).html("<mark>"+pull[results.highlight_pull[i]]+"</mark>");
	}
		
	if(results.pbMatch)
	{
		$("#ticket"+(ticket.length) ).html("<mark>"+ticket[ticket.length-1]+"</mark>");
		$("#num"+(pull.length) ).html("<mark>"+pull[arr.length-1]+"</mark>");
	}
	

}

function check()
{
	var buttons=document.getElementsByTagName("input");
	for (var i=0; i<buttons.length; i++)
	{
		if(buttons[i].checked)
		{
			changeSettings(buttons[i].name,buttons[i].value);
		}
	}
}

function changeSettings(a,b)
{
	if(a=="game")
	{
		switch(b)
		{
			case "mega": current_game="mega"; current_wager=1;break;
			case "powerball": current_game="powerball"; current_wager=2;break;
			case "pick5": current_game="pick5"; current_wager=1;break;
			case "pick3": current_game="pick3"; current_wager=1;break;
		}
	}
	else if(a="custom-ticket")
	{
		//
	}
	
	
}