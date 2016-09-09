$(document).ready(function() {

  var channels = ["vihart","beohoff","brunofish","comster404","destructroncore","freecodecamp","habathcx","MedryBW", "noobs2ninjas", "RobotCaleb","saltybet","storbeck", "terakilobyte", "thomasballinger"];
  var rowTemplate = $("#myTemplate").text();
  var headerTemplate = $("#header-template").text();
  var firstLoad = true;
  var state = "all";

  $(".radio-btn").on("click", function() {
    if (firstLoad) {
      wipeTable(headerTemplate);
      firstLoad = false;
    } else {
      wipeTable(headerTemplate);
    }
    state = this.value;
    getTwitchJson(channels, state, rowTemplate);
  });

  $(".search-btn").click(function(){
    channels=[document.getElementsByClassName("search-box")[0].value];
    state="all";
    wipeTable(headerTemplate);
     getTwitchJson(channels, state, rowTemplate);
  });
   $(".search-reset").click(function(){
      channels = ["beohoff","freecodecamp","habathcx","MedryBW", "noobs2ninjas", "RobotCaleb","storbeck", "terakilobyte",   "thomasballinger"];
    wipeTable(headerTemplate);
     state="all";
     getTwitchJson(channels, state, rowTemplate);
     document.getElementsByClassName("search-box")[0].value="Search Twitch Users";
  });
  $("#radio-all").click();

  $(".search-box").click(function(){
    this.select();
  });
});

function getTwitchJson(channels, state, template) {
  for (var i=0; i<channels.length; i++) {
    var url = "https://api.twitch.tv/kraken/channels/" + channels[i] + "/";

    $.getJSON(url, function(json) {
      var info = {
        "logo": json.logo,
        "name": json.display_name,
        "description": json.status,
        "url": json.url,
        "account_name": channels[i]
      };
      getOnlineStatus(info, state, template);
    });

  }

}

function setTable(info, state, template) {

  if (state == info.status || state == "all") {
    var tbody = $(".results-table");
    var row = $("<tr>" + template + "</tr>");
    row.find("td:eq(0)").html("<img src =\"" + info.logo + "\" class=\"logo\"></img>");
    row.find("td:eq(1)").text(info.name);
    row.find("td:eq(2)").text(info.status);
    if (info.status == "online") {
      row.find("td:eq(3)").text(info.description);
    } else {
      row.find("td:eq(3)").text("");
    }
    row.find("td:eq(4)").html("<button value=\"" + info.url + "\" class=\"goto-btn\">Go To Channel</button>");

    tbody.append(row);

  }
  //remove existing bindings to prevent multiple tabs from opening
  $(".goto-btn").off("click")
  $(".goto-btn").click(function() {
    OpenInNewTab(this.value);
  });
}

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function getOnlineStatus(info, state, template) {

  var requestURL = "https://api.twitch.tv/kraken/streams?channel=" + info.name;
  $.getJSON(requestURL, function(json) {
    if (json.streams.length > 0) {
      info.status = "online";
    } else {
      info.status = "offline";
    }
    setTable(info, state, template);
  });

}

function wipeTable(template) {
  tbody = $(".results-table")
  tbody.html(template)
}