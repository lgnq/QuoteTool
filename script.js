let eur2usd = 0;
let eur2cny = 0;
let usd2eur = 0;
let usd2cny = 0;
let cny2eur = 0;
let cny2usd = 0;

const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");
const current_date = document.getElementById("date");

const dc_eur = document.getElementById("dc_eur");
const dc_usd = document.getElementById("dc_usd");
const dc_cny = document.getElementById("dc_cny");

const rs_eur = document.getElementById("rs_eur");
const rs_usd = document.getElementById("rs_usd");
const rs_cny = document.getElementById("rs_cny");

const margin = document.getElementById("margin");

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

function dc_eur_input()
{
  rs_eur.value = dc_eur.value * margin.value;
  rs_usd.value = dc_eur.value * eur2usd * margin.value;
  rs_cny.value = dc_eur.value * eur2cny * margin.value;
}

function dc_eur_focus()
{
  dc_eur.value = "";
  rs_eur.value = "";

  dc_usd.value = "";
  rs_usd.value = "";

  dc_cny.value = "";
  rs_cny.value = "";
}

function dc_usd_input()
{
  rs_usd.value = dc_usd.value * margin.value;
}

function dc_cny_input()
{
  rs_cny.value = dc_cny.value * margin.value;
}

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

dc_eur.addEventListener("input", dc_eur_input);
dc_eur.addEventListener("focus", dc_eur_focus);

dc_usd.addEventListener("input", dc_usd_input);
dc_cny.addEventListener("input", dc_cny_input);

swap.addEventListener("click", () => {
  const storedValue = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = storedValue;
  calculate();
});

calculate();

async function getExchangeRate(currency1, currency2, currency3) {
    const url = `https://open.er-api.com/v6/latest/${currency1}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const date = data.time_next_update_utc;

        current_date.value = `${date}`;

        eur2usd = data.rates["USD"];

        console.log(`1 ${currency1} = ${eur2usd} ${currency2}`);

        eur2cny = data.rates["CNY"];
        console.log(`1 ${currency1} = ${eur2cny} ${currency3}`);

        // Calculate conversion
        // const rate = data.conversion_rates[toCurrency];
        // const convertedAmount = amount * rate;
        
        // console.log(`1 ${fromCurrency} = ${rate} ${toCurrency}`);
        // console.log(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
        // return convertedAmount;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

// Example usage: Convert 100 USD to EUR
getExchangeRate('EUR', 'USD', 'CNY');

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
