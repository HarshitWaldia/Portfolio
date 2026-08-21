"use client";

/**
 * CustomComponents.tsx
 * ---------------------------------------------------------------------------
 * A library of bespoke, self-contained UI blocks for a dark, modern dev-blog.
 * Every component is "not-prose" so it won't inherit Tailwind Typography styles,
 * is fully typed, and only depends on `react` + `lucide-react`.
 * ---------------------------------------------------------------------------
 */

import React, {
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  X,
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  PlayCircle,
  ArrowRight,
  ArrowLeft,
  Folder,
  File as FileIcon,
  Terminal,
  GitBranch,
  Sparkles,
  BookOpen,
  Mail,
  Clock,
  Calendar,
  User,
  ListTree,
  ArrowUpRight,
} from "lucide-react";

function safeParseArray<T>(prop: any): T[] {
  if (Array.isArray(prop)) return prop;
  if (typeof prop !== "string") return [];

  let cleaned = prop.trim();
  
  if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch {
    try {
      let jsonLike = cleaned
        .replace(/'/g, '"')
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
      return JSON.parse(jsonLike);
    } catch (err) {
      console.error("Failed to parse prop array in custom component:", prop, err);
      return [];
    }
  }
}

/* ============================================================================
 * 1. Tags / Badges
 * ==========================================================================*/

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300">
      {children}
    </span>
  );
}

export function TagList({ tags }: { tags: string[] | string }) {
  const parsedTags = safeParseArray<string>(tags);
  return (
    <div className="not-prose mb-4 flex flex-wrap gap-2">
      {parsedTags.map((t) => (
        <Tag key={t}>#{t.replace(/^#/, "")}</Tag>
      ))}
    </div>
  );
}

/* ============================================================================
 * 2. Callout — info / tip / warning / danger / success
 * ==========================================================================*/

type CalloutType = "info" | "tip" | "warning" | "danger" | "success" | "error";

const calloutStyles: Record<
  CalloutType,
  { border: string; bg: string; iconColor: string; icon: ReactNode }
> = {
  info: {
    border: "border-blue-400/60",
    bg: "bg-blue-400/[0.06]",
    iconColor: "text-blue-400",
    icon: <Info className="h-5 w-5" />,
  },
  tip: {
    border: "border-pink-400/60",
    bg: "bg-pink-400/[0.06]",
    iconColor: "text-pink-400",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  warning: {
    border: "border-amber-400/60",
    bg: "bg-amber-400/[0.06]",
    iconColor: "text-amber-400",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  danger: {
    border: "border-red-400/60",
    bg: "bg-red-400/[0.06]",
    iconColor: "text-red-400",
    icon: <ShieldAlert className="h-5 w-5" />,
  },
  error: {
    border: "border-red-400/60",
    bg: "bg-red-400/[0.06]",
    iconColor: "text-red-400",
    icon: <ShieldAlert className="h-5 w-5" />,
  },
  success: {
    border: "border-emerald-400/60",
    bg: "bg-emerald-400/[0.06]",
    iconColor: "text-emerald-400",
    icon: <Check className="h-5 w-5" />,
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = calloutStyles[type];
  return (
    <div className={`not-prose my-5 rounded-lg border-l-4 backdrop-blur-[6px] transition-all duration-300 hover:brightness-105 hover:border-l-[6px] ${s.border} ${s.bg} p-4`}>
      <div className="flex gap-3">
        <div className={`mt-0.5 shrink-0 ${s.iconColor}`}>{s.icon}</div>
        <div className="min-w-0 text-left">
          {title && <p className="mb-1 font-semibold text-white">{title}</p>}
          <div className="text-sm leading-relaxed text-neutral-300">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 3. StackGrid / StackCard — "The Stack at a Glance"
 * ==========================================================================*/

type Accent = "violet" | "pink" | "blue" | "emerald" | "amber" | "neutral";

const accentBg: Record<Accent, string> = {
  violet: "bg-violet-400/15 text-violet-300",
  pink: "bg-pink-400/15 text-pink-300",
  blue: "bg-blue-400/15 text-blue-300",
  emerald: "bg-emerald-400/15 text-emerald-300",
  amber: "bg-amber-400/15 text-amber-300",
  neutral: "bg-white/10 text-neutral-300",
};

export function StackGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">{children}</div>
  );
}

export function StackCard({
  icon,
  title,
  description,
  accent = "violet",
}: {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: Accent;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left">
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg text-lg ${accentBg[accent]}`}
      >
        {icon}
      </div>
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-400">{description}</p>
    </div>
  );
}

/* ============================================================================
 * 4. ChecklistAccordion
 * ==========================================================================*/

export type ChecklistItemType = {
  status: "fail" | "success";
  label: string;
  content?: ReactNode;
};

export function ChecklistAccordion({ items }: { items: ChecklistItemType[] | string }) {
  const [open, setOpen] = useState<number | null>(null);
  const parsedItems = safeParseArray<ChecklistItemType>(items);
  return (
    <div className="not-prose my-6 space-y-2 text-left">
      {parsedItems.map((item, i) => {
        const expandable = Boolean(item.content);
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/20"
          >
            <button
              type="button"
              disabled={!expandable}
              onClick={() => expandable && setOpen(isOpen ? null : i)}
              className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left ${
                expandable ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="flex items-center gap-3">
                {item.status === "fail" ? (
                  <X className="h-4 w-4 shrink-0 text-red-400" />
                ) : (
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                )}
                <span className="text-sm font-medium text-white">{item.label}</span>
              </span>
              {expandable && (
                <ChevronRight
                  className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300 ${
                    isOpen ? "rotate-90 text-violet-400" : ""
                  }`}
                />
              )}
            </button>
            <AnimatePresence initial={false}>
              {expandable && isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-white/5"
                >
                  <div className="px-4 pb-4 pt-3 text-sm leading-relaxed text-neutral-400">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================================
 * 5. FileTree — "Project Structure"
 * ==========================================================================*/

export type FileTreeNode = {
  name: string;
  type?: "file" | "folder";
  comment?: string;
  children?: FileTreeNode[];
};

function FileTreeRow({ node, depth }: { node: FileTreeNode; depth: number }) {
  const isFolder = node.type === "folder" || Boolean(node.children?.length);
  return (
    <div>
      <div className="flex items-center gap-2 py-1" style={{ paddingLeft: depth * 18 }}>
        {isFolder ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-neutral-600" />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        {isFolder ? (
          <Folder className="h-4 w-4 shrink-0 text-amber-400" />
        ) : (
          <FileIcon className="h-4 w-4 shrink-0 text-blue-400" />
        )}
        <span
          className={`whitespace-nowrap text-sm ${
            isFolder ? "font-semibold text-white" : "text-neutral-300"
          }`}
        >
          {node.name}
        </span>
        {node.comment && (
          <span className="truncate text-xs italic text-neutral-500">— {node.comment}</span>
        )}
      </div>
      {node.children?.map((child, i) => (
        <FileTreeRow key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement(node)) return getTextContent((node.props as any)?.children);
  return "";
}

function parseReactToNode(element: ReactNode): FileTreeNode | null {
  if (!element) return null;

  if (typeof element === "string") {
    const clean = element.trim();
    if (!clean) return null;
    const isFolder = clean.endsWith("/") || clean.includes("/");
    const [name, ...commentParts] = clean.split("#");
    return {
      name: name.trim(),
      type: isFolder ? "folder" : "file",
      comment: commentParts.join("#").trim() || undefined,
    };
  }

  if (typeof element === "number") {
    return { name: String(element), type: "file" };
  }

  if (Array.isArray(element)) {
    let nameNode: ReactNode = null;
    let listNode: ReactNode = null;
    element.forEach((child) => {
      if (React.isValidElement(child) && (child.type === "ul" || child.type === "ol")) {
        listNode = child;
      } else {
        if (!nameNode) nameNode = child;
        else nameNode = [nameNode, child];
      }
    });

    const parsedName = parseReactToNode(nameNode);
    if (!parsedName) return null;

    if (listNode) {
      const childrenNodes = parseReactToNode(listNode)?.children || [];
      return { ...parsedName, children: childrenNodes };
    }
    return parsedName;
  }

  if (React.isValidElement(element)) {
    const type = element.type;
    const props = element.props as any;

    if (type === "ul" || type === "ol") {
      const childrenArr = React.Children.toArray(props.children)
        .map(parseReactToNode)
        .filter((n): n is FileTreeNode => n !== null);
      return { name: "root", type: "folder", children: childrenArr };
    }

    if (type === "li") {
      return parseReactToNode(props.children);
    }

    return parseReactToNode(props.children);
  }

  return null;
}

function parseTextToNode(text: string): FileTreeNode {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const rootNode: FileTreeNode = { name: "root", type: "folder", children: [] };
  const stack: { indent: number; node: FileTreeNode }[] = [{ indent: -1, node: rootNode }];

  lines.forEach((line) => {
    const match = line.match(/^(\s*)[-*+]\s*(.*)$/) || line.match(/^(\s*)(.*)$/);
    if (!match) return;

    const indentStr = match[1] || "";
    const indent = indentStr.length;
    const content = match[2].trim();

    if (!content) return;

    const isFolder = content.endsWith("/") || content.includes("/");
    const [name, ...commentParts] = content.split("#");
    const node: FileTreeNode = {
      name: name.trim(),
      type: isFolder ? "folder" : "file",
      comment: commentParts.join("#").trim() || undefined,
      children: [],
    };

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].node;
    if (!parent.children) parent.children = [];
    parent.children.push(node);

    stack.push({ indent, node });
  });

  return rootNode;
}

export function FileTree({ root, label, children }: { root?: FileTreeNode; label?: string; children?: ReactNode }) {
  let finalRoot = root;

  if (!finalRoot && children) {
    const parsedReact = parseReactToNode(children);
    if (parsedReact && parsedReact.children && parsedReact.children.length > 0) {
      finalRoot = parsedReact;
    } else {
      const text = getTextContent(children);
      if (text.trim()) {
        finalRoot = parseTextToNode(text);
      }
    }
  }

  if (!finalRoot) {
    finalRoot = { name: "Project", type: "folder", children: [] };
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left">
      {label && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wide text-neutral-400">
          <Terminal className="h-3.5 w-3.5" /> {label}
        </div>
      )}
      <div className="overflow-x-auto p-4 font-mono">
        <FileTreeRow node={finalRoot} depth={0} />
      </div>
    </div>
  );
}


/* ============================================================================
 * 6. StepList
 * ==========================================================================*/

export type Step = { title: string; description: ReactNode };

export function StepList({ steps }: { steps: Step[] | string }) {
  const parsedSteps = safeParseArray<Step>(steps);
  return (
    <div className="not-prose my-6 space-y-5 text-left">
      {parsedSteps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white">
            {i + 1}
          </div>
          <div className="min-w-0">
            <p className="mb-1 font-semibold text-white">{step.title}</p>
            <div className="text-sm leading-relaxed text-neutral-400">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
 * 7. CodeBlock — language badge + copy button
 * ==========================================================================*/

const languageDot: Record<string, string> = {
  bash: "bg-emerald-400",
  sh: "bg-emerald-400",
  groq: "bg-pink-400",
  json: "bg-amber-400",
  ts: "bg-blue-400",
  tsx: "bg-blue-400",
  js: "bg-yellow-400",
  jsx: "bg-yellow-400",
};

export function CodeBlock({
  code,
  language = "bash",
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  const dot = languageDot[language.toLowerCase()] ?? "bg-neutral-500";

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] text-left">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          <span className={`h-2 w-2 rounded-full ${dot}`} />
          {filename || language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-white cursor-pointer"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-neutral-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ============================================================================
 * 8. FlowDiagram — ASCII-style flow
 * ==========================================================================*/

export function FlowDiagram({
  title = "Flow Diagram",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wide text-neutral-400">
        <GitBranch className="h-3.5 w-3.5" /> {title}
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-loose text-amber-200/90">
        {children}
      </pre>
    </div>
  );
}

/* ============================================================================
 * 9. ImageGrid
 * ==========================================================================*/

export function ImageGrid({
  images,
  columns = 2,
}: {
  images: { src: string; alt: string }[] | string;
  columns?: 1 | 2 | 3 | 4;
}) {
  const parsedImages = safeParseArray<{ src: string; alt: string }>(images);
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[columns];

  return (
    <div className={`not-prose my-6 grid gap-4 ${colClass}`}>
      {parsedImages.map((img, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-white/10">
          <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
 * 10. ComparisonTable
 * ==========================================================================*/

export type ComparisonColumn = { label: string; colorClass?: string };
export type ComparisonRow = { attribute: string; values: ReactNode[] };

export function ComparisonTable({
  columns,
  rows,
}: {
  columns: ComparisonColumn[] | string;
  rows: ComparisonRow[] | string;
}) {
  const parsedColumns = safeParseArray<ComparisonColumn>(columns);
  const parsedRows = safeParseArray<ComparisonRow>(rows);
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-white/10 text-left">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="px-4 py-3 text-left font-semibold text-neutral-300">Attribute</th>
            {parsedColumns.map((c, i) => (
              <th key={i} className="px-4 py-3 text-left">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                    c.colorClass ?? "border-violet-400/30 bg-violet-400/10 text-violet-300"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {c.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parsedRows.map((r, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3 font-medium text-white">{r.attribute}</td>
              {r.values.map((v, j) => (
                <td key={j} className="px-4 py-3 text-neutral-400">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================================
 * 11. ResourceList
 * ==========================================================================*/

export type Resource = {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
};

export function ResourceList({ resources }: { resources: Resource[] | string }) {
  const parsedResources = safeParseArray<Resource>(resources);
  return (
    <div className="not-prose my-6 space-y-3 text-left">
      {parsedResources.map((r, i) => (
        <a
          key={i}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
              {r.icon ?? <BookOpen className="h-4 w-4 text-neutral-300" />}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{r.title}</p>
              <p className="truncate text-xs text-neutral-500">{r.description}</p>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 shrink-0 text-neutral-500 transition-colors group-hover:text-white" />
        </a>
      ))}
    </div>
  );
}

/* ============================================================================
 * 12. VideoEmbed
 * ==========================================================================*/

export function VideoEmbed({
  videoId,
  title,
  channel,
}: {
  videoId: string;
  title: string;
  channel?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="not-prose my-6 aspect-video overflow-hidden rounded-xl border border-white/10">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group not-prose relative my-6 block aspect-video w-full overflow-hidden rounded-xl border border-white/10 cursor-pointer"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <PlayCircle className="h-16 w-16 text-white/90 drop-shadow-lg transition-transform group-hover:scale-110" />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-left">
        <p className="text-sm font-semibold text-white">{title}</p>
        {channel && <p className="text-xs text-neutral-300">{channel}</p>}
      </div>
    </button>
  );
}

/* ============================================================================
 * 13. Accordion / AccordionItem
 * ==========================================================================*/

export function Accordion({
  children,
  defaultOpen = null,
}: {
  children: ReactNode;
  defaultOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const items = React.Children.toArray(children) as React.ReactElement[];

  return (
    <div className="not-prose my-6 space-y-2 text-left">
      {items.map((child, i) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              isOpen: openIndex === i,
              onToggle: () => setOpenIndex(openIndex === i ? null : i),
            })
          : child,
      )}
    </div>
  );
}

export function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/20">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white/90 hover:text-white transition-colors cursor-pointer outline-none"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-pink-400" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5"
          >
            <div className="px-4 pb-4 pt-3 text-sm leading-relaxed text-neutral-400">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================================
 * 14. Tabs — supports both items array and children-based Tab items
 * ==========================================================================*/

export type TabItem = { label: string; content: ReactNode };

export function Tabs({ 
  items, 
  children 
}: { 
  items?: TabItem[] | string; 
  children?: ReactNode; 
}) {
  const [active, setActive] = useState(0);
  const parsedItems = items ? safeParseArray<TabItem>(items) : undefined;

  if (parsedItems && parsedItems.length > 0) {
    return (
      <div className="not-prose my-6 overflow-hidden rounded-xl border border-white/10 text-left">
        <div className="flex flex-wrap border-b border-white/10 bg-white/[0.02]">
          {parsedItems.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                active === i
                  ? "border-b-2 border-violet-400 text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 text-sm leading-relaxed text-neutral-300">
          {parsedItems[active]?.content}
        </div>
      </div>
    );
  }

  // Fallback to children-based tabs
  const tabs = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && (child.props as any).title
  ) as React.ReactElement[];

  if (tabs.length === 0) return null;

  return (
    <div className="not-prose my-6 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden text-left">
      <div className="flex flex-wrap border-b border-white/10 bg-white/[0.02]">
        {tabs.map((tab, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer border-b-2 ${
                isActive
                  ? "border-violet-400 text-white"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {(tab.props as any).title}
            </button>
          );
        })}
      </div>
      <div className="p-4 text-sm leading-relaxed text-neutral-300">
        {tabs[active]}
      </div>
    </div>
  );
}

export function Tab({ title, children }: { title: string; children: ReactNode }) {
  return <div title={title}>{children}</div>;
}

/* ============================================================================
 * 15. Card — generic container
 * ==========================================================================*/

export function Card({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={`not-prose rounded-xl border border-white/10 bg-[#0d0d0f]/50 p-5 text-left ${className}`}>
      {title && <h4 className="text-base font-semibold text-white mb-3">{title}</h4>}
      <div className="text-neutral-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ============================================================================
 * 16. PrevNextNav
 * ==========================================================================*/

export type PostLink = { title: string; href: string };

export function PrevNextNav({ prev, next }: { prev?: PostLink; next?: PostLink }) {
  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
      {prev ? (
        <a
          href={prev.href}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
            <ArrowLeft className="h-3.5 w-3.5" /> Previous Post
          </span>
          <p className="mt-2 font-semibold text-white">{prev.title}</p>
        </a>
      ) : (
        <div />
      )}
      {next && (
        <a
          href={next.href}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition-colors hover:bg-white/[0.05]"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Next Post <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <p className="mt-2 font-semibold text-white">{next.title}</p>
        </a>
      )}
    </div>
  );
}

/* ============================================================================
 * 17. PublishedMeta — footer date / reading time
 * ==========================================================================*/

export function PublishedMeta({
  date,
  readingTime,
}: {
  date: string;
  readingTime?: string;
}) {
  return (
    <div className="not-prose my-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500 text-left">
      <span className="flex items-center gap-1.5">
        <Calendar className="h-4 w-4" /> Published on {date}
      </span>
      {readingTime && (
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {readingTime}
        </span>
      )}
    </div>
  );
}

/* ============================================================================
 * 18. TableOfContents — scroll-spy sidebar
 * ==========================================================================*/

export type TocHeading = { id: string; text: string; level: number };

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-24 hidden w-64 shrink-0 lg:block text-left">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        <ListTree className="h-3.5 w-3.5" /> On this page
      </p>
      <ul className="space-y-2 border-l border-white/10">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: Math.max(h.level - 2, 0) * 12 + 12 }}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 pl-3 text-sm transition-colors ${
                activeId === h.id
                  ? "border-violet-400 font-medium text-white"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ============================================================================
 * 19. BlogLayoutWrapper — two-column article + TOC shell
 * ==========================================================================*/

export function BlogLayoutWrapper({
  children,
  toc,
}: {
  children: ReactNode;
  toc?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 py-10 text-left">
      <article className="prose prose-invert max-w-none flex-1">{children}</article>
      {toc}
    </div>
  );
}

/* ============================================================================
 * 20. KeyTakeaways
 * ==========================================================================*/

export function KeyTakeaways({ points }: { points: string[] }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-violet-400/20 bg-violet-400/[0.04] p-5 text-left">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-300">
        <Sparkles className="h-4 w-4" /> Key takeaways
      </p>
      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2 text-sm text-neutral-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================================
 * 21. AuthorBio
 * ==========================================================================*/

export function AuthorBio({
  name,
  avatar,
  bio,
  links,
}: {
  name: string;
  avatar?: string;
  bio: string;
  links?: { label: string; href: string }[];
}) {
  return (
    <div className="not-prose my-8 flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-left">
      {avatar ? (
        <img src={avatar} alt={name} className="h-12 w-12 shrink-0 rounded-full object-cover" />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
          <User className="h-5 w-5 text-neutral-400" />
        </div>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-white">{name}</p>
        <p className="mt-1 text-sm leading-relaxed text-neutral-400">{bio}</p>
        {links && links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-violet-400 hover:underline"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
 * 22. NewsletterBox
 * ==========================================================================*/

export function NewsletterBox({
  title = "Enjoyed this post?",
  description = "Get new posts straight to your inbox. No spam.",
  onSubmit,
}: {
  title?: string;
  description?: string;
  onSubmit?: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
    setSent(true);
  };

  return (
    <div className="not-prose my-8 rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-pink-500/10 p-6 text-left">
      <p className="flex items-center gap-2 font-semibold text-white">
        <Mail className="h-4 w-4" /> {title}
      </p>
      <p className="mt-1 text-sm text-neutral-400">{description}</p>
      {sent ? (
        <p className="mt-4 text-sm font-medium text-emerald-400">
          Thanks — check your inbox to confirm.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
          />
          <button
            type="submit"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

/* ============================================================================
 * 23. Divider
 * ==========================================================================*/

export function Divider() {
  return (
    <div className="not-prose my-10 flex items-center justify-center gap-2">
      <span className="h-1 w-1 rounded-full bg-neutral-700" />
      <span className="h-1 w-8 rounded-full bg-neutral-700" />
      <span className="h-1 w-1 rounded-full bg-neutral-700" />
    </div>
  );
}

/* ============================================================================
 * 24. PullQuote
 * ==========================================================================*/

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="not-prose my-8 border-l-4 border-violet-400 pl-6 text-left">
      <p className="text-xl font-medium italic leading-relaxed text-white">{children}</p>
      {cite && <cite className="mt-2 block text-sm not-italic text-neutral-500">— {cite}</cite>}
    </blockquote>
  );
}

/* ============================================================================
 * 25. Timeline
 * ==========================================================================*/

export type TimelineItem = { date: string; title: string; description?: ReactNode };

export function Timeline({ items }: { items: TimelineItem[] | string }) {
  const parsedItems = safeParseArray<TimelineItem>(items);
  return (
    <div className="not-prose my-6 border-l border-white/10 pl-6 text-left">
      {parsedItems.map((item, i) => (
        <div key={i} className="relative pb-6 last:pb-0">
          <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-violet-400 bg-black" />
          <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">{item.date}</p>
          <p className="mt-1 font-semibold text-white">{item.title}</p>
          {item.description && (
            <div className="mt-1 text-sm leading-relaxed text-neutral-400">{item.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
 * 26. Mark — inline highlighted text
 * ==========================================================================*/

export function Mark({
  children,
  color = "violet",
}: {
  children: ReactNode;
  color?: "violet" | "pink" | "emerald" | "amber";
}) {
  const map: Record<string, string> = {
    violet: "bg-violet-400/20 text-violet-200",
    pink: "bg-pink-400/20 text-pink-200",
    emerald: "bg-emerald-400/20 text-emerald-200",
    amber: "bg-amber-400/20 text-amber-200",
  };
  return <mark className={`rounded px-1 py-0.5 ${map[color]}`}>{children}</mark>;
}

/* ============================================================================
 * 27. Steps & Step Component (Backwards Compatibility)
 * ==========================================================================*/

export function Steps({ children }: { children: ReactNode }) {
  const array = React.Children.toArray(children);
  let stepCount = 1;
  const mapped = array.map((child) => {
    if (React.isValidElement(child)) {
      const name = (child.type as any)?.name || (child.type as string);
      if (name === "Step" || name === "step" || (child.props as any).title) {
        const currentStep = stepCount++;
        return React.cloneElement(child as React.ReactElement<any>, {
          number: (child.props as any).number ?? currentStep
        });
      }
    }
    return child;
  });

  return (
    <div className="relative pl-6 my-8 border-l border-white/10 ml-3 space-y-6 text-left">
      {mapped}
    </div>
  );
}

export function Step({
  number,
  title,
  children,
}: {
  number?: string | number;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative group text-left">
      <span className="absolute -left-9.5 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-neutral-950 font-mono text-xs font-bold text-neutral-400 transition-all duration-300 group-hover:border-violet-500/50 group-hover:text-violet-400 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]">
        {number}
      </span>
      {title && <h4 className="text-base font-semibold text-white mb-2">{title}</h4>}
      <div className="text-white/70 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ============================================================================
 * 28. Kbd Component (Backwards Compatibility)
 * ==========================================================================*/

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-block rounded-md border border-white/10 bg-neutral-900 px-1.5 py-0.5 font-mono text-[10px] font-bold text-neutral-300 shadow-[0_1.5px_0_rgba(255,255,255,0.08)]">
      {children}
    </kbd>
  );
}

/* ============================================================================
 * 29. LinkCard & CardGrid (Backwards Compatibility)
 * ==========================================================================*/

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 my-6 grid-cols-1 sm:grid-cols-2 text-left">{children}</div>;
}

export function LinkCard({
  title,
  description,
  href,
  icon = "🔗",
}: {
  title: string;
  description?: string;
  href: string;
  icon?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-start gap-4 rounded-xl border border-white/5 bg-neutral-950/30 p-4 transition-all duration-300 hover:border-violet-500/20 hover:bg-neutral-950/60 hover:shadow-lg text-left"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-lg transition-transform group-hover:scale-105">
        {icon}
      </div>
      <div className="flex-1 min-w-0 pr-6">
        <h4 className="font-semibold text-white group-hover:text-violet-400 transition-colors text-sm truncate">
          {title}
        </h4>
        {description && (
          <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-neutral-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400" />
    </a>
  );
}

/* ============================================================================
 * 30. YouTube Component (Backwards Compatibility)
 * ==========================================================================*/

export function YouTube({ id }: { id: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-white/5 aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

/* ============================================================================
 * 31. Badge & Highlight (Backwards Compatibility)
 * ==========================================================================*/

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex select-none items-center rounded bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-violet-300 border border-violet-500/20 uppercase tracking-wide">
      {children}
    </span>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-violet-500/15 px-1 py-0.5 text-violet-300 font-medium">
      {children}
    </span>
  );
}
