import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

// Load environment variables from .env and .env.local files for Prisma CLI commands
dotenv.config();
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
