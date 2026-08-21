import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export function getToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headings: TocItem[] = [];

  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    let text = match[2].trim();

    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    text = text.replace(/`([^`]+)`/g, "$1");

    const id = slugger.slug(text);

    headings.push({
      id,
      text,
      depth,
    });
  }

  return headings;
}
