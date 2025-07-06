document.getElementById("forgot-password-form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  fetch("forgot-password.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    message.textContent = data.message;
    message.style.color = data.success ? "green" : "red";
  })
  .catch(err => {
    console.error("Error:", err);
    message.textContent = "An error occurred. Try again later.";
    message.style.color = "red";
  });
});