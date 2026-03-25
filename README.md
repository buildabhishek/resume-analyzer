# 📄 AI Resume Analyzer & Tracker

A full-stack web application that allows users to upload resumes, automatically extract key skills using AI, and manage a historical record of their career documents.

## 🚀 Features

* **Resume Upload:** Seamlessly upload PDF or Docx resumes.
* **AI Analysis:** Automatically identifies and tags professional skills from the document.
* **History Dashboard:** A centralized view of all uploaded resumes with timestamps.
* **Deep Dive View:** Click any resume in the history to view detailed analysis and extracted data.
* **Management:** Delete outdated resumes to keep your history clean.
* **Responsive Design:** Built with Tailwind CSS for a smooth experience across all devices.

## 🛠️ Tech Stack

**Frontend:**
* **React.js** (Functional Components & Hooks)
* **Tailwind CSS** (Styling)
* **React Router DOM** (Navigation)
* **Axios** (API Communication)

**Backend:**
* **Node.js & Express**
* **MongoDB** (Database for storing resume metadata and analysis)
* **Multer** (File handling)

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer
```

### 2. Backend Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server: `npm start`

### 3. Frontend Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

---

## 🖥️ API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/resume` | Fetch all analyzed resumes |
| `GET` | `/api/resume/:id` | Get details of a specific resume |
| `POST` | `/api/resume/upload` | Upload and analyze a new resume |
| `DELETE` | `/api/resume/:id` | Remove a resume from history |

---

## 📸 Screenshots

### Resume History View
The history page provides a clean list of all processed resumes, showing the filename, upload date, and a preview of identified skills.

---

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

