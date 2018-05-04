$(document).ready(function() {
    console.log("Ready!");

//GLOBAL FUNCTIONS
//=============================================================

var theClock = {
clock: "",
questionCount: 0,
incorrectAnswer: 0,
correctAnswer: 0,
timeCounter: 20,
guessesRemaining: 0,
}

var gifGifs = {
correctGif: "images/nope.gif",
incorrectGif: "images/astronaut.gif",
}

var words = {
    correct: "You're right. Let's do a happy dance!",
    incorrect: "Womp, Womp. Try again.",
}

//Questions user is able to see and answers
var spaceQuestions = [
{
    question: "Is space completely silent?",
    answers: ['true', 'false'],
    correctAnswer: 0,
}, 
{
    question: "How many stars are there in the universe?",
    answers: ['70 sextillion', 'Zillions', '12 billion'],
    correctAnswer: 1,
    // images: "images/319544187.jpg",


},
{
    question: "How many years will the Apollo astronauts' footprints stay on the moon?",
    answers: ['20 years', '100 million years',  "They're already gone."],
    correctAnswer: 1,
    // image: "images/319544187.jpg",
},
{
    question: "A day on Venus is",
    answers: ['346 Earth days', '1 Earth hour', '224.7 Earth days'],
    correctAnswer: 2,
    // image: "images/319544187.jpg",
}
];

//MAIN FUNCTIONS
//==============================================================

    //Start game by pressing Start button
 
    $(".start").click(function() {
        $(".button-button").empty();
        nextQuestion();
    
    });

    function nextQuestion(){
        updateScore();
        time();
        $(".quiz").empty();
        //Load questions at random after click Start button
        var randomStellar = [Math.floor(Math.random()*spaceQuestions.length)];
        var stellarQuestion = spaceQuestions[randomStellar];
        console.log(stellarQuestion);
    
        var questionDiv = $("<div>");
        questionDiv.addClass("quizClass");
        questionDiv.attr('correctAnswer', stellarQuestion.correctAnswer);
        questionDiv.append(stellarQuestion.question);
        $(".quiz").append(questionDiv);
        console.log(stellarQuestion.correctAnswer);

        var answerDiv = $("<div>");
        $(".quiz").append(answerDiv);
        for (var i = 0; i < stellarQuestion.answers.length; i++){
        //add div for each possible answer 
        //give it an id of integer
        var answerOptionDiv = $('<div>');
        answerOptionDiv.addClass('answerOpDivClass');
        answerOptionDiv.attr('answeranswer', [i]);
        answerOptionDiv.append(stellarQuestion.answers[i]);
        $(answerDiv).append(answerOptionDiv);
       
        }
        //console.log(stellarQuestion.answers.length);
        console.log(answerOptionDiv);      
    }

    //create an onclick function to choose correct Answer 
    //function chooseAnswer() {
        $('body').on('click', '.answerOpDivClass', function(){
        
        //Show the users choice
        var yourChoice = parseInt(($(this).attr('answeranswer')));
        //Show the correct answer
        var theAnswer = parseInt(($('.quizClass').attr('correctAnswer')));
            console.log(theAnswer);
            console.log(yourChoice);
        
        if(yourChoice === theAnswer){
                console.log("Right on!");
                $(".answerOptionDiv").html(words.correct);
                $(".answerOptionDiv").append('<img src=' + gifGifs.correctGif + '>');
                // alert("That's the right choice!");
                theClock.correctAnswer += 1;
                console.log("Correct : " + theClock.correctAnswer);    
                clearInterval(theClock.clock);
                nextQuestion();
               

        } else {
            console.log("Sorry, that's incorrect.");
                $(".answerOptionDiv").html(words.incorrect);
                $(".answerOptionDiv").append('<img src=' + gifGifs.incorrectGif + '>');
                theClock.incorrectAnswer += 1;
                console.log("Incorrect : " + theClock.incorrectAnswer); 
                clearInterval(theClock.clock);
                nextQuestion();
        }
    
            
        });
  

    //User has 20 seconds to answer question
    function time(){
    theClock.timeCounter = 20;
    theClock.clock = setInterval(twentySeconds, 1000);
    }

    function twentySeconds(){
    if(theClock.timeCounter === 0){ 
    clearInterval(theClock.clock);
    theClock.incorrectAnswer += 1; 
    nextQuestion();

    }
    if(theClock.timeCounter > 0) {
        theClock.timeCounter--;
    }
    $(".timer").text(theClock.timeCounter);
    }


    function updateScore(){
     $("#correct").text(theClock.correctAnswer);
        if(theClock.correctAnswer === 5){
        console.log("You won!")
        resetGame();
    }

    $("#incorrect").text(theClock.incorrectAnswer);
    if(theClock.incorrectAnswer === 5){
        // alert("You ran out of guesses.")
        console.log("You lost")
        resetGame();
    }
}

    //reset game if user reaches max number of tries
    function resetGame(){
        theClock.questionCount = 0;
        theClock.correctAnswer = 0;
        theClock.incorrectAnswer = 0;
        theClock.timeCounter = 20;
        img = "";
  };

  

});

