function getScramble(scrambles)
{
	//function receives the number of swaps that should be made in the array and returns an array that has had that many swaps made
	
	var result=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]; //default array, consistent with letter in alphabetical order
	
	for(var i=0; i<scrambles/2; i++)
	{
		var swap_a=Math.floor(Math.random()*26);
		var swap_b=Math.floor(Math.random()*26);
		
		var swap=result[swap_a];
		result[swap_a]=result[swap_b];
		result[swap_b]=swap;
		
	}
	
	if(checkValidity)
	return result;
	else
		return getScramble(difficulty);
}

function checkValidity( scramble)
{
	var bucket=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	
	for(var i=0; i<26; i++)
	{
		bucket[scramble[i]-65]=1;
	}
	
	var all_1=true;
	
	for(var i=0; i<26; i++)
	{
		if(bucket[i] != 1)
		{
			all_1=false;
			break;
		}
	}
	
	return all_1;
}