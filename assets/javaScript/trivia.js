// VARIABLES //

var correctAnswersCount = 0;
var wrongAnswersCount = 0;
var shotClockViolation = 0;
var totalNumberOfQuestions = 0
var imageDisplay;
var gameStatus;
var count; 

var questionOne = {
	question: "This Player is the New York Knicks All Time Leading Scorer",
	answers: ["John Starks","Patrick Ewing", "Carmelo Anthony","Walt Frazier"],
	correctAnswer : 1,
	imageUrl: 'assets/images/ewing.gif',

}

var questionTwo = {
	question: "This Player is the Milwakee Bucks All Time Leading Scorer",
	answers: ["Ray Allen", "Glenn Robinson", "Kareem Abdul-Jabbar", "Michael Redd"],
	correctAnswer: 2,
	imageUrl: 'assets/images/Kareem.gif',
}

var questionThree = {
	question: "This Player is the Portland Trail Blazers All Time Leading Scorer",
	answers: ["Lamarcus Aldridge", "Terry Porter", "Clifford Robinson","Clyde Drexler"],
	correctAnswer: 3,
	imageUrl: 'assets/images/clyde.gif',
}

var ajaxUrl = "assets/";



var questionsArray = [questionOne, questionTwo , questionThree]


//GAME INITIALIZATION AND DOM DISPLAY FUNCTIONS //

function pickRandomQuestion(){
	
	
	$("#wrongBanner").remove();
	$("#correctBanner").remove();
	$(".playerImage").remove();
	$(".question").empty();
	$(".answer").remove();
	var randomQuestion = questionsArray[Math.floor(Math.random()*questionsArray.length)];
	displayQuestion(randomQuestion);
	totalNumberOfQuestions ++;
	runShotClock();
}

function displayQuestion(questionDisplayed){
	var questionText = questionDisplayed.question;
	var questionIndex = questionDisplayed.correctAnswer;
	var correctDisplay = questionDisplayed.answers[questionIndex];
	imageDisplay = $('<img src="' + questionDisplayed.imageUrl + '" />')
	imageDisplay.addClass("playerImage hidden");

	for(var i=0; i<questionDisplayed.answers.length; i++){
		var a = questionDisplayed.answers[i];
		if(a == correctDisplay){
			var b = '<div class="answer correct"><h3>'+questionDisplayed.answers[i]+'</h3></div>';
			
		}else{
			var b = '<div class="answer" ><h3>'+questionDisplayed.answers[i]+'</h3></div>';
		}
			$(".container").append(b);
	}
	$(".question").html('<h2>"'+questionText+'"</h2>');
	$(".container").append(imageDisplay);
	setAnswerEventClicker(correctDisplay);
}
// EVENT CLICK HANDLER FUNCTIONS //
function setAnswerEventClicker(correctDisplay){
	
	$(".answer").on("click", function(){
		if($(this).hasClass("correct")){
			console.log("click");
			correctAnswerClickHandler(correctDisplay);
			correctAnswersCount ++;
			
		}else{
			wrongAnswersCount ++;
			wrongAnswerClickHandler(correctDisplay);
			
		}	
	});
	showScore(correctAnswersCount, wrongAnswersCount);
	checkScore();
}


function correctAnswerClickHandler(correctDisplay){
	
	$(".answer").remove();
	$('<h2 id="correctBanner"> Nice Shot!! '+correctDisplay+' Is Correct!!!</h2>').insertAfter(".question");
	$(imageDisplay).removeClass("hidden");
	stopShotClock();
	setTimeout(pickRandomQuestion, 5000);
	
}

function wrongAnswerClickHandler(correctDisplay){
	$(".answer").remove();
	$('<h2 id="wrongBanner">You Missed ... <br> correctAnswer is: '+correctDisplay+'</h2>').insertAfter(".question");
	$(imageDisplay).removeClass("hidden");
	stopShotClock();
	setTimeout(pickRandomQuestion, 5000);	
}

// NEW RANDOM QUSTION//

function checkScore(){
	if(wrongAnswersCount === 1){
		youLost();
	}
	else if(correctAnswersCount === 20){
		youWon();
	}
}
function youWon(){
	$('.container').empty();
	var text = "<h2>Click on the ball to play again!</h2>";
	var startOverButton = '<div class="basketball">';
	var youWonMessage = '<h2>Nice shooting! You won!... <br> You shot '+correctAnswersCount+' out of '+totalNumberOfQuestions+' <br> Your field goal percentage is '+correctAnswersCount/totalNumberOfQuestions+' and you had '+shotClockViolation+' turn overs!</h2>';
	$('.container').append(youWonMessage, startOverButton, text);


}

function youLost(){
	$('.container').empty();
	var text = "<h2>Click on the ball to play again!</h2>";
	var startOverButton = '<div class="basketball">';
	var youLostMessage = '<h2>Nice try but you lost... <br> You shot '+correctAnswersCount+' out of '+totalNumberOfQuestions+' <br> Your field goal percentage is '+correctAnswersCount/totalNumberOfQuestions+' and you had '+shotClockViolation+' turn overs!</h2>';
	$('.container').append(youLostMessage, startOverButton, text);



}

// SHOT CLOCK AND SCORE FUNCTIONS// 
function runShotClock(){
	shotClock = 25;
     counter = setInterval(decrement, 1000);
}

function stopShotClock(){
    clearInterval(counter);
}

function decrement(){    
    shotClock--;
    $('.shotClock').html('<h2>' + shotClock + '</h2>');
	 if (shotClock === 0){
        stopShotClock();
        timeIsUp();
    }
 }

function timeIsUp(){
 	$('.shotClock').html('<h2>00</h2>');
 	shotClockViolation ++;
	 $(".answer").remove();
 	$('<h2 id="wrongBanner">You are out of time! <br> Try again!</h2>').insertAfter(".question");
	setTimeout(pickRandomQuestion, 5000);	
}

function showScore(home,away){
	$('#correct').html(home);
	$('#wrong').html(away);
}

function startGame (){
	$(".welcome").addClass("hidden");
	$(".shotClock").removeClass("hidden");
	$(".container").removeClass("hidden");
	correctAnswersCount = 0;
	wrongAnswersCount = 0;
	shotClockViolation = 0;
	pickRandomQuestion();
}




$(document).ready(function(){
	$(".basketball").on("click", startGame);
	$(".answer").on("click", stopShotClock);	
});


