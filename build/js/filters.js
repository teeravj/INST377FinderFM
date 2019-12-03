let markets;
let map;
//This will be for markets in local storage for extra credit
//let storedMarkets;

document.addEventListener("DOMContentLoaded", async () => {
  markets = await fetchMarketsAsync();
  //storedMarkets = setMarketDescriptions(markets);
  console.log(markets);
  //console.log(storedMarkets);
  renderMarkets(markets);
  initializeMap(markets);
});

// Fetches all markets and returns an array
async function fetchMarketsAsync() {
  const resp = await fetch("https://finderfm.herokuapp.com/");
  const jsonResp = await resp.json();
  return jsonResp.data;
}

// Renders the array of markets
function renderMarkets(markets) {
  const marketCards = document.querySelector(".marketCardsFace--front");
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
  const marketLocation = JSON.parse(market.location.human_address);
  const marketDescription = document.createTextNode(
    "This market runs " + market.season1time + " at " + marketLocation.address
  );

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

function initializeMap(markets) {
  // Kavita's code
  map = L.map("map", { keyboard: true, scrollWheelZoom: true }).setView(
    [38.9, -76.8],
    10
  );

  renderMap(markets);
}

// Takes filtered array and renders map with those locations
function renderMap(markets) {
  const mapDisplay = document.querySelector(".mapFace--back");
  mapDisplay.innerHTML = "";

  // This is the code that was in Kavita's fetch and .then statements
  markets.forEach(m => {
    let s = m.location.human_address;
    let ind = s.lastIndexOf('"address":') + 12;
    let ind2 = s.indexOf(",");
    let loc = s.slice(ind, ind2 - 1);
    let marker = L.marker([m.location.latitude, m.location.longitude]).addTo(
      map
    );
    marker.bindPopup(loc);
  });

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox.streets"
    }
  ).addTo(map);

  function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng)
      .addTo(map)
      .bindPopup("This is your current location!")
      .openPopup();
    // .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }

  function onLocationError(e) {
    alert(e.message);
  }

  map.on("locationfound", onLocationFound);
  map.on("locationerror", onLocationError);

  map.locate({ setView: true, maxZoom: 12 });
}

function filterMarkets() {
  const daysFiltered = filterDaysOfWeek(markets);
  const paymentFiltered = filterPayment(daysFiltered);
  const productsFiltered = filterProducts(paymentFiltered);
  renderMarkets(productsFiltered);
  renderMap(productsFiltered);
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

//Controls opening and closing of filter panel
function openNav() {
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("sidenav").style.paddingLeft = "10px";
  //document.getElementById("bod").style.marginLeft = "250px";
  //document.getElementById("flip_card_inner").style.marginLeft = "250px";
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("sidenav").style.paddingLeft = "0";
  //document.getElementById("bod").style.marginLeft = "0";
  //document.getElementById("flip_card_inner").style.marginLeft = "0";
}

//function that flips market cards to map
function flipMap() {
  const flippingMap = document.querySelector(".flippingMap");
  flippingMap.classList.toggle("is-flipped");
  const mapButton = document.querySelector(".mapButton");
  mapButton.innerHTML = "View Markets";
}
