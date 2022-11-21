const draggableList = document.getElementById('draggable-list')
const checkBtn = document.getElementById('check')

const richestPeople = [
    'Elon Musk',
    'Bernard Arnault',
    'Gautam Adani',
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Larry Ellison',
    'Larry Page',
    'Sergey Brin',
    'Mukesh Ambani'
]

// // Randomize Cards - Fischer Yates
// const shuffle = (array) => {
//   let j = 0
//   let temp = null;

//   for (let i = array.length - 1; i > 0; i -= 1) {
//     j = Math.floor(Math.random() * (i + 1));
//     temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
// };

const listItems = []

let dragStartIndex;

function createList () {
    [...richestPeople]
        .map(person => ({ value: person, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((obj) => obj.value)
        .forEach((person, idx) => {
            const listItem = document.createElement('li')
            listItem.setAttribute('data-index', idx)

            listItem.innerHTML = `
            <span class='number'>${idx + 1}</span>
            <div class='draggable' draggable='true'>
            <p class='person-name'>${person}</p>
            <i class='fas fa-grip-lines'></i>
            </div>
            `

            listItems.push(listItem)
            draggableList.appendChild(listItem)
        })
}

createList()
