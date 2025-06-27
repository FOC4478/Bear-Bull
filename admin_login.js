// Admin login functionality
document.getElementById("admin-login-form")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // Basic demo login — replace with backend or Firebase later
  const demoAdminEmail = "admin@broker.com";
  const demoAdminPassword = "admin123";

  if (email === demoAdminEmail && password === demoAdminPassword) {
    localStorage.setItem("isAdmin", "true");
    alert("Login successful!");
    window.location.href = "admin.html";
  } else {
    alert("Invalid admin credentials.");
  }
});