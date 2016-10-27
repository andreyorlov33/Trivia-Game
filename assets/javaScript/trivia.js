// VARIABLES //

var correctAnswersCount = 0;
var wrongAnswersCount = 0;
var shotClockViolation = 0;
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
	$(".question").html(questionText);
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
}


function correctAnswerClickHandler(correctDisplay){
	
	$(".answer").remove();
	$(".container").append('<h2 id="correctBanner"> Nice Shot!! '+correctDisplay+' Is Correct!!!</h2>')
	$(imageDisplay).removeClass("hidden");
	stopShotClock();
	setTimeout(pickRandomQuestion, 5000);
	
}

function wrongAnswerClickHandler(correctDisplay){
	$("#wrong").html(wrongAnswersCount);
	$("#correct").html(correctAnswersCount);
	$(".answer").remove();
	$(".container").append('<h2 id="wrongBanner">You Missed ... <br> correctAnswer is: '+correctDisplay+'</h2>')
	$(imageDisplay).removeClass("hidden");
	stopShotClock();
	setTimeout(pickRandomQuestion, 5000);	
}

// NEW RANDOM QUSTION//






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
 $(".answer").remove();
 	$(".container").append('<h2 id="wrongBanner">You are out of time! <br> Try again!</h2>')
	setTimeout(pickRandomQuestion, 5000);	
}

function startGame (){
	$(".welcome").addClass("hidden");
	$(".shotClock").removeClass("hidden");
	$(".container").removeClass("hidden");
	pickRandomQuestion();
}




$(document).ready(function(){
	$(".basketball").on("click", startGame);
	$(".answer").on("click", stopShotClock);
	
});


