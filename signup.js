const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });


  document.getElementById("sign-up-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const full_name = document.getElementById("full_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const plan = document.getElementById("selected-plan").value || "none";

  const message = document.getElementById("success-message");
  message.textContent = "";
  message.style.color = "";

  fetch("backend/signup.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name, email, password, plan })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        message.textContent = "Signup successful!";
        message.style.color = "green";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        message.textContent = data.message || "Signup failed.";
        message.style.color = "red";
      }
    })
    .catch(err => {
      message.textContent = "Server error. Please try again.";
      message.style.color = "red";
    });
});