import {
  blogFrontmatterSchema,
  projectFrontmatterSchema,
  experienceFrontmatterSchema,
  type BlogFrontmatter,
  type ProjectFrontmatter,
  type ExperienceFrontmatter,
} from "./schema";

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
};

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
  readingTime: string;
};

export type Experience = {
  slug: string;
  frontmatter: ExperienceFrontmatter;
  content: string;
};

// Simple YAML frontmatter parser
function parseMDX(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!match) {
    return { data: {}, content: raw };
  }
  const yamlBlock = match[1];
  const content = raw.slice(match[0].length).trim();
  const data: Record<string, any> = {};

  yamlBlock.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    let valStr = line.slice(colonIndex + 1).trim();

    // Parse array if bracketed: tags: [a, b]
    if (valStr.startsWith("[") && valStr.endsWith("]")) {
      data[key] = valStr
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
    } else if (valStr.startsWith('"') && valStr.endsWith('"')) {
      data[key] = valStr.slice(1, -1);
    } else if (valStr.startsWith("'") && valStr.endsWith("'")) {
      data[key] = valStr.slice(1, -1);
    } else if (valStr === "true") {
      data[key] = true;
    } else if (valStr === "false") {
      data[key] = false;
    } else {
      data[key] = valStr;
    }
  });

  return { data, content };
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 225); // average reading speed
  return `${minutes} min read`;
}

// Vite glob imports for files under /content/ relative to project root
const blogFiles = import.meta.glob("/content/blog/*.mdx", { query: "?raw", eager: true });
const projectFiles = import.meta.glob("/content/projects/*.mdx", { query: "?raw", eager: true });
const experienceFiles = import.meta.glob("/content/experience/*.mdx", { query: "?raw", eager: true });

export function getBlogPosts(): BlogPost[] {
  return Object.entries(blogFiles)
    .map(([filePath, fileModule]: [string, any]) => {
      const raw = fileModule.default;
      const { data, content } = parseMDX(raw);
      const parsed = blogFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.warn(`Invalid frontmatter in ${filePath}:`, parsed.error.issues);
        return null;
      }
      const slug = filePath.split("/").pop()!.replace(/\.(mdx|md)$/, "");
      return {
        slug,
        frontmatter: parsed.data,
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter(Boolean)
    .filter((p) => p!.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b!.frontmatter.date).getTime() -
        new Date(a!.frontmatter.date).getTime()
    ) as BlogPost[];
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getProjects(): Project[] {
  return Object.entries(projectFiles)
    .map(([filePath, fileModule]: [string, any]) => {
      const raw = fileModule.default;
      const { data, content } = parseMDX(raw);
      const parsed = projectFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.warn(`Invalid frontmatter in ${filePath}:`, parsed.error.issues);
        return null;
      }
      const slug = filePath.split("/").pop()!.replace(/\.(mdx|md)$/, "");
      return {
        slug,
        frontmatter: parsed.data,
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter(Boolean)
    .filter((p) => p!.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b!.frontmatter.date).getTime() -
        new Date(a!.frontmatter.date).getTime()
    ) as Project[];
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getExperience(): Experience[] {
  return Object.entries(experienceFiles)
    .map(([filePath, fileModule]: [string, any]) => {
      const raw = fileModule.default;
      const { data, content } = parseMDX(raw);
      const parsed = experienceFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.warn(`Invalid frontmatter in ${filePath}:`, parsed.error.issues);
        return null;
      }
      const slug = filePath.split("/").pop()!.replace(/\.(mdx|md)$/, "");
      return { slug, frontmatter: parsed.data, content };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a!.frontmatter.current) return -1;
      if (b!.frontmatter.current) return 1;
      return (
        new Date(b!.frontmatter.startDate).getTime() -
        new Date(a!.frontmatter.startDate).getTime()
      );
    }) as Experience[];
}
