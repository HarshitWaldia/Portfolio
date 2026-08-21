import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Set up the client for fetching data in the Vite frontend
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "e20y832n",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-03-11",
  useCdn: import.meta.env.DEV ? false : true, // Bypass edge cache during local development
});

// Configure image helper for fetching optimized sanity asset URLs
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return null;
  return builder.image(source);
}
