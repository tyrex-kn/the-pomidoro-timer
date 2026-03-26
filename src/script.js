const startTime = 25 * 60; // 30 минут в секундах
let timeLeft = startTime; 
let timerId = null;

const display = document.getElementById('display');
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnReset = document.getElementById('btn-reset');
const endAudio = new Audio("./assets/audio/endsound.AAC")

// const typeClass ={
//     hide:'hide',
//     show:'show',
// }

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (timerId !== null) return;

    // btnStart.classList.remove('show')
    btnStart.classList.add('hide')
    btnStop.classList.remove('hide')
    // btnStop.classList.add('show')
    timerId = setInterval(() => {
        
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        
        } else {
            endAudio.play();
            clearInterval(timerId);
            timerId = null;
            btnStop.classList.add('hide');
            btnReset.classList.remove('hide')
        }
    }, 1000);
    if (!btnReset.classList.contains('hide')) btnReset.classList.add('hide')
    
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    // btnStop.classList.remove('show')
    btnStop.classList.add('hide');
    btnStart.classList.remove('hide');
    // btnStart.classList.add('show');
    Math.floor(timeLeft / 60) < 30 ? btnReset.classList.remove('hide') : null;
}

function resetTimer() {
    stopTimer();
    timeLeft = startTime;
    updateDisplay();
    btnReset.classList.add('hide')
    if (btnStart.classList.contains('hide')) btnStart.classList.remove('hide')
}
