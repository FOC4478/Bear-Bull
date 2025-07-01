const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

  // login from submission
  document.getElementById('log-in-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form from reloading the page

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    

    if (res.ok) {
      // Save user info in localStorage
      localStorage.setItem('user_id', data.user.id);
      localStorage.setItem('full_name', data.user.full_name);

      // Redirect to dashboard
      window.location.href = 'userdash.html';
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
});