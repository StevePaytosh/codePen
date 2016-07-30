var storyArray=[];
var template=$("#template").text();
function getContent()
{
  var url="http://www.freecodecamp.com/news/hot";
  $.getJSON(url,function(json){
    
    for(var i in json)
      {
        storyArray.push(json[i]);
      }
    setDisplay(0);
    $(".goto-btn").on("click",function(){
   //$(".page-title").html(this.value)
    openInNewTab(this.value);
  });
  }); // get api call
}

function setDisplay(startAt){
  
  for (var i in storyArray)
    {
  var box=$(".article-container");
  var newBox=$("<div>" + template + "</div>");
  
 newBox.find("div:eq(0)").html(getHTMLString(storyArray,startAt) );
      
      box.append(newBox);
      startAt++;
    }
}

function modifyHeadline(input)
{
  return input.substring(0,60)+"...";
}

function getDate(dateTime)
{
  var dateStamp= new Date(dateTime);
  var dateString=(dateStamp.getMonth()+1)+"/"+dateStamp.getDate()+"/"+dateStamp.getYear();
  return dateString;
  //return dateStamp.format('m:d:y');
  //return dateTime;
}
getContent(storyArray);

function getHTMLString(storyArray, index)
{
return "<span><img src=\"" + storyArray[index].author.picture+ "\" class=\"auth-img\"></img></span> <span class=\"headline\">"+modifyHeadline(storyArray[index].headline) + "</span> <span class=\"story-info\"> <br> <b>Author</b>: "+storyArray[index].author.username+" </span> <span class=\"upvotes\"> <br><b>Posted</b>: "+getDate(storyArray[index].timePosted)+ "<br><b> Likes</b>:" +storyArray[index].upVotes.length+ "<button class=\"goto-btn\" value=\""+storyArray[index].link+"\">ReadThis</button> </span>";
}
$(document).ready()
{
  $(".goto-btn").on("click",function(){
    $(".page-title").html(1)
    //openInNewTab(this.value);
  });
}
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
