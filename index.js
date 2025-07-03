const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });


  
  const cards = document.querySelectorAll('.testimonial-card');
  let index = 0;

  function rotateTestimonials() {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
    index = (index + 1) % cards.length;
  }

  rotateTestimonials(); // Show first on load
  setInterval(rotateTestimonials, 4000); // Change every 4s
