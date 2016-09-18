var current_stars=1;
var max_stars=64;
var scale_up=true;
var rows=3; //max 20
var columns=10; // hypothetically unlimited
var sound = [];
sound[0] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
sound[1] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
sound[2] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
sound[3] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var playbackRate = .7
sound[0].playbackRate = playbackRate;
sound[1].playbackRate = playbackRate;
sound[2].playbackRate = playbackRate;
sound[3].playbackRate = playbackRate;

$(document).ready(function(){
	
	max_stars=rows*columns;
  buildHTML();
 
  
  setStars();
});

function increment()
{
  if(current_stars==max_stars)
    scale_up=false;
  else if(current_stars==1)
    scale_up=true;
  
  if(scale_up)
    current_stars*=2;
  else
    current_stars/=2;
  
  return current_stars;
}
function setStars()
{
  for(var i=0; i<max_stars; i++)
    { //clear any existing stars
       var location="#";
     location+=getRow(Math.floor(i/columns));
     location+=(i%columns)+1;
     $(location).html("");
  
    }
  var partition=max_stars/current_stars;
  var sky=[];

  for(var i=partition-1; i<=max_stars; i+=partition)
   {
     var location="#";
     location+=getRow(Math.floor(i/columns));
     location+=Math.floor(i%columns)+1;
     $(location).html(randomStar());
     console.log("created a star for: "+ location);
      
   }

   //bind stars to the DOM
    $(".star").on("click", function(e){
    console.log("clicked on star");
	e=e.currentTarget.attributes.soundid.nodeValue
console.log("playing sound: "+ e);
	sound[e].play();
     increment();
    setStars();
  });
  
  return current_stars;
}

function buildHTML()
{
	var table=$(".star-grid");
	for(var i=0; i<rows; i++)
	{
		var new_row="<tr>";
		//table.append("<tr>");
		for (var j=0; j<columns; j++)
		{
			//table.append("<td class=\"star-cell\" id=\""+getRow(i)+""+(j+1)+"\"></td>");
			new_row+="<td class=\"star-cell\" id=\""+getRow(i)+""+(j+1)+"\"></td>";
		}
		new_row+=("</tr>");
		table.append(new_row);
	}

}
 function getRow(a)
{
   switch(a)
       {
         case 0: return "a"; break;
         case 1: return "b"; break;
         case 2: return "c"; break;
         case 3: return "d"; break;
         case 4: return "e"; break;
         case 5: return "f"; break;
         case 6: return "g"; break;
         case 7: return "h"; break;
		 case 8: return "i"; break;
		 case 9: return "j"; break;
	case 10: return "k"; break;
		case 11: return "l"; break;
				     case 12: return "m"; break;
					   case 13: return "n"; break;
					     case 14: return "o"; break;
						   case 15: return "p"; break;
						     case 16: return "q"; break;
							   case 17: return "r"; break;
							     case 18: return "s"; break;
								   case 19: return "t"; break;
								     case 20: return "u"; break;
         default: return -1; break;
       }
}

function randomStar(){
  
  var color= getColor();
  var code=getStarCode();
  var star_sound=Math.floor(Math.random()*sound.length);
  
  return "<h2 class=\"star\" style = \" color:"+color+"\" soundid=\""+star_sound+"\">"+code+"</h2>";
}

function getColor()
{
  //return a randomly defined color
  return "#"+
  Math.floor(Math.random()*16).toString(16)+
     Math.floor(Math.random()*16).toString(16)+
     Math.floor(Math.random()*16).toString(16)+
     Math.floor(Math.random()*16).toString(16)+
     Math.floor(Math.random()*16).toString(16)+
     Math.floor(Math.random()*16).toString(16);
    

}

function getStarCode()
{
  var starArr=["&#9733;","&#9734;", "&#8795;","&#8902;","&#9055;","&#9059;",
"&#10017;",
"&#10022;",
"&#10023;",
"	&#10026;",
"	&#10027;",
"&#10028;",
"&#10031;",
"	&#10032;",
"	&#10036;",
"	&#10037;",
"	&#10038;",
"	&#10039;",
" &#10040;",
" &#10041;",
"	&#10050;",
" &#11088;",
"	&#11089;",
"	&#11090;",
"	&#127775;",
" &#127776;",
"	&#128303;"];
  
  var i=starArr.length;
  return starArr[Math.floor(Math.random()*i)];
}