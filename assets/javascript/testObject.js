var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var guessLeft;
var hangmanPic;
var wordLength;
var guessedLetters;
var wordSplit;
var dictionary = ["manager", "champion","soccer","football","goal","field","pitch","cleats","striker","defender","midfielder","goalkeeper","goalie","hat trick"];
var currentWord;
var isGuessRight;
var gameOver=false;
var myMusic;
var myLossMusic;
var wins=0;
var losses=0;
var hangmanGame = {
	//draws the hangman ascii on the left
	updateHangman : function () {
		hangmanPic= "______   <br>" + "|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp | <br>";
		if(guessLeft === 6){
			hangmanPic += "  | <br>" +"| <br>" +"| <br>" +"| <br>" +"|" + "______";
		}
		else if(guessLeft === 5)
		{
			hangmanPic += "  |&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 0 <br>" +"| <br>" +"| <br>" +"| <br>" +"|" + "______";
		}
		else if(guessLeft === 4){
			hangmanPic += "  |&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 0 <br>" +"|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp |  <br>" +"| <br>" +"| <br>" +"|" + "______";
		}
		else if(guessLeft === 3){
			hangmanPic += "  |&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 0 <br>" +"|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp/ | &#92 <br>" +"| <br>" +"| <br>" +"|" + "______";
		}
		else if(guessLeft === 2){
			hangmanPic += "  |&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 0 <br>" +"|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp/ | &#92 <br>" +"|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp/ <br>" +"| <br>" +"|" + "______";
		}
		else if(guessLeft === 1){
			hangmanPic += "  |&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 0 <br>" +"|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp/ | &#92 <br>" +"|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp/ &nbsp &#92<br>" +"| <br>" +"|" + "______";
		}
		else{
			hangmanPic += "  |&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp X <br>" +"|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp/ | &#92 <br>" +"|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp/ &nbsp &#92<br>" +"| <br>" +"|" + "______";
		}
		document.getElementById("hangmanAscii").innerHTML = hangmanPic;
	},
	//draws the current state of the guessed word with underlines where characters are still unknown
	drawCurrentWord : function() {
		wordLength=[''];
		for (var i = 0; i < currentWord.length; i++) {
			//if there's a phrase, separate the underlined letters
			if(currentWord.charAt(i) === ' ')
			{
				wordLength+=' &nbsp&nbsp'
			}
			else if(guessedLetters.indexOf(currentWord.charAt(i))!== -1){
				wordLength+= currentWord.charAt(i) + '&nbsp';
			}
			else{
				wordLength+='_&nbsp';
			}
		}
		document.getElementById("wordDisplay").innerHTML = wordLength;
	},
	updateGuessesLeft : function() {
		document.getElementById("guessLeft").innerHTML = guessLeft;
	},
	updateLettersGuessed : function() {
		document.getElementById("guessedLetters").innerHTML = guessedLetters;
	},
	updateWins : function () {
		document.getElementById("wins").innerHTML = "Wins: " + wins;
	},
	updateLosses : function() {
		document.getElementById("losses").innerHTML = "Losses: " + losses;
	},
	//shows whether user won or lost and clears on new game start
	updateResult : function(result){
		if(result!=="new")
		{	
			document.getElementById("gameResult").innerHTML = "You " + result;
		}
		else{
			document.getElementById("gameResult").innerHTML ='';
		}
	},
	//starts a new game
	resetGame : function() {
		guessLeft = 6;
		guessedLetters=[];
		currentWord= dictionary[Math.floor(dictionary.length*Math.random())];
		this.updateGuessesLeft();
		this.updateHangman();
		this.drawCurrentWord();
		this.updateLettersGuessed();
		this.updateWins();
		this.updateLosses();
		this.updateResult("new");
		gameOver=false;
	},
	//initializes sound objects and gives them a play function
	winSound : function(src) {
		this.sound = document.createElement("audio");
		this.sound.src = src;
	    this.sound.setAttribute("preload", "auto");
	    this.sound.setAttribute("controls", "none");
	    this.sound.style.display = "none";
	    document.body.appendChild(this.sound);
	    this.play = function(){
	        this.sound.play();
	    } 
	},
	checkGuess : function(guess) {
		isGuessRight = false;
		wordSplit = currentWord.split('');
		for(x in wordSplit){
			if(guess===wordSplit[x]){
				isGuessRight = true;
			}
		}
		return isGuessRight;
	}
}
//initializes the game on page load
hangmanGame.resetGame();
//creates the win and loss sound elements
myMusic = new hangmanGame.winSound("./assets/sounds/victory.wav");
myLossMusic = new hangmanGame.winSound("./assets/sounds/loss.wav");
//the user input
document.onkeyup = function (event){
	if(alphabet.indexOf(event.key)>-1 && guessedLetters.indexOf(event.key) == -1 && gameOver===false)
	{
		guessedLetters.push(event.key);
		guessLeft--;
		hangmanGame.checkGuess(event.key);
		if(isGuessRight){
			guessLeft++;
			hangmanGame.drawCurrentWord();
			if(wordLength.replace(/&nbsp/g, '')===currentWord)
			{
				hangmanGame.updateResult("won!");
				wins++;
				gameOver=true;
				myMusic.play();
				hangmanGame.updateWins();
				// resetGame();
				return
			}
		}
		if(guessLeft===0){
			hangmanGame.updateHangman();
			hangmanGame.updateResult("lost!");
			losses++;
			gameOver=true;
			myLossMusic.play();
			hangmanGame.updateLosses();
			hangmanGame.updateGuessesLeft();
			hangmanGame.updateLettersGuessed();
			// resetGame();
			return;
		}
		hangmanGame.updateGuessesLeft();
		hangmanGame.updateHangman();
		hangmanGame.updateLettersGuessed();
	}
	else if(event.key === 'Escape'){
		hangmanGame.resetGame();
	}
	else{
		return;
	}
};
