"use client";

/**
 * mdx-components.tsx
 * ---------------------------------------------------------------------------
 * The unified mdxComponents map for blog post rendering. Exposes plain markdown
 * restylings plus modern bespoke block components.
 * Supports both PascalCase and lowercase tags for maximum compatibility.
 * ---------------------------------------------------------------------------
 */

import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";
import * as Custom from "./CustomComponents";

/* ----------------------------------------------------------------------- */
/* Helpers                                                                  */
/* ----------------------------------------------------------------------- */

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (React.isValidElement(node)) return getText((node.props as any)?.children);
  return "";
}

/* ----------------------------------------------------------------------- */
/* Headings — auto-id'd + hover anchor link                                 */
/* ----------------------------------------------------------------------- */

function headingFactory(Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", className: string) {
  const HeadingComponent = ({ children, id, ...props }: any) => {
    const text = getText(children);
    const headingId = id || slugify(text);
    return (
      <Tag id={headingId} className={`group relative scroll-mt-24 ${className}`} {...props}>
        <a
          href={`#${headingId}`}
          className="absolute -left-5 hidden text-neutral-600 no-underline hover:text-neutral-400 group-hover:inline-block"
          aria-hidden
        >
          #
        </a>
        {children}
      </Tag>
    );
  };
  HeadingComponent.displayName = `MDXHeading(${Tag})`;
  return HeadingComponent;
}

const H1 = headingFactory(
  "h1",
  "mt-2 mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl",
);
const H2 = headingFactory(
  "h2",
  "text-2xl font-semibold tracking-tight text-white/95 mt-12 mb-4 border-b border-white/5 pb-3 font-instrument-serif italic sm:text-3xl",
);
const H3 = headingFactory(
  "h3",
  "text-lg font-semibold tracking-tight text-white/90 mt-8 mb-3 font-mono text-sm uppercase",
);
const H4 = headingFactory("h4", "mt-6 mb-2 text-lg font-semibold text-white");
const H5 = headingFactory("h5", "mt-4 mb-2 text-base font-semibold text-white");
const H6 = headingFactory(
  "h6",
  "mt-4 mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400",
);

/* ----------------------------------------------------------------------- */
/* Text-level elements                                                     */
/* ----------------------------------------------------------------------- */

function P({ children }: any) {
  return <p className="text-white/60 leading-relaxed text-sm md:text-[15px] my-5">{children}</p>;
}

// @ts-ignore
function Strong({ children }: any) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

// @ts-ignore
function Em({ children }: any) {
  return <em className="italic text-neutral-300">{children}</em>;
}

// @ts-ignore
function Hr() {
  return <hr className="my-10 border-white/10" />;
}

function A({ href = "", children, ...props }: any) {
  const isExternal = /^https?:\/\//.test(href);
  const shared =
    "text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors duration-200";
  if (!isExternal && href.startsWith("/")) {
    return (
      <Link to={href} className={shared}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={shared} {...props}>
      {children}
    </a>
  );
}

/* ----------------------------------------------------------------------- */
/* Lists / blockquote                                                      */
/* ----------------------------------------------------------------------- */

function Ul({ children }: any) {
  return (
    <ul className="list-disc pl-5 my-4 space-y-2 text-white/60 text-sm md:text-[15px] text-left animate-none">
      {children}
    </ul>
  );
}

function Ol({ children }: any) {
  return (
    <ol className="list-decimal pl-5 my-4 space-y-2 text-white/60 text-sm md:text-[15px] text-left animate-none">
      {children}
    </ol>
  );
}

function Li({ children }: any) {
  return <li className="pl-1 leading-relaxed">{children}</li>;
}

function Blockquote({ children }: any) {
  return (
    <blockquote className="border-l-2 border-violet-500 pl-4 italic text-white/45 my-6 text-left">
      {children}
    </blockquote>
  );
}

/* ----------------------------------------------------------------------- */
/* Code — inline + fenced                                                  */
/* ----------------------------------------------------------------------- */

function InlineCode({ children }: any) {
  return (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-pink-300">
      {children}
    </code>
  );
}

function Pre({ children }: any) {
  const codeElement = React.Children.only(children) as React.ReactElement<any>;
  const className: string = codeElement.props?.className || "";
  const match = /language-(\w+)/.exec(className);
  const language = match?.[1] ?? "text";
  const codeString = getText(codeElement.props?.children).replace(/\n$/, "");
  return <Custom.CodeBlock code={codeString} language={language} />;
}

/* ----------------------------------------------------------------------- */
/* Images                                                                   */
/* ----------------------------------------------------------------------- */

function Img({ src, alt = "" }: any) {
  return (
    <span className="my-6 block overflow-hidden rounded-xl border border-white/10">
      <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
    </span>
  );
}

/* ----------------------------------------------------------------------- */
/* Tables                                                                   */
/* ----------------------------------------------------------------------- */

function Table({ children }: any) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}
function Thead({ children }: any) {
  return <thead className="border-b border-white/10 bg-white/5">{children}</thead>;
}
function Tbody({ children }: any) {
  return <tbody>{children}</tbody>;
}
function Tr({ children }: any) {
  return <tr className="border-b border-white/5 last:border-0">{children}</tr>;
}
function Th({ children }: any) {
  return <th className="px-4 py-3 text-left font-semibold text-neutral-300">{children}</th>;
}
function Td({ children }: any) {
  return <td className="px-4 py-3 text-neutral-400">{children}</td>;
}

