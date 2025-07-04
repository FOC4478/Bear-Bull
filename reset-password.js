document.getElementById("reset-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const code = document.getElementById("code").value.trim();
  const newPassword = document.getElementById("new-password").value.trim();
  const message = document.getElementById("message");

  try {
    const response = await fetch("resetpassword.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, new_password: newPassword }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success == true) {
      message.textContent = "Password reset successful. You can now log in.";
      message.style.color = "green";
      window.location.href = 'login.html';
    } else {
      message.textContent = data.message || "Reset failed. Check your details.";
      message.style.color = "red";
    }
  } catch (err) {
    console.error("Reset error:", err);
    message.textContent = "Server error. Try again later.";
    message.style.color = "red";
  }
});