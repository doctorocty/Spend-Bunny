// at top of script.js (it is a module already)
const userName = localStorage.getItem("userName");

if (userName) {
  document.getElementById("welcomeText").textContent = `Welcome back, ${userName}!`;
}

const welcomeName = localStorage.getItem("userName");

if (welcomeName) {
    document.getElementById("welcomeText").textContent = `Welcome Back, ${welcomeName}! 💕`;
}

import { auth, db, saveUserData, loadUserData } from "../Spend-Bunny/firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

let totalExpenses = 0;
let expenses = [];
let salary = 0;
let currentUser = null;

/* ------------------------------------------
   UI ELEMENTS
------------------------------------------- */
const salaryInput = document.getElementById("salaryInput");
const totalSpentDisplay = document.getElementById("totalSpent");
const totalSavedDisplay = document.getElementById("totalSaved");
const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");

/* ------------------------------------------
   WAIT FOR USER LOGIN
------------------------------------------- */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "signin.html";
    return;
  }

  currentUser = user;

  const data = await loadUserData(user.uid);

  salary = data.salary || 0;
  expenses = data.expenses || [];

  salaryInput.value = salary;

  list.innerHTML = "";
  totalExpenses = 0;

  expenses.forEach((exp) => {
    totalExpenses += exp.amount;
    createExpenseCard(exp.title, exp.amount, exp.date, exp.category, false);
  });

  updateTotals();
});

/* ------------------------------------------
   UPDATE TOTALS & SAVE TO FIREBASE
------------------------------------------- */
async function updateTotals() {
  totalSpentDisplay.textContent = "₹" + totalExpenses.toFixed(2);

  const saved = salary - totalExpenses;
  totalSavedDisplay.textContent = "₹" + saved.toFixed(2);

  if (currentUser) {
    await saveUserData(currentUser.uid, {
      salary: salary,
      expenses: expenses
    });
  }
}

/* ------------------------------------------
   CREATE CARD
------------------------------------------- */
function createExpenseCard(title, amount, date, category, addToArray) {
  const card = document.createElement("div");
  card.className = "expense-card";

  card.innerHTML = `
    <strong>${title}</strong> — ₹${amount}<br>
    <small>${date} | ${category}</small>
    <span class="delete">❌</span>
  `;

  card.querySelector(".delete").addEventListener("click", async () => {
    expenses = expenses.filter(exp => !(exp.title === title && exp.amount === amount && exp.date === date));
    totalExpenses -= amount;
    updateTotals();
    card.remove();
  });

  list.prepend(card);

  if (addToArray) {
    expenses.push({ title, amount, date, category });
  }
}

/* ------------------------------------------
   ADD EXPENSE
------------------------------------------- */
addBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;

  if (!title || !amount || !date) {
    alert("Please fill all fields 🌸");
    return;
  }

  createExpenseCard(title, amount, date, category, true);
  totalExpenses += amount;

  updateTotals();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
});

/* ------------------------------------------
   SALARY INPUT CHANGE
------------------------------------------- */
salaryInput.addEventListener("input", () => {
  salary = Number(salaryInput.value);
  updateTotals();
});

/* ------------------------------------------
   SIGN-IN BUTTON TOP-LEFT
------------------------------------------- */
document.getElementById("authBtn").onclick = () => {
  window.location.href = "signin.html";
};
