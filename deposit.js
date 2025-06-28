    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
  });



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
    btc: "bc1qleweftdwz2v5gf4rurtm528p7x8du5suplawgw",
    eth: "0xc532cfa04da7e4128581e692942fce141199ade6",
    usdt: "0xc532cfa04da7e4128581e692942fce141199ade6",
    erc20: "0xc532cfa04da7e4128581e692942fce141199ade6",
    xrp:   "bnb1z52p6sfk905vepmvtpc54le8cwrq3mgn32yv3z",
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