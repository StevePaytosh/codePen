var quotes = [
  "\"Food for though never spoils\" - Steve Paytosh"
  , "\"Do or do not, there is no try\" -Yoda"
  , "\"Knowing is not enough, you must apply\" -Bruce Lee"
  , "\"They aren't wire strippers, they are wire entertainers\" -classmate"
  , "\"In wine there is truth; In Beer there is freedom; In water there are sharks\""
  , "\"That's one small step for [a] man, and one giant leap for mankind\" - Neil Armstrong"
  , "\"You're fired\" -Donald Trump"
  , "\"You're fired\" -Vince McMahon", "\"It's over 9000!\" -Prince Vegeta", "\"Hello, I'm a Nigerian prince and I need your help moving some money overseas\" - do you know? I need to contact this guy, he owes me some money", "\"Close your eyes, we're gonna play a game until the clones leave\" - Anakin Skywalker", "\"No!\" -Grumpy Cat", "\"Just call me Ishmale\" -Ishmale","\"My Pokemon brings all the nerds to the yard and they're like 'do you wanna trade cards', damn right I wanna trade cards, I will trade you, but not my Charizard\"", " \"Wakka Wakka Wakka\" -Pacman "
];
var currentQuoteIndex = -1;

$(document).ready(function() {

  $("#new-quote-btn").on("click", function() {
    currentQuoteIndex= randomQuoteValue();
    $("#quote-box").html(quotes[currentQuoteIndex]);
    changeTweet();
  });
  
  $("#new-quote-btn").click();

  function changeTweet()
  {
      $(".twitter-share-button").attr("data-text", quotes[currentQuoteIndex]);
  }
  
  function randomQuoteValue() {
    var numOfQuotes = quotes.length;
    var newQuoteIndex = Math.floor(Math.random() * numOfQuotes);

    if (newQuoteIndex !== currentQuoteIndex) {
      return newQuoteIndex;
    } else {
      return randomQuoteValue()
    }
  }
});