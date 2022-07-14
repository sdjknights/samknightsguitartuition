//Hero 2 cards
function onCardHover(cardID){
    // var cardElement = document.getElementById(cardID)
    var h3Element = document.getElementById(cardID).getElementsByTagName('h3')[0];
    var pElement = document.getElementById(cardID).getElementsByTagName('p')[0];

    // cardElement.classList.remove("card-bg")
    h3Element.classList.add("d-none");
    pElement.classList.remove("d-none");
}

function onEndCardHover(cardID){
    var cardElement = document.getElementById(cardID)
    var h3Element = document.getElementById(cardID).getElementsByTagName('h3')[0];
    var pElement = document.getElementById(cardID).getElementsByTagName('p')[0];

    // cardElement.classList.add("card-bg")
    h3Element.classList.remove("d-none");
    pElement.classList.add("d-none");
}

//Back to top button
//Get the button
var backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}