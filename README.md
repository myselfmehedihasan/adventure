---

# 🌍 Tourism Management Website

A full-stack **Tourism Management Website** where users can explore tourist spots, view details, and manage their personalized list of destinations. The project focuses on a specific tourism zone (**Southeast Asia**) and provides complete **CRUD operations** with authentication and secure data handling.

---

## ✨ Live Demo

🔗 [Live Website](https://your-live-site-link.com)
🔗 [Server Repo](https://github.com/your-username/tourism-server)
🔗 [Client Repo](https://github.com/your-username/tourism-client)

---

## 📌 Features

* 🔐 **Authentication System**: Email/Password login with Google sign-in option.
* 🎯 **Private Routes**: Add Tourists Spot, My List, and View Details are fully protected.
* 🏞️ **Tourists Spots**: Explore tourist spots by country with sorting and filtering.
* ✍️ **CRUD Operations**: Add, View, Update, and Delete tourist spots with confirmation alerts.
* 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop.
* 🌗 **Dark/Light Mode** toggle for better user experience.
* 📊 **My List Dashboard**: Users can manage only their added spots with update/delete options.
* 🎡 **Interactive UI Enhancements** using `react-simple-typewriter`, `lottie-react`, and `react-awesome-reveal`.

---

## 🛠️ Tech Stack

**Frontend (Client):**

* React + React Router
* Tailwind CSS + DaisyUI
* Firebase Authentication
* Axios for API calls
* SweetAlert2 / React Hot Toast for notifications

**Backend (Server):**

* Node.js + Express.js
* MongoDB (Atlas)
* JWT Authentication for private routes
* Environment variables for sensitive credentials

---

## 📂 Pages Overview

* **Home Page**

  * Banner Slider
  * Featured Tourist Spots
  * Countries Section (Southeast Asia)
  * 2 Extra Sections (e.g., Travel Tips, Best Time to Visit)
  * Footer

* **All Tourists Spot Page**

  * Display all spots from database
  * Sorting by average cost

* **View Details Page** *(Protected)*

  * Full details of selected tourist spot

* **Add Tourists Spot Page** *(Protected)*

  * Form to add new spots with all required fields

* **My List Page** *(Protected)*

  * User’s own added spots in table format with **Update/Delete** options

* **Update Page / Modal** *(Protected)*

  * Edit tourist spot details and save updates

* **Login / Register**

  * Email-password authentication
  * Google login option
  * Password validation (uppercase, lowercase, min 6 chars)

* **404 Page**

  * Friendly error page

---

## 📊 Database Structure

### **Tourist Spots Collection**

```json
{
  "image": "image_url",
  "tourists_spot_name": "Cox’s Bazar",
  "country_Name": "Bangladesh",
  "location": "Chattogram",
  "short_description": "World’s longest natural sandy sea beach",
  "average_cost": 300,
  "seasonality": "Winter",
  "travel_time": "5 days",
  "totalVisitorsPerYear": 200000,
  "userEmail": "user@example.com",
  "userName": "John Doe"
}
```

### **Countries Collection**

```json
{
  "image": "image_url",
  "country_Name": "Bangladesh",
  "description": "A country in South Asia famous for natural beauty and culture."
}
```

---

## ⚙️ Installation & Setup

### 🔽 Clone Repositories

```bash
git clone https://github.com/your-username/tourism-client.git
git clone https://github.com/your-username/tourism-server.git
```

### 🖥️ Client Setup

```bash
cd tourism-client
npm install
npm run dev
```

### 🌐 Server Setup

```bash
cd tourism-server
npm install
npm run start
```

### 🔑 Environment Variables

Create a `.env` file in both client & server with:

**Client (`.env.local`)**

```
VITE_apiKey=your_firebase_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_SERVER_URL=http://localhost:5000
```

**Server (`.env`)**

```
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Challenges Implemented

* ✅ Countries collection with linked tourist spots
* ✅ Sorting tourist spots by average cost
* ✅ Dark/Light theme toggle
* ✅ Lottie animations & typewriter effects

---

## 📸 Screenshots

👉 *(Add screenshots of your home page, details page, and dashboard here)*

---

## 📝 License

This project is **open-source** and available under the [MIT License](LICENSE).

---

