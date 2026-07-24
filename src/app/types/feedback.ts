export const FEEDBACK_CATEGORY_ENUM = [
  "bug",
  "improvement",
  "feature",
  "performance",
  "ui",
  "other",
] as const;

export type FeedbackCategoryType = (typeof FEEDBACK_CATEGORY_ENUM)[number];
