# 📊 Student Progress Tracker - Codeforces Edition

A full-stack MERN web application to manage students and analyze their Codeforces activity. Admins can add, edit, delete, and view detailed profiles of students. The system also tracks contest performance, problem-solving history, and sends automatic inactivity alerts.

---

## 🗂 Project Structure

student-progress-tracker/
├── backend/ # Express backend
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── controllers/ # Logic for routes
│ ├── services/ # CF API, cron jobs, email services
│ └── ...
├── frontend/ # Vite + React + Tailwind frontend
│ ├── components/ # UI components
│ ├── pages/ # Home, StudentProfile, etc.
│ ├── routes/ # React router config
│ ├── utils/ # Helper functions
│ └── ...
└── README.md

markdown
Copy
Edit

---

## 🚀 Features

### 🧍 Student Table View

- Displays:
  - Name
  - Email
  - Phone Number
  - Codeforces Handle
  - Current Rating
  - Max Rating
- Actions:
  - ➕ Add Student
  - ✏️ Edit Student
  - 🗑️ Delete Student
  - 📥 Download dataset as CSV
  - 👁 View Details to open the Student Profile view

### 🧑‍💻 Student Profile View

#### 📈 Contest History

- Filter options: **Last 30 / 90 / 365 days**
- Rating graph
- Contest table showing:
  - Rating change
  - Rank
  - Problems unsolved till date

#### 🧠 Problem Solving Data

- Filter options: **Last 7 / 30 / 90 days**
- Shows:
  - Most difficult problem solved (by rating)
  - Total problems solved
  - Average rating of solved problems
  - Average problems per day
  - 📊 Bar chart (problems per rating bucket)
  - 🔥 Submission heatmap

### 🔄 Codeforces Data Sync

- Cron job runs **daily at 2 AM**
- Syncs:
  - Contest data
  - Problem solving history
  - Submission activity
- ⚙️ Options:
  - Change sync time and frequency
  - View `lastSynced` time in the main table
- 🧠 Real-time re-fetch if Codeforces handle is updated

### 🔔 Inactivity Detection

- After every sync:
  - Detects students inactive for 7 days
  - Sends automatic email reminders
  - Tracks reminder count per user
  - Option to disable reminders per student

---

## 🛠 Tech Stack

### Frontend

- ⚛️ React (Vite)
- 💨 Tailwind CSS
- 🧩 Lucide Icons
- 📦 react-csv / custom utils for CSV export

### Backend

- 🌐 Node.js + Express
- 🗄 MongoDB (via Mongoose)
- 📡 Axios for CF API
- ⏰ node-cron for scheduled syncs
- 📬 nodemailer for email services

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/student-progress-tracker.git
cd student-progress-tracker
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
# Create .env file as shown below
npm start
3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm run dev
🧪 Environment Variables
Create a .env file in the backend directory:

env
Copy
Edit
PORT=8000
MONGO_URI=your_mongo_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_SERVICE=gmail
FRONTEND_URL=http://localhost:5173
📅 Cron Job Configuration
Runs every day at 2 AM by default.

Can be configured via code in cronService.js

After every run:

Updates student CF data

Detects inactivity and sends emails

```
