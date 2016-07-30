$(document).ready(function(){
  var timer= setInterval(timer, 1000);
  var i=0;
  var timerOn=false;
  var working=true;
  var min=$("#work-set").html();
  var sec=0;
  
  $("#work-min").on("click", function(){
  updateSettings("work","down");
  });
  
  $("#break-min").on("click", function(){
  updateSettings("break","down");
  });
  
  $("#work-plus").on("click", function(){
     updateSettings("work","up");
  });
  
  $("#break-plus").on("click", function(){
    updateSettings("break","up");
  });
  
  $(".snooze-bar").on("click", function(){
    min=0;
    sec=0;
  });
  $(".clock-block").on("click", function()   {
      if(timerOn===true)
        {
          clearInterval(timer);
          timerOn=false;
        }
    else
      {
        timer=setInterval(timer,2000);
        timerOn=true;
      }
    
  });
  function timer() 
  {
    getTime();
    var fakeSec;
    if(Number(sec)<10)
      {
        fakeSec="0"+sec;
      }
    else
      {
        fakeSec=sec;
      }
      
    $("#time-display").html(min+ ":" +fakeSec);
    var phase= (!working) ? "on break":"working"; 
    $(".info-bar").html("currently " + phase );
   phase= (!working) ? "work":"break"; 
    $("#snooze-text").html("go to " + phase + "?");
  }
  
  function getTime()
  {
    if(min===0 && sec===0)
      {
        //switch states
        if(working===true)
          {
            working=false;
            min=$("#break-set").html();
            sec=0;
          }
        else
          {
            working=true;
            min=$("#work-set").html();
            sec=0;
          }
      }
    else if(sec>0)
      {
        sec--;
      }
    else if(sec===0 && min>0)
      {
        sec=59;
        min--;
      }
    
  }
    
  function updateSettings(workType,direction)
{
  var shouldBeWorking=false;
  if(workType=="work")
    {
      shouldBeWorking=true;
    }
  else
    {
      shouldBeWorking=false;
    }
  workType="#"+workType+"-set";
   var value=$(workType).html();
  if(direction=="up")
    {
      value++;
      if(working==shouldBeWorking)
        {
         min++;
        }
    }
  else
    {
      value--;
      if(working==shouldBeWorking && Number(min)>0)
        {
           min--;
        }
    }
  

    if(working==shouldBeWorking && Number(min)>0)
      {
    //   min=value;
      //  sec=0;
      }

    $(workType).html(value);
  
}
});  


