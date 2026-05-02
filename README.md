# 🎬 NetflixGPT – AI Movie Recommendation Platform

NetflixGPT is a full-stack web application that combines **movie browsing** with **AI-powered search** and a **premium subscription system**.

---

## 🚀 Live Demo

🔗https://netflix-k0p7m2m5g-saumya-mishras-projects-79140157.vercel.app?_vercel_share=cF5WnazjvKqXfYiAfHQmpNLnDNbGRH1v

---

## ✨ Features

### 🔐 Authentication

* User login & signup using Firebase Authentication
* Secure session handling

### 🎥 Movie Browsing

* Fetches real-time movie data from OMDB API
* Featured movie banner with trailer
* Horizontal scroll movie lists

### 🤖 AI Movie Search (Premium Feature)

* GPT-powered movie recommendations
* Smart search based on user queries
* Locked behind premium subscription

### 💳 Payment Integration

* Secure payment flow using Stripe (backend)
* Checkout session creation
* Webhook-based verification
* Real-time premium access update

### ⚡ Real-Time Updates

* Firestore `onSnapshot` for instant UI updates
* No page refresh required

---

## 🧠 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Redux Toolkit
* React Router

### Backend

* Node.js + Express
* Stripe API (Payments + Webhooks)
* Firebase Admin SDK

### Database & Auth

* Firebase Firestore
* Firebase Authentication

---



## ⚙️ Environment Variables

### Frontend (.env)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```



## 🛠️ Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/SaumyaMishra6424/Netflixgpt
cd netflixgpt
```


### 2. Setup Frontend

```
cd frontend
npm install
npm run dev
```






## 🔐 Firestore Rules

```
allow read, write: if request.auth != null && request.auth.uid == userId;
```

---

## 💡 Key Highlights

* Implemented **role-based access control** for premium users
* Designed **secure payment architecture using Stripe webhooks**
* Built **real-time UI updates using Firestore listeners**
* Structured project using **scalable frontend/backend separation**

---

## 🚀 Future Improvements

* Subscription plans (monthly/yearly)
* Payment history dashboard
* AI personalization using user behavior
* Deployment with custom domain

---

## 👨‍💻 Author

Saumya Mishra

---


