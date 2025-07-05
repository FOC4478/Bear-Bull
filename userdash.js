// 🍔 Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('active');
});

// Get stored plan and deposit
const selectedPlan = localStorage.getItem("selectedPlan"); // e.g. 'premium'
const depositAmount = parseFloat(localStorage.getItem("depositAmount") || 0);

// Plan ROI mapping
const plans = {
  premium: { name: "Premium", roi: 6 },
  silver: { name: "Silver", roi: 7 },
  gold: { name: "Gold", roi: 8 },
  platinum: { name: "Platinum", roi: 10 }
};

// Validate
if (!selectedPlan || !plans[selectedPlan] || !depositAmount) {
  alert("Missing investment details. Please start from the Plan page.");
  window.location.href = "plan.html";
}

// Get plan info
const plan = plans[selectedPlan];
const roiRate = plan.roi;
const profitPerDay = parseFloat((depositAmount * roiRate / 100).toFixed(2));
const totalROI = parseFloat((profitPerDay * 24).toFixed(2));

// Update DOM with animations
document.getElementById("user-plan").textContent = plan.name;
animateValue("deposit-amount", depositAmount);
animateValue("daily-profit", profitPerDay);
animateValue("total-roi", totalROI);

// Transaction History (static example for now)
const transactionHistory = [
  { date: "2025-06-26", type: "Deposit", amount: depositAmount },
  { date: "2025-06-27", type: "Profit", amount: profitPerDay }
];

const tbody = document.querySelector(".transaction-history tbody");
tbody.innerHTML = ""; // Clear any previous rows

transactionHistory.forEach(tx => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${tx.date}</td>
    <td>${tx.type}</td>
    <td>$${tx.amount.toFixed(2)}</td>
  `;
  tbody.appendChild(row);
});

// ========= Animated Counter Function =========
function animateValue(id, endValue, duration = 1500) {
  const el = document.getElementById(id);
  let start = 0;
  const step = () => {
    const increment = endValue / (duration / 30);
    start += increment;
    if (start < endValue) {
      el.textContent = start.toFixed(2);
      requestAnimationFrame(step);
    } else {
      el.textContent = endValue.toFixed(2);
    }
  };
  step();
}

// ========= Progress Bar Animation =========
const roiProgress = document.getElementById("roi-progress");
const currentDay = 1; // You can make this dynamic later
const roiPercent = (currentDay / 24) * 100;
roiProgress.style.width = `${roiPercent}%`;

// ========= ROI Chart =========
const roiChartCtx = document.getElementById("roiChart").getContext("2d");

const days = Array.from({ length: 24 }, (_, i) => `Day ${i + 1}`);

let cumulativeROI = 0;
const roiData = days.map(() => {
  cumulativeROI += (depositAmount * roiRate / 100);
  return parseFloat(cumulativeROI.toFixed(2));
});

const roiChart = new Chart(roiChartCtx, {
  type: 'line',
  data: {
    labels: days,
    datasets: [{
      label: 'ROI Growth ($)',
      data: roiData,
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      tension: 0.3,
      fill: true,
      pointRadius: 3,
      pointHoverRadius: 6,
    }]
  },
  options: {
    responsive: true,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Profit ($)"
        }
      },
      x: {
        title: {
          display: true,
          text: "Days"
        }
      }
    }
  }
});