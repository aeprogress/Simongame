let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document).on("keypress", function () {
  nextSequence();
});

function nextSequence() {
  $("#level-title").text("level " + level);
  level++;
  randomNum = Math.floor(Math.random() * 4);
  let randomChodenColor = buttonColors[randomNum];
  gamePattern.push(randomChodenColor);

  $("#" + randomChodenColor)
    .fadeOut(80)
    .fadeIn(80);

  palySound(randomChodenColor);
}

$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  palySound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  console.log(gamePattern);
  console.log(userClickedPattern);
});

function palySound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("All Good!" + currentLevel + level);
    if (currentLevel == level - 1) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    palySound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER, Press Any Key To Restart");
    startOver();
    console.log("Wronge Pattern!");
  }
}

function startOver() {
  $(".preLevel").text("Your Leve Was: " + level);
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
