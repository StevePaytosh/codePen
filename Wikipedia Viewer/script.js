var state = 1;
var templates = [$("#state1").text(), $("#state2").text(), $("#state3").text()];
var queryResults = [];

function setState(stateInput) {
  clearState();
  var body = $(".main-container")
  var template = templates[stateInput - 1];
  body.append(template);

  if(stateInput==2)
    {
  $(".search-btn").click(function() {
    state = 3;
    var block = $(".main-container");
    block.removeClass("main-container");
    block.addClass("state-3");
    search();
  });
  $(".clear-btn").click(function(){
   clearPreviousResults();
  });
      $(".random-btn").click(function(){
        $.ajax({
          url:"https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json",
          dataType:"jsonp",
          success: function(json){
            document.getElementsByClassName("search-box")[0].value=json.query.random[0].title;
            $(".search-btn").click();
          }
        });
      });
}
}

setState(1);

$(document).ready(function() {

  $(".main-title").click(function() {
    state = 2;
    setState(state);
  });
  
  $(".search-box").click(function(){
    document.getElementsByClassName("search-box").select();
  });

});

function clearState() {
  $("#main-block").html("");
}

function search() {
  queryResults=[];
    var url="https://en.wikipedia.org/w/api.php?action=opensearch&formt=json&search="+setQueryString();
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(json) {
      callBack(json);
      query=[document.getElementsByClassName("search-box")[0].value].toString();
      clearPreviousResults();
 document.getElementsByClassName("search-box")[0].value=query;
      drawResults();
      setLinkBind();
    },
    complete: function(json) {}
  });
}

function setQueryString() {
  var query=[document.getElementsByClassName("search-box")[0].value].toString();
  return query.split(" ").join("%20");
}

function callBack(json) {
  for (var i in json[1]) {
    queryResults[i] = {};
    queryResults[i].title = json[1][i];
    queryResults[i].description = json[2][i];
    queryResults[i].link = json[3][i];
  }
}

function drawResults() {

  var body = $("#main-block");

  for (var i in queryResults) {
    var template = $("<div>" + templates[2] + "</div>");

    template.find("div:eq(0)").html("<span class=\"results-title\"><b>" + queryResults[i].title + "</b><p></span> <span class=\"results-description\">" + queryResults[i].description + "</span><p><button class=\"results-btn\" value=\"" + queryResults[i].link + "\">read more</button>");
    body.append(template);
  }

}

function clearPreviousResults() {
 var body = $(".result");
  body.removeClass("result");
 body.html("");
document.getElementsByClassName("search-box")[0].value="";
  
    }
  

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function setLinkBind() {

  $(".results-btn").off("click");
  $(".results-btn").click(function() {
    openInNewTab(this.value);
  });
}