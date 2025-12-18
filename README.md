# Medical Clinic Management System (Frontend)

This project is a React-based frontend application for a medical clinic management system.
It allows authenticated users to manage patients, doctors, appointments, diagnoses, and prescriptions through a full CRUD (Create, Read, Update, Delete) interface.

The application communicates with a provided REST API and uses modern React patterns, routing, and component-based UI.

## 🚀 Technologies Used

React (Vite)

React Router

Axios (API requests)

Shadcn/UI components

Lucide Icons

Sonner (toast notifications)

JWT Authentication (via API token)

# 🛠️ Installation & Setup

1️⃣ Clone the repository

git clone <your-repository-url>
cd <medical-clinic-application>

2️⃣ Install dependencies

npm install

3️⃣ Run the application locally

npm run dev

The app will be available at:

http://localhost:5173

# 🧭 Navigation & Usage

Once logged in, users can:

View lists of doctors, patients, appointments, diagnoses, and prescriptions

Create new records using forms

Edit existing records

View detailed information for individual records

Delete records with confirmation

Dates are displayed in a user-friendly format and handled correctly between the UI and the API.

# 🌐 API Integration

All data is fetched from the provided API:

https://ca2-med-api.vercel.app

Axios is used to handle:

Authentication requests

CRUD operations