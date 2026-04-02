const startTime = 25 * 60; // 25 minute in seconds
const urlSVG = {
    start: 'assets/play.svg',
    stop: 'assets/stop.svg',
};

let timeNow = null;
let timeLeft = startTime; 
let timeState = null; // state of timer
let timeReminder = 1; // reminder of timeLeft befor Stop function

//color
const tomatoData = [
    {
        id:'main_color',
        type:'svg',
        green:'#26c421',
        red: '#e22028',
    },
    {
        id:'highlight',
        type:'svg',
        green:'#68d852',
        red: '#ea5658',
    },
    {
        id:'shadow',
        type:'svg',
        green:'#22b61d',
        red: '#cc2128',
    },
    {
        id:'timer-button',
        type:'div',
        green:'#119111',
        red: '#a01318',
    },
    {
        id:'btn-reset',
        type:'div',
        green:'#119111',
        red: '#a01318',
    },
    {
        id:'timer-display',
        type:'font',
        green:'#15640b',
        red:'#700e11',
    }
]

const animateProperty = {
    duration: (startTime * 1000),        
    iterations: 1,
    direction: 'normal',
    fill: 'both',
    easing: 'linear',
}

//buttons
const timerBtn = document.getElementById('timer-button')
const iconBtn = document.getElementById('icon-btn')
const btnReset = document.getElementById('btn-reset');

//display
const display = document.getElementById('display');
const timerDisplay = document.getElementById('timer-display');

//Audio
const clickHoldAudio = new Audio("./assets/audio/soundclick.hold.AAC");
clickHoldAudio.volume = 0.1;

const clickOutAudio = new Audio("./assets/audio/soundclick.out.AAC");
clickOutAudio.volume = 0.3;

const clickResetAudio = new Audio("./assets/audio/soundreset.AAC");
clickResetAudio.volume = 0.5;

const endAudio = new Audio("./assets/audio/endsound.AAC");

// prepare events

[btnReset,timerBtn].forEach(btn => {
    btn.addEventListener('mousedown', (event) => {
        event.button === 0 ? clickHoldAudio.play() : null;
    })
});

// prepare animations
const arrAnimation = tomatoData.map((item) => {
    const el = document.getElementById(item.id)
    
    let animateKeyframe;

    switch (item.type) {
        case 'svg':
            animateKeyframe = [
                {fill:item.green},
                {fill:item.red},
            ]
            break;
        case 'div':
            animateKeyframe = [
                {backgroundColor:item.green},
                {backgroundColor:item.red},
            ]
            break;
        case 'font':
            animateKeyframe = [
                {color:item.green},
                {color:item.red},
            ]
            break;
        default:
            animateKeyframe = [];
    }
    
    const anim = el.animate(animateKeyframe, animateProperty);

    anim.pause();

    return anim;
})

//main player
function timePlayer(){
    clickOutAudio.play();
    
    const isRun = (timeState === null)

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

//manipulation with timer
function startTimer() {
    let timeEnd = (Date.now() + (timeLeft * 1000)); // end in mlsecond

    timeState = setInterval(() => {
        if (timeReminder > 0) {
            timeNow = Date.now()
            timeReminder = Math.ceil((timeEnd - timeNow) / 1000);
            arrAnimation.forEach(anim => anim.currentTime = (startTime - timeReminder)*1000)
            updateDisplay(timeReminder);
        } else {
            endAudio.play()
            arrAnimation.forEach(anim => anim.pause())
            clearInterval(timeState);
            
            timeState = null;
            timerBtn.classList.add('hide');
            btnReset.classList.remove('hide');
            timerDisplay.classList.remove('timer-running');
        }
    }, 1000);
    if(!btnReset.classList.contains('hide')) btnReset.classList.add('hide')
}

function stopTimer(remind = timeReminder, end = false) {
    timeLeft = remind;
    arrAnimation.forEach((anim) =>{
        anim.pause();
        anim.currentTime = end ? 0 : (startTime - timeReminder)*1000;
    })
    clearInterval(timeState);
    timeState = null;
    if(Math.floor(timeLeft / 60) < startTime) btnReset.classList.remove('hide')
}

function resetTimer() {
    clickResetAudio.play();

    // reset time config
    timeLeft = startTime;
    timeNow = null;
    timeReminder = 1;
    
    stopTimer(timeLeft, true);
    updateDisplay(timeLeft);

    btnReset.classList.add('hide')
    if(timerBtn.classList.contains('hide')){
        timerBtn.classList.remove('hide', 'small', 'opacity-low');
        iconBtn.src = urlSVG.start;
    }
}

// math for display
function updateDisplay(timeR) {
    const minutes = Math.floor(timeR / 60);
    const seconds = timeR % 60;
    const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    display.textContent = timeString;
    document.title = `${timeString}`;
}