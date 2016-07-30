var sound = [];
sound["red"] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
sound["yellow"] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
sound["blue"] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
sound["green"] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var playbackRate = .7
sound["red"].playbackRate = playbackRate;
sound["blue"].playbackRate = playbackRate;
sound["yellow"].playbackRate = playbackRate;
sound["green"].playbackRate = playbackRate;
var sequence = [];
var playerSequence = [];
var playing = false;
var playerMove = false;

$(document).ready(function() {
  
  document.onkeypress=function(){
    
     switch (event.which) {
       case 49: $("#red").click(); break;
       case 50:$("#blue").click(); break;
       case 51:$("#yellow").click(); break;
       case 52:$("#green").click(); break;
        
     }
  }
  
  $(".button").click(function() {
    humanPlay(this.id);
  });

  $(".play").click(function() {
    clickAll(false);
     $(".seq-box").text("");
  $(".player-seq").text("");
    computerPlay(true,0);

  });
  
    $(".button").click(function() {
    humanPlay(this.id);
  });

  $(".reset").click(function() {
    clickAll(false);
     $(".seq-box").text("");
  $(".player-seq").text("");
    computerPlay(true,0);

  });
}); //end document ready

function btnPress(id) {
  pressColor(id, true);
  playSound(id);
 pressColor(id, false);
  

}

function pressColor(id, pressing) {
  //if pressing=true, change shade
  // else return to original state
  if (pressing) {
    $("#" + id).removeClass(id);
    $("#" + id).addClass("press-" + id);
  } else {
    $("#" + id).removeClass("press-" + id);
    $("#" + id).addClass(id);
  }
}

function getNextMove() {
  var rainbow = ["red", "yellow", "blue", "green"];

  return rainbow[Math.floor(Math.random() * rainbow.length)];
}

function updateSequenceBox(starting)
{
  if(starting)
    {
      
    }
  $(".seq-box").html(sequence.length);
  $(".player-seq").html(playerSequence.length);
}

function computerPlay(starting,depth){
  var id=sequence[depth];
  if(starting)
    {
    sequence = [];
    playerSequence=[];
    playerMove = false;
    playing = true;
    sequence.push(getNextMove());
    updateSequenceBox(true);
    id=sequence[0];
    pressColor(id, true);
     sound[id].play();
      
    setTimeout(function(){
        pressColor(id, false);
      playerMove = true;
      },300);
    }
  else if(depth != sequence.length-1)
    {
      playerMove=false;
    pressColor(id, true);
       updateSequenceBox(false);
      id=sequence[depth];
     sound[id].play();
    setTimeout(function(){
        pressColor(id, false);
   setTimeout(function(){computerPlay(false,depth+1);},1000)
      },500);
    }
  else
    {
    updateSequenceBox(false);
    pressColor(id, true);
     sound[id].play();
    setTimeout(function(){
     pressColor(id, false);
      playerMove = true;
      },300);
    }
}
function humanPlay(id)
{
     if (playing && playerMove) {
      playerMove = false;
      playerSequence.push(id);
       updateSequenceBox(false);
       if(!checkSequences() && playerSequence.length!=25)
         {
           playerSequence=[];
           wrong()
         }
       else if(playerSequence.length==25)
         {
           playing=false;
           playerMove=false;
           var rainbow=["red","yellow","blue","green"];
  for(var i in rainbow)
    {
      pressColor(rainbow[i],true);
    }
  $(".seq-box").text("WIN");
  $(".player-seq").text("WIN");
           
         }
       else
         {
           pressColor(id, true);
       sound[id].play();
           setTimeout(function(){
        pressColor(id, false);
        if (playerSequence.length >= sequence.length && sequence.length>0) {
        playerSequence = [];
       sequence.push(getNextMove());
          var tempSeq=sequence;
       setTimeout(function(){computerPlay(false,0);},1400)
      }
         playerMove=true
       },300)
         }
    }
}

function wrong()
{
  
  clickAll(true);
  $(".seq-box").text("NO");
  $(".player-seq").text("NO");
  
  setTimeout(function(){
   clickAll(false);
     $(".seq-box").text("");
  $(".player-seq").text("");
    
    setTimeout(function(){computerPlay(false,0)},1000)
  },1000)
}

function checkSequences()
{
  for(var i in playerSequence)
    {
      if(sequence[i]!=playerSequence[i])
        {
          return false;
        }
    }
  return true;
}

function clickAll(click)
{
  var rainbow=["red","yellow","blue","green"];
  for(var i in rainbow)
    {
      pressColor(rainbow[i],click);
    }
}