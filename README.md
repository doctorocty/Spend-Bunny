# Spend Bunny

<p align="center">
  <img src="https://img.shields.io/badge/Spend%20Bunny-Personal%20Expense%20Tracker-DB7093?style=for-the-badge&labelColor=FCE4EC" alt="Spend Bunny">
</p>

<p align="center">
  A simple, intuitive way to keep track of your spending and stay aware of your finances.
</p>

<p align="center">
  <a href="https://spend-bunny.vercel.app/">Live Demo</a>
  &nbsp; · &nbsp;
  <a href="https://github.com/doctorocty/Spend-Bunny">Source Code</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E8A0BF?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-D98AB5?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-C77D9A?style=flat-square&logo=javascript&logoColor=white" alt="JavaScript">
  <img src="https://img.shields.io/badge/Firebase-DB7093?style=flat-square&logo=firebase&logoColor=white" alt="Firebase">
</p>

---

## About

Spend Bunny is a lightweight, browser-based expense tracker designed to make everyday expense management simpler.

Keeping track of spending can be difficult when purchases happen throughout the day. Spend Bunny provides a straightforward interface for recording expenses and managing your spending information in one place.

Built with HTML, CSS, vanilla JavaScript, and Firebase Authentication, the project focuses on a simple user experience without relying on a large frontend framework.

## Features

### User Authentication

Securely manage access to your personal workspace using Firebase Authentication.

- Create an account with email and password.
- Sign in to an existing account.
- Access password recovery functionality.

### Expense Tracking

Keep a record of your everyday spending.

- Add and manage expenses.
- View recorded spending in one place.
- Keep your expense information organized.

### Simple User Interface

Spend Bunny focuses on usability and a clean visual experience.

- Minimal, custom-styled interface.
- Interactive buttons and frontend elements.
- Easy-to-navigate pages for authentication and expense management.

### Responsive Design

Access the application through a browser on supported desktop and mobile screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, layouts, and visual design |
| Vanilla JavaScript | Application logic and interactivity |
| Firebase Authentication | User registration and sign-in |
| Firebase SDK | Integration with Firebase services |

The project uses core web technologies to keep the frontend lightweight and straightforward to understand.

## Getting Started

Follow these steps to run Spend Bunny locally.

### Prerequisites

You will need:

- A modern web browser.
- Git.
- A code editor such as Visual Studio Code.
- A Firebase project with Email/Password Authentication enabled.

### 1. Clone the repository

```bash
git clone https://github.com/doctorocty/Spend-Bunny.git
```

### 2. Open the project directory

```bash
cd Spend-Bunny
```

### 3. Configure Firebase

Open `firebase.js` and configure it with the appropriate settings from your Firebase project.

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Replace the placeholders with your project's configuration values.

In the Firebase Console:

1. Open Authentication.
2. Navigate to Sign-in method.
3. Enable Email/Password authentication.
4. Configure any required authorized domains.

Never commit private service-account credentials or other secrets to your repository. Firebase client configuration is intended for client-side use, but access must still be protected through appropriate Firebase security rules and authorized-domain settings.

### 4. Run the application locally

Because the project uses browser-based Firebase scripts, serve the files through a local web server rather than relying on opening the HTML file directly.

If you use Visual Studio Code, install the Live Server extension, open `index.html`, and select **Open with Live Server**.

Alternatively, if you have Node.js installed, you can use:

```bash
npx http-server .
```

Open the local URL displayed in your terminal.

## Project Structure

```text
Spend-Bunny/
├── index.html       # Main application page
├── style.css        # Main application styles
├── script.js        # Application logic
├── firebase.js      # Firebase configuration
├── signin.html      # Sign-in page
├── signin.js        # Sign-in logic
├── signup.html      # Registration page
├── auth.css         # Authentication page styles
└── .gitignore       # Git ignore rules
```

This is a representative overview of the main files in the repository.

## Future Improvements

Potential areas for future development include:

- Expense categories and filtering.
- Monthly spending summaries.
- Visual spending analytics.
- Budget limits and spending alerts.
- Exportable expense reports.
- Additional interface customization.

These are possible future enhancements, not a claim that they are already implemented.

## Contributing

Suggestions, bug reports, and improvements are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Implement and test your improvements.
4. Commit your changes with a descriptive message.
5. Open a pull request describing your contribution.

## Author

**Sarah Fatima Lari**

- GitHub: [@doctorocty](https://github.com/doctorocty)
- Portfolio: [View Portfolio](https://sarahs-portfolio-inky.vercel.app/)

---

<p align="center">
  <sub>A simpler way to stay mindful of everyday spending.</sub>
</p>
