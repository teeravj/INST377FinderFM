function myFunction() {
  var x = document.getElementById("myNav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}