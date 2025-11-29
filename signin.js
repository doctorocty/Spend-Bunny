// signin.js
import { signInAndGetName } from "./firebase.js";

const signinBtn = document.getElementById("signinBtn");

signinBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    const { uid, name } = await signInAndGetName(email, password);

    // Save name locally for welcome text
    if (name) {
      localStorage.setItem("userName", name);
    }
    localStorage.setItem("uid", uid);

    // Redirect to main app
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("Sign in failed. Check your email/password or sign up first.");
  }
});
