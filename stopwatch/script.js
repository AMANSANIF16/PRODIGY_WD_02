var ms = 0, s = 0, m = 0, h = 0;
var timer;
var startTime = 0; // Variable to store the start time of the timer
var lapTimes = [];

var display = document.querySelector(".timer-Display");
var laps = document.querySelector(".laps");

function start() {
    if (!timer) {
        timer = setInterval(run, 10);
        startTime = new Date().getTime(); // Record start time of the timer
    }
}

function run() {
    ms++;
    if (ms == 100) {
        ms = 0;
        s++;
    }
    if (s == 60) {
        s = 0;
        m++;
    }
    if (m == 60) {
        m = 0;
        h++;
    }
    if (h == 13) {
        h = 1;
    }
    display.innerHTML = getTimer();
}

function getTimer() {
    return (
        (h < 10 ? "0" + h : h) +
        " : " +
        (m < 10 ? "0" + m : m) +
        " : " +
        (s < 10 ? "0" + s : s) +
        " : " +
        (ms < 10 ? "0" + ms : ms)
    );
}

function pause() {
    stopTimer();
}

function stopTimer() {
    clearInterval(timer);
    timer = false;
}

function reset() {
    stopTimer();
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    display.innerHTML = getTimer();
    lapTimes = []; // Reset lap times
    startTime = 0; // Reset start time
    laps.innerHTML = ""; // Clear lap list
}

function restart() {
    if (timer) {
        reset();
        start();
    }
}

// lap = taking screenshot of current time...
function lap() {
    if (timer) {
        var lapTime = ms + s * 100 + m * 6000 + h * 360000;
        lapTimes.push(lapTime); // Store lap time

        // Calculate the gap between the start time and the current lap time
        var gap = lapTimes.length === 1 ? lapTime : lapTime - lapTimes[lapTimes.length - 2];

        var Li = document.createElement("li");
        Li.innerHTML =
            "Lap " + lapTimes.length + ": " + formatInterval(lapTime) + " (Gap: " + formatInterval(gap) + ")";
        laps.appendChild(Li);
    }
}

function resetLap() {
    lapTimes = [];
    laps.innerHTML = "";
}

function formatInterval(interval) {
    var totalMS = interval % 100;
    interval = (interval - totalMS) / 100;
    var totalSeconds = interval % 60;
    interval = (interval - totalSeconds) / 60;
    var totalMinutes = interval % 60;
    var totalHours = (interval - totalMinutes) / 60;
    return (
        pad(totalHours, 2) +
        ":" +
        pad(totalMinutes, 2) +
        ":" +
        pad(totalSeconds, 2) +
        ":" +
        pad(totalMS, 2)
    );
}

function pad(num, size) {
    var s = "000" + num;
    return s.substr(s.length - size);
}
