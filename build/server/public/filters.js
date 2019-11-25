let markets;

document.addEventListener("DOMContentLoaded", async () => {
  markets = await fetchMarketsAsync();
  console.log(markets);
  renderMarkets(markets);
});

// Fetches all markets and returns an array
async function fetchMarketsAsync() {
  const resp = await fetch("/api");
  const jsonResp = await resp.json();
  return jsonResp.data;
}

// Renders the array of markets
function renderMarkets(markets) {
  const marketList = document.querySelector(".results");
  marketList.innerHTML = "";
  markets.forEach(m => {
    renderMarket(m, marketList);
  });
}

// Creates a single market and appends it to the DOM
function renderMarket(market, marketList) {
  const el = document.createElement("li");
  el.innerText = market.market_name;
  marketList.appendChild(el);
}

function filterMarkets() {
  const daysFiltered = filterDaysOfWeek(markets);
  const paymentFiltered = filterPayment(daysFiltered);
  const productsFiltered = filterProducts(paymentFiltered);
  renderMarkets(productsFiltered);
}

function filterDaysOfWeek(markets) {
  let marketsFiltered = [];

  const dayBoxes = document.querySelectorAll(".day");
  for (node of dayBoxes) {
    if (node.checked) {
      markets.forEach(m => {
        if (
          m.season1time &&
          m.season1time.toLowerCase().includes(node.id) &&
          !marketsFiltered.includes(m)
        ) {
          marketsFiltered.push(m);
        }
      });
    }
  }
  // if no checkboxes are checked return the markets passed in array
  if (!marketsFiltered.length) {
    marketsFiltered = markets;
  }
  console.log("DAYS OF WEEK", marketsFiltered);

  return marketsFiltered;
}

function filterPayment(markets) {
  let paymentsFiltered = [];

  const payBoxes = document.querySelectorAll(".pay");
  for (node of payBoxes) {
    if (node.checked) {
      markets.forEach(m => {
        const key = node.id;
        if (m[key] === "Yes" && !paymentsFiltered.includes(m)) {
          paymentsFiltered.push(m);
        }
      });
    }
  }
  // if no checkboxes are checked return the markets passed in array
  if (!paymentsFiltered.length) {
    paymentsFiltered = markets;
  }
  console.log("PAYMENTS", paymentsFiltered);

  return paymentsFiltered;
}

function filterProducts(markets) {
  let productsFiltered = [];

  const prodBoxes = document.querySelectorAll(".prod");
  for (node of prodBoxes) {
    if (node.checked) {
      markets.forEach(m => {
        const key = node.id;
        if (m[key] === "Yes" && !productsFiltered.includes(m)) {
          productsFiltered.push(m);
        }
      });
    }
  }
  // if no checkboxes are checked return the markets passed in array
  if (!productsFiltered.length) {
    productsFiltered = markets;
  }
  console.log("PRODUCTS", productsFiltered);
  return productsFiltered;
}
