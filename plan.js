
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

  document.addEventListener("DOMContentLoaded", () => {
  fetch("backend/getPlans.php")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("plan-section");
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>No investment plans available at the moment.</p>";
        return;
      }

      container.innerHTML = "";

      data.forEach(plan => {
        const div = document.createElement("div");
        div.className = "plan-card fade-in";
        div.innerHTML = `
          <h3>${plan.name} Plan</h3>
          <p><strong>ROI:</strong> ${plan.roi}% daily for 24 days</p>
          <p><strong>Capital:</strong> Returned on Day 30</p>
          <p><strong>Min:</strong> $${plan.min_amount} | <strong>Max:</strong> $${plan.max_amount}</p>
          <a href="deposit.html?plan=${plan.slug}" class="btn">Invest Now</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error loading plans:", err);
      document.getElementById("plan-section").innerHTML = "<p>Failed to load plans.</p>";
    });
});
