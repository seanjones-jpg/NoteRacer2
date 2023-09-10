

var score = 0;
var noteHit = 0;
var note = '';
var notes = ['e','f','g','a','b','c','d'];
var notesRemaining = 0;
var iterations = 0;
var startTime = 0;
var endTime = 0;
var raceLength = 0;
var multiplier = 1;
var streak = 1;
var noteStatus = 'good';
var rootElement = document.querySelector(':root');
var lightMode = true;
var multiplierBorderColor = 'var(--multiplier-border-1x)'
const STREAK_FACTOR = 4;
const MULTIPLIER_MAX = 8;

function lightToDark(){
    if(lightMode === true){
        lightMode = false;
        rootElement.style.setProperty('--background', '#040D12');
        rootElement.style.setProperty('--lowlight', '#93B1A6');
        rootElement.style.setProperty('--highlight', '#183D3D');
        rootElement.style.setProperty('--button-color', '#5C8374');
        document.getElementById('darkmode').innerHTML = 'Light Mode'
    }else{
        lightMode = true;
        rootElement.style.setProperty('--background', 'darkolivegreen');
        rootElement.style.setProperty('--lowlight', 'black');
        rootElement.style.setProperty('--highlight', 'blanchedalmond');
        rootElement.style.setProperty('--button-color', 'green');
        document.getElementById('darkmode').innerHTML = 'Dark Mode'
    }
    
}

function showInstructions(onOff){
    if(onOff){
        document.getElementById('instructions').style.display = 'inline-block';
    }else if(!onOff){
        document.getElementById('instructions').style.display = 'none';
    }
}

function reset(){ //reset function resets all values and stylings
    iterations = 0;
    score = 0;
    noteHit = 0;
    multiplier = 1;
    document.getElementById('gameScoreSpan').innerHTML = score;
    scoreMultiplier(true);
}


function changeElementStyle(element, color, scale) {
    // Get the element by its id
    var element = document.getElementById(element);
    // Set the background color of the element
    element.style['background-color'] = color;
    // Set the scale of the element using CSS transform property
    element.style.transform = 'scale(' + scale + ')';
  }

function scoreMultiplier(reset){
    if(streak%STREAK_FACTOR === 0 && multiplier < MULTIPLIER_MAX){
        multiplier++;

        changeElementStyle('multiplierBox', 'var(--button-color)', '150%');
        setTimeout(() => {
            changeElementStyle('multiplierBox', 'var(--button-color)', '100%');
        }, "2000");
    }
    if(reset){
        document.getElementById('multiplierBox').style.border = 'var(--multiplier-border-1x)';
    }
}

function noteStyling(noteStatus){
    
    if (noteStatus){
        changeElementStyle('note', 'green', '150%');
        setTimeout(() => {
            changeElementStyle('note', 'var(--lowlight)', '100%');
        }, "200");
        }else if (!noteStatus){
            changeElementStyle('note', 'red', '150%');
            setTimeout(() => {
                changeElementStyle('note', 'var(--lowlight)', '100%');
            }, "200");
    }
}

function startGame(){
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('resultDiv').style.display = 'none';
    document.getElementById('gameDiv').style.display ='block';
    raceLength = parseInt(document.getElementById('raceLength').value);
    
    reset();
    
    startTime = new Date().getTime();

    displayLetter();
}

function displayLetter() {

    iterations++;

    if(iterations > raceLength){
        endTime = new Date().getTime(); // set end time

        var elapsedTime = (endTime - startTime) / 1000; // determine time elapsed
        var notesPerMin = Math.round(noteHit / elapsedTime * 60);

        document.getElementById('scoreSpan').innerHTML = score; // display score
        document.getElementById('notesHitSpan').innerHTML = noteHit + '/' + raceLength;
        document.getElementById('timeSpan').innerHTML = elapsedTime + ' seconds'; // display time elapsed
        document.getElementById('notesPerMin').innerHTML = notesPerMin;

        document.getElementById('gameDiv').style.display = 'none';
        document.getElementById('resultDiv').style.display = 'block';
    } else {
        var noteLocation = Math.floor(Math.random() * 9);
        var index = noteLocation%7;
        note = notes[index];
        notesRemaining = raceLength - iterations + 1;
        document.getElementById('noteSpan').innerHTML = note;
        document.getElementById('notesRemainingSpan').innerHTML = notesRemaining;
        document.getElementById('note').style.top = String(parseInt(54 - (noteLocation * 6)))+ 'px';
        document.getElementById('multiplier').innerHTML = multiplier;
        document.getElementById('note-guess').value = '';
        document.getElementById('note-guess').focus();
    }

}

function checkInput() {
    var input = document.getElementById('note-guess').value;
    multiplierBorderColor = 'var(--multiplier-border-' + String(multiplier) +'x)';
    document.getElementById('gameScoreSpan').innerHTML = score;
    document.getElementById('multiplierBox').style.border = multiplierBorderColor;
    if(input == note){
        score = score + 1*multiplier;
        noteHit++;
        streak++;
        noteStatus = true;
    } else{
        streak = 1;
        noteStatus = false;
        if(score > 0){
        score--;
        multiplier = 1;
        scoreMultiplier(true);
        }else{
            score = score;
        }
    }
    noteStyling(noteStatus);
    scoreMultiplier(false);
    displayLetter();
}

function returnHome(){
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('resultDiv').style.display = 'none';
    document.getElementById('gameDiv').style.display ='none';
    reset();
}