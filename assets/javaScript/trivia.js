$(document).on("click", '#startGame', startGame);

$(document).on("click", '#reset', function(){
	$('.text').remove();
	$('#reset').remove();
	clearScore();
	clearInterval(counter);
	correctAnswersCount = 0;
	wrongAnswersCount = 0;s
	shotClockViolation = 0;
	totalNumberOfQuestions = 0
	imageDisplay;
	gameStatus;
	counter; 
	inGame = true;
	pickRandomQuestion();	
});



var  data={
 	"questions":[
 	{
		"question": "This Player is the Los Angeles Lakers All Time Leading Scorer",
		"answers": ["Kareem Abdul-Jabbars","Kobe Bryant", "Elgin Baylo","Jerry West"],
		"correctAnswer" : 1,
		"imageUrl": "assets/images/kobe.gif",
	},
	{
		"question": "This Player is the New York Knicks All Time Leading Scorer",
		"answers": ["John Starks","Patrick Ewing", "Carmelo Anthony","Walt Frazier"],
		"correctAnswer" : 1,
		"imageUrl": "assets/images/ewing.gif",
	},

	{
		"question": "This Player is the Milwakee Bucks All Time Leading Scorer",
		"answers": ["Ray Allen", "Glenn Robinson", "Kareem Abdul-Jabbar", "Michael Redd"],
		"correctAnswer": 2,
		"imageUrl": "assets/images/Kareem.gif",
	},


	{
		"question": "This Player is the Portland Trail Blazers All Time Leading Scorer",
		"answers": ["Lamarcus Aldridge", "Terry Porter", "Clifford Robinson","Clyde Drexler"],
		"correctAnswer": 3,
		"imageUrl": "assets/images/clyde.gif",
	},
	{
		"question": "This Player is the Miami Heat All Time Leading Scorer",
		"answers": ["Glen Rice","Alonzo Morning", "Tim Hardaway","Dwyane Wade"],
		"correctAnswer" : 3,
		"imageUrl": "assets/images/wade.gif",
	},
	{
		"question": "This Player is the Golden State Warriors All Time Leading Scorer",
		"answers": ["Rick Barry","Chris Mullin", "Wilt Chamberlain","Stephen Curry"],
		"correctAnswer" : 2,
		"imageUrl": "assets/images/wilt.gif",
	},
	{
		"question": "This Player is the Minisota Timber Wolves All Time Leading Scorer",
		"answers": ["Sam Mitchell", "Kevin Love", "Wally Szczerbiak","Kevin Garnett"],
		"correctAnswer" : 3,
		"imageUrl": "assets/images/kg.gif",
	},
	{
		"question": "This Player is the Charlotte Hornets All Time Leading Scorer",
		"answers": ["Dell Curry", "	Gerald Wallace", "Larry Johnson","Kemba Walker"],
		"correctAnswer" : 0,
		"imageUrl": "assets/images/dell.gif",
	},
	{
		"question": "This Player is the Indiana Pacers All Time Leading Scorer",
		"answers": ["Billy Knight", "Jermaine O'Neal", "Reggie Miller","Rik Smiths"],
		"correctAnswer" : 2,
		"imageUrl": "assets/images/reggie.gif",
	},

	{
		"question": "This Player is the Chicago Bulls All Time Leading Scorer",
		"answers": ["Michael Jordan", "Scottie Pippen", "Bob Love","Jerry Sloan"],
		"correctAnswer" : 2,
		"imageUrl": "assets/images/goat.gif",
	},
]
}

function pushData(){
	for(var i=0; i <data.questions.length; i++){
		console.log(data.questions[i]);
		questionsArray.push(data.questions[i]);
		console.log(questionsArray)
	}
}

// VARIABLES //

var correctAnswersCount = 0;
var wrongAnswersCount = 0;
var shotClockViolation = 0;
var totalNumberOfQuestions = 0
var imageDisplay;
var gameStatus;
var counter; 
var inGame;


var questionsArray = [];


