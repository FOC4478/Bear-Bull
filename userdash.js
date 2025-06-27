const plans = {
  premium: { name: "Premium", roi: 6 },
  silver: { name: "Silver", roi: 7 },
  gold: { name: "Gold", roi: 8 },
  platinum: { name: "Platinum", roi: 10 }
};

const planKey = localStorage.getItem("selectedPlan");
const depositAmount = parseFloat(localStorage.getItem("depositAmount") || 0);
const plan = plans[planKey];

// if (!plan || !depositAmount) {
//   alert("Missing plan information. Redirecting...");
//   window.location.href = "plan.html";
// }

const profitPerDay = ((plan.roi / 100) * depositAmount).toFixed(2);
const totalROI = (profitPerDay * 24).toFixed(2);

// Instead of setting the values directly:
animateValue("daily-profit", parseFloat(profitPerDay));
animateValue("total-roi", parseFloat(totalROI));
animateValue("deposit-amount", depositAmount);
document.getElementById("user-plan").textContent = plan.name;


function animateValue(id, endValue) {
  let start = 0;
  const duration = 1500; // in ms
  const increment = endValue / (duration / 30);
  const element = document.getElementById(id);

  const step = () => {
    start += increment;
    if (start < endValue) {
      element.textContent = start.toFixed(2);
      requestAnimationFrame(step);
    } else {
      element.textContent = endValue.toFixed(2);
    }
  };
  step();
}

// history
document.getElementById("table-deposit").textContent = depositAmount.toFixed(2);
document.getElementById("table-profit").textContent = profitPerDay;






const hamburger = document.querySelector('.hambuger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});