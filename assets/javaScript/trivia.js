// VARIABLES //

var correctAnswersCount = 0;
var wrongAnswersCount = 0;
var shotClock = 24;
var shotClockViolationCount = 0; 

var questionOne = {
	question: "This Player is the New York Knicks All Time Leading Scorer",
	answers: ["John Starks","Patrick Ewing", "Carmelo Anthony","Walt Frazier"],
	correctAnswer : 1,

}

var questionTwo = {
	question: "This Player is the Milwakee Bucks All Time Leading Scorer",
	answers: ["Ray Allen", "Glenn Robinson", "Kareem Abdul-Jabbar", "Michael Redd"],
	correctAnswer: 2,
}

var questionThree = {
	question: "This Player is the Portland Trail Blazers All Time Leading Scorer",
	answers: ["Lamarcus Aldridge", "Terry Porter", "Clifford Robinson","Clyde Drexler"],
	correctAnswer: 3,
}


var questionsArray = [questionOne, questionTwo , questionThree]


// FUNCTIONS //

function pickRandomQuestion(){
	var randomQuestion = questionsArray[Math.floor(Math.random()*questionsArray.length)];
	var randomQuestionQuote = randomQuestion.question;
	var randomAnswers = randomQuestion.answers;
	var randomCorrect = randomQuestion.correctAnswer;
	displayQuestion(randomQuestion);
}

function displayQuestion(questionDisplayed){
	var questionText = questionDisplayed.question;
	var questionIndex = questionDisplayed.correctAnswer;
	var correctDisplay = questionDisplayed.answers[questionIndex];
	
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
	 setTimeout(newRandomQuestion, 5000);
}

function setAnswerEventClicker(){
	$(".answer").on("click", function(){
		if($(this).hasClass("correct")){
			correctAnswersCount ++;
			console.log("yes");
		}else{
			wrongAnswersCount ++;
			console.log("no");

		}
	});
}

function newRandomQuestion(){
	$(".question").empty();
	$(".answer").remove();
	shotClock = 25;
	pickRandomQuestion();
}
 
   
  
  


 function runShotClock(){
            counter = setInterval(decrementShotClock, 1000);
        }

 function decrementShotClock(){
  	shotClock--;
    $('.shotClock').html('<h1>' + shotClock + '</h1>');
        if (shotClock === 0){
                stopShotClock();
                console.log('Time Up!')
                $('.shotClock').html('<h1> 00 </h1>');
    }
}

function stopShotClock(){
    clearInterval(counter);
}

$(document).ready(function(){

pickRandomQuestion();
setAnswerEventClicker();
runShotClock();
});