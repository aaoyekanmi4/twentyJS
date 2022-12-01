const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countDowwn = document.getElementById('countDown');

const currentYear = new Date().getFullYear()

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`)

function updateCountdown () {
    const currentTime = new Date()
    const diff = newYearTime - currentTime;
    const s = Math.floor(diff / 1000) % 60
    const m = Math.floor(diff / 1000 / 60) % 60
    const h = Math.floor(diff / 1000 / 60 / 60) % 24
    const d = Math.floor(diff / 1000 / 60 / 60 / 24)
    seconds.innerHTML = s < 10 ? '0' + s : s
    minutes.innerHTML = m < 10 ? '0' + m : m
    hours.innerHTML = h < 10 ? '0' + h : h
    days.innerHTML = d
}

setInterval(updateCountdown, 1000)

