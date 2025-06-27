function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "admin-login.html";
}

// Dummy data — replace with backend/Firebase later
const users = [
  { name: "John Doe", email: "john@example.com", plan: "Gold", deposit: "$1,000" },
  { name: "Jane Smith", email: "jane@example.com", plan: "Premium", deposit: "$2,500" },
  { name: "Alex Ray", email: "alex@example.com", plan: "Silver", deposit: "$900" }
];

const transactions = [
  { user: "John Doe", type: "Deposit", amount: "$1,000", date: "2025-06-26" },
  { user: "Jane Smith", type: "ROI", amount: "$150", date: "2025-06-26" },
  { user: "Alex Ray", type: "Bonus", amount: "$50", date: "2025-06-25" }
];

// Populate cards
document.getElementById("total-users").textContent = users.length;
document.getElementById("total-deposits").textContent = "$" + users.reduce((sum, u) => sum + parseFloat(u.deposit.replace(/[^0-9.-]+/g,"")), 0);
document.getElementById("total-profits").textContent = "$" + transactions.filter(t => t.type === "ROI").reduce((s, t) => s + parseFloat(t.amount.replace(/[^0-9.-]+/g,"")), 0);
document.getElementById("active-plans").textContent = new Set(users.map(u => u.plan)).size;

// Fill tables
const userTable = document.getElementById("user-table-body");
users.forEach(u => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${u.name}</td>
    <td>${u.email}</td>
    <td>${u.plan}</td>
    <td>${u.deposit}</td>
  `;
  userTable.appendChild(row);
});

const txTable = document.getElementById("transaction-table-body");
transactions.forEach(t => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${t.user}</td>
    <td>${t.type}</td>
    <td>${t.amount}</td>
    <td>${t.date}</td>
  `;
  txTable.appendChild(row);
});














// function logout() {
//   localStorage.removeItem("isAdmin");
//   window.location.href = "admin-login.html";
// }