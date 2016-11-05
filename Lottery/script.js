//powerball rules 5 white balls (1-69) 1 red (1-26)

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
	var arr=[randomBall(69),randomBall(69),randomBall(69),randomBall(69),randomBall(69)];
	
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
	
	console.log("powerball: "+arr[0]+" "+ arr[1]+" " + arr[2] + " " +arr[3]+ " " + arr[4]+ " "+randomBall(26) );
}

