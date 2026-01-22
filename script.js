const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const currentRate = data.rates[currency_two];
      rate.innerText = `1 ${currency_one} = ${currentRate} ${currency_two}`;
      amountTwo.value = (amountOne.value * currentRate).toFixed(2);
    });
}

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const storedValue = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = storedValue;
  calculate();
});

calculate();

if (navigator.serviceWorker) {
    // Start registration process on every page load
    window.addEventListener('load', () => {
        navigator.serviceWorker
            // The register function takes as argument
            // the file path to the worker's file
            .register('./sw.js')
            // Gives us registration object
            .then(reg => console.log('Service Worker Registered'))
            .catch(swErr => console.log(
                  `Service Worker Installation Error: ${swErr}}`));
      });
}
