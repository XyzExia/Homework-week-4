

var questions = [
    { 
        question: "question 1",
        choices: ["a", "b", "c", "d"],
        Answer: "a"
    },
    { 
        question: "question 2",
        choices: ["a", "b", "c", "d"],
        Answer: "c"
    },
    { 
        question: "question 3",
        choices: ["a", "b", "c", "d"],
        Answer: "a"
    },
    { 
        question: "question 4",
        choices: ["a", "b", "c", "d"],
        Answer: "d"
    },
    { 
        question: "question 5",
        choices: ["a", "b", "c", "d"],
        Answer: "b"
    },
];

var timeleft = 100
var q = 0; 
// value of q determines the question taken from the questions object.
var beginQuiz = document.querySelector("#beginBtn");
var question = document.querySelector("#question");
//targets.
var mcA = document.querySelector("#mcA");
var mcB = document.querySelector("#mcB");
var mcC = document.querySelector("#mcC");
var mcD = document.querySelector("#mcD");
var timer = document.querySelector(".timer");
var questionbox = document.querySelector("#questionbox");
var qgame = document.querySelector("#qgame");
var scoreboard = document.querySelector(".end") 
var score = document.querySelector(".score")
var timeInterval;
var scoreList = [];
var recscore;
var start = document.querySelector(".start")

getScore()
//timer

function timerS(){
    timeInterval = setInterval(function (){
        timeleft--;
        timer.textContent = "Time "+ timeleft
        
        if(timeleft === 0 || q>=questions.length){
            clearInterval(timeInterval);
            gg()
        }
    },1000);
}

//display questions function
function displayq(){
        if (q<questions.length){
            question.textContent = questions[q].question;
            mcA.textContent = questions[q].choices[0];
            mcB.textContent = questions[q].choices[1];
            mcC.textContent = questions[q].choices[2];
            mcD.textContent = questions[q].choices[3];
        } else{
            gg();
        }
  
}

//compare function
function comparor(event){
    if (q>= question.length){
        gg ();
        clearInterval(timeInterval);
    } else{
        if (event === questions[q].Answer){
            qresult.textContent="correct"
        }else{
            timeleft -= 10
            qresult.textContent="wrong choice"
        }
    }
    q++
    displayq()
    recscore = timeleft
}

var gamechoicebox = document.querySelector(".gamechoicebox")

gamechoicebox.addEventListener("click", function(event){
    event.preventDefault();
    var event = event.target;
    comparor(event.textContent.trim());
})

//gameover

function gg(){
    qgame.classList.add("hidden")
    lboard.classList.remove("hidden")
    scoreboard.classList.remove("hidden")
    score.textContent = "your score is " + recscore;
    leaderBoard();
}

beginQuiz.addEventListener("click", function (event) {
    timerS();
    displayq();
    qgame.classList.remove("hidden")
    start.classList.add("hidden")
  });

//saving stuff 

function saveScore() {
    localStorage.setItem("highScore", JSON.stringify(scoreList));
}

function getScore() {
    var storedScore = JSON.parse(localStorage.getItem("highScore"));
    if (storedScore !== null) {
      scoreList = storedScore;
    }
}

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var playerInitials = initialsBox.value.trim();
    var newScore = {
      player: playerInitials,
      score: recscore,
    };
    
    scoreList.push(newScore);
    saveScore();
    leaderBoard();
  });

// leader board 


function addToLeaderBoard() {
    leaderBoardDiv = document.createElement("div");
    leaderBoardDiv.setAttribute("id", "playerInitials");
    document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
  }

function removeFromLeaderBoard() {
    var removeScores = document.getElementById("playerInitials");
    if (removeScores !== null) {
      removeScores.remove();
    } else {
    }
  }

  function leaderBoard() {
    removeFromLeaderBoard();
    addToLeaderBoard();
    scoreList.sort((a, b) => {
      return b.score - a.score;
    });
    topTen = scoreList.slice(0, 10);
  
    for (var i = 0; i < topTen.length; i++) {
      var player = topTen[i].player;
      var score = topTen[i].score;
  
      var newDiv = document.createElement("div");
      leaderBoardDiv.appendChild(newDiv);
  
      var newLabel = document.createElement("label");
      newLabel.textContent = player + " - " + score;
      newDiv.appendChild(newLabel);
    }
  }

  backBtn.addEventListener("click", function (event) {
    location.reload();
  });