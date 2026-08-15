import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const decisionSchema = z.object({
  decision: z.enum(["followup", "next"]),
  question: z.string(),
  origin: z.string(),
});

const evaluationInputSchema = z.object({
  question: z.string().min(1),
  transcript: z.string().min(1),
  topic: z.string().min(1),
  origin: z.string().min(1),
  previousContext: z.string().optional(),
  nextQuestion: z
    .object({
      question: z.string(),
      origin: z.string(),
    })
    .optional(),
});

const defenseMapSchema = z.object({
  skills: z.array(
    z.object({
      name: z.string(),
      level: z.enum(["Strong", "Moderate", "Weak"]),
      confidence: z.number().min(0).max(100),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      summary: z.string(),
      stack: z.array(z.string()),
    }),
  ),
  technologies: z.array(z.string()),
  claims: z.array(
    z.object({
      text: z.string(),
      risk: z.enum(["high", "medium", "low"]),
      source: z.string(),
    }),
  ),
});

const resumeAnalysisSchema = z.object({
  defenseMap: defenseMapSchema,
  interviewQuestions: z.array(
    z.object({
      id: z.string(),
      topic: z.string(),
      question: z.string(),
      origin: z.string(),
    }),
  ).min(1),
});

const reportSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  knowledge: z.array(
    z.object({
      name: z.string(),
      score: z.number().min(0).max(100),
      level: z.enum(["Strong", "Moderate", "Weak", "Needs Preparation"]),
    }),
  ),
  communication: z.array(
    z.object({ label: z.string(), value: z.number(), suffix: z.string() }),
  ),
  highRiskClaim: z.object({ claim: z.string(), explanation: z.string() }),
  preparation: z.array(z.string()),
});

const reportInputSchema = z.object({
  defenseMap: defenseMapSchema,
  questions: z.array(
    z.object({ id: z.string(), topic: z.string(), question: z.string(), origin: z.string() }),
  ),
  answers: z.array(
    z.object({ question: z.string(), topic: z.string(), origin: z.string(), transcript: z.string() }),
  ).min(1),
});

const resumeAnalysisJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    defenseMap: {
      type: "object",
      additionalProperties: false,
      properties: {
        skills: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              level: { type: "string", enum: ["Strong", "Moderate", "Weak"] },
              confidence: { type: "number" },
            },
            required: ["name", "level", "confidence"],
          },
        },
        projects: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              summary: { type: "string" },
              stack: { type: "array", items: { type: "string" } },
            },
            required: ["name", "summary", "stack"],
          },
        },
        technologies: { type: "array", items: { type: "string" } },
        claims: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              text: { type: "string" },
              risk: { type: "string", enum: ["high", "medium", "low"] },
              source: { type: "string" },
            },
            required: ["text", "risk", "source"],
          },
        },
      },
      required: ["skills", "projects", "technologies", "claims"],
    },
    interviewQuestions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "string" },
          topic: { type: "string" },
          question: { type: "string" },
          origin: { type: "string" },
        },
        required: ["id", "topic", "question", "origin"],
      },
    },
  },
  required: ["defenseMap", "interviewQuestions"],
};

const reportJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    score: { type: "number" },
    summary: { type: "string" },
    knowledge: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          score: { type: "number" },
          level: { type: "string", enum: ["Strong", "Moderate", "Weak", "Needs Preparation"] },
        },
        required: ["name", "score", "level"],
      },
    },
    communication: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          label: { type: "string" },
          value: { type: "number" },
          suffix: { type: "string" },
        },
        required: ["label", "value", "suffix"],
      },
    },
    highRiskClaim: {
      type: "object",
      additionalProperties: false,
      properties: { claim: { type: "string" }, explanation: { type: "string" } },
      required: ["claim", "explanation"],
    },
    preparation: { type: "array", items: { type: "string" } },
  },
  required: ["score", "summary", "knowledge", "communication", "highRiskClaim", "preparation"],
};

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{ content?: Array<{ text?: string }> }>;
};

function getResponseText(response: OpenAIResponse) {
  return (
    response.output_text ??
    response.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text ?? "")
      .join("") ??
    ""
  );
}

async function getOpenAIKey() {
  const apiKey = process.env["OPENAI_API_KEY"];
  if (!apiKey) throw new Error("AI interview evaluation is not configured.");
  return apiKey;
}

async function getStructuredResponse(apiKey: string, input: unknown, schema: object, name: string) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5.6-luna",
      store: false,
      input,
      text: { format: { type: "json_schema", name, strict: true, schema } },
    }),
  });

  if (!response.ok) {
    console.error("OpenAI request failed", response.status, await response.text());
    throw new Error("AI interview evaluation is unavailable.");
  }

  const payload = (await response.json()) as OpenAIResponse;
  const text = getResponseText(payload);
  try {
    return JSON.parse(text) as unknown;
  } catch {
    console.error("OpenAI returned non-JSON output", text);
    throw new Error("AI interview evaluation returned an invalid response.");
  }
}

