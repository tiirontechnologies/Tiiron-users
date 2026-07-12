// data.ts
// Mock evaluation data — sirf demo ke liye (userId 1-70).
// studentName REAL API se aayega, baaki (scores/remarks/verificationId) yaha se userId ke hisaab se milega.
// courseId 1 = Python, 2 = Frontend, 8 = Data Science & AIML

export interface ScoreItem {
  label: string;
  score: number; // out of 10
}

export interface MockEvaluationData {
  userId: number;
  scores: ScoreItem[];
  overall: number;
  assessment: "EXCELLENT" | "VERY GOOD" | "GOOD";
  remarks: string;
  verificationId: string;
}

export const CRITERIA_LABELS = [
  "Attendance & Consistency",
  "Task Completion",
  "Technical Knowledge",
  "Problem Solving Ability",
  "Code Quality / Deliverables",
  "Communication & Collaboration",
  "Learning Attitude",
] as const;

const remarkTemplates = (name: string) => {
  const first = name.split(" ")[0];
  return [
    `${name} has shown excellent consistency and dedication throughout the program. ${first} completed all assigned tasks on time with high quality and demonstrated a strong understanding of the core concepts. The problem-solving approach and eagerness to learn are truly commendable.`,
    `${name} maintained steady progress across the internship and displayed a good grasp of the fundamentals. With focused effort on the assigned modules, ${first} was able to deliver most tasks on time and showed noticeable improvement in technical skills over the duration.`,
    `${name} actively participated in all sessions and showed a proactive attitude towards learning. Task submissions were consistent, and ${first} collaborated well with the team. Continued focus on advanced concepts will help build further on this strong foundation.`,
    `${name} performed exceptionally well throughout the internship, consistently going beyond expectations on assigned tasks. ${first}'s technical clarity, discipline, and collaborative approach stood out during the program.`,
    `${name} showed steady growth throughout the internship, with good attendance and timely completion of tasks. ${first} demonstrated sound problem-solving skills and a positive, professional attitude in every session.`,
    `${name} was a dependable and focused participant throughout the program. ${first} grasped new concepts quickly, delivered clean and well-structured work, and communicated clearly with mentors and peers.`,
  ];
};

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getAssessmentLabel(overall: number): "EXCELLENT" | "VERY GOOD" | "GOOD" {
  if (overall >= 8.5) return "EXCELLENT";
  if (overall >= 7.2) return "VERY GOOD";
  return "GOOD";
}

interface BaseUserRecord {
  userId: number;
  scores: ScoreItem[];
  overall: number;
  assessment: "EXCELLENT" | "VERY GOOD" | "GOOD";
  verificationId: string;
  remarksTemplateIndex: number;
}

function computeBaseRecord(userId: number): BaseUserRecord {
  const rand = seededRandom(userId * 9973 + 17);

  const scores: ScoreItem[] = CRITERIA_LABELS.map((label) => {
    const base = 7 + rand() * 2.5;
    const rounded = Math.round(base * 2) / 2;
    return { label, score: Math.min(9.5, Math.max(7, rounded)) };
  });

  const overall = Math.round((scores.reduce((sum, s) => sum + s.score, 0) / scores.length) * 10) / 10;

  return {
    userId,
    scores,
    overall,
    assessment: getAssessmentLabel(overall),
    verificationId: `TT-INT-2026-${String(userId).padStart(5, "0")}`,
    remarksTemplateIndex: userId % 6,
  };
}

export const MOCK_EVALUATION_DATA: Record<number, BaseUserRecord> = {};
for (let uid = 1; uid <= 70; uid++) {
  MOCK_EVALUATION_DATA[uid] = computeBaseRecord(uid);
}

export function getEvaluationDataForUser(userId: number, studentName: string): MockEvaluationData {
  const record = MOCK_EVALUATION_DATA[userId] ?? computeBaseRecord(userId);
  const templates = remarkTemplates(studentName);
  return {
    userId: record.userId,
    scores: record.scores,
    overall: record.overall,
    assessment: record.assessment,
    remarks: templates[record.remarksTemplateIndex],
    verificationId: record.verificationId,
  };
}

export interface CourseConfig {
  mentorName: string;
  batch: string;
  courseCode: string;
}

export const COURSE_CONFIG: Record<string, CourseConfig> = {
  "1": { mentorName: "Akash Madheshiya", batch: "TT-PY-2026-A", courseCode: "PY" },
  "2": { mentorName: "Abhishek Chauhan", batch: "TT-FE-2026-A", courseCode: "FE" },
  "8": { mentorName: "Vishal Verma", batch: "TT-DS-2026-A", courseCode: "DS" },
};

export const COURSE_SKILLS: Record<string, string[]> = {
  "1": [
    "Core Programming Concepts",
    "Problem Solving",
    "Logical Reasoning",
    "Backend Logic Design",
    "Debugging",
    "Team Collaboration",
    "Communication",
  ],
  "2": [
    "Technical Skills",
    "UI Implementation",
    "Responsive Design",
    "Component Architecture",
    "Problem Solving",
    "Team Collaboration",
    "Communication",
  ],
  "8": [
    "Data Analysis",
    "Machine Learning Concepts",
    "Python for Data Science",
    "Model Evaluation & Tuning",
    "Problem Solving",
    "Team Collaboration",
    "Communication",
  ],
};