// Fetch API practice
// function calculate() {
//     fetch('items.json') //returns a promise
//         .then(res => res.json())
//         // .then(data => console.log(data));
//         .then(data => document.body.innerHTML = data[1].id);
// }

// calculate();

// -------------------------------------------------------------------------------

const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
const API_KEY = 'f8f63ce36493ace8f07bee18'

//fetch exchange rates and update the DOM
function calculate() {
    //get the value of the elements
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    // console.log(currency_one, currency_two);
    fetch(`https://prime.exchangerate-api.com/v5/${API_KEY}/latest/${currency_one}`)
        //this returns a promise
        .then(res => res.json())
        //this also returns a promise
        .then(data => {
            // console.log(data);
            const rate = data.conversion_rates[currency_two];
            // console.log(rate);
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        });
}

//event listeners
currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)

calculate();