document.getElementById("admin-signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("admin-name").value;
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

  const res = await fetch("php/admin_signup.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const result = await res.json();

  if (result.success) {
    alert(result.message);
    window.location.href = "admin_login.html";
  } else {
    alert("Signup failed: " + result.message);
  }
});