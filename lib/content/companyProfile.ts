import { promises as fs } from "node:fs";
import path from "node:path";

export type CompanyProfile = {
  hero: {
    headline: string;
    tagline: string;
    highlights: string[];
  };
  about: {
    paragraphs: string[];
    approach: string;
  };
  services: Array<{
    title: string;
    description: string;
  }>;
  mission: string;
  vision: string;
  industries: string[];
};

const defaultProfile: CompanyProfile = {
  hero: {
    headline: "Empowering People, Teams, and Organizations for Peak Performance",
    tagline:
      "Ruah Whyte Consulting Limited delivers high-impact training and development solutions that drive productivity, efficiency, and sustainable growth.",
    highlights: [
      "Tailored training solutions",
      "Experienced facilitators",
      "Industry-relevant content",
      "Proven impact on productivity",
      "Commitment to excellence",
    ],
  },
  about: {
    paragraphs: [
      "Ruah Whyte Consulting Limited is a professional training and development firm committed to helping clients achieve measurable performance outcomes.",
      "We provide customized learning and development programs designed around each client\'s goals, challenges, and industry needs.",
    ],
    approach:
      "Our approach is practical, result-oriented, and client-focused: we assess needs, design customized solutions, deliver engaging sessions, and measure outcomes to ensure value.",
  },
  services: [
    {
      title: "Corporate Training and Development",
      description:
        "Targeted programs to strengthen workforce capability and improve business performance.",
    },
    {
      title: "Capacity Building Programs",
      description:
        "Practical capability development initiatives tailored for teams and organizational functions.",
    },
    {
      title: "Leadership and Management Training",
      description:
        "Focused training for current and emerging leaders to improve decision-making and execution.",
    },
    {
      title: "Workforce Productivity Enhancement",
      description:
        "Structured interventions that improve team efficiency, accountability, and performance outcomes.",
    },
    {
      title: "Soft Skills and Professional Development",
      description:
        "Communication, collaboration, and professional growth programs that strengthen workplace effectiveness.",
    },
    {
      title: "Organizational Development Consulting",
      description:
        "Advisory support to align people, structure, and processes with strategic goals.",
    },
  ],
  mission:
    "To enhance organizational performance by equipping people with the knowledge, skills, and mindset required for excellence.",
  vision:
    "To be a leading provider of innovative training and development solutions across industries.",
  industries: [
    "Small and Medium Enterprises (SMEs)",
    "Corporate Organizations",
    "Telecommunications",
    "Oil and Gas",
    "Education Sector",
  ],
};

export async function getCompanyProfile(): Promise<CompanyProfile> {
  const filePath = path.join(process.cwd(), "content", "company-profile.docx");

  try {
    await fs.readFile(filePath);
  } catch {
    // Falls back to in-code content when the local file is missing.
  }

  // TODO: migrate to Sanity - keep this query for future content migration.
  // return await sanityClient.fetch(`*[_type == "companyProfile"][0]`)
  return defaultProfile;
}
