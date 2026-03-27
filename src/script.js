const startTime = 30 * 60; // 30 минут в секундах
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
// btnReset.addEventListener('mousedown', (event) => {
//     event.button === 0 ? clickHoldAudio.play() : null;
// })



function timePlayer(){
    clickOutAudio.play();
    const isRun = timerId === null
    // if (timerId === null) {
    //     startTimer();
    //     iconBtn.src = urlSVG.stop; 
    //     iconBtn.classList.replace('start', 'stop');
    //     timerBtn.classList.add('opacity-low');
    //     // timerBtn.style.scale = '0.7';
    //     timerDisplay.style.fontSize = '50px';
    //     timerDisplay.style.marginBottom = '-10px';
    // } 
    // else {
    //     stopTimer()
    //     iconBtn.src = urlSVG.start;
    //     iconBtn.classList.replace('stop', 'start');
    //     timerBtn.classList.remove('opacity-low');
    //     timerBtn.style.scale = '1';
    //     timerDisplay.style.fontSize = '40px';
    //     timerDisplay.style.marginBottom = '0px';
    // }

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
    clickResetAudio.play();
    stopTimer();
    timeLeft = startTime;
    updateDisplay();
    btnReset.classList.add('hide')
    // if(timerBtn.classList.contains('hide')) ? timerBtn.classList.remove('hide')
    // timerBtn.classList.toggle('hide')
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
            clearInterval(timerId);
            timerId = null;
            timerBtn.classList.add('hide');
            btnReset.classList.remove('hide');
        }
    }, 1000);
    if(!btnReset.classList.contains('hide')) btnReset.classList.add('hide')
    // btnReset.classList.toggle('hide')
    // !btnReset.classList.contains('hide') ? btnReset.classList.add('hide') : null;
}

