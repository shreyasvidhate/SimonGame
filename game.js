var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).click(function () {
  if (started == false) {
    $("h1").text("Level " + level);
    $("h1").css("color","lightgreen");
    nextSequence();
    started = true;
  }
});

$(document).keypress(function () {
  if (started == false) {
    $("h1").text("Level " + level);
    $("h1").css("color","lightgreen");
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  switch (color) {
    case "red":
      var redAudio = new Audio("red.mp3");
      redAudio.play();
      break;
    case "blue":
      var blueAudio = new Audio("blue.mp3");
      blueAudio.play();
      break;
    case "yellow":
      var yellowAudio = new Audio("yellow.mp3");
      yellowAudio.play();
      break;
    case "green":
      var greenAudio = new Audio("green.mp3");
      greenAudio.play();
      break;

    default:
      break;
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongAudio = new Audio("wrong.mp3");
    wrongAudio.play();
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").css("color","red");
    $("h1").text("Game Over, Press any key to restart!");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  var colorButton = $("." + currentColor);
  colorButton.addClass("pressed");
  setTimeout(function () {
    colorButton.removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}
