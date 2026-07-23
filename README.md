# 🍔 Food Delivery Website – MERN Stack

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

</p>

A full-stack **Food Delivery Website** developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The application provides a modern platform where users can browse food items, search meals, manage their shopping cart, securely authenticate, and place food orders through a responsive and user-friendly interface.

The project follows the **MVC architecture** for the backend and a **component-based architecture** for the frontend, making it scalable, maintainable, and easy to extend.

---

# 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Database Setup](#-database-setup)
- [API Endpoints](#-api-endpoints)
- [Component Breakdown](#-component-breakdown)
- [Environment Variables](#-environment-variables)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

# 📖 Project Overview

The **Food Delivery Website** is a complete web application that simplifies online food ordering. Customers can browse a variety of food items, search by category, manage their shopping cart, place orders, and track their order history.

The application is divided into two major parts:

- **Frontend:** Built with React.js to provide a responsive and interactive user experience.
- **Backend:** Built with Node.js and Express.js to expose RESTful APIs and manage business logic.
- **Database:** MongoDB stores user accounts, food items, shopping cart data, and customer orders.

The application also includes JWT-based authentication, secure password encryption, image upload support, and RESTful API integration between the frontend and backend.

---

# ✨ Features

## 👤 User Features

- User Registration
- User Login
- Secure JWT Authentication
- Profile Management
- Logout Functionality

## 🍔 Food Features

- Browse Food Menu
- View Food Details
- Search Food Items
- Filter by Category
- Responsive Food Cards

## 🛒 Cart Features

- Add Items to Cart
- Update Quantity
- Remove Items
- Calculate Total Price
- Clear Shopping Cart

## 📦 Order Features

- Secure Checkout
- Place Orders
- View Order History
- Order Status Management

## 🖼 Image Features

- Food Image Upload
- Cloud Image Storage
- Responsive Image Display

## 🎨 User Interface

- Responsive Design
- Mobile Friendly Layout
- Clean Navigation
- Loading Indicators
- Toast Notifications
- Error Handling

---

# 🛠 Tech Stack

| Layer | Technology | Purpose |
|--------|------------|---------|
| Frontend | React.js | User Interface |
| Styling | CSS / Tailwind CSS | UI Design |
| Routing | React Router DOM | Client-side Routing |
| HTTP Client | Axios | API Communication |
| Backend | Node.js | Runtime Environment |
| Framework | Express.js | REST API Development |
| Database | MongoDB | Data Storage |
| ODM | Mongoose | Database Modeling |
| Authentication | JWT | User Authentication |
| File Upload | Multer | Image Upload |
| Cloud Storage | Cloudinary | Image Hosting |
| Version Control | Git & GitHub | Source Code Management |

---

# 📂 Project Structure

```text
food-delivery-app/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
├── package.json
└── .gitignore
```

---

## 📌 Folder Description

| Folder | Description |
|---------|-------------|
| **client/** | React frontend application |
| **server/** | Express backend application |
| **controllers/** | Business logic for APIs |
| **models/** | MongoDB schemas |
| **routes/** | REST API routes |
| **middleware/** | Authentication and upload middleware |
| **services/** | API and utility services |
| **uploads/** | Temporary uploaded images |
| **config/** | Database and application configuration |

---
# 🚀 Getting Started

Follow the steps below to set up and run the Food Delivery Website on your local machine.

## Prerequisites

Before installing the project, ensure the following software is installed:

- Node.js (v18 or later)
- npm or yarn
- MongoDB Community Server or MongoDB Atlas
- Git
- Visual Studio Code

Check the installed versions:

```bash
node -v
npm -v
git --version
```

---

## Clone the Repository

Clone the project from GitHub.

```bash
git clone https://github.com/your-username/food-delivery-app.git
```

Navigate into the project folder.

```bash
cd food-delivery-app
```

---

# ⚙ Backend Setup

Navigate to the backend directory.

```bash
cd server
```

Install all required dependencies.

```bash
npm install
```

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend server.

```bash
npm run dev
```

The backend server will start at:

```
http://localhost:5000
```

---

## Backend Dependencies

The backend uses the following packages:

| Package | Purpose |
|---------|---------|
| express | Web framework |
| mongoose | MongoDB ODM |
| dotenv | Environment variables |
| cors | Cross-Origin Resource Sharing |
| bcryptjs | Password hashing |
| jsonwebtoken | Authentication |
| multer | File uploads |
| cookie-parser | Cookie handling |
| cloudinary | Cloud image storage |
| nodemon | Development server |

Install them using:

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer cookie-parser cloudinary
```

Development dependency:

```bash
npm install --save-dev nodemon
```

---

# 🎨 Frontend Setup

Open a new terminal.

Navigate to the frontend directory.

```bash
cd client
```

Install all dependencies.

```bash
npm install
```

Run the React application.

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## Frontend Dependencies

| Package | Purpose |
|---------|---------|
| react | Frontend library |
| react-router-dom | Client-side routing |
| axios | API requests |
| react-hot-toast | Notifications |
| tailwindcss | Styling (if used) |

Install dependencies:

```bash
npm install react-router-dom axios react-hot-toast
```

If using Tailwind CSS:

```bash
npm install tailwindcss @tailwindcss/vite
```

---

# ▶ Running the Application

Start MongoDB.

```bash
mongod
```

Run the backend server.

```bash
cd server

npm run dev
```

Run the frontend application.

```bash
cd client

npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

The application should now be running successfully.

---

# 🗄 Database Setup

The project uses **MongoDB** as the primary database.

The database stores:

- User Accounts
- Food Items
- Categories
- Shopping Cart
- Customer Orders

MongoDB is connected using **Mongoose**.

Example connection:

```javascript
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
```

---

# 📁 Application Structure

The project follows the **MVC (Model-View-Controller)** architecture.

```text
Client (React)

↓

REST API (Express)

↓

Controllers

↓

Models (Mongoose)

↓

MongoDB
```

This architecture separates the user interface, business logic, and database operations, making the project easier to maintain and scale.

---
# 🗄 Database Schema

The application uses **MongoDB** with **Mongoose** to manage and store data efficiently. Four primary collections are used throughout the application.

## User Model

Stores registered user information.

| Field | Type | Description |
|-------|------|-------------|
| name | String | User's full name |
| email | String | Unique email address |
| password | String | Encrypted password |
| phone | String | Contact number |
| address | String | Delivery address |
| role | String | User role (Customer/Admin) |
| createdAt | Date | Record creation time |

---

## Food Model

Stores food items available in the application.

| Field | Type | Description |
|-------|------|-------------|
| name | String | Food name |
| description | String | Food description |
| category | String | Food category |
| price | Number | Food price |
| image | String | Food image URL |
| available | Boolean | Availability status |

---

## Cart Model

Stores items added by the user before checkout.

| Field | Type | Description |
|-------|------|-------------|
| userId | ObjectId | Reference to User |
| foodId | ObjectId | Reference to Food |
| quantity | Number | Number of items |

---

## Order Model

Stores customer order information.

| Field | Type | Description |
|-------|------|-------------|
| userId | ObjectId | Customer reference |
| items | Array | Ordered food items |
| totalAmount | Number | Total order amount |
| paymentMethod | String | Payment option |
| status | String | Order status |
| createdAt | Date | Order date |

---

# 🔌 API Endpoints

The backend exposes RESTful APIs for authentication, food management, cart operations, and order processing.

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get logged-in user profile |
| PUT | `/api/auth/profile` | Update profile |

---

## Food APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/foods` | Get all food items |
| GET | `/api/foods/:id` | Get food details |
| POST | `/api/foods` | Add new food |
| PUT | `/api/foods/:id` | Update food |
| DELETE | `/api/foods/:id` | Delete food |

---

## Cart APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update` | Update item quantity |
| DELETE | `/api/cart/remove` | Remove cart item |
| DELETE | `/api/cart/clear` | Clear cart |

---

## Order APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/orders` | Place an order |
| GET | `/api/orders` | View order history |
| GET | `/api/orders/:id` | Get order details |
| PUT | `/api/orders/:id` | Update order status |
| DELETE | `/api/orders/:id` | Cancel an order |

---

# 🧩 Component Breakdown

The frontend is built using reusable React components for better maintainability and scalability.

| Component | Description |
|-----------|-------------|
| Navbar | Navigation bar with menu and user options |
| Footer | Website footer with links and information |
| Home | Landing page displaying featured foods |
| Menu | Displays all available food items |
| FoodCard | Reusable component for individual food items |
| FoodDetails | Shows complete information about a selected food |
| SearchBar | Allows users to search food items |
| Cart | Displays selected items before checkout |
| Checkout | Handles order placement |
| Login | User authentication page |
| Register | New user registration page |
| Orders | Displays previous orders |
| Profile | User account management |

---# ⚙️ Environment Variables

Create a `.env` file inside the **server** directory and add the following configuration:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Authentication
JWT_SECRET=your_secret_key

# Client URL
CLIENT_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Note:** Never commit your `.env` file or sensitive credentials to GitHub.

---

# 🧪 Testing

Before deploying the application, verify the following functionalities:

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Browse Food Items
- ✅ Search Food Items
- ✅ Add Items to Cart
- ✅ Update Cart Quantity
- ✅ Remove Items from Cart
- ✅ Checkout Process
- ✅ Place Orders
- ✅ View Order History
- ✅ Image Upload
- ✅ Responsive Layout

---

# 🚀 Future Enhancements

The following features can be added in future versions:

- 💳 Online Payment Integration (Stripe, Khalti, eSewa)
- 📍 Real-Time Order Tracking
- ⭐ Food Ratings and Reviews
- ❤️ Wishlist / Favorites
- 🎟️ Coupon and Discount System
- 📱 Progressive Web App (PWA)
- 🔔 Push Notifications
- 🌙 Dark Mode
- 📊 Admin Dashboard with Analytics
- 📦 Inventory Management
- 🍽️ Restaurant Management Panel
- 🤖 AI-Based Food Recommendations

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature/feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature/feature-name
```

5. Open a Pull Request.

Please ensure that your code follows the existing project structure and coding standards.

---

# 👨‍💻 Author

**Aashika Adhikari**
Pokhara, Nepal

**Skills**

- MERN Stack Development
- React.js
- Node.js
- Express.js
- MongoDB
- JavaScript
- HTML5 & CSS3
- REST API Development

---

# 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for educational and personal purposes.

For more information, see the **LICENSE** file.

---

# 🙏 Acknowledgements

This project was developed using the following technologies and open-source tools:

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- React Router DOM
- Cloudinary
- Multer
- JWT (JSON Web Token)
- Vite
- Git & GitHub

Special thanks to the open-source community for providing excellent libraries and documentation that made this project possible.

---

## ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and supports future development.

---

<p align="center">

**Made with ❤️ using the MERN Stack**

© 2026 Aashika Adhikari. All Rights Reserved.

</p>
