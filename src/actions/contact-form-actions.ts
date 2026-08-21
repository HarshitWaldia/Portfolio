import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function submitContactForm(
  formData: z.infer<typeof contactSchema>
): Promise<Result<void>> {
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to submit form.");
    }

    return { success: true, data: undefined };
  } catch (err: any) {
    console.error("Contact form submit error:", err);
    return { success: false, error: err.message || "Failed to send message. Please try again." };
  }
}
