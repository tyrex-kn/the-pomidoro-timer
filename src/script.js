const startTime = 0.1 * 60; // 25 minute in seconds
const urlSVG = {
    start: 'assets/play.svg',
    stop: 'assets/stop.svg',
};

let timeLeft = startTime; 
let timerId = null; // state of timer

const timerBtn = document.getElementById('timer-button')
const iconBtn = document.getElementById('icon-btn')
const btnReset = document.getElementById('btn-reset');

const display = document.getElementById('display');
const timerDisplay = document.getElementById('timer-display');

const clickHoldAudio = new Audio("./assets/audio/soundclick.hold.AAC");
clickHoldAudio.volume = 0.1;

const clickOutAudio = new Audio("./assets/audio/soundclick.out.AAC");
clickOutAudio.volume = 0.3;

const clickResetAudio = new Audio("./assets/audio/soundreset.AAC");
clickResetAudio.volume = 0.5;

const endAudio = new Audio("./assets/audio/endsound.AAC");

[btnReset,timerBtn].forEach(btn => {
    btn.addEventListener('mousedown', (event) => {
        event.button === 0 ? clickHoldAudio.play() : null;
    })
});

function timePlayer(){
    clickOutAudio.play();
    const isRun = timerId === null

    if(isRun){
        startTimer();
    }else{
        stopTimer();
    };

    iconBtn.src = isRun ? urlSVG.stop : urlSVG.start;
    iconBtn.classList.toggle('stop', isRun);
    iconBtn.classList.toggle('start', !isRun);
    timerBtn.classList.toggle('small', isRun);
    timerBtn.classList.toggle('opacity-low', isRun);
    timerDisplay.classList.toggle('timer-running', isRun);
  }

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    Math.floor(timeLeft / 60) < 30 ? btnReset.classList.remove('hide') : null;
}

function resetTimer() {
    btnReset.classList.add('hide')
    if(timerBtn.classList.contains('hide')){
        timerBtn.classList.remove('hide', 'small', 'opacity-low');
        iconBtn.src = urlSVG.start;
    }
    clickResetAudio.play();
    stopTimer();
    timeLeft = startTime;
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            endAudio.play()
            clearInterval(timerId);
            timerId = null;
            timerBtn.classList.add('hide');
            btnReset.classList.remove('hide');
            timerDisplay.classList.remove('timer-running');
        }
    }, 1000);
    if(!btnReset.classList.contains('hide')) btnReset.classList.add('hide')
}

