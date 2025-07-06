 const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });


  document.getElementById("log-in-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageBox = document.getElementById("success-message");

  // Clear old message
  messageBox.textContent = "";
  messageBox.style.color = "";

  fetch("backend/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        messageBox.textContent = "Login successful! Redirecting...";
        messageBox.style.color = "green";
        // Redirect to dashboard with userId
        setTimeout(() => {``
          window.location.href = `userdash.html?userId=${data.userId}`;
        }, 1500);
      } else {
        messageBox.textContent = data.message || "Login failed.";
        messageBox.style.color = "red";
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      messageBox.textContent = "Server error. Please try again.";
      messageBox.style.color = "red";
    });
});