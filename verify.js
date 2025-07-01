document.getElementById('verify-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const code = document.getElementById('code').value.trim();

  try {
    const response = await fetch('http://localhost:3000/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });

    const result = await response.json();

    const messageEl = document.getElementById('message');
    if (response.ok) {
      messageEl.textContent = result.message;
      messageEl.style.color = 'green';

      // Redirect to login after short delay
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      messageEl.textContent = result.message || 'Verification failed.';
      messageEl.style.color = 'red';
    }
  } catch (err) {
    console.error('Verification error:', err);
    document.getElementById('message').textContent = 'An error occurred. Please try again.';
  }
});