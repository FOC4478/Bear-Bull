 const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });


  // Handle Support Form
document.getElementById("supportForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("form-status").textContent = "✅ Message sent! We'll respond shortly.";
  this.reset();
});

// Handle Live Chat
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Add user message
  const userDiv = document.createElement("div");
  userDiv.classList.add("chat-message", "user");
  userDiv.textContent = userMessage;
  chatBox.appendChild(userDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear input
  chatInput.value = "";

  // Simulate bot response
  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.classList.add("chat-message", "bot");
    botDiv.textContent = "💬 Thanks for reaching out! We'll respond shortly.";
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1200);

});

document.getElementById("supportForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("support-name").value.trim();
  const email = document.getElementById("support-email").value.trim();
  const message = document.getElementById("support-message").value.trim();
  const status = document.getElementById("form-status");

  fetch("backend/support.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        status.textContent = "✅ Message sent successfully!";
        status.style.color = "green";
        document.getElementById("supportForm").reset();
      } else {
        status.textContent = data.message || "❌ Something went wrong.";
        status.style.color = "red";
      }
    })
    .catch(() => {
      status.textContent = "⚠️ Server error. Please try again.";
      status.style.color = "orange";
    });
});