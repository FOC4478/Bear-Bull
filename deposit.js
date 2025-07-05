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
const depositCryptoSelect = document.getElementById("crypto");
const depositWalletDisplay = document.getElementById("wallet-display");
const depositWalletInput = document.getElementById("wallet-address");
const depositForm = document.getElementById("deposit-form");
const depositStatusMsg = document.getElementById("status-message");

const walletAddresses = {
  btc: "bc1q36hewvpuu66x2kmc3su54zka4lsrjgylev4lne",
  eth: "0x956132fbDA9daeE7C3fa2d546e31879a994626E9",
  usdt: "LVRegzK2J2naf6nHmMz9UuEAKpufvKkZ3u",
  bnb: "0x956132fbDA9daeE7C3fa2d546e31879a994626E9",
  bch: "qqae4nh3luq838qvdq7tys587ha7jsuguym6a6kusc",
  trx: "TKmdbJ9z3ggQueNDdLm8u1daNMUVEHojKL",
  erc20: "Ox956132fbDA9daeE7C3fa2d546e31879a994626E9"
};

// Show wallet address when a crypto is selected
depositCryptoSelect.addEventListener("change", function () {
  const selected = depositCryptoSelect.value;

  if (walletAddresses[selected]) {
    depositWalletInput.value = walletAddresses[selected];
    depositWalletDisplay.classList.remove("hidden");
  } else {
    depositWalletInput.value = "";
    depositWalletDisplay.classList.add("hidden");
  }
});

// Copy to clipboard function
function copyAddress() {
  const address = depositWalletInput.value;
  navigator.clipboard.writeText(address)
    .then(() => alert("Wallet address copied to clipboard!"))
    .catch(err => alert("Failed to copy address: " + err));
}

// Handle Deposit Form Submission
// ========================
depositForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const crypto = depositCryptoSelect.value;
  const wallet = depositWalletInput.value;
  const amount = document.getElementById("amount").value;
  const txn = document.getElementById("txn").value;

  if (!crypto  || !wallet || !amount || !txn) {
    depositStatusMsg.textContent = "Please fill in all fields.";
    depositStatusMsg.style.color = "red";
    return;
  }

  // Save to localStorage
  localStorage.setItem("depositAmount", amount);
  localStorage.setItem("selectedPlan", planKey);

  depositStatusMsg.textContent = "Deposit submitted successfully!";
  depositStatusMsg.style.color = "green";

  // Optional delay before redirecting
  setTimeout(() => {
    window.location.href = "userdash.html";
  }, 3000);
});