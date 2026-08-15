# Interview Lens

Build a polished hackathon MVP web application called "InterviewLens".

PRODUCT:

InterviewLens is a voice-first AI Resume Defense Coach. It analyzes a user's resume, identifies skills, projects, technologies and potentially challengeable claims, then conducts an adaptive voice interview based specifically on that resume. If the user's answer is weak or incomplete, the AI asks a deeper follow-up question. At the end, it produces a Resume Defense Report showing knowledge strengths, weak areas, communication metrics and claims that need preparation.

CORE PRODUCT FLOW:

1. Landing page

2. Resume upload

3. Resume Defense Map

4. Voice Interview

5. Final Defense Report

DESIGN:

- Modern premium AI startup aesthetic

- Dark navy/black background

- Subtle blue/purple gradients

- Glassmorphism cards

- Clean typography

- Professional, not flashy

- Responsive desktop-first design

- Smooth but subtle animations

- Make it look like a serious AI product built for a hackathon

LANDING PAGE:

Hero:

"Your resume gets you the interview.

InterviewLens prepares you to defend it."

Subtitle:

"An AI voice interviewer that stress-tests your resume claims, adapts to your answers, and shows exactly what you need to improve."

Primary button:

"Analyze My Resume"

Secondary text:

"Resume Defense • Adaptive Voice Interview • Personalized Report"

Show a simple visual preview of the Resume Defense Score.

RESUME UPLOAD PAGE:

Title:

"Let's understand your resume."

Large drag-and-drop PDF upload area.

Text:

"Upload your resume and we'll identify your skills, projects, technologies, and claims worth defending."

Button:

"Analyze Resume"

After upload, show a loading state:

"Scanning your resume..."

"Identifying skills..."

"Mapping claims..."

"Preparing your interview..."

RESUME DEFENSE MAP:

Title:

"Your Resume Defense Map"

Show sections:

- Skills

- Projects

- Technologies

- Claims to Defend

Example data for the UI:

Skills:

Python — Strong

Machine Learning — Strong

PyTorch — Moderate

JavaScript — Weak

Claims:

"Achieved 80.88% accuracy"

"Built an end-to-end sentiment analysis system"

"Used DistilBERT"

Give claims visual priority because this is the main product differentiator.

Add button:

"Start Defense Interview"

INTERVIEW PAGE:

Title:

"Resume Defense Interview"

Show:

Question 2 / 6

Current topic: DistilBERT

Large AI interviewer card with an animated listening indicator.

Example question:

"Why did you choose DistilBERT instead of BERT for your sentiment analysis project?"

Show a microphone button:

"Hold to Answer"

Also show the transcribed answer underneath.

Include a small panel:

"Interview Focus"

Technical Depth

Resume Consistency

Communication

IMPORTANT:

The UI must clearly communicate that questions are generated from the user's resume and follow-up questions adapt based on previous answers.

After an answer, show a subtle transition into:

"Analyzing your answer..."

Then:

"Follow-up question"

Example:

"You mentioned efficiency. What architectural differences make DistilBERT more efficient than BERT?"

FINAL REPORT:

Title:

"Your Resume Defense Report"

Large:

"Resume Defense Score — 82/100"

Sections:

KNOWLEDGE DEFENSE

Python — 92 Strong

Machine Learning — 88 Strong

DistilBERT — 61 Moderate

PyTorch — 55 Needs Preparation

COMMUNICATION

Clarity — 86

Relevance — 91

Conciseness — 78

Filler Words — 6

HIGH-RISK CLAIM:

"Optimized model performance by 40%"

Explanation:

"You mentioned this claim but could not clearly explain the baseline or measurement used."

PERSONALIZED PREPARATION:

1. Review DistilBERT architecture

2. Review PyTorch model workflow

3. Prepare evidence for performance improvement claim

Add buttons:

"Practice Again"

"View Defense Map"

IMPORTANT IMPLEMENTATION REQUIREMENTS:

- Build reusable components.

- Use realistic mock data initially so the complete UI flow can be demonstrated without an API.

- Make every button and navigation flow functional using mock state.

- Do NOT build authentication, payments, complex databases, or unnecessary features.

- Keep the architecture easy to connect to a Python/AI backend later.

- Do NOT pretend that mock AI results are real; structure the code so mock data can later be replaced with real API responses.

- Prioritize a polished working prototype over excessive features.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0063e2fd-fc12-4984-8aca-3551dd95c3ef).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
