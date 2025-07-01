const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

  document.addEventListener("DOMContentLoaded", () => {
  // ✅ Get selected plan from URL or default to "silver"
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPlan = urlParams.get("plan") || "silver";
  document.getElementById("selected-plan").value = selectedPlan;

  const signupForm = document.getElementById("sign-up-form");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const plan = document.getElementById("selected-plan").value;

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name, email, password, plan }),
      });

      // Log the raw fetch response
      console.log("Raw response:", res);

      // Try to parse response JSON
      const data = await res.json().catch(err => {
        console.error("❌ Failed to parse JSON response:", err);
        return {}; // fallback to avoid crash
      });

      // Log parsed data
      console.log("Parsed response data:", data);

      if (res.ok) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("selectedPlan", plan);

          if (data.user.deposit) {
            localStorage.setItem("depositAmount", data.user.deposit);
          }
        }

        document.getElementById("success-message").textContent = "✅ Signup successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "login.html"; // ✅ Redirect to login page
        }, 1500);
      } else if (res.status === 409) {
        document.getElementById("success-message").textContent = "❌ Email already exists. Try logging in.";
      } else {
        document.getElementById("success-message").textContent = data.message || "❌ Signup failed. Try again.";
      }

    } catch (err) {
      console.error("Signup error:", err);
      alert("❌ Network error. Please check your server and try again.");
    }
  });
});