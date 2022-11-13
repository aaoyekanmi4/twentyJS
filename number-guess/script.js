const msgEl = document.getElementById('msg');
const playBtn = document.getElementById('play-again')

function getRandomNumber () {
    return Math.floor(Math.random() * 100) + 1
}

const randomNum = getRandomNumber();

function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
    `
}

function checkNumber (msg) {
    // plus converts string to a number
    const num = +msg
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>You must say a valid number</div>'
    } else if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>You must guess a number between 1 and 100</div>'
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>Go lower</div>'
    } else if (num < randomNum) {
        msgEl.innerHTML += '<div>Go higher</div>'
    } else if (num === randomNum) {
        document.body.innerHTML = `<div>
        <h2>Congrats! You have guessed the number!</h2>
        <h2>It was ${randomNum}</h2>
        <button class="play-again" id="play-again">Play again</button>
        </div>`
    }
}

function onSpeak (e) {
    const msg = e.results[0][0].transcript
    writeMessage(msg)
    checkNumber(msg)
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition()

recognition.start()

recognition.addEventListener('result', onSpeak)

recognition.addEventListener('end', () => recognition.start())

document.addEventListener('click', (e) => {
    if (e.target.id === 'play-again') {
        window.location.reload()
    }
})

