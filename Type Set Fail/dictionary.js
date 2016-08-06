var _dictionary=[
"add" ,
"arc" ,
"area" ,
"arena" ,
"bat" ,
"ball",
"cat",
"dog",
"rug",
"sauna",
"cat",
"ear",
"globe",
"crush",
"mouse",
"ring",
"sing",
"sell",
"sea",
"race",
"raise",
"risk",
"king",
"queen",
"jab",
"lab",
"kill",
"samurai",
"shinobi",
"shuriken",
"globe",
"pockets",
"clicker"
];

function addword(word)
{
	if(word.length>0)
		_dictionary.push(word);	
}

function sort()
{
	//bubble sort
	var size=_dictionary.length;
	
	for(var i=0; i<size;i++)
	{
		for(var j=0; j<size-1;j++)
		{
			if(_dictionry[i]>_dictionary[j])
			{
				var swap=_dictionary[i];
				_dictionary[i]=_dictionary[j];
				_dictionary[j]=swap;
			}
		}
	}
}

function getWord(size)
{
	switch(size)
	{
		case 0: Math.random()>.5?size=3:size=4; break;
		case 1: Math.random()>.5?size=5:size=6; break;
		case 2: Math.random()>.5?size=6:size=7; break;
		default:size=4;
	}
	var temp=[];
	var length=_dictionary.length;
	
	for(var i=0; i<length;i++)
	{
		//var word=_dictionary[i];
		if( _dictionary[i].length==size)
		{
			temp.push(_dictionary[i]);
		}
	}
	
	if(temp.length==0)
		return 0;
	
	else
		return temp[Math.floor(Math.random()*temp.length)];
	
}