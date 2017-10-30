var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var guessLeft;
var hangmanPic;
var wordLength;
var testWord="eee www";
var guessedLetters;
var wordSplit;
var dictionary = ["soccer","football","goal","field","pitch","cleats","striker","defender","midfielder","goalkeeper","goalie","hat trick"];
var currentWord;
var isGuessRight;
var wins=0;
function updateHangman (){
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
}
function drawCurrentWord() {
	wordLength=[''];
	for (var i = 0; i < currentWord.length; i++) {

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
}
function updateGuessesLeft(){
	document.getElementById("guessLeft").innerHTML = guessLeft;
}
function updateLettersGuessed(){
	document.getElementById("guessedLetters").innerHTML = guessedLetters;
}
function updateWins(){
	document.getElementById("wins").innerHTML = "Wins: " + wins;
}
function resetGame() {
	guessLeft = 6;
	guessedLetters=[];
	currentWord= dictionary[Math.floor(dictionary.length*Math.random())];
	updateGuessesLeft();
	updateHangman();
	drawCurrentWord();
	updateLettersGuessed();
	updateWins();
}
function checkGuess(guess){
	isGuessRight = false;
	wordSplit = currentWord.split('');
	for(x in wordSplit){
		if(guess===wordSplit[x]){
			console.log(x);
			isGuessRight = true;
		}
	}
	console.log(isGuessRight);
	return isGuessRight;
}

resetGame();
document.onkeyup = function (event){
	if(alphabet.indexOf(event.key)>-1 && guessedLetters.indexOf(event.key) == -1)
	{
		guessedLetters.push(event.key);
		guessLeft--;
		checkGuess(event.key);
		if(isGuessRight){
			guessLeft++;
			drawCurrentWord();
		}
		if(wordLength.replace(/&nbsp/g, '')===currentWord)
		{
			alert("You win!");
			wins++;
			resetGame();
			return
		}
		if(guessLeft===0){
			alert("You lose!");
			resetGame();
			return;
		}
		updateGuessesLeft();
		updateHangman();
		updateLettersGuessed();
	}
	else{
		return;
	}
};