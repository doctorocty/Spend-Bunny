Spend Bunny is a lightweight, browser-based expense tracker designed to help users manage and visualize their daily spending. It uses Firebase Authentication to handle sign-in/sign-up and offers a smooth, mobile-friendly UI for tracking expenses easily.

FEATURES:
✔ Authentication

Email/password sign-in

New user registration

Firebase-powered secure login

“Forgot Password” support

✔ Expense Tracking

Add, view, and manage expenses

Simple and clean interface

Fully client-side application

✔ UI/UX

Custom CSS styling for a minimal, soft theme

TECH STACK:
HTML5

CSS3

JavaScript (Vanilla)

Firebase Authentication



Animated buttons and interactions

Mobile-friendly layout

**Installation and Setup**

Clone or download the repository.

git clone <your-repository-link>


Open the project folder in any code editor.

Run the project on a local server. This is required for Firebase scripts to work.

Option A: VS Code Live Server

Install the Live Server extension

Right-click index.html

Select "Open with Live Server"

Option B: Node.js http-server

npm install -g http-server
http-server .


Add your Firebase configuration.
Open firebase.js and replace the placeholder values with your own Firebase project keys:

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);


In the Firebase console, enable Email/Password authentication.
Go to Authentication → Sign-in methods → Enable Email/Password.

Start the local server and open the link it provides (usually http://localhost:5500
).
The app will load in your browser.

Optional: To deploy using Firebase Hosting:

firebase login
firebase init
firebase deploy
