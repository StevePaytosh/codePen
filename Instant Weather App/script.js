var imgArr={"snow":"https://www.pexels.com/photo/cold-snow-landscape-nature-1127/","sun":"https://static.pexels.com/photos/7976/pexels-photo-large.jpg"}
var ip = "derps";
var lattitude = 0;
var longitude = 0;
var apiKey = "0d3319abc1d16d543c20b72cc755a6ed";
var wind = "";
var windDirection = "";
var description = "";
var weatherIcon="";
var temperature = 0;
var humidity=0;
var sunrise=0;
var sunset=0;
var city = "";
var region = "";
var useImperial = false;
//document.getElementById("metric").disabled = true;
//document.getElementById("metric").style.color = 'gray';
getIPAddress();

$(document).ready(function(){
  
  $(".search-box").click(function(){
    $(".search-box")[0].select();
  });
  
  $(".search-box").focus(function(){
    document.onkeypress=function(){
      if(event.which==13)
        {
          $(".search-btn").click();
        }
    };
  })
  
   $(".switch").on("click", function() {

    if (useImperial) {
      //clicked on metric
      useImperial = false;
      enableButton("imperial");
      disableButton("metric");
    } else {
      useImperial = true;
      enableButton("metric");
      disableButton("imperial");
    }
    var urlString="//api.openweathermap.org/data/2.5/weather?lat=" + lattitude + "&lon=" + longitude;
    getWeather(urlString);

  });
  
  $(".search-btn").click(function(){
    var searchBoxValue=document.getElementsByClassName("search-box")[0].value;

    var isZipCode= new RegExp("^[0-9]{5}$");
    var isCityState= new RegExp("^\\D{0,25}\\s?,\\s?\\w{2}$");
    var isCity=new RegExp("^\\D{1,30}$")
    if(isZipCode.test(searchBoxValue))
      {    
       var urlString="//api.openweathermap.org/data/2.5/weather?zip="+searchBoxValue+",us";
      getWeather(urlString); //api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}
       
      }
    else if(isCityState.test(searchBoxValue))
      {
       // $(".search-box")[0].value="city state found";
        var urlString="//api.openweathermap.org/data/2.5/weather?q="+searchBoxValue;
        getWeather(urlString);
      }
    else if(isCity.test(searchBoxValue))
      {
         var urlString="//api.openweathermap.org/data/2.5/weather?q="+searchBoxValue;
        getWeather(urlString);
      }
    else{
     $("#warning").text("sorry, try again");
      $(".search-box").select();
    }
    
  });
});

function getIPAddress() {
  $.ajax({
    async: false,
    url: '//freegeoip.net/json/',
    type: 'POST',
    dataType: 'jsonp',
    success: function(location) {
      ip = location.ip;
      getLocation();
    }
  });
}

function getLocation() {
    var address = "//ipinfo.io/" + ip + "/json";
    $.getJSON(
      address,
      function(json) {
        var coords = json.loc.split(",");
        lattitude = coords[0];
        longitude = coords[1];
       // city = json.city;
        region = json.region;

        var urlString="//api.openweathermap.org/data/2.5/weather?lat=" + lattitude + "&lon=" + longitude;
        getWeather(urlString);
      }); //. ends getJSON
  } // ends getLocation

function getWeather(urlString) {
  $("#warning").text("");
  var units = "";
  if (useImperial) {
    units = "&units=imperial";
  } else {
    units = "&units=metric";
  }

  urlString +="&APPID="+apiKey+units;

  $.getJSON(urlString, function(json) {
    city = json.name;
    wind = json.wind.speed;
    description = json.weather[0].description;
    temperature = json.main.temp;
    windDirection = getWindDirection(json.wind.deg);
    humidity=json.main.humidity;
 weatherIcon="http://openweathermap.org/img/w/"+json.weather[0].icon+".png";
    lattitude=json.coord.lat;
    longitude=json.coord.lon;
    
    if(json.region)
      {
        region=json.region;
      }
    else{
      region=json.sys.country;
    }
    sunrise=convertUnixTimeToTime(json.sys.sunrise);
    sunset=convertUnixTimeToTime(json.sys.sunset);
    setDisplay();
    
    getRegion();

  });

}

function getRegion(){
  var urlString="https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&result_type=administrative_area_level_1&key=AIzaSyCn24CNoEzcJttF1_mjfV_YqYKxKU9Y2SU"
  
  $.getJSON(urlString,function(json){
    $("#location").html(city+","+json.address_components[0].short_name);
  });
}
function setDisplay() {
  $("#location").html(city + "," + region);
  $("#weather-icon").src=weatherIcon;
    $("#description").html(description+" <img src=\""+weatherIcon+"\" id=\"weather-icon\"><\img>");
  
  if (useImperial) {
    //use 'murican
    $("#wind").html("Winds: " + windDirection + " " + Math.floor(wind) + " mph")
    $("#temperature").html("Temperature: " + Math.floor(temperature) +String.fromCharCode(176)+" F");
    $("#humidity").html("Humidity: \n "+humidity+"%");
   $("#sunrise").html("Sunrise: "+ sunrise + " AM");
      $("#sunset").html("Sunset: "+ sunset +" PM");
  } else {
    //use metric
    $("#wind").html("Winds: " + windDirection + " " + Math.floor(wind*1.825) + " km/h")
    $("#temperature").html("Temperature: " + Math.floor(temperature) + String.fromCharCode(176)+" C");
    $("#sunrise").html("Sunrise: "+ sunrise + " AM");
      $("#sunset").html("Sunset: "+ sunset +" PM");
      $("#humidity").html("Humidity:   "+humidity+"%");
  }

}

function getWindDirection(deg) {
  // n=0, nne,ne=45,ene, e=90, se=135,sse, s=180, sw=225, w-270, nw=315

  if (deg > 360) {
    deg %= 360;
  }

  if (deg == 0) {
    return 'N';
  } else if (deg < 45) {
    return 'NNE';
  } else if (deg == 45) {
    return 'NE';
  } else if (deg < 90) {
    return 'ENE';
  } else if (deg == 90) {
    return 'N';
  } else if (deg < 135) {
    return 'ESE';
  } else if (deg == 135) {
    return 'S';
  } else if (deg < 180) {
    return 'SSE';
  } else if (deg == 180) {
    return 'S';
  } else if (deg < 225) {
    return 'SSW';
  } else if (deg == 225) {
    return 'SW';
  } else if (deg < 270) {
    return 'WSW';
  } else if (deg == 270) {
    return 'W';
  } else if (deg < 315) {
    return 'WNW';
  } else if (deg == 315) {
    return 'NW';
  } else {
    return 'NNW';
  }

}

function disableButton(id) {
  document.getElementById(id).disabled = true;
  document.getElementById(id).style.color = 'gray';
}

function enableButton(id) {
  document.getElementById(id).disabled = false;
  document.getElementById(id).style.color = 'white';
}
$(document).ready(function() {

 

});

function convertUnixTimeToTime(unixTime){
  
var date = new Date(unixTime*1000);
var hours = date.getHours();
  if(hours>12)
    {
      hours-=12;
    }

var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();

var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  
  return formattedTime;
}