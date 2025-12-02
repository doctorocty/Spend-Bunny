import { auth, saveUserData, loadUserData, signOutUser } from "./firebase.js"; 
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

let totalExpenses = 0;
let expenses = [];
let salary = 0;
let currentUser = null;

//UI ELEMENTS
const salaryInput = document.getElementById("salaryInput");
const totalSpentDisplay = document.getElementById("totalSpent");
const totalSavedDisplay = document.getElementById("totalSaved");
const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const authBtn = document.getElementById("authBtn"); 
const welcomeText = document.getElementById("welcomeText");


// UTILITY FUNCTIONS
function updateTotals() {
  totalSpentDisplay.textContent = `₹${totalExpenses.toFixed(2)}`;
  const saved = salary - totalExpenses;
  totalSavedDisplay.textContent = `₹${saved.toFixed(2)}`;

  // Update styles based on saving status
  if (saved < 0) {
    totalSavedDisplay.closest('.summary-box').style.backgroundColor = '#ffc0cb'; // Pink for over budget
  } else {
    totalSavedDisplay.closest('.summary-box').style.backgroundColor = '#d1ffc9'; // Green for saved
  }
  
  // Save data to Firestore 
  if (currentUser) {
    saveUserData(currentUser.uid, { salary, expenses });
  }
}

function createExpenseCard(title, amount, date, category, addToArray = true) {
  const card = document.createElement("div");
  card.className = "expense-card";
  card.setAttribute('data-title', title);
  card.setAttribute('data-amount', amount);
  card.setAttribute('data-date', date);
  card.setAttribute('data-category', category);

  // Simple icon based on category
  let icon = '💸';
  if (category === 'Food') icon = '🍔';
  else if (category === 'Shopping') icon = '🎀';
  else if (category === 'Travel') icon = '🚗';
  else icon = '🧁';

  card.innerHTML = `
    <div class="expense-info">
      <span class="icon">${icon}</span>
      <div class="details">
        <h3>${title}</h3>
        <p>${date}</p>
      </div>
    </div>
    <div class="expense-actions">
      <span class="amount">₹${amount}</span>
      <button class="delete-btn">❌</button>
    </div>
  `;

  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    // Remove from array and update total
    const amountToRemove = Number(card.getAttribute('data-amount'));
    const titleToRemove = card.getAttribute('data-title');
    const dateToRemove = card.getAttribute('data-date');
    
    // Find and remove the exact item to handle duplicates correctly
    const index = expenses.findIndex(exp => exp.title === titleToRemove && exp.amount === amountToRemove && exp.date === dateToRemove);

    if (index !== -1) {
        expenses.splice(index, 1); 
        totalExpenses -= amountToRemove;
        updateTotals();
        card.remove();
    }
  });

  list.prepend(card);

  if (addToArray) {
    expenses.push({ title, amount, date, category });
  }
}

// Function to display an error message on the main page
function displayFormError(message) {
    const existingError = document.querySelector('.form .error-message');
    if (existingError) existingError.remove();

    const errorMsg = document.createElement('p');
    errorMsg.className = 'error-message';
    errorMsg.style.color = 'red';
    errorMsg.style.marginTop = '10px';
    errorMsg.textContent = message;
    
    document.querySelector('.form').prepend(errorMsg);
}

//WAIT FOR USER LOGIN 
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // LOGGED OUT STATE
    authBtn.textContent = "Sign In / Sign Up";
    authBtn.onclick = () => { window.location.href = "signin.html"; };
    
    welcomeText.textContent = ""; 

    // Redirect to signin if user is on index.html but not logged in
    if (!window.location.pathname.includes('signin.html') && !window.location.pathname.includes('signup.html')) {
        window.location.href = "signin.html";
    }
    return;
  }

  // LOGGED IN STATE
  currentUser = user;
  
  // CHANGE BUTTON TO LOGOUT
  authBtn.textContent = "Logout";
  authBtn.onclick = signOutUser; 

  // DISPLAY USER NAME
  const displayUserName = user.displayName || localStorage.getItem("userName") || "Bunny";
  
  // Update the HTML element
  welcomeText.textContent = `Welcome back, ${displayUserName}!`;
  
  // Load data from Firestore
  const data = await loadUserData(user.uid);
  
  // Reset UI before loading new data
  list.innerHTML = ""; 
  totalExpenses = 0;
  expenses = [];
  salary = 0;

  if (data) {
      salary = data.salary || 0;
      expenses = data.expenses || [];
      
      salaryInput.value = salary;

      expenses.forEach(exp => {
        createExpenseCard(exp.title, exp.amount, exp.date, exp.category, false); 
        totalExpenses += exp.amount;
      });
  }
  
  updateTotals();
});

// ADD EXPENSE
addBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;

  if (!title || !amount || !date) {
    displayFormError("Please fill all fields 🌸");
    return;
  }
  
  // Remove error message if input is valid
  const existingError = document.querySelector('.form .error-message');
  if (existingError) existingError.remove();

  createExpenseCard(title, amount, date, category, true);
  totalExpenses += amount;

  updateTotals();

  // Clear form fields
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
});

// SALARY INPUT CHANGE 
salaryInput.addEventListener("input", () => {
  salary = Number(salaryInput.value);
  updateTotals();
});