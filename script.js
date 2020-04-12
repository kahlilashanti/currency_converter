//make sure service workers are supported
if (navigator.serviceWorker) {
    // console.log('Service Worker Supported')
    //then register serviceWorker
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw_cached.js')
            //this returns a promise
            .then(reg => console.log('Service Worker Registered'))
            //be sure to catch any errors
            .catch(err => console.log(`Service Worker Error: ${err}`))
    });
}

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

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2); //.toFixed(2) gives you two decimal places

        });
}

//event listeners
currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)

//add event listener for swap functionality
swap.addEventListener('click', () => {
    //temp variable to store value of currency one
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();

//TODO
//make project progressive web app