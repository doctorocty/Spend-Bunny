let totalExpenses = 0;

const salaryInput = document.getElementById("salaryInput");
const totalSpentDisplay = document.getElementById("totalSpent");
const totalSavedDisplay = document.getElementById("totalSaved");
const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");

function updateTotals() {
    const salary = Number(salaryInput.value);

    // Update spent panel
    totalSpentDisplay.textContent = "₹" + totalExpenses.toFixed(2);

    // Update saved panel
    if (salary > 0) {
        const saved = salary - totalExpenses;
        totalSavedDisplay.textContent = "₹" + saved.toFixed(2);
    } else {
        totalSavedDisplay.textContent = "₹0";
    }
}

function addExpense() {
    const title = document.getElementById("title").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;

    if (!title || !amount || !date) {
        alert("Please fill all fields 🌸");
        return;
    }

    // Add to total
    totalExpenses += amount;
    updateTotals();

    // Create card
    const card = document.createElement("div");
    card.className = "expense-card";
    card.innerHTML = `
        <strong>${title}</strong> — ₹${amount}<br>
        <small>${date} | ${category}</small>
        <span class="delete">❌</span>
    `;

    // Delete expense
    card.querySelector(".delete").addEventListener("click", () => {
        totalExpenses -= amount;
        updateTotals();
        card.remove();
    });

    list.appendChild(card);

    // Clear fields
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
}

// Event listeners
addBtn.addEventListener("click", addExpense);
salaryInput.addEventListener("input", updateTotals);
