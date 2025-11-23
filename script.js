let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
renderList();

document.getElementById("addBtn").onclick = () => {
    let title = document.getElementById("title").value;
    let amount = Number(document.getElementById("amount").value);
    let date = document.getElementById("date").value;
    let category = document.getElementById("category").value;

    if (!title || !amount || !date) {
        alert("Please fill all fields cutie");
        return;
    }

    let exp = { title, amount, date, category };
    expenses.push(exp);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderList();
};

function renderList() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((e, index) => {
        total += e.amount;

        let card = document.createElement("div");
        card.className = "expense-card";

        card.innerHTML = `
            <div><b>${e.title}</b> — ₹${e.amount}</div>
            <div>${e.category}</div>
            <div>${e.date}</div>
            <div class="delete" onclick="deleteExp(${index})">❌</div>
        `;

        list.appendChild(card);
    });

    document.getElementById("total").innerText = "₹" + total;
}

function deleteExp(i) {
    expenses.splice(i, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderList();
}
