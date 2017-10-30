var guessLeft = 6
var hangmanPic='';
var wordLength='';
var guessedLetters=[''];
var dictionary = ["soccer","football","goal","field","pitch","cleats","striker","defender","midfielder","goalkeeper","goalie","hat trick"];
var currentWord= dictionary[Math.floor(dictionary.length*Math.random())];
currentWord = "THERE WAS";
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
	for (var i = 0; i < currentWord.length; i++) {
		if(currentWord.charAt(i) === ' ')
		{
			wordLength+=' &nbsp&nbsp'
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
updateGuessesLeft();
updateHangman();
drawCurrentWord();
updateLettersGuessed();

