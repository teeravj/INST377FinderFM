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
  const marketCards = document.querySelector(".results");
  marketCards.innerHTML = "";
  markets.forEach(m => {
    renderMarket(m, marketCards);
  });
}

// Creates a single market card and appends it to the DOM
function renderMarket(market, marketCards) {
  //create card container that holds all info for card
  const cardBody = document.createElement("div");
  cardBody.className = "cardBody";

  //create container to hold title and decription divs that flip on click
  const flipContainer = document.createElement("div");
  flipContainer.className = "scene";

  const flippingCard = document.createElement("div");
  flippingCard.className = "flippingCard";
  flipContainer.appendChild(flippingCard);

  //create div that holds the title of each market which is initially shown
  const cardTitle = document.createElement("div");
  cardTitle.className = "flippingCard__face face--front";
  flippingCard.appendChild(cardTitle);

  //create title text and append it to the front title div
  const marketName = document.createTextNode(market.market_name);
  cardTitle.appendChild(marketName);

  //create div that holds the description of each market which appears on click
  const cardDescription = document.createElement("div");
  cardDescription.className = "flippingCard__face face--back";
  flippingCard.appendChild(cardDescription);

  //create description text and append it to the back description div
  const marketDescription = document.createTextNode("Market Details");
  cardDescription.appendChild(marketDescription);

  //create a more info button that flips the title to the description
  const moreInfo = document.createElement("div");
  moreInfo.className = "infoButton";
  moreInfo.innerHTML = "More Info";
  moreInfo.addEventListener("click", function() {
    flippingCard.classList.toggle("is-flipped");
  });

  cardBody.appendChild(flipContainer);
  cardBody.appendChild(moreInfo);
  marketCards.appendChild(cardBody);
}

function filterMarkets() {
  const daysFiltered = filterDaysOfWeek(markets);
  const paymentFiltered = filterPayment(daysFiltered);
  const productsFiltered = filterProducts(paymentFiltered);
  renderMarkets(productsFiltered);
}

function filterDaysOfWeek(markets) {
  let marketsFiltered = [];
  let selectedMarkets = [];

  const dayBoxes = document.querySelectorAll(".day");
  for (node of dayBoxes) {
    if (node.checked) {
      selectedMarkets.push(node.id);
    }
  }
  if (!selectedMarkets.length) {
    marketsFiltered = markets;
  } else {
    selectedMarkets.forEach(i => {
      markets.forEach(m => {
        const key = i;
        if (
          m.season1time &&
          m.season1time.toLowerCase().includes(key) &&
          !marketsFiltered.includes(m)
        ) {
          marketsFiltered.push(m);
        }
      });
    });
  }

  // if no checkboxes are checked return the markets passed in array
  if (!marketsFiltered.length) {
    marketsFiltered = [];
  }
  console.log("DAYS OF WEEK", marketsFiltered);

  return marketsFiltered;
}

function filterPayment(markets) {
  let paymentsFiltered = [];
  let selectedPay = [];

  const payBoxes = document.querySelectorAll(".pay");
  for (node of payBoxes) {
    if (node.checked && !selectedPay.includes(node.id)) {
      selectedPay.push(node.id);
    }
  }

  if (!selectedPay.length) {
    paymentsFiltered = markets;
  } else {
    selectedPay.forEach(p => {
      markets.forEach(m => {
        const key = p;
        if (m[key] === "Yes" && !paymentsFiltered.includes(m)) {
          paymentsFiltered.push(m);
        }
      });
    });
  }
  // if no checkboxes are checked return the markets passed in array
  if (!paymentsFiltered.length) {
    paymentsFiltered = [];
  }

  console.log("PAYMENTS", paymentsFiltered);
  return paymentsFiltered;
}

function filterProducts(markets) {
  let productsFiltered = [];
  let selectedProds = [];

  const prodBoxes = document.querySelectorAll(".prod");
  for (node of prodBoxes) {
    if (node.checked) {
      selectedProds.push(node.id);
    }
  }
  if (!selectedProds.length) {
    productsFiltered = markets;
  } else {
    selectedProds.forEach(p => {
      markets.forEach(m => {
        const key = p;
        if (m[key] === "Yes" && !productsFiltered.includes(m)) {
          productsFiltered.push(m);
        }
      });
    });
  }
  // if no checkboxes are checked return the markets passed in array
  if (!productsFiltered.length) {
    productsFiltered = [];
  }

  console.log("PRODUCTS", productsFiltered);
  return productsFiltered;
}
