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
const timerDisplay = document.getElementById('timer-display')

const clickHoldAudio = new Audio("./assets/audio/soundclick.hold.AAC");
clickHoldAudio.volume = 0.1;

const clickOutAudio = new Audio("./assets/audio/soundclick.out.AAC");
clickOutAudio.volume = 0.3;

const endAudio = new Audio("./assets/audio/endsound.AAC")

timerBtn.addEventListener('mousedown', (event) => {
    event.button === 0 ? clickHoldAudio.play() : null;
})

// window.addEventListener('mouseup', (event) =>{
//     clickOutAudio.play()
// })


function timePlayer(){
    clickOutAudio.play()
    if (timerId === null) {
        startTimer();
        iconBtn.classList.remove('start')
        iconBtn.classList.add('stop')
        timerBtn.classList.add('small', 'opacity-low')
        timerDisplay.style.fontSize = '50px'
        timerDisplay.style.setProperty('margin-bottom', '-10px')
        // iconBtn.classList.add('small')
        iconBtn.src = urlSVG.stop; 
    } 
    else {
        stopTimer(timerId)
        timerId = null;
        iconBtn.classList.add('start')
        iconBtn.classList.remove('stop')
        timerBtn.classList.remove('small', 'opacity-low')
        timerDisplay.style.fontSize = '40px'
        timerDisplay.style.setProperty('margin-bottom', '0')
        // iconBtn.classList.remove('small')
        iconBtn.src = urlSVG.start;
    }

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
            // btnStop.classList.add('hide');
            timerBtn.classList.add('hide')
            btnReset.classList.remove('hide')
        }
    }, 1000);
    if (!btnReset.classList.contains('hide')) btnReset.classList.add('hide')
    
}

function stopTimer(ti) {
    clearInterval(ti);
    timerId = null;

    Math.floor(timeLeft / 60) < 30 ? btnReset.classList.remove('hide') : null;
}

function resetTimer() {
    stopTimer();
    timeLeft = startTime;
    updateDisplay();
    btnReset.classList.add('hide')
    if (timerBtn.classList.contains('hide')) timerBtn.classList.remove('hide')
}

function playSoundClick (){
   
}