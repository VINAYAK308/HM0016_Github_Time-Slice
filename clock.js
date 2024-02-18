let timerInterval;
let timerElement = document.getElementById('timer');
let startButton = document.getElementById('startBtn');
let pauseButton = document.getElementById('pauseBtn');
let restartButton = document.getElementById('restartBtn');
let workDurationInput = document.getElementById('workDuration');
let breakDurationInput = document.getElementById('breakDuration');
let remainingSeconds = 0;

function startTimer() {
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
    workDurationInput.disabled = true;
    breakDurationInput.disabled = true;

    let workDuration = parseInt(workDurationInput.value) * 60;
    let breakDuration = parseInt(breakDurationInput.value) * 60;

    if (remainingSeconds === 0) {
        remainingSeconds = workDuration;
    }

    timerInterval = setInterval(function() {
        let minutes = Math.floor(remainingSeconds / 60);
        let seconds = remainingSeconds % 60;

        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = '00:00';

            // Toggle between work and break durations
            if (timerElement.dataset.mode === 'work') {
                remainingSeconds = breakDuration;
                timerElement.dataset.mode = 'break';
                alert("Break duration finished!"); // Alert for break duration
            
            } else {
                remainingSeconds = workDuration;
                timerElement.dataset.mode = 'work';
                 alert("Work duration finished!"); // Alert for work duration
                
            }


            startTimer(); // Start the timer again for the next duration
        }

        remainingSeconds--;
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
}

function restartTimer() {
    clearInterval(timerInterval);
    remainingSeconds = 0;
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    restartButton.style.display = 'none';
    timerElement.textContent = '25:00';
    workDurationInput.disabled = false;
    breakDurationInput.disabled = false;
}
