// CARE Experience System Architecture

export type ExperienceVisibility = "draft" | "published" | "unpublished";

export type BaseExperience = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  visibility: ExperienceVisibility;
  templateId: string;
  publishedUrl?: string; // e.g. /apology/7xK92Lm
};

export type ApologyExperience = BaseExperience & {
  type: "apology";
  recipientName: string;
  senderName: string;
  title: string;
  whatHappened: string;
  apologyMessage: string;
  memories: string[]; // Array of image URLs or text
  photos: string[];
  finalMessage: string;
};

export type ProposalExperience = BaseExperience & {
  type: "proposal";
  recipientName: string;
  senderName: string;
  relationshipDate: string;
  story: string;
  memories: string[];
  reasons: string[];
  proposalMessage: string;
  question: string;
  photos: string[];
};

export type AnniversaryExperience = BaseExperience & {
  type: "anniversary";
  recipientName: string;
  senderName: string;
  anniversaryDate: string;
  timeline: { date: string; event: string; image?: string }[];
  memories: string[];
  photos: string[];
  letter: string;
  finalMessage: string;
};

export type BirthdayExperience = BaseExperience & {
  type: "birthday";
  recipientName: string;
  senderName: string;
  birthdayIntroduction: string;
  personalMessage: string;
  photos: string[];
  thingsILoveAboutYou: string[];
  memories: string[];
  birthdayLetter: string;
  finalSurprise: string;
};

export type LoveLetterExperience = BaseExperience & {
  type: "love-letter";
  recipientName: string;
  senderName: string;
  opening: string;
  letter: string;
  photos: string[];
  smallMemories: string[];
  finalLine: string;
};

export type JustBecauseExperience = BaseExperience & {
  type: "just-because";
  recipientName: string;
  senderName: string;
  blocks: {
    type: "photo" | "message" | "memory" | "music" | "question" | "quote" | "interactive";
    content: any;
  }[];
};

export type CareExperience =
  | ApologyExperience
  | ProposalExperience
  | AnniversaryExperience
  | BirthdayExperience
  | LoveLetterExperience
  | JustBecauseExperience;
