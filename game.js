var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).on("keypress", function(){
  if(!started){
    $("#level-title").text("level - "+level);
    nextSequence();
    started = true;
  }
});


$(".btn").on("click",function(){
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);

  playSound(userChoosenColor);
  animatePress(userChoosenColor);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentIndex){
  if(gamePattern[currentIndex] === userClickedPattern[currentIndex]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("game over! press any key to restart.");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("level - "+level);
  var randomNumber = Math.floor((Math.random()*4));

  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#"+ randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}


function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}
