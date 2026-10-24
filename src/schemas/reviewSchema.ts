import { z } from "zod";

export const reviewFormSchema = z.object({
  prompt: z.string().trim().min(20, "Describe your project in at least 20 characters.").max(2000, "Keep your project description to 2000 characters or fewer."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
