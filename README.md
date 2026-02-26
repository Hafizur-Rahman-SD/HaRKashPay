# 💳 HARkash Pay – Frontend Digital Wallet Demo

HARkash Pay is a bKash-inspired digital wallet demo application built using:

- HTML5  
- TailwindCSS (CDN version)  
- DaisyUI  
- Vanilla JavaScript (ES Modules)  
- LocalStorage (as browser-based demo database)

This project simulates a real mobile financial service experience without using any backend or real database.

---

# 🌐 Live Demo

🔗 **Primary Live Link:**  
https://ha-r-kash-pay.vercel.app

🔗 **Preview Deployment Link:**  
https://ha-r-kash-e8uotvi3h-hafizur-rahmans-projects-b1a7a72d.vercel.app


# 📂 GitHub Repository

🔗 **Project Repository:**  
https://github.com/Hafizur-Rahman-SD/HaRKashPay

🔗 **GitHub Profile:**  
https://github.com/Hafizur-Rahman-SD

---

# 🎯 Project Purpose

This project was built to:

- Practice frontend architecture
- Simulate wallet transaction logic
- Implement authentication flow
- Work with LocalStorage as mock database
- Build a responsive mobile-first UI
- Create a portfolio-ready deployable project

This is a demo project only. It does not connect to any real banking system.

---

# 🚀 Features

## 🔐 Authentication
- 11-digit mobile number validation
- 6-digit PIN validation
- Register & Login system
- Session handling using LocalStorage
- Protected pages (Guard system)

---

## 💰 Wallet Operations

- Add Money (from demo banks)
- Cashout (Charge: ৳15 per 1000)
- Send Money (Maximum transfer limit: ৳50,000)
- Pay Bill
- Get Bonus (one-time per user)
- Transaction History
- Real-time balance update

---

# 🧠 How The App Works (Technical Explanation)

## 🔹 No Backend, No Real Database

This project uses:

LocalStorage (Browser Storage API)

All users, balances, transactions, and session data are stored inside the browser.

Example storage keys:

- harkash_users
- harkash_session
- harkash_used_bonus

---

# 🔄 Why Data Does Not Reset After Refresh?

Even if you refresh the browser, data does NOT disappear.

Why?

Because:

LocalStorage stores data inside the browser memory permanently until:

- You manually clear browser storage
- You uninstall browser
- You clear site data

So when the page reloads:

1. App reads data from LocalStorage
2. Reconstructs session
3. Loads user balance
4. Shows transaction history

That is why refresh does not delete data.

However:

If you open a different browser (for example Chrome vs Edge),
data will NOT be shared.

Because LocalStorage is browser-specific.

---

# ⚠ Limitations (Important)

## 1️⃣ Cross Browser Limitation

Accounts created in Chrome will NOT exist in Firefox.

Reason:
Each browser has its own LocalStorage.

There is no centralized database.

---

## 2️⃣ Same Browser Multi Account Behavior

All accounts created inside the same browser share the same LocalStorage pool.

Because we simulate database inside browser only.

---

## 3️⃣ No Real Banking API

Add Money works with demo bank selection only.
There is no real bank validation.

---

## 4️⃣ No Encryption

PIN is stored as plain text inside LocalStorage.
This is acceptable for demo purposes only.

In production:
PIN must be hashed and encrypted.

---

# 💸 Transaction Logic

## Cashout Charge Formula

Charge = (Amount / 1000) × 15

Total deduction = Amount + Charge

---

## Send Money Rule

- Maximum transfer = ৳50,000
- Balance must be sufficient
- PIN must match

---

# 🏗 Architecture Structure
pages/ → All HTML pages
js/ → Core JavaScript logic
js/pages/ → Page-specific scripts
assets/ → Images and icons
app.css → Global styling
index.html → Redirect entry


---

# 📦 How To Run Locally

Use VS Code Live Server:

1. Open project folder
2. Right click index.html
3. Click "Open with Live Server"

OR

Use Python server:

python -m http.server 5500

Then open:

http://localhost:5500

---

# 🛠 Tech Stack

- HTML
- TailwindCSS (CDN)
- DaisyUI
- Vanilla JavaScript
- LocalStorage API
- Vercel (Deployment)

---

# 📚 What I Learned From This Project

- Authentication without backend
- State management in browser
- Modular JavaScript structure
- UI/UX design for mobile apps
- Client-side validation
- Deploying static apps
- Handling transaction logic
- Building demo database system

---

# 🔮 Future Improvements

If backend (Node.js / Supabase) is added:

- Multi-device login support
- Secure hashed PIN storage
- Real-time database sync
- Admin dashboard
- OTP verification
- API integration
- JWT authentication
- Secure transfer system

---

# 🎤 Interview Explanation

If asked:

"Why does data remain after refresh?"

Answer:

Because the application uses LocalStorage, which stores data inside the browser permanently until manually cleared.

If asked:

"Why accounts don’t sync across browsers?"

Answer:

Because LocalStorage is isolated per browser environment. Without backend database, cross-device synchronization is not possible.

---

# 👨‍💻 Developer

Built by  
Hafizur Rahman

GitHub:
https://github.com/Hafizur-Rahman-SD

---

# ⚡ Final Note

This is a frontend-only educational demo project designed to simulate a real digital wallet system.

It is not intended for real financial transactions.
