document.getElementById('forgot-password-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const message = document.getElementById('message');

  try {
    const response = await fetch('mailer.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.text();
    console.log('response', data);

    if (response.ok) {
      message.textContent = 'Reset code sent to your email.';
      message.style.color = 'green';
    } else {
      message.textContent = data.message || 'Something went wrong.';
      message.style.color = 'red';
    }
  }
   catch (err) {
    console.error('Error:', err);
    message.textContent = 'Failed to send reset code.';
    message.style.color = 'red';
  }
});