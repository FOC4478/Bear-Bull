// 🍔 Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('active');
});

// 📦 Plan data
const plans = {
  premium: { name: "Premium", roi: 6 },
  silver: { name: "Silver", roi: 7 },
  gold: { name: "Gold", roi: 8 },
  platinum: { name: "Platinum", roi: 10 }
};

// 🗝️ Retrieve plan key and deposit from localStorage
const planKey = localStorage.getItem("selectedPlan");
const depositAmount = parseFloat(localStorage.getItem("depositAmount") || 0);
const plan = plans[planKey];

// 🚨 Guard clause for missing data
if (!plan || !depositAmount) {
  alert("Missing plan information. Redirecting...");
  window.location.href = "plan.html";
}

// ✅ Log and calculate
console.log("PLAN:", plan);

const profitPerDay = plan.roi / 100;
const totalROI = (profitPerDay * depositAmount).toFixed(2);

// 🔢 Animate ROI values
animateValue("daily-profit", profitPerDay * depositAmount);
animateValue("total-roi", parseFloat(totalROI));
animateValue("deposit-amount", depositAmount);

// Display user's plan name
document.getElementById("user-plan").textContent = plan.name;

// 🧾 Display in table
document.getElementById("table-deposit").textContent = depositAmount.toFixed(2);
document.getElementById("table-profit").textContent = (profitPerDay * depositAmount).toFixed(2);

// 💫 Animation function
function animateValue(id, endValue) {
  let start = 0;
  const duration = 1500;
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




























// const hamburger = document.getElementById('hamburger');
//   const navLinks = document.getElementById('nav-links');

//   hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('open');
//     navLinks.classList.toggle('active');
//   });



// const plans = {
//   premium: { name: "Premium", roi: 6 },
//   silver: { name: "Silver", roi: 7 },
//   gold: { name: "Gold", roi: 8 },
//   platinum: { name: "Platinum", roi: 10 }
// };

// const planKey = localStorage.getItem("selectedPlan");
// const depositAmount = parseFloat(localStorage.getItem("depositAmount") || 0);
// const plan = plans[planKey];

// // if (!plan || !depositAmount) {
// //   alert("Missing plan information. Redirecting...");
// //   window.location.href = "plan.html";
// // }

// console.log("PLAN:", plan);

// const profitPerDay = plan.roi / 100;
// const totalRoI = (profitPerDay * depositAmount).toFixed(2);


// // Instead of setting the values directly:
// animateValue("daily-profit", parseFloat(profitPerDay));
// animateValue("total-roi", parseFloat(totalROI));
// animateValue("deposit-amount", depositAmount);
// document.getElementById("user-plan").textContent = plan.name;


// function animateValue(id, endValue) {
//   let start = 0;
//   const duration = 1500; // in ms
//   const increment = endValue / (duration / 30);
//   const element = document.getElementById(id);

//   const step = () => {
//     start += increment;
//     if (start < endValue) {
//       element.textContent = start.toFixed(2);
//       requestAnimationFrame(step);
//     } else {
//       element.textContent = endValue.toFixed(2);
//     }
//   };
//   step();
// }

// // history
// document.getElementById("table-deposit").textContent = depositAmount.toFixed(2);
// document.getElementById("table-profit").textContent = profitPerDay;





