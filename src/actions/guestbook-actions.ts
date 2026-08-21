import { z } from "zod";

const messageSchema = z
  .string()
  .min(5, "Message must be at least 5 characters")
  .max(100, "Message must be at most 100 characters");

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface GuestbookEntry {
  id: string;
  message: string;
  createdAt: Date | string;
  published: boolean;
  userId: string | null;
  userName: string | null;
  userImage: string | null;
}

// Fetch all entries from database
export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  try {
    const res = await fetch("/api/guestbook");
    if (!res.ok) throw new Error("Failed to load entries");
    const data = await res.json();
    return data.map((e: any) => ({
      ...e,
      createdAt: new Date(e.createdAt),
    }));
  } catch (err) {
    console.error("Failed to load entries from Postgres:", err);
    return [];
  }
}

// Create a new entry in PostgreSQL database
export async function createGuestbookEntry(
  message: string
): Promise<Result<{ id: string }>> {
  const session = getStoredSessionDirectly();
  if (!session?.user) {
    return { success: false, error: "You must be signed in to post." };
  }

  const parsed = messageSchema.safeParse(message);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const response = await fetch("/api/guestbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: parsed.data,
        userId: session.user.id,
        userName: session.user.name,
        userImage: session.user.image,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to post entry.");
    }

    return { success: true, data: { id: result.data.id } };
  } catch (err: any) {
    console.error("Guestbook create error:", err);
    return { success: false, error: err.message || "Failed to post. Please try again." };
  }
}

// Delete an entry from the database (soft deletion)
export async function deleteGuestbookEntry(
  id: string
): Promise<Result<void>> {
  const session = getStoredSessionDirectly();
  if (!session?.user) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    const response = await fetch(`/api/guestbook/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || "Failed to delete entry.");
    }

    return { success: true, data: undefined };
  } catch (err: any) {
    console.error("Guestbook delete error:", err);
    return { success: false, error: err.message || "Failed to delete." };
  }
}

function getStoredSessionDirectly() {
  try {
    const raw = localStorage.getItem("portfolio_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
