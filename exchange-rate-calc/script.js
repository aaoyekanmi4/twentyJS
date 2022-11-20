const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate () {
    let currencyOne = currencyEl_one.value
    let currencyTwo = currencyEl_two.value
    fetch(` https://v6.exchangerate-api.com/v6/fdeee77eb69e88c28b69461a/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[currencyTwo]
            rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`
            amountEl_two.value = (rate * amountEl_one.value).toFixed(2)
        })
}

currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('change', calculate)

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value
    currencyEl_one.value = currencyEl_two.value
    currencyEl_two.value = temp
    calculate()
})

calculate()
