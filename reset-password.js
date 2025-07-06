document.getElementById("reset-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const code = document.getElementById("code").value.trim();
  const newPassword = document.getElementById("new-password").value.trim();
  const message = document.getElementById("message");

  if (!email || !code || !newPassword) {
    message.textContent = "⚠️ All fields are required.";
    message.style.color = "red";
    return;
  }

  fetch("backend/reset-password.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code, newPassword })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      message.textContent = "✅ Password reset successful! Redirecting...";
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      message.textContent = data.message || "❌ Invalid reset code or email.";
      message.style.color = "red";
    }
  })
  .catch(() => {
    message.textContent = "⚠️ Server error. Try again later.";
    message.style.color = "orange";
  });
});