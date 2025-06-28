
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



  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });
