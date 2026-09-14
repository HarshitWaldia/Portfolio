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

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  // 1. Primary: If Web3Forms Access Key is provided in .env, send directly & freely to inbox
  if (accessKey && accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: parsed.data.name,
          email: parsed.data.email,
          replyto: parsed.data.email,
          subject: parsed.data.subject || `[Portfolio] New message from ${parsed.data.name}`,
          message: parsed.data.message,
          from_name: `${parsed.data.name} (Portfolio)`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit message.");
      }

      return { success: true, data: undefined };
    } catch (err: any) {
      console.error("Web3Forms submission error:", err);
      return { success: false, error: err.message || "Failed to send email. Please try again." };
    }
  }

  // 2. Fallback: If backend server is running (/api/contact)
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
    return {
      success: false,
      error: "Please set VITE_WEB3FORMS_ACCESS_KEY in your .env to receive emails directly.",
    };
  }
}
