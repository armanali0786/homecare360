# 🏠 HomeCare360

A full-stack **Local Services Marketplace** where users can search, book, and pay for on-demand home services like plumbing, electrical work, and cleaning — all in one seamless platform.

🔗 **Live Demo:** https://homecare360.netlify.app

---

## 🚀 Tech Stack

**Frontend**

* React.js (Vite)
* TypeScript
* React Router
* Tailwind CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

**Other Integrations**

* JWT Authentication (RBAC)
* Socket.io (Real-time updates)
* Stripe (Payments & Checkout)

---

## ✨ Features

* 🔍 **Search & Discover Services**

  * Browse verified service providers
  * Filter by category, ratings, and availability

* 📅 **Real-time Booking System**

  * Live availability tracking
  * Instant booking confirmations

* 🔔 **Real-time Notifications**

  * Powered by Socket.io (WebSockets)
  * Booking updates and alerts

* 🔐 **Secure Authentication**

  * JWT-based login system
  * Role-Based Access Control (User / Provider / Admin)

* 💳 **Online Payments**

  * Stripe integration for secure checkout
  * End-to-end payment flow
  * Provider payout handling

* ⭐ **Ratings & Reviews**

  * Verified user feedback system

---

## 📁 Project Structure

```
homecare360/
├── client/        # React frontend (Vite)
│   ├── src/
│   └── dist/      # Production build
│
├── server/        # Node.js backend
│   ├── routes/
│   ├── controllers/
│   └── models/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/armanali0786/homecare360.git
cd homecare360
```

---

### 2️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

### 3️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create `.env` files in both `client` and `server`.

### Example (server)

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
```

---

## 🚀 Deployment

* Frontend: **Netlify**
* Backend: (Render / Railway / VPS recommended)

---

## 🧠 Future Improvements

* 📱 Mobile app (React Native)
* 🤖 AI-based service recommendations
* 📍 Location-based provider matching
* 💬 In-app chat system

---

## 👨‍💻 Author

**Arman Ali**
GitHub: https://github.com/armanali0786

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
