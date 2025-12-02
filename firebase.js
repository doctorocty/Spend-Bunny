import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut, 
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { sendPasswordResetEmail } 
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCyKlzNpBQzFei3aurlz1fQdH-qOM9icwQ",
  authDomain: "spend-bunny.firebaseapp.com",
  projectId: "spend-bunny",
  storageBucket: "spend-bunny.firebasestorage.app",
  messagingSenderId: "98146831404",
  appId: "1:98146831404:web:23dbf3a048b1f4bcd49589",
  measurementId: "G-8Y8LGN192G"
};

// INITIALIZATION 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);       
export const db = getFirestore(app);

// SIGN UP WITH NAME -
export async function signUpWithName(email, password, name) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const uid = user.uid;

  // update Firebase Auth displayName
  await updateProfile(user, { displayName: name });

  // create Firestore user document
  await setDoc(doc(db, "users", uid), {
    name: name,
    email: email,
    salary: 0,
    expenses: []
  });

  return uid;
}

// SIGN IN 
export async function signInAndGetName(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  const snap = await getDoc(doc(db, "users", uid));
  const data = snap.exists() ? snap.data() : {};

  return { uid, name: data.name };
}

// SAVE USER DATA 
export async function saveUserData(uid, data) {
  await updateDoc(doc(db, "users", uid), data);
}

// LOAD USER DATA 
export async function loadUserData(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// LOGOUT FUNCTION 
export async function signOutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem("userName");
    localStorage.removeItem("uid");
    // Redirect to signin page
    window.location.href = "signin.html";
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
