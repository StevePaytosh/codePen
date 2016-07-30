$(document).ready(function() {
  var human = "X";
  var computer = "O";
  var gameBoard = [];
  var computerMove = false;
  var gameOver = false;
  var moves = 0;
  var player1IsHuman = true;
  var difficulty = "easy"; //add impossible mode

  $(".tile").click(function() {
    if (!computerMove && !gameOver) {
      computerMove = true;
      setTileValue(this.id, human);
      moves++;
      var stateArray = getCurrentState();
      var analysis = analyzeBoard(stateArray, moves);
      if (analysis == "X" || analysis == "O" || analysis == "-") {
        endProtocol(human, computer, analysis);
        gameOver = true;
      }
      if (!gameOver) {
        var computerMove = getComputerMove(moves, difficulty, computer);
        setTileValue(computerMove, computer)
        moves++;
        var stateArray = getCurrentState();
        var analysis = analyzeBoard(stateArray, moves);
        if (analysis == "X" || analysis == "O" || analysis == "-") {
          endProtocol(human, computer, analysis);
        }
        computerMove = false;
      }

    }
  });

  $(".start-game").click(function() {

    clearTiles();
    var startValue = $('input[name="start"]:checked').val();
    gameOver = false;
    moves = 0;
    player1IsHuman = (startValue == 1);

    human = $('input[name="piece"]:checked').val();

    if (human == "X") {
      computer = "O";
    } else {
      computer = "X";
    }

 //   difficulty = $('input[name="difficulty"]:checked').val();
    $(".main-title").text("Tic-Tac-Toe");
    $(".page-subtitle").text("");

    if (!player1IsHuman) {
      computerMove = true;
      var computerChoice = getComputerMove(0, difficulty, computer);
      setTileValue(computerChoice, computer);
      computerMove = false;
    }
  });

  $("#piece-x").click();
  $("#move-1").click();
 // $("#diff-easy").click();

});

function clearTiles() {
  $(".tile").html("");
}

function analyzeBoard(gameBoard, moves) {
  //var gameBoard = ["top-left", "top-center", "top-right", "mid-left", "mid-center", "mid-right", "bottom-left", "bottom-center", "bottom-right"];
  var winCombos = [
    [gameBoard[0], gameBoard[1], gameBoard[2]],
    [gameBoard[3], gameBoard[4], gameBoard[5]],
    [gameBoard[6], gameBoard[7], gameBoard[8]],
    [gameBoard[0], gameBoard[4], gameBoard[8]],
    [gameBoard[2], gameBoard[4], gameBoard[6]],
    [gameBoard[0], gameBoard[3], gameBoard[6]],
    [gameBoard[1], gameBoard[4], gameBoard[7]],
    [gameBoard[2], gameBoard[5], gameBoard[8]]
  ];

  for (var i in winCombos) {
    if ((winCombos[i][0] == "X" || winCombos[i][0] == "O") && compare(winCombos[i][0], winCombos[i][1], winCombos[i][2])) {
      return winCombos[i][0];
    }
  }
  if (moves >= 9) {
    return "-";
  } else {
    return false;
  }

}

function getComputerMove(moves, difficulty, computer) {
  var gameBoard = ["top-left", "top-center", "top-right", "mid-left", "mid-center", "mid-right", "bottom-left", "bottom-center", "bottom-right"];

  if (difficulty == "easy") {
    var currentState = getCurrentState();
    
   if(moves==0)
     {
       var strongMove=[0,2,4,6,8];
       return gameBoard[strongMove[Math.floor(Math.random()*strongMove.length)]];
     }
    else if(moves<4)
      {
        var strongMove=[0,2,4,6,8];
        var emptyArray=getEmptyTilesFromArray(currentState);
        var results=[];
        for(var i in strongMove)
          {
            for(var j in emptyArray)
              {
                if(strongMove[i]==emptyArray[j])
                  {
                   results.push(emptyArray[j]);
                  }
              }
          }
        return gameBoard[results[Math.floor(Math.random()&results.length)]];
      }
    else{
       return gameBoard[getRandomMove(currentState)];
    }
   
  } else {
    var toughMove = getDifficultMove(moves, computer);
    return gameBoard[toughMove];
  }

}

function getTileValue(tile) {
  return $("#" + tile).html();
}

function setTileValue(tile, value) {
  return $("#" + tile).html(value);
}

function compare() {
  for (var i = 1; i < arguments.length; i++) {
    if (arguments.length > 1 && arguments[i] == arguments[i - 1]) {

    } else {
      return false;
    }

  }
  return true;
}

function endProtocol(human, computer, analysis) {
  gameOver = true;
  $(".main-title").text("Game Over");
  if (human == analysis) {
    $(".page-subtitle").text("You Win");
    $(".page-subtitle").addClass("win-text");
    $(".page-subtitle").removeClass("loss-text");
  } else if (analysis == '-') {
    $(".page-subtitle").text("Draw");
    $(".page-subtitle").removeClass("win-text");
    $(".page-subtitle").removeClass("loss-text");
  } else {
    $(".page-subtitle").text("You Lose");
    $(".page-subtitle").removeClass("win-text");
    $(".page-subtitle").addClass("loss-text");
  }
}

function getCurrentState() {
  var results = [];
  var gameBoard = ["top-left", "top-center", "top-right", "mid-left", "mid-center", "mid-right", "bottom-left", "bottom-center", "bottom-right"];
  for (var i in gameBoard) {
    var tileValue = getTileValue(gameBoard[i]);

    if (tileValue == "X" || tileValue == "O") {
      results.push(tileValue)
    } else {
      results.push("-");
    }

  }

  return results;

}

function getDifficultMove(moves, computer) {
    var currentState = getCurrentState();
    if (moves == 0) {
      var strongArray = [0, 2, 4, 6, 8];
      return strongArray[Math.floor(Math.random() * 5)];
    } else if (moves == 1 && currentState[4] == "-") {
      return 4;
    } 
  else if(moves>2)
    {
      return getRandomMove(currentState);
    }

    }

function getRandomMove(currentState) {
      var emptyArray = getEmptyTilesFromArray(currentState);
      return emptyArray[Math.floor(Math.random() * emptyArray.length)];
    }

    function getEmptyTilesFromArray(currentState) {
      var results = [];

      for (var i in currentState) {
        if (currentState[i] == "-") {
          results.push(i);
        }
      }
      return results;
    }

  