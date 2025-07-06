document.getElementById("verify-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const code = document.getElementById("code").value.trim();
  const message = document.getElementById("message");

  fetch("backend/verify-email.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        message.textContent = "✅ Email verified successfully!";
        message.style.color = "green";
        setTimeout(() => window.location.href = "login.html", 2000);
      } else {
        message.textContent = data.message || "❌ Invalid code or email.";
        message.style.color = "red";
      }
    })
    .catch(() => {
      message.textContent = "⚠️ Server error. Try again.";
      message.style.color = "orange";
    });
});