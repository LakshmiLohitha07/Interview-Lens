# 🎯 InterviewLens — AI Resume Defense Simulator

> **Defend every claim on your resume before an interviewer does.**

InterviewLens is an AI-powered **Resume Defense Simulator** that transforms a candidate's resume into a personalized technical interview.

Instead of asking generic interview questions, InterviewLens analyzes the candidate's actual **projects, skills, technologies, experience, and claims**, then challenges them with resume-specific questions, adaptive follow-ups, and a dynamic performance report.

---

## 🏆 Hackathon

**Independence Day AI Hackathon 2026**

### 🎥 Demo

**Live Demo:** [InterviewLens](https://interviewlens-resume-ai.lovable.app/)

**Repository:** [GitHub](https://github.com/LakshmiLohitha07/Interview-Lens)

---

## 💡 The Problem

Candidates often prepare for interviews by studying generic questions, but real interviewers frequently focus on what is written on the candidate's own resume.

A candidate may list:

- A machine-learning project
- Python
- RAG
- React
- JavaScript
- Internship experience
- Quantified achievements

But knowing how to write something on a resume is different from being able to **defend it under questioning**.

InterviewLens addresses this gap by turning the resume itself into an interactive interview preparation environment.

---

## 🚀 The Solution

InterviewLens follows a simple pipeline:

```text
Resume PDF
    ↓
AI Resume Analysis
    ↓
Resume Defense Map
    ↓
6-Area Interview Coverage
    ↓
Main Question + Adaptive Follow-ups
    ↓
Answer Evaluation
    ↓
Dynamic Defense Report
```
 The system doesn't simply generate six random questions.
It intentionally moves across different areas of the resume so that the candidate is tested more broadly.

---

## ✨ Key Features

**📄 1. AI Resume Analysis**


Upload a resume as a PDF and InterviewLens extracts meaningful information such as:
Projects
Technical skills
Technologies
Experience
Achievements
Important resume claims
The extracted information forms the foundation of the interview.

---

**🗺️ 2. Resume Defense Map**

InterviewLens identifies areas that an interviewer could challenge.
For example:

```text
Project
Amazon Product Reviews Sentiment Analysis

Technologies
Python
NLP
DistilBERT
PyTorch

Claim
80.88% Test Accuracy
```
This helps transform a static resume into an interview-ready knowledge map.

---

**🎯 3. Broad Resume Coverage**

The interview is designed to cover different areas of the candidate's resume rather than repeatedly drilling into one project.
A typical interview can cover:

```text
Question 1 → Project
Question 2 → Core Technical Skill
Question 3 → Another Project
Question 4 → Frontend / Technology
Question 5 → Another Technical Skill
Question 6 → Experience / Claim / Overall Resume
```
The exact topics adapt dynamically to the uploaded resume.
If a technology isn't present on the resume, InterviewLens doesn't invent it as a topic.

---

**🧠 4. Adaptive Follow-up Questions**

Each main question establishes a topic.
Follow-up questions remain connected to that topic.
For example:

```text
Main Question
Explain your sentiment analysis project end-to-end.
        ↓
Follow-up
Why did you choose DistilBERT?
        ↓
Follow-up
How did you evaluate the model?
        ↓
Follow-up
What preprocessing did you perform?
```
The interviewer can challenge technical decisions instead of simply asking predefined questions.
This creates a more realistic resume defense experience.

---

**🎤 5. Voice-Based Interview Experience**

InterviewLens supports a voice-oriented interview experience using browser capabilities for:

- 🎙️ Microphone recording
- 🗣️ Speech recognition / transcription
- 🔊 Speech synthesis / narration

The candidate can interact with the interviewer instead of relying only on typed responses.

---

**📊 6. Dynamic Interview Report**

After the interview, InterviewLens generates a report based on the candidate's actual interview responses.
The report can provide insights into:

- Technical knowledge
- Communication
- Answer quality
- Strong areas
- Weak areas
- High-risk resume claims
- Preparation recommendations

The report is generated dynamically rather than relying on a fixed sample score.

---

**🔥 What Makes InterviewLens Different?**

Traditional interview preparation:

```text
Choose a topic
     ↓
Practice generic questions
     ↓
Repeat
```

**InterviewLens:**

```text
Upload YOUR resume
       ↓
Understand YOUR experience
       ↓
Identify YOUR claims
       ↓
Question YOU about them
       ↓
Challenge YOUR answers
       ↓
Identify YOUR weak areas
```

The central idea is simple:
**If it's on your resume, you should be able to defend it.**

---

**🏗️ System Architecture**

```text
                    ┌─────────────────┐
                    │   Resume PDF    │
                    └────────┬────────┘
                             │
                             ▼
                 ┌──────────────────────┐
                 │   Resume Analysis    │
                 │      OpenAI API      │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Defense Map        │
                 │ Projects / Skills /  │
                 │ Claims / Experience  │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Question Generation  │
                 │ 6-Area Coverage Plan │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   AI Interviewer     │
                 │ Main Questions +     │
                 │ Adaptive Follow-ups  │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Answer Evaluation    │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Dynamic Report       │
                 │ Score + Feedback +   │
                 │ Recommendations      │
                 └──────────────────────┘
```

---

**🛠️ Tech Stack**

### Frontend

- React
- TypeScript
- TanStack Router
- Tailwind CSS
  
### AI / Backend

- OpenAI Responses API
- Large Language Models
- Structured Outputs
- NLP
- Resume Analysis

### Browser APIs

- Web Speech API
- Speech Recognition
- Speech Synthesis
- Microphone APIs

### Development Tools

- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
Interview-Lens/
│
├── src/
│   ├── lib/
│   │   ├── interview-data.ts
│   │   └── interview-server.ts
│   │
│   ├── routes/
│   │   ├── upload.tsx
│   │   ├── defense-map.tsx
│   │   ├── interview.tsx
│   │   └── report.tsx
│   │
│   └── routeTree.gen.ts
│
├── public/
│
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project**

```bash
cd Interview-Lens
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a .env file:

```bash
OPENAI_API_KEY=your_openai_api_key
```

**5. Start the development server**

```bash
npm run dev
```
The application will run locally using the development server.

---

## 🔐 Security

The OpenAI API key is kept server-side and is not intended to be exposed to the browser.
The .env file is excluded from version control using .gitignore.

```bash
.env
```

Only the example environment configuration is shared publicly.

---

## 📸 Application Flow

### Step 1 — Upload Resume
Upload your resume in PDF format.

### Step 2 — Resume Analysis
The AI analyzes the resume and builds the Defense Map.

### Step 3 — Interview
The AI interviewer asks questions across different resume areas.

### Step 4 — Adaptive Follow-ups
The interviewer challenges answers with context-aware follow-up questions.

### Step 5 — Defense Report
The system generates personalized feedback based on the actual interview.

---

## 🎯 Example Interview Coverage

For a resume containing projects and technologies such as Python, NLP, RAG, frontend development, and machine learning:

```text
1. Amazon Review Sentiment Analysis
2. Python & NLP Implementation
3. RAG Chatbot Architecture
4. Frontend / Streamlit / JavaScript
5. Machine Learning & Transformer Fine-tuning
6. Experience / Claims / Overall Resume
```

For another candidate, these topics automatically change according to their uploaded resume.

---

## 🌱 Future Improvements

Potential future enhancements include:

- Real-time conversational voice interviewer
- More advanced voice analysis
- Industry-specific interview modes
- Difficulty levels
- Multi-language interviews
- Interview history and progress tracking
- More detailed technical skill scoring
- Personalized interview preparation plans

---

## 🎓 Why InterviewLens?

Interview preparation should not stop at:

**"Can you answer this interview question?"**

It should also ask:

**"Can you defend everything you wrote on your resume?"**

InterviewLens turns that idea into an interactive AI experience.

---

## 👩‍💻 Built By
**Lakshmi Lohitha Boddu**
