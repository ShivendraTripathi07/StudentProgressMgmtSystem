# 📊 Student Progress Tracker - Codeforces Edition

A comprehensive full-stack MERN web application designed to manage students and analyze their Codeforces competitive programming activity. Administrators can efficiently manage student profiles while tracking contest performance, problem-solving patterns, and maintaining engagement through automated inactivity monitoring.

---

## 🚀 Features

### 🧍 Student Management Dashboard

**Main Table View:**

- Comprehensive student information display:
  - Full Name
  - Email Address
  - Phone Number
  - Codeforces Handle
  - Current Rating
  - Maximum Rating Achieved
  - Last Sync Status

**Available Actions:**

- ➕ **Add Student** - Register new students with CF handles
- ✏️ **Edit Student** - Update student information and settings
- 🗑️ **Delete Student** - Remove students from tracking
- 📥 **Download CSV** - Export complete student dataset
- 👁 **View Details** - Access comprehensive student profiles
- 📧 **Send Inactivity Alerts** - Manually trigger reminder emails for inactive students

### 🧑‍💻 Detailed Student Profile

#### 📈 Contest Performance Analytics

**Time-based Filtering:**

- Last 30 days
- Last 90 days
- Last 365 days

**Visual Data Representation:**

- Interactive rating progression graph
- Comprehensive contest history table
- Performance metrics including:
  - Rating changes per contest
  - Contest rankings
  - Problems solved vs. total problems
  - Participation streaks

#### 🧠 Problem Solving Intelligence

**Flexible Time Periods:**

- Last 7 days (Recent activity)
- Last 30 days (Monthly progress)
- Last 90 days (Quarterly analysis)

**Detailed Analytics:**

- Most challenging problem solved (by rating)
- Total problems completed
- Average rating of solved problems
- Daily problem-solving rate
- 📊 **Problem Distribution Chart** - Visual breakdown by rating categories
- 🔥 **Submission Heatmap** - Activity patterns over time

### 🔄 Automated Codeforces Data Synchronization

**Scheduled Operations:**

- **Default Schedule:** Daily at 2:00 AM
- **Configurable Timing:** Adjustable sync frequency and time
- **Real-time Updates:** Immediate sync when CF handle is modified

**Data Synchronization Includes:**

- Contest participation history
- Problem solving records
- Submission statistics
- Rating progressions
- Performance metrics

**Monitoring Features:**

- Last sync timestamp display
- Sync status indicators
- Error logging and notifications

### 🔔 Smart Inactivity Management

**Automated Detection:**

- Post-sync analysis for student activity
- Configurable inactivity threshold (default: 7 days)
- Intelligent reminder scheduling

**Email Notification System:**

- Automatic reminder emails for inactive students
- Customizable email templates
- Reminder counter tracking per student
- Individual opt-out functionality

**Manual Controls:**

- **Send Inactivity Alerts Button** - Manually trigger reminder emails
- Per-student reminder preferences
- Bulk notification management
- Activity threshold customization

---

## 🛠 Technology Stack

### Frontend Technologies

- ⚛️ **React 18** with Vite for fast development
- 💨 **Tailwind CSS** for responsive, utility-first styling
- 🧩 **Lucide React** for consistent iconography
- 📊 **Chart.js/Recharts** for data visualization
- 📦 **React CSV** for data export functionality

### Backend Technologies

- 🌐 **Node.js** with **Express.js** framework
- 🗄 **MongoDB** with **Mongoose** ODM
- 📡 **Axios** for external API communication
- ⏰ **node-cron** for scheduled task management
- 📬 **Nodemailer** for email delivery services

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### 1. Repository Setup

```bash
git clone https://github.com/ShivendraTripathi07/StudentProgressMgmtSystem.git
cd StudentProgressMgmtSystem

```

### 2. Backend Configuration

```bash
cd backend
npm install
```

Create `.env` file in the backend directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
EMAIL_SERVICE=gmail

```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📅 Cron Job Configuration

### Default Schedule

- **Frequency:** Daily
- **Time:** 2:00 AM (server timezone)
- **Tasks:** Data sync + inactivity detection

### Customization Options

Modify `cronService.js` to adjust:

- Sync frequency (daily, weekly, custom)
- Execution time
- Retry mechanisms
- Error handling

### Post-Execution Actions

1. Updates all student Codeforces data
2. Analyzes activity patterns
3. Identifies inactive students
4. Sends automated reminder emails
5. Logs sync results and errors

---

## 📧 Email Notification System

### Automated Alerts

- Triggered after each data sync
- Identifies students inactive for 7+ days
- Sends personalized reminder emails
- Tracks delivery status and response

### Manual Notifications

- **"Send Inactivity Alerts" Button** available in the main dashboard
- Allows administrators to manually trigger reminder emails
- Useful for immediate notifications outside of scheduled sync
- Respects individual student notification preferences

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For questions, issues, or contributions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `/docs` folder
