   const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

    const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const arrow = question.querySelector('.arrow');

    answer.classList.toggle('open');
    arrow.classList.toggle('rotate');


  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("faq-container");

  fetch("get-faqs.php")
    .then(res => res.json())
    .then(data => {
      data.forEach(faq => {
        const item = document.createElement("div");
        item.className = "faq-item";
        item.innerHTML = `
          <button class="faq-question">
            ${faq.question}
            <span class="arrow">▼</span>
          </button>
          <div class="faq-answer">${faq.answer}</div>
        `;
        container.appendChild(item);
      });

      // Toggle logic
      document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
          const answer = btn.nextElementSibling;
          answer.classList.toggle("active");
          btn.querySelector(".arrow").textContent = answer.classList.contains("active") ? "▲" : "▼";
        });
      });
    })
    .catch(err => {
      container.innerHTML = "<p>Unable to load FAQs right now.</p>";
      console.error("Error fetching FAQs:", err);
    });
});