/* =========================================================================
 * Final export — supports both PascalCase and lowercase formats
 * =======================================================================*/

export const mdxComponents = {
  // Standard HTML tags
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  hr: Hr,
  strong: Strong,
  em: Em,
  code: InlineCode,
  pre: Pre,
  img: Img,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,

  // PascalCase Bespoke Blocks
  Tag: Custom.Tag,
  TagList: Custom.TagList,
  Callout: Custom.Callout,
  StackGrid: Custom.StackGrid,
  StackCard: Custom.StackCard,
  ChecklistAccordion: Custom.ChecklistAccordion,
  FileTree: Custom.FileTree,
  StepList: Custom.StepList,
  CodeBlock: Custom.CodeBlock,
  FlowDiagram: Custom.FlowDiagram,
  ImageGrid: Custom.ImageGrid,
  ComparisonTable: Custom.ComparisonTable,
  ResourceList: Custom.ResourceList,
  VideoEmbed: Custom.VideoEmbed,
  Accordion: Custom.Accordion,
  AccordionItem: Custom.AccordionItem,
  Tabs: Custom.Tabs,
  Tab: Custom.Tab,
  Card: Custom.Card,
  PrevNextNav: Custom.PrevNextNav,
  PublishedMeta: Custom.PublishedMeta,
  TableOfContents: Custom.TableOfContents,
  BlogLayoutWrapper: Custom.BlogLayoutWrapper,
  KeyTakeaways: Custom.KeyTakeaways,
  AuthorBio: Custom.AuthorBio,
  NewsletterBox: Custom.NewsletterBox,
  Divider: Custom.Divider,
  PullQuote: Custom.PullQuote,
  Timeline: Custom.Timeline,
  Mark: Custom.Mark,
  Steps: Custom.Steps,
  Step: Custom.Step,
  Kbd: Custom.Kbd,
  CardGrid: Custom.CardGrid,
  LinkCard: Custom.LinkCard,
  YouTube: Custom.YouTube,
  Badge: Custom.Badge,
  Highlight: Custom.Highlight,

  // Lowercase Bespoke Blocks (For ReactMarkdown/rehype-raw rendering compat)
  tag: Custom.Tag,
  taglist: Custom.TagList,
  callout: Custom.Callout,
  stackgrid: Custom.StackGrid,
  stackcard: Custom.StackCard,
  checklistaccordion: Custom.ChecklistAccordion,
  filetree: Custom.FileTree,
  steplist: Custom.StepList,
  codeblock: Custom.CodeBlock,
  flowdiagram: Custom.FlowDiagram,
  imagegrid: Custom.ImageGrid,
  comparisontable: Custom.ComparisonTable,
  resourcelist: Custom.ResourceList,
  videoembed: Custom.VideoEmbed,
  accordion: Custom.Accordion,
  accordionitem: Custom.AccordionItem,
  tabs: Custom.Tabs,
  tab: Custom.Tab,
  card: Custom.Card,
  prevnextnav: Custom.PrevNextNav,
  publishedmeta: Custom.PublishedMeta,
  tableofcontents: Custom.TableOfContents,
  bloglayoutwrapper: Custom.BlogLayoutWrapper,
  keytakeaways: Custom.KeyTakeaways,
  authorbio: Custom.AuthorBio,
  newsletterbox: Custom.NewsletterBox,
  divider: Custom.Divider,
  pullquote: Custom.PullQuote,
  timeline: Custom.Timeline,
  mark: Custom.Mark,
  steps: Custom.Steps,
  step: Custom.Step,
  kbd: Custom.Kbd,
  cardgrid: Custom.CardGrid,
  linkcard: Custom.LinkCard,
  youtube: Custom.YouTube,
  badge: Custom.Badge,
  highlight: Custom.Highlight,
};

export default mdxComponents;
