/**
 * Mock data layer for InterviewLens.
 *
 * Every export here mirrors the shape a Python/AI backend would return.
 * To go live, replace the `*Api` functions with fetch calls to the real
 * endpoints — component code depends only on the types below.
 */
import { analyzeResume } from "@/lib/interview-server";

export type Level = "Strong" | "Moderate" | "Weak";

export type Skill = { name: string; level: Level; confidence: number };
export type Project = { name: string; summary: string; stack: string[] };
export type Claim = { text: string; risk: "high" | "medium" | "low"; source: string };

export type DefenseMap = {
  skills: Skill[];
  projects: Project[];
  technologies: string[];
  claims: Claim[];
};

export type InterviewQuestion = {
  id: string;
  topic: string;
  question: string;
  origin: string;
  followUp?: { question: string; origin: string };
  mockTranscript: string;
};

export type InterviewSession = {
  defenseMap: DefenseMap;
  interviewQuestions: InterviewQuestion[];
  answers?: InterviewAnswer[];
  report?: Report;
};

export type InterviewAnswer = {
  question: string;
  topic: string;
  origin: string;
  transcript: string;
};

const interviewSessionKey = "interviewlens-session";

export type Report = {
  score: number;
  summary: string;
  knowledge: { name: string; score: number; level: Level | "Needs Preparation" }[];
  communication: { label: string; value: number; suffix?: string }[];
  highRiskClaim: { claim: string; explanation: string };
  preparation: string[];
};

export const defenseMap: DefenseMap = {
  skills: [
    { name: "Python", level: "Strong", confidence: 92 },
    { name: "Machine Learning", level: "Strong", confidence: 88 },
    { name: "PyTorch", level: "Moderate", confidence: 64 },
    { name: "JavaScript", level: "Weak", confidence: 41 },
  ],
  projects: [
    {
      name: "End-to-end Sentiment Analysis System",
      summary:
        "Fine-tuned transformer pipeline with data cleaning, training loop and a served inference API.",
      stack: ["DistilBERT", "PyTorch", "FastAPI"],
    },
    {
      name: "Model Performance Optimization",
      summary: "Latency and throughput work on an inference service, reported as a 40% gain.",
      stack: ["ONNX", "Python", "Docker"],
    },
  ],
  technologies: ["DistilBERT", "PyTorch", "Transformers", "FastAPI", "Docker", "ONNX", "Pandas"],
  claims: [
    { text: "Achieved 80.88% accuracy", risk: "medium", source: "Projects › Sentiment Analysis" },
    {
      text: "Built an end-to-end sentiment analysis system",
      risk: "medium",
      source: "Projects › Sentiment Analysis",
    },
    { text: "Used DistilBERT", risk: "low", source: "Skills › NLP" },
    { text: "Optimized model performance by 40%", risk: "high", source: "Experience › ML Intern" },
  ],
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    topic: "Sentiment Analysis",
    question: "Walk me through the end-to-end sentiment analysis system you built.",
    origin: "Generated from your resume claim: “Built an end-to-end sentiment analysis system”",
    followUp: {
      question: "You described training. How did you handle class imbalance in your dataset?",
      origin: "Adapted from your previous answer — you skipped data preparation",
    },
    mockTranscript:
      "I collected review data, cleaned it, fine-tuned a transformer model and exposed predictions through an API endpoint.",
  },
  {
    id: "q2",
    topic: "DistilBERT",
    question: "Why did you choose DistilBERT instead of BERT for your sentiment analysis project?",
    origin: "Generated from your resume technology: DistilBERT",
    followUp: {
      question:
        "You mentioned efficiency. What architectural differences make DistilBERT more efficient than BERT?",
      origin: "Adaptive follow-up based on your answer keyword: “efficiency”",
    },
    mockTranscript:
      "DistilBERT was smaller and faster, so inference was more efficient while keeping most of the accuracy.",
  },
  {
    id: "q3",
    topic: "Accuracy Claim",
    question: "Your resume states 80.88% accuracy. What was the baseline and the test set?",
    origin: "Generated from your resume claim: “Achieved 80.88% accuracy”",
    mockTranscript:
      "We measured on a held-out split of about 5,000 reviews, and the majority-class baseline was around 62%.",
  },
  {
    id: "q4",
    topic: "PyTorch",
    question: "Describe your PyTorch training loop, including the optimizer and scheduler you used.",
    origin: "Generated from your resume skill: PyTorch (moderate confidence)",
    followUp: {
      question: "How did you decide when to stop training and avoid overfitting?",
      origin: "Adaptive follow-up — your answer lacked evaluation detail",
    },
    mockTranscript: "I used AdamW with a learning rate around 2e-5 and trained for a few epochs.",
  },
  {
    id: "q5",
    topic: "Performance Claim",
    question: "How did you measure the 40% performance optimization mentioned on your resume?",
    origin: "Generated from high-risk claim: “Optimized model performance by 40%”",
    mockTranscript:
      "It was faster after the changes — I believe latency dropped noticeably, but I don't recall the exact measurement setup.",
  },
  {
    id: "q6",
    topic: "Deployment",
    question: "How would you deploy and monitor this model in production?",
    origin: "Generated from your resume technologies: FastAPI, Docker",
    mockTranscript:
      "I'd containerize the service, deploy behind an API gateway and log prediction latency and drift.",
  },
];

