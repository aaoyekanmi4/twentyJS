const draggableList = document.getElementById('draggable-list')


const words = [
    'cookie',
    'absolute',
    'friendly',
    'complacent',
    'rambunctious',
    'worthwhile',
    'gravitate',
    'persevere',
    'ubiquitous',
    'short'
]
//test
const getWord = () => {
    const idx = Math.floor(Math.random() * words.length)
    return words[idx]
}

const listItems = []
let word;
let letters
let dragStartIndex;

function createList () {
    word = getWord()
    letters = word.split('')
        letters
        .map(letter=> ({ value: letter, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((obj) => obj.value)
        .forEach((letter, idx) => {
            const listItem = document.createElement('li')
            listItem.setAttribute('data-index', idx)

            listItem.innerHTML = `
            <div class='draggable' draggable='true'>
            <p class='person-name'>${letter}</p>
            </div>
            `

            listItems.push(listItem)
            draggableList.appendChild(listItem)
        })
    addEventListeners()
}

function checkList () {
    // listItems.forEach((item, index) => {
    //     const personName = item.querySelector('.draggable').innerText.trim()
    //     if (richestPeople[index] !== personName) {
    //         item.classList.add('wrong')
    //     } else {
    //         item.classList.remove('wrong')
    //         item.classList.add('right')
    //     }
    // })
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

}

function dragLeave () {

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

// checkBtn.addEventListener('click', checkList)

createList()


