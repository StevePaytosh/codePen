//name,img src, link, description
var examples=[["Instant Weather App","http://i989.photobucket.com/albums/af11/Ojiro/app1_zpsbhfw77ip.png","http://codepen.io/Ojiro/pen/RrKzrQ","Instant Weather App is a FreeCodeCamp project that pulls up the weather for your local area as soon as the page loads. You can search for a different city if your city isn't correct or if you wish to see the weather of a different area. The app utilizes multiple APIs to determine location and weather"],["Calcunow Calculator","http://i989.photobucket.com/albums/af11/Ojiro/calculator2_zpsesudi8bh.png","http://codepen.io/Ojiro/full/WQawMP/","This calculator makes math easier by crunching numbers in a stylish manner. The app makes use of a Reverse Polish Notation (RPN) converter to allow complex expressions to be calculated"],["Wikipedia Viewer","http://i989.photobucket.com/albums/af11/Ojiro/app3_zpsso2qtzfl.png","http://codepen.io/Ojiro/full/VvJOdx/","Use this app to search for and view wikipedia articals."]];

var ex1=$("#example1");
var ex2=$("#example2");
var ex3=$("#example3");

setWorkExampleElement(ex1,1);
setWorkExampleElement(ex2,2);
setWorkExampleElement(ex3,3);

function setWorkExampleElement(example,exampleNumber)
{
  exampleNumber--;
  
  example.html("<b>"+examples[exampleNumber][0]+"</b><p><br> <img class=\"example-img\" src=\""+examples[exampleNumber][1]+"\"></img> <p> "+examples[exampleNumber][3]);
}

$(document).ready(function(){

  $(".social-btn").click(function(){
    if(this.id!="contact-btn")openInNewTab(this.value)});
  
  $("#contact-btn").click(function(){
window.location.href="mailto:steve.paytosh@gmail.com?subject=Subject&body=message%20goes%20here";
  });
  
  $(".example").click(function(){
    var id = this.id;
    
    var exampleNum=id.charAt(id.length-1);
    $("#contact-btn").text(exampleNum);
    if(!isNaN(exampleNum))
      {
        exampleNum=Number(exampleNum);
        exampleNum--;
        openInNewTab(examples[exampleNum][2]);
      }
  });
});

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

