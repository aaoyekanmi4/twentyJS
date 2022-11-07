const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')
const readBtn = document.getElementById('read')
const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const text = document.getElementById('text')


const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
    {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

// Create box HTML
const createBox = (item, index) => {
    const box = document.createElement('div');
    const { image, text } = item
    box.classList.add('box')
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `
    //speak event
  box.addEventListener('click', () => {
    setTextMessage(text)
    speakText();
      //add active effect
    box.classList.add('active')
    setTimeout(()=> box.classList.remove('active'), 800)
  })
    main.appendChild(box);
}

// init speech synth
const message = new SpeechSynthesisUtterance();

data.forEach(createBox)

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option)
  });
}

// set text
function setTextMessage (text) {
  message.text = text;
}

//speak text
function speakText () {
  speechSynthesis.speak(message)
}

//set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value)
}

// voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices)



// Toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.add('show'));

// Toggle text box
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

//change voice
voicesSelect.addEventListener('change', setVoice)
getVoices()

// read textarea text
readBtn.addEventListener('click', () => {
  setTextMessage(text.value)
  speakText()
})
