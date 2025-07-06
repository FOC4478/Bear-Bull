document.addEventListener("DOMContentLoaded", () => {
  fetch("php/admin_dashboard.php")
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch admin dashboard data.");
      return res.json();
    })
    .then(data => {
      // Summary Cards
      document.getElementById("total-users").textContent = data.totalUsers || 0;
      document.getElementById("total-deposits").textContent = `$${parseFloat(data.totalDeposits || 0).toFixed(2)}`;
      document.getElementById("total-profits").textContent = `$${parseFloat(data.totalProfits || 0).toFixed(2)}`;
      document.getElementById("active-plans").textContent = data.activePlans || 0;

      // Populate Users Table
      const userTable = document.getElementById("user-table-body");
      userTable.innerHTML = "";

      if (data.users && data.users.length > 0) {
        data.users.forEach(user => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${user.full_name}</td>
            <td>${user.email}</td>
            <td>${user.plan}</td>
            <td>$${parseFloat(user.amount).toFixed(2)}</td>
          `;
          userTable.appendChild(row);
        });
      } else {
        userTable.innerHTML = <tr><td colspan="4">No users found.</td></tr>;
      }

      // Populate Transactions Table
      const txTable = document.getElementById("transaction-table-body");
      txTable.innerHTML = "";

      if (data.transactions && data.transactions.length > 0) {
        data.transactions.forEach(tx => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${tx.full_name}</td>
            <td>${tx.type}</td>
            <td>$${parseFloat(tx.amount).toFixed(2)}</td>
            <td>${tx.date}</td>
          `;
          txTable.appendChild(row);
        });
      } else {
        txTable.innerHTML = <tr><td colspan="4">No transactions found.</td></tr>;
      }
    })
    .catch(err => {
      console.error("Error loading admin dashboard:", err);
      alert("Failed to load dashboard data. Please try again later.");
    });
});