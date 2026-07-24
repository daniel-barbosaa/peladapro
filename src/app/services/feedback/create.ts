import { supabase } from "@/app/lib/supabase";

interface Feedback {
  category: string;
  message: string;
}

export async function create(userId: string, feedback: Feedback) {
  return await supabase.from("feedback").insert({
    user_id: userId,
    ...feedback,
  });
}
