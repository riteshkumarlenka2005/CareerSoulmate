<div align="center">

# 🎯 CareerSoulmate

### Unified Web Platform for Career and Skilling Guidance

[![Smart India Hackathon 2025](https://img.shields.io/badge/SIH-2025-orange?style=for-the-badge)](https://sih.gov.in/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)

*A one-stop AI-powered career and education advisory platform for students and learners*

</div>

---

## 📋 Problem Statement

This project addresses **two critical challenges** from Smart India Hackathon 2025:

### 🎓 Problem 1: Digital Career & Education Guidance Platform
A comprehensive web/mobile career guidance platform for students (especially Class 10 and 12) to make informed choices about streams, degrees, and careers.

### 🛠️ Problem 2: AI-Enabled Skilling Pathway Guidance (NCVET)
An AI-driven vocational guidance system targeting learners of all ages and backgrounds, providing NSQF-aligned vocational/skilling paths.

---

## ✨ Key Features

### 🧠 AI-Powered Personalization
- **Smart Aptitude Assessment** – Interactive psychometric quizzes to identify interests and aptitudes
- **Intelligent Recommendations** – AI/ML engine matching 50+ learner parameters to courses with high accuracy
- **Adaptive Learning Pathways** – Dynamic recommendations that evolve as learners progress

### 📊 Career & Course Mapping
- **Visual Career Roadmaps** – Interactive charts showing degree-to-career paths
- **NSQF-Aligned Courses** – Integration with National Qualification Register for vocational programs
- **Real-time Labor Market Data** – Job demand trends, salary insights, and industry forecasts

### 🏫 Institution Discovery
- **College Finder** – Geolocation-enabled directory of government colleges and training centers
- **Program Details** – Courses offered, cut-offs, facilities, and scholarship information
- **Admission Tracker** – Calendar and notifications for deadlines and important dates

### 💬 Multilingual Support
- **AI Chatbot (24×7)** – Instant answers to career queries in multiple Indian languages
- **Offline Access** – Key features available without internet for rural reach

### 🎮 Engagement & Progress
- **Gamification** – Badges, streaks, and achievement unlocks
- **Progress Tracking** – Monitor completed courses, certifications, and milestones
- **Community Forums** – Peer support and mentorship matching

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│              React/TypeScript + Vite (Responsive Web)           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                                │
│                   RESTful Backend Services                       │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   AI/ML       │     │   Databases     │     │   External      │
│   Services    │     │                 │     │   APIs          │
├───────────────┤     ├─────────────────┤     ├─────────────────┤
│ • Profiling   │     │ • PostgreSQL    │     │ • AISHE Data    │
│ • Recommender │     │ • MongoDB       │     │ • NCVET/NQR     │
│ • Chatbot NLP │     │ • Neo4j (Graph) │     │ • NCS Portal    │
│ • Forecasting │     │                 │     │ • Job APIs      │
└───────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/riteshkumarlenka2005/CareerSoulmate.git
   cd CareerSoulmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`

---

## 👥 User Journeys

### 🎒 Use Case 1: High School Student (Class 10)
> **Sanya, age 15**, is unsure whether to pick Science, Commerce, or Arts.
> - Takes aptitude quiz → AI classifies her as "Engineering-leaning"
> - Views career roadmap: Science → B.Tech → Data Scientist
> - Explores nearby colleges with cut-offs and scholarships
> - Gets SMS notifications for exam deadlines

### 🔧 Use Case 2: Vocational Learner (Job Seeker)
> **Rahul, age 25**, left school after 10th and wants a career in electronics.
> - Selects vocational training path
> - AI recommends: Electronic Technician (NSQF L4) → Diploma → Industrial Electrician (L5)
> - Views job prospects and salary trends
> - Chats with bot for clarifications in Hindi

### 📈 Use Case 3: Professional Upskilling
> **Priya, age 30**, is a teacher wanting to learn data analytics.
> - System recommends adaptive path: MOOCs → Certificate → PG Diploma
> - Receives scholarship alerts for working professionals
> - Tracks progress through gamified milestones

---

## 📊 Data Sources & APIs

| Source | Purpose |
|--------|---------|
| **[AISHE](https://aishe.gov.in/)** | Comprehensive data on all Indian higher education institutions |
| **NCVET/NQR** | NSQF-aligned vocational course catalogs |
| **[National Career Service](https://www.data.gov.in/catalog/national-career-service-ncs)** | Labor market data, vacancies, trending skills |
| **Job Portals** | Real-time employment trends and salary data |

---

## 🤖 AI/ML Techniques

- **Learner Profiling** – ML classifiers (Random Forest, Neural Networks) for aptitude prediction
- **Recommendation Engine** – Hybrid collaborative + content-based filtering
- **NLP Chatbot** – Transformer models (BERT/GPT) for multilingual support
- **Skill Forecasting** – Time-series analysis for labor market predictions
- **Explainable AI** – Transparent reasoning for building user trust

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Vite, CSS3 |
| **AI/ML** | TensorFlow, PyTorch, Scikit-learn, SpaCy |
| **Backend** | Node.js / Python (FastAPI/Django) |
| **Database** | PostgreSQL, MongoDB, Neo4j |
| **Cloud** | AWS/GCP/Azure with Docker & Kubernetes |
| **APIs** | RESTful, GraphQL |

---

## 🎯 Impact & Goals

- ✅ **Reduce educational dropouts** through informed decision-making
- ✅ **Bridge skill gaps** with NSQF-aligned vocational pathways
- ✅ **Democratize access** to career counseling across rural/urban India
- ✅ **Align with Skill India** and national education missions
- ✅ **Provide analytics** for policymakers to improve education systems

---

## 📝 License

This project is developed for **Smart India Hackathon 2025**.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">

**Built with ❤️ for Smart India Hackathon 2025**

*Empowering every learner to find their career soulmate*

</div>
