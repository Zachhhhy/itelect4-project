import { z } from "zod";

export const submissionSchema = z.object({
  courseCode: z
    .string()
    .trim()
    .min(1, "Please select a course."),
  repoUrl: z
    .string()
    .trim()
    .min(1, "Repository URL is required.")
    .url("Enter a valid URL.")
    .refine(
      (value) => /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)?\/?$/i.test(value),
      "Use a GitHub repository URL like https://github.com/username/repository",
    ),
});

export type SubmissionFormValues = z.infer<typeof submissionSchema>;