//GAME INITIALIZATION AND DOM DISPLAY FUNCTIONS //

function pickRandomQuestion(){
	clearScore();
	if(inGame === false) return;
	var randomIndex = Math.floor(Math.random()*questionsArray.length);
	var randomQuestion = questionsArray[randomIndex];
	questionsArray.splice(randomIndex, 1);
	displayQuestion(randomQuestion);
	console.log(randomQuestion);
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
			var b = '<div class="answer correct"><h2>'+questionDisplayed.answers[i]+'</h2></div>';
			
		}else{
			var b = '<div class="answer" ><h2>'+questionDisplayed.answers[i]+'</h2></div>';
		}
			$(".container").append(b);
	}
	$(".container").prepend('<div class="question"> <br><br><h2>"'+questionText+'"</h2></div>');
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
			showScore(correctAnswersCount, wrongAnswersCount);
		}else{
			wrongAnswersCount ++;
			wrongAnswerClickHandler(correctDisplay);
			showScore(correctAnswersCount, wrongAnswersCount);
		}	
	});
	
}


function correctAnswerClickHandler(correctDisplay){
	
	$(".answer").remove();
	$('<h2 id="correctBanner"> Nice Shot!! '+correctDisplay+' Is Correct!!!</h2>').insertAfter(".question");
	$(imageDisplay).removeClass("hidden");
	stopShotClock();
	checkScore();
}

function wrongAnswerClickHandler(correctDisplay){
	$(".answer").remove();
	$('<h2 id="wrongBanner">You Missed ... <br> correctAnswer is: '+correctDisplay+'</h2>').insertAfter(".question");
	$(imageDisplay).removeClass("hidden");
	stopShotClock();
	checkScore();
}

// NEW RANDOM QUSTION//

function checkScore(){

	if(wrongAnswersCount === 10){
		inGame = false;
		var percentage = (correctAnswersCount/totalNumberOfQuestions).toFixed(2);
		$('.container').empty();
		var text = '<h2 class="text">Click on the ball to play again!</h2>';
		var startOverButton = '<div class="basketball" id="reset">';
		var youWonMessage = '<h2 class="text">Nice shooting! You won!... <br> You shot '+correctAnswersCount+' out of '+totalNumberOfQuestions+' <br> Your field goal percentage is '+percentage+' and you had '+shotClockViolation+' turn overs!</h2>';
		$('.container').append(youWonMessage, startOverButton, text);
}

	else if(correctAnswersCount === 5){
		inGame = false;
		var percentage = Math.floor(correctAnswersCount/totalNumberOfQuestions);
		$('.container').empty();
		var text = '<h2 class="text">Click on the ball to play again!</h2>';
		var startOverButton = '<div class="basketball" id="reset">';
		var youLostMessage = '<h2 class="text">Nice try but you lost... <br> You shot '+correctAnswersCount+' out of '+totalNumberOfQuestions+' <br> Your field goal percentage is '+percentage+' and you had '+shotClockViolation+' turn overs!</h2>';
		$('.container').append(youLostMessage, startOverButton, text);
	}	
	else{

		setTimeout(pickRandomQuestion, 5000);
	}
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
 	clearInterval(counter);
	setTimeout(pickRandomQuestion, 5000);	
}

function showScore(home,away){
	$('#correct').html(home);
	$('#wrong').html(away);
}

function startGame (){
	pushData();
	clearScore();
	clearInterval(counter);
	$(".welcome").addClass("hidden");
	$(".shotClock").removeClass("hidden");
	$(".container").removeClass("hidden");
	correctAnswersCount = 0;
	wrongAnswersCount = 0;
	shotClockViolation = 0;
	totalNumberOfQuestions = 0
	imageDisplay;
	gameStatus;
	counter; 
	inGame = true;
	pickRandomQuestion();	
	pushData;

	
	
}


function clearScore(){
	$(".question").remove();
	$(".answer").remove();
	$(imageDisplay).addClass("hidden");
$("#correctBanner").remove();
$("#wrongBanner").remove();
}


