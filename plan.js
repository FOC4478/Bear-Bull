
window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".animate");
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;
    if (cardTop < trigger) {
      card.style.opacity = "1";
    }
  });
});


// hamburger menu tools
const hamburger = document.querySelector('.hambuger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});