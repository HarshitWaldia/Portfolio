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
    id: "entry-jatin",
    userName: "Jatin Pant",
    role: "AI Collaborator • Software Engineer",
    userImage: "/images/friends/jatin-pant.jpg",
    message: "I've collaborated with Harshit on several complex machine learning pipelines and I can't express enough how impressed I am with his talent. His ability to take LLM models, vector search, and RAG architectures from concept straight to high-throughput production systems is remarkable. He's extremely responsive, methodical, and efficient.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    published: true,
    userId: "collab-jatin",
    likes: 12,
  },
  {
    id: "entry-priyanshu",
    userName: "Priyanshu Shahi",
    role: "Engineer • Tech Lead",
    userImage: "/images/friends/priyanshu-shahi.jpg",
    message: "Harshit is exceptional. He is curious, mathematically grounded, and deeply invested in the systems he builds. He takes product visions—from computer vision pipelines to multi-modal document intelligence—and brings them to life seamlessly. He's a true partner in engineering.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    published: true,
    userId: "collab-priyanshu",
    likes: 15,
  },
  {
    id: "entry-ritesh",
    userName: "Ritesh Singh",
    role: "Backend Architect • Developer",
    userImage: "/images/friends/ritesh-singh.jpg",
    message: "Harshit understands that great ML models are useless without great APIs and solid databases. His FastAPI microservices, JWT/RBAC security, and PostgreSQL integrations are rock solid. We went from raw data to a fully operational deployment in record time.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    published: true,
    userId: "collab-ritesh",
    likes: 18,
  },
  {
    id: "entry-shivam",
    userName: "Shivam Sah",
    role: "Data Scientist • ML Engineer",
    userImage: "/images/friends/shivam-sah.jpg",
    message: "From intelligent document extraction to predictive analytics forecasting models, every project Harshit delivers is ahead of schedule and thoroughly tested. If you need someone who understands PyTorch, LangChain, and production engineering inside out, Harshit is the one.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    published: true,
    userId: "collab-shivam",
    likes: 9,
  },
  {
    id: "entry-udit",
    userName: "Udit Joshi",
    role: "Computer Vision Specialist",
    userImage: "/images/friends/udit-joshi.jpg",
    message: "We were working on computer vision detection models and Harshit handled everything: preprocessing, YOLO model optimization, training runs, and real-time inference wrappers. The accuracy and inference latency exceeded all benchmarks.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    published: true,
    userId: "collab-udit",
    likes: 11,
  },
  {
    id: "entry-yash",
    userName: "Yash Joshi",
    role: "Full Stack • ML Developer",
    userImage: "/images/friends/yash-joshi.jpg",
    message: "Harshit's strength lies in transforming complex research ideas into usable applications. His DocTalk PDF assistant and archive digitization pipelines demonstrate deep mastery of retrieval systems and modern AI workflows. An absolute pleasure to build with.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    published: true,
    userId: "collab-yash",
    likes: 14,
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
