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
    addEventListeners()
}

function checkList () {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText.trim()
        if (richestPeople[index] !== personName) {
            item.classList.add('wrong')
        } else {
            item.classList.remove('wrong')
            item.classList.add('right')
        }
    })
}

function swapItems (fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')
    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)

}

function dragStart () {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex)
}

function dragEnter () {
    this.classList.add('over')
}

function dragLeave () {
    this.classList.remove('over')
}

function dragOver (e) {
    e.preventDefault();
}

function dragDrop () {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex)
}

function addEventListeners () {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')
    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

checkBtn.addEventListener('click', checkList)


createList()
