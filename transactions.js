const userId = localStorage.getItem('userId') || 1;

const tableBody = document.querySelector('#transactionTable tbody');
const searchInput = document.getElementById('searchInput');
const chartCtx = document.getElementById('profitChart').getContext('2d');

let transactions = [];

async function fetchTransactions() {
  try {
    const response = await fetch(`http://localhost:3000/api/transactions/${userId}`);
    const data = await response.json();
    transactions = data;
    renderTable(data);
    renderChart(data);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach(tx => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Date">${new Date(tx.date).toLocaleDateString()}</td>
      <td data-label="Type">${tx.type}</td>
      <td data-label="Amount">$${tx.amount}</td>
      <td data-label="Profit">$${tx.profit}</td>
    `;
    tableBody.appendChild(tr);
  });
}

function renderChart(data) {
  const dates = data.map(tx => new Date(tx.date).toLocaleDateString());
  const profits = data.map(tx => tx.profit);

  new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Profit Over Time',
        data: profits,
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderColor: '#007bff',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

searchInput.addEventListener('input', e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = transactions.filter(tx =>
    tx.type.toLowerCase().includes(keyword) ||
    new Date(tx.date).toLocaleDateString().includes(keyword)
  );
  renderTable(filtered);
});

fetchTransactions();