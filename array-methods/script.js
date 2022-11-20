const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calcBtn = document.getElementById('calculate-wealth')
let userData = []

//random int within range
function getWealth () {
    function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
    }
    return randomIntFromInterval(40000, 700000)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const getUser = async () => {
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json()
    const fullName = data.results[0].name.first + ' ' + data.results[0].name.last
    const wealth = getWealth();
    const newUser = { fullName, wealth }
    userData.push(newUser)
    updateUsers()
}

function doubleWealth () {
    userData = userData.map((user) => {
        const doubleWealth = user.wealth * 2
        return { ...user, wealth: doubleWealth }
    })
    updateUsers()
}

function showMillionaires () {
    userData = userData.filter((user) =>
        user.wealth >= 1000000
    )
    updateUsers()
}

function sortByWealth () {
    userData.sort((a, b) => b.wealth - a.wealth)
    updateUsers()
}

function totalWealth () {
    updateUsers()
    const newDiv = document.createElement('div')
    const total = userData.reduce((acc, curr) => (acc += curr.wealth), 0)
    newDiv.innerHTML = `<h2 class='total-wealth'>Total Wealth:  <strong>${formatter.format(total)}</strong></h2>`
    main.appendChild(newDiv)
}

const updateUsers = () => {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`
    userData.forEach((user, index) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('person')
        newDiv.innerHTML += `<strong>${user.fullName}</stong>`
        newDiv.innerHTML += `${formatter.format(user.wealth)}`
        main.appendChild(newDiv)
    })
}

addUserBtn.addEventListener('click', () => {
    getUser()
})

doubleBtn.addEventListener('click', () => {
    doubleWealth()
})

showMillionairesBtn.addEventListener('click', () => {
    showMillionaires()
})

sortBtn.addEventListener('click', () => {
    sortByWealth()
})

calcBtn.addEventListener('click', () => {
    totalWealth()
})




