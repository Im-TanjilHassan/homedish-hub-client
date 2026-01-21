🍽️ HomeDish-hub

HomeDish-hub is a full-stack MERN-based marketplace platform that connects local home chefs with customers looking for fresh, affordable, home-cooked meals. The platform supports secure authentication, role-based dashboards, meal ordering, reviews, favorites, and online payments.

🔗 Live Site: https://homedish-hub.web.app

📌 Project Purpose

The goal of HomeDish-hub is to create a reliable ecosystem where:

Home chefs can sell meals without owning a restaurant

Customers can order healthy, homemade food from local chefs

Admins can monitor users, requests, orders, and platform statistics


🚀 Core Features
🔐 Authentication & Security

Email & password authentication using Firebase

JWT-based authentication with httpOnly cookies

Protected routes with role-based access control

Persistent login on page reload (no forced re-login)

👥 User Roles

Admin: Full platform control

Chef: Create and manage meals, handle orders

Customer: Browse meals, place orders, review & favorite meals

🍱 Meal System

Browse meals with sorting & pagination

Detailed meal view (private)

Ingredients, delivery time, chef experience, and ratings

Add to favorites (duplicate prevention)

🛒 Orders & Payments

Order confirmation with quantity-based price calculation

Stripe payment integration

Payment status tracking

Live order status updates (pending → accepted → delivered)

⭐ Reviews & Ratings

Add, update, and delete reviews

Instant UI update after review submission

Reviews stored per meal in MongoDB

📊 Dashboards

User Dashboard: Profile, orders, reviews, favorites

Chef Dashboard: Create meals, manage meals, order requests

Admin Dashboard:

Manage users & fraud control

Approve/reject chef & admin requests

Platform statistics with charts (Recharts)

🛑 Fraud Control

Fraud users cannot place orders

Fraud chefs cannot create meals

Enforced across the application

🎨 UI & UX

Fully responsive (mobile-friendly)

Animated sections using Framer Motion

Global loading & error handling

SweetAlert & toast notifications

Clean, recruiter-friendly design

🛠️ Tech Stack
Frontend
_________

React

React Router

Tailwind CSS

DaisyUI

Firebase Authentication

Axios

TanStack React Query

React Hook Form

Stripe (Client)

Framer Motion

Recharts

SweetAlert2

Date-Fns

React Icons

Backend
________

Node.js

Express.js

MongoDB

JWT Authentication

Stripe (Server)

Cookie Parser

CORS

Dotenv

📦 NPM Packages Used

All major forms are handled using react-hook-form, API calls with Axios, authentication with Firebase & JWT, and payments via Stripe, following best practices.