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



  document.addEventListener("DOMContentLoaded", () => {
  fetch("getTeam.php")
    .then(res => res.json())
    .then(team => {
      const container = document.getElementById("team-container");
      team.forEach(member => {
        const card = document.createElement("div");
        card.className = "team-card";
        card.innerHTML = `
          <img src="${member.image}" alt="${member.name}" class="founder-image">
          <h3>${member.name}</h3>
          <p class="role">${member.role}</p>
          <p>${member.bio}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error("Error fetching team:", error));
});
