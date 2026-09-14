import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Load environment variables from .env and .env.local files
dotenv.config();
dotenv.config({ path: ".env.local" });

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ─── GUESTBOOK ROUTES ────────────────────────────────────────────────
// Get all published guestbook entries from PostgreSQL
app.get("/api/guestbook", async (req, res) => {
  try {
    const entries = await prisma.guestbookEntry.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(entries);
  } catch (err) {
    console.error("Failed to fetch guestbook entries:", err);
    res.status(500).json({ error: "Failed to fetch guestbook entries" });
  }
});

// Create a new guestbook entry in PostgreSQL
app.post("/api/guestbook", async (req, res) => {
  try {
    const { message, userId, userName, userImage } = req.body;
    
    if (!message || message.trim().length < 5) {
      return res.status(400).json({ error: "Message must be at least 5 characters long." });
    }

    const newEntry = await prisma.guestbookEntry.create({
      data: {
        message,
        userId,
        userName: userName || "Anonymous Guest",
        userImage,
      },
    });

    res.status(201).json({ success: true, data: newEntry });
  } catch (err) {
    console.error("Failed to save guestbook entry:", err);
    res.status(500).json({ error: "Failed to save guestbook entry" });
  }
});

// Soft delete a guestbook entry (moderation)
app.delete("/api/guestbook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Perform a soft-delete by setting published to false
    await prisma.guestbookEntry.update({
      where: { id },
      data: { published: false },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete guestbook entry:", err);
    res.status(500).json({ error: "Failed to delete guestbook entry" });
  }
});

// ─── CONTACT SUBMISSION ROUTES ───────────────────────────────────────
// Submit contact form data and store in PostgreSQL
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    res.status(201).json({ success: true, data: submission });
  } catch (err) {
    console.error("Failed to save contact submission:", err);
    res.status(500).json({ error: "Failed to save contact submission" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
