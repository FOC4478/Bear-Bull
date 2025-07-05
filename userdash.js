// 🍔 Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('active');
});

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

if (!userId) {
  alert("Missing user ID. Please login again.");
  window.location.href = "login.html";
}

fetch(`getUserROI.php?userId=${userId}`)
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch ROI");
    }

    const { plan, deposit, roiRate, currentDay, transactions } = data;

    const profitPerDay = parseFloat((deposit * roiRate / 100).toFixed(2));
    const totalROI = parseFloat((profitPerDay * 24).toFixed(2));

    // Update values with animation
    document.getElementById("user-plan").textContent = plan;
    animateValue("deposit-amount", deposit);
    animateValue("daily-profit", profitPerDay);
    animateValue("total-roi", totalROI);

    // Update progress bar
    const roiProgress = document.getElementById("roi-progress");
    const percent = (currentDay / 24) * 100;
    roiProgress.style.width = `${percent}%`;

    // Update chart
    const days = Array.from({ length: 24 }, (_, i) => `Day ${i + 1}`);
    let cumulative = 0;
    const roiData = days.map((_, i) => {
      cumulative += (deposit * roiRate / 100);
      return parseFloat(cumulative.toFixed(2));
    });

    const ctx = document.getElementById("roiChart").getContext("2d");
    new Chart(ctx, {
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
          duration: 1000
        },
        scales: {
          y: { beginAtZero: true },
          x: { title: { display: true, text: 'Days' } }
        }
      }
    });

    // Render transaction history
    const tbody = document.querySelector(".transaction-history tbody");
    tbody.innerHTML = "";
    transactions.forEach(tx => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${tx.date}</td>
        <td>${tx.type}</td>
        <td>$${parseFloat(tx.amount).toFixed(2)}</td>
      `;
      tbody.appendChild(row);
    });

  })
  .catch(err => {
    alert("Error loading dashboard.");
    console.error(err);
    window.location.href = "login.html";
  });

// Animation Function
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