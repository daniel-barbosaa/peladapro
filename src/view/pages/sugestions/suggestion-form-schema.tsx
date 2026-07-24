import { FEEDBACK_CATEGORY_ENUM } from "@/app/types/feedback";
import z from "zod";

export const suggestionFormSchema = z.object({
  category: z.enum(FEEDBACK_CATEGORY_ENUM),
  message: z
    .string()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(1000, "A mensagem deve ter no máximo 1000 caracteres."),
});

export type SuggestionFormSchema = z.infer<typeof suggestionFormSchema>;

export const SuggestionFormDefaultValues: SuggestionFormSchema = {
  category: "other",
  message: "",
};