export const evaluateInterviewAnswer = createServerFn({ method: "POST" })
  .validator(evaluationInputSchema)
  .handler(async ({ data }) => {
    const decision = await getStructuredResponse(
      await getOpenAIKey(),
      [
        {
          role: "system",
          content:
            "You are InterviewLens, a rigorous but fair technical interview coach. Evaluate the candidate's answer only against the current question and supplied context. Return followup when the answer is vague, incomplete, or misses an important technical point; otherwise return next. A followup must ask exactly one deeper technical question within the same established topic: project follow-ups stay within that project, skill follow-ups stay within that skill and its resume use, and technology follow-ups stay within that technology's resume context. Never use a follow-up to jump to a different project, skill, claim, or resume section. For next, use the supplied next interview question exactly when present. Do not invent unrelated resume claims.",
        },
        { role: "user", content: JSON.stringify(data) },
      ],
      {
        type: "object",
        additionalProperties: false,
        properties: {
          decision: { type: "string", enum: ["followup", "next"] },
          question: { type: "string" },
          origin: { type: "string" },
        },
        required: ["decision", "question", "origin"],
      },
      "interview_decision",
    );
    const parsed = decisionSchema.safeParse(decision);
    if (!parsed.success) {
      console.error("OpenAI returned an invalid interview decision", decision);
      throw new Error("AI interview evaluation returned an invalid response.");
    }

    return parsed.data;
  });

export const analyzeResume = createServerFn({ method: "POST" })
  .validator((data: FormData) => {
    const file = data.get("resume");
    if (!(file instanceof File) || file.type !== "application/pdf") {
      throw new Error("Please upload a PDF resume.");
    }
    return file;
  })
  .handler(async ({ data: file }) => {
    const apiKey = await getOpenAIKey();
    const uploadData = new FormData();
    uploadData.set("purpose", "user_data");
    uploadData.set("file", file, file.name);

    const upload = await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: uploadData,
    });
    if (!upload.ok) {
      console.error("OpenAI resume upload failed", upload.status, await upload.text());
      throw new Error("Resume analysis is unavailable.");
    }

    const { id: fileId } = (await upload.json()) as { id?: string };
    if (!fileId) throw new Error("Resume upload did not return a file ID.");

    const analysis = await getStructuredResponse(
      apiKey,
      [
        {
          role: "user",
          content: [
            { type: "input_file", file_id: fileId },
            {
              type: "input_text",
              text:
                "Analyze the entire resume before writing questions. Internally identify distinct meaningful areas across projects, skills and technologies, experience or internships, claims or achievements, and education when relevant. Then create exactly six MAIN technical interview questions as a coverage plan, ordered to move through different resume areas. Use this preferred dynamic pattern whenever the resume supports it: (1) a significant project, (2) a major skill or core technical area used on the resume, (3) a different significant project, (4) a distinct web, frontend, or other technology area, (5) another major technical skill not already covered, and (6) an experience, achievement, high-risk claim, technical ownership, or important untouched technology. Adapt the pattern to the actual resume: never ask about a project, skill, technology, or experience that is absent. Each main question must establish one clear topic, and no two main questions should focus on the same project unless the resume has no other meaningful area. Skill and technology questions must test how the candidate used the claimed skill in their own resume context; do not ask generic definition quizzes. Project questions must probe architecture, implementation choices, tradeoffs, evaluation, or ownership. Each question's origin must cite its resume source. Adaptive follow-ups will be generated later and must remain within the main question's topic.",
            },
          ],
        },
      ],
      resumeAnalysisJsonSchema,
      "resume_analysis",
    );
    const parsed = resumeAnalysisSchema.safeParse(analysis);
    if (!parsed.success) {
      console.error("OpenAI returned invalid resume analysis", analysis);
      throw new Error("Resume analysis returned an invalid response.");
    }

    return {
      defenseMap: parsed.data.defenseMap,
      interviewQuestions: parsed.data.interviewQuestions.map((question) => ({
        ...question,
        mockTranscript: "",
      })),
    };
  });

export const generateInterviewReport = createServerFn({ method: "POST" })
  .validator(reportInputSchema)
  .handler(async ({ data }) => {
    const report = await getStructuredResponse(
      await getOpenAIKey(),
      [
        {
          role: "system",
          content:
            "You are InterviewLens, an evidence-based resume defense coach. Produce a candid report using only the supplied resume analysis, questions, and candidate transcripts. Score technical defense and communication from the actual answers, not from generic assumptions. Include Knowledge Defense scores for the most relevant resume skills or technologies, communication metrics for Clarity, Relevance, Conciseness, and Filler Words (a count when reasonably detectable from transcripts), the highest-risk poorly defended claim, and concrete preparation actions. Do not claim an answer was defended if the transcript does not support it.",
        },
        { role: "user", content: JSON.stringify(data) },
      ],
      reportJsonSchema,
      "interview_report",
    );
    const parsed = reportSchema.safeParse(report);
    if (!parsed.success) {
      console.error("OpenAI returned an invalid interview report", report);
      throw new Error("Interview report returned an invalid response.");
    }
    return parsed.data;
  });