export const report: Report = {
  score: 82,
  summary:
    "You defended most of your resume confidently. Two technical areas and one quantified claim need preparation before a real interview.",
  knowledge: [
    { name: "Python", score: 92, level: "Strong" },
    { name: "Machine Learning", score: 88, level: "Strong" },
    { name: "DistilBERT", score: 61, level: "Moderate" },
    { name: "PyTorch", score: 55, level: "Needs Preparation" },
  ],
  communication: [
    { label: "Clarity", value: 86 },
    { label: "Relevance", value: 91 },
    { label: "Conciseness", value: 78 },
    { label: "Filler Words", value: 6, suffix: "" },
  ],
  highRiskClaim: {
    claim: "Optimized model performance by 40%",
    explanation:
      "You mentioned this claim but could not clearly explain the baseline or measurement used.",
  },
  preparation: [
    "Review DistilBERT architecture",
    "Review PyTorch model workflow",
    "Prepare evidence for performance improvement claim",
  ],
};

export const analysisSteps = [
  "Scanning your resume...",
  "Identifying skills...",
  "Mapping claims...",
  "Preparing your interview...",
];

export function saveInterviewSession(session: InterviewSession) {
  sessionStorage.setItem(interviewSessionKey, JSON.stringify(session));
}

export function getInterviewSession(): InterviewSession | null {
  try {
    const stored = sessionStorage.getItem(interviewSessionKey);
    return stored ? (JSON.parse(stored) as InterviewSession) : null;
  } catch {
    return null;
  }
}

export function saveInterviewAnswer(answer: InterviewAnswer) {
  const session = getInterviewSession();
  if (!session) return;

  const answers = (session.answers ?? []).filter(
    (item) => item.question !== answer.question || item.topic !== answer.topic,
  );
  saveInterviewSession({ ...session, answers: [...answers, answer] });
}

export function saveInterviewReport(dynamicReport: Report) {
  const session = getInterviewSession();
  if (session) saveInterviewSession({ ...session, report: dynamicReport });
}

/** Uses demo data only when no resume is selected. */
export async function analyzeResumeApi(file: File | null): Promise<InterviewSession> {
  if (!file) return { defenseMap, interviewQuestions };

  const formData = new FormData();
  formData.set("resume", file);
  return analyzeResume({ data: formData });
}

export async function getInterviewApi(): Promise<InterviewQuestion[]> {
  return interviewQuestions;
}

export async function getReportApi(): Promise<Report> {
  return report;
}
