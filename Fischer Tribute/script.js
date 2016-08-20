var black={
	"pawn":"&#9823;",
	"rook":"&#9820;",
	"knight": "&#9822;",
	"bishop": "&#9821;",
	"queen": "&#9819;",
	"king": "&#9818;"
}

var white={
	
	"pawn":"&#9817;",
	"rook":"&#9814;",
	"knight":"&#9816;",
	"bishop":"&#9815;",
	"queen":"&#9813;",
	"king":"&#9812;"
	
};

$(document).ready(function(){
	
	$("#shuffle").click(function(){
		//get a new rank of pieces for a fischer random board
		var rank=createNewFischer();
		
		//print out the new board according to rank
	$("#a1").html(white[rank[0]]);
	$("#b1").html(white[rank[1]]);
	$("#c1").html(white[rank[2]]);
	$("#d1").html(white[rank[3]]);
	$("#e1").html(white[rank[4]]);
	$("#f1").html(white[rank[5]]);
	$("#g1").html(white[rank[6]]);
	$("#h1").html(white[rank[7]]);
	
	$("#a8").html(black[rank[0]]);
	$("#b8").html(black[rank[1]]);
	$("#c8").html(black[rank[2]]);
	$("#d8").html(black[rank[3]]);
	$("#e8").html(black[rank[4]]);
	$("#f8").html(black[rank[5]]);
	$("#g8").html(black[rank[6]]);
	$("#h8").html(black[rank[7]]);
		
	
	});
	
	$("#reset").click(function(){
		
	$("#a1").html(white["rook"]);
	$("#b1").html(white["knight"]);
	$("#c1").html(white["bishop"]);
	$("#d1").html(white["queen"]);
	$("#e1").html(white["king"]);
	$("#f1").html(white["bishop"]);
	$("#g1").html(white["knight"]);
	$("#h1").html(white["rook"]);
	
	$("#a8").html(black["rook"]);
	$("#b8").html(black["knight"]);
	$("#c8").html(black["bishop"]);
	$("#d8").html(black["queen"]);
	$("#e8").html(black["king"]);
	$("#f8").html(black["bishop"]);
	$("#g8").html(black["knight"]);
	$("#h8").html(black["rook"]);
		
	});
});

function createNewFischer(){
	var rank=["","","","","","","",""];
	
	// randomly place a white bishop on a black square (1-4)
	var black_squares=[0,2,4,6,];
	rank[ black_squares[getRandom(4)] ]="bishop";
	// randomly place a white bishop on a white square (1-4)
	var white_squares= [1,3,5,7];
	rank[ white_squares[getRandom(4)] ]="bishop";
	
	// randomly place the white queen on an empty space (1-6)
	var empty=getEmpty(rank);
	rank[ empty[getRandom(empty.length)] ] ="queen";
	
	// randomly place a white knight on an empty space (1-5)
	empty=getEmpty(rank);
	rank[ empty[getRandom(empty.length)] ] ="knight";
	// randomly place a white knight on an empty space (1-4)
	empty=getEmpty(rank);
	rank[ empty[getRandom(empty.length)] ] ="knight";
	// place a white rook on the first empty space
	empty=getEmpty(rank);
	rank[ empty[0] ] ="rook";
	// place the white king on the next empty space
	empty=getEmpty(rank);
	rank[ empty[0] ] ="king";
	//place the last rook in the last empty space
	empty=getEmpty(rank);
	rank[ empty[0] ] ="rook";
	
	return rank;
}

function getRandom(range)
{
	//return an integer from 0 - (range-1)
	return Math.floor(Math.random()*range);
}

function getEmpty(arr)
{
	//return the indexes of empty spots in arr
	var result=[];
	
	for(var i=0; i<arr.length; i++)
	{
		if(arr[i]=="")
			result.push(i);
	}
	
	return result;
}