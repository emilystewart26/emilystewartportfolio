// Hamburger Menu
function toggleMenu() {
  const menu = document.getElementById("hamburger-menu");
  menu.classList.toggle("hidden");
}

// Slider
const slider = document.getElementById("card-slider");

slider.addEventListener("mouseenter", () => {
  slider.classList.add("paused");
});

slider.addEventListener("mouseleave", () => {
  slider.classList.remove("paused");
});

const cards = slider.querySelectorAll(".card, .flex-shrink-0");

cards.forEach((card) => {
  const clone = card.cloneNode(true);
  slider.appendChild(clone);
});
