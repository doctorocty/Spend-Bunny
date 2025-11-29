// signup.js
import { signUpWithName } from "./firebase.js";

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const uid = await signUpWithName(email, password, name);

    // store name locally for welcome text in index.html
    localStorage.setItem("userName", name);
    // store uid too (optional)
    localStorage.setItem("uid", uid);

    // redirect to main app
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert(err.message || "Sign up failed. Try another email or stronger password.");
  }
});
