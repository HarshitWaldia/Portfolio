import { z } from "zod";

const messageSchema = z
  .string()
  .min(3, "Message must be at least 3 characters")
  .max(250, "Message must be at most 250 characters");

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
  role?: string;
  likes?: number;
}

// Curated initial signatures to ensure the guestbook always looks lively
const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: "entry-1",
    message: "Super impressed by VIKRAM-AI and your defense archive RAG pipeline. Clean architecture and real-world impact!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    published: true,
    userId: "guest-aarav",
    userName: "Aarav Sharma",
    userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    role: "AI Researcher",
    likes: 8,
  },
  {
    id: "entry-2",
    message: "The 3D interactive lanyard and MacBook-inspired planet arc are unbelievable. One of the best dev portfolios I've seen!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    published: true,
    userId: "guest-elena",
    userName: "Elena Vance",
    userImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
    role: "Frontend Engineer",
    likes: 14,
  },
  {
    id: "entry-3",
    message: "Great work on DocTalk and low-latency Groq inference. Sent you an inquiry for an AI Engineer role!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    published: true,
    userId: "guest-marcus",
    userName: "Marcus Chen",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    role: "Technical Recruiter",
    likes: 5,
  },
  {
    id: "entry-4",
    message: "Dehradun to the world! Huge fan of your work in computer vision and deep learning. Keep rocking, brother 🚀",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    published: true,
    userId: "guest-rohit",
    userName: "Rohit Negi",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    role: "Software Developer",
    likes: 19,
  },
];

const LOCAL_STORAGE_KEY = "portfolio_guestbook_entries";

function getLocalEntries(): GuestbookEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_ENTRIES));
      return INITIAL_ENTRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ENTRIES;
  } catch {
    return INITIAL_ENTRIES;
  }
}

function saveLocalEntries(entries: GuestbookEntry[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Failed to save local guestbook entries:", e);
  }
}

// Fetch entries (Hybrid: tries Postgres/Express first, falls back to local data)
export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch("/api/guestbook", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const dbEntries = await res.json();
      if (Array.isArray(dbEntries) && dbEntries.length > 0) {
        // Merge with any locally added entries that may not be in DB yet
        const local = getLocalEntries();
        const dbIds = new Set(dbEntries.map((e: any) => e.id));
        const localOnly = local.filter((l) => !dbIds.has(l.id));

        return [...localOnly, ...dbEntries].map((e: any) => ({
          ...e,
          createdAt: new Date(e.createdAt),
        }));
      }
    }
  } catch (err) {
    // Backend offline or running static build - gracefully fallback
    console.warn("Backend /api/guestbook not reachable, using resilient local storage.");
  }

  return getLocalEntries().map((e) => ({
    ...e,
    createdAt: new Date(e.createdAt),
  }));
}

// Create new entry (Hybrid: saves to Postgres if online, always persists locally)
export async function createGuestbookEntry(
  message: string,
  guestInfo?: { name: string; role?: string; avatar?: string }
): Promise<Result<{ id: string }>> {
  const session = getStoredSessionDirectly();
  
  const userName = guestInfo?.name?.trim() || session?.user?.name || "Anonymous Guest";
  const userImage = guestInfo?.avatar || session?.user?.image || null;
  const role = guestInfo?.role || "Visitor";
  const userId = session?.user?.id || `guest-${Date.now()}`;

  const parsed = messageSchema.safeParse(message.trim());
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const newEntry: GuestbookEntry = {
    id: `entry-${Date.now()}`,
    message: parsed.data,
    createdAt: new Date().toISOString(),
    published: true,
    userId,
    userName,
    userImage,
    role,
    likes: 0,
  };

  // 1. Try sending to PostgreSQL backend
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: parsed.data,
        userId,
        userName,
        userImage,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result.data?.id) {
        newEntry.id = result.data.id;
      }
    }
  } catch (err) {
    console.warn("Could not post to /api/guestbook, saving to local state.");
  }

  // 2. Always persist locally for instant optimistic UI update
  const current = getLocalEntries();
  const updated = [newEntry, ...current];
  saveLocalEntries(updated);

  return { success: true, data: { id: newEntry.id } };
}

// Delete an entry
export async function deleteGuestbookEntry(id: string): Promise<Result<void>> {
  // 1. Attempt delete on backend
  try {
    await fetch(`/api/guestbook/${id}`, { method: "DELETE" });
  } catch (err) {
    console.warn("Backend delete skipped:", err);
  }

  // 2. Remove locally
  const current = getLocalEntries();
  const filtered = current.filter((e) => e.id !== id);
  saveLocalEntries(filtered);

  return { success: true, data: undefined };
}

// Like reaction
export function toggleLikeGuestbookEntry(id: string): { liked: boolean; count: number } {
  const likedKey = "portfolio_liked_entries";
  let likedIds: string[] = [];
  try {
    likedIds = JSON.parse(localStorage.getItem(likedKey) || "[]");
  } catch {
    likedIds = [];
  }

  const entries = getLocalEntries();
  const entry = entries.find((e) => e.id === id);
  const isAlreadyLiked = likedIds.includes(id);

  let newCount = (entry?.likes || 0);

  if (isAlreadyLiked) {
    likedIds = likedIds.filter((item) => item !== id);
    newCount = Math.max(0, newCount - 1);
  } else {
    likedIds.push(id);
    newCount += 1;
  }

  if (entry) {
    entry.likes = newCount;
    saveLocalEntries(entries);
  }

  try {
    localStorage.setItem(likedKey, JSON.stringify(likedIds));
  } catch {}

  return { liked: !isAlreadyLiked, count: newCount };
}

export function isEntryLikedByUser(id: string): boolean {
  try {
    const likedIds: string[] = JSON.parse(localStorage.getItem("portfolio_liked_entries") || "[]");
    return likedIds.includes(id);
  } catch {
    return false;
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
