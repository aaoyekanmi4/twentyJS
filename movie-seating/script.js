const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

//Save selected movie index and price
function setMovieData (movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}
//Save selected seats
function setSeatIndices (selectedSeats) {
    const seatsIndices= [...selectedSeats].map((seat) => [...seats].indexOf(seat))
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndices))
}

// Update total and count
function updateSelectedCount () {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //Store seat indices in local storage
    setSeatIndices(selectedSeats)

    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice
}

function populateUI () {
    //Get and show selected seats
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
    //Get and show movie
    const selectedMovieIdx = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIdx) {
        movieSelect.selectedIndex = selectedMovieIdx
    }
}

//Event Listeners
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }
    updateSelectedCount();
})

updateSelectedCount()
