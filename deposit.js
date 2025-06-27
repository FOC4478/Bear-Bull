// Plan Definitions
const plans = {
  premium: { name: "Premium", roi: "6%", min: 500, max: 500000 },
  silver: { name: "Silver", roi: "7%", min: 800, max: 700000 },
  gold: { name: "Gold", roi: "8%", min: 900, max: 800000 },
  platinum: { name: "Platinum", roi: "10%", min: 1000, max: 1500000 },
};

// Detect selected plan
const urlParams = new URLSearchParams(window.location.search);
const planKey = urlParams.get("plan");
const plan = plans[planKey];

const title = document.getElementById("plan-title");
const details = document.getElementById("plan-details");
const amountInput = document.getElementById("amount");
const form = document.getElementById("deposit-form");
const cryptoSelect = document.getElementById("crypto");
const walletDiv = document.getElementById("wallet-display");
const walletInput = document.getElementById("wallet-address");
const statusMessage = document.getElementById("status-message");

if (plan) {
  title.textContent =  `${plan.name} Trade Plan`;
  details.textContent = `${plan.roi} Daily for 24 Days. Capital returned on Day 30. Min: $${plan.min} | Max: $${plan.max}`;
  amountInput.setAttribute("min", plan.min);
  amountInput.setAttribute("max", plan.max);
} else {
  title.textContent = "Invalid Plan Selected";
  form.style.display = "none";
}

// Show wallet address
cryptoSelect.addEventListener("change", () => {
  const wallets = {
    btc: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    eth: "0xDECAF9CD2367cdbb726E904cD6397eDFcAe6068D",
    usdt: "TV6jCz2ZLr8LBuPZrbC4zEo5WrFz1fTfGf"
  };
  const selected = cryptoSelect.value;
  if (wallets[selected]) {
    walletInput.value = wallets[selected];
    walletDiv.classList.remove("hidden");
  } else {
    walletDiv.classList.add("hidden");
  }
});

// Copy to clipboard
function copyAddress() {
  walletInput.select();
  document.execCommand("copy");
  alert("Wallet address copied!");
}

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  if (amount < plan.min || amount > plan.max) {
    alert(`Amount must be between $${plan.min} and $${plan.max}`);
    return;
  }
  statusMessage.textContent = "Payment submitted. Awaiting confirmation...";
  form.reset();
  walletDiv.classList.add("hidden");

  // Save user data locally (temporary frontend storage)
  localStorage.setItem("selectedPlan", planKey);
  localStorage.setItem("depositAmount", amount);
  localStorage.setItem("cryptoType", cryptoSelect.value);

  // Optional visual confirmation
  statusMessage.textContent = "Payment submitted. Redirecting...";

  // Redirect to dashboard
  setTimeout(() => {
    window.location.href = "dashboard.html";
    }, 2000);
});

// hamburger
const hamburger = document.querySelector('.hambuger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});