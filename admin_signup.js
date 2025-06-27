// Admin login logic
document.getElementById("admin-login-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // For now, simple validation — replace with real backend check
  if (email === "admin@broker.com" && password === "admin123") {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "admin.html";
  } else {
    alert("Invalid admin credentials.");
  }
});

// Admin signup logic
document.getElementById("admin-signup-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // Save to localStorage (demo purpose)
  alert("Admin registered successfully. Please log in.");
  window.location.href = "admin-login.html";
});