import { siteMetadata } from "./site-metadata";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMetadata.name,
    url: siteMetadata.url,
    sameAs: [
      siteMetadata.author.github,
      siteMetadata.author.linkedin,
      siteMetadata.author.twitter,
    ],
    jobTitle: "AI/ML Engineer",
    email: siteMetadata.author.email,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.name,
    url: siteMetadata.url,
    description: siteMetadata.description,
    author: { "@type": "Person", name: siteMetadata.name },
  };
}

export function articleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  url,
  image,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    url: `${siteMetadata.url}${url}`,
    image: image ?? siteMetadata.ogImage,
    author: { "@type": "Person", name: siteMetadata.name },
    publisher: { "@type": "Person", name: siteMetadata.name },
  };
}

export function creativeWorkJsonLd({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: `${siteMetadata.url}${url}`,
    image: image ?? siteMetadata.ogImage,
    creator: { "@type": "Person", name: siteMetadata.name },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteMetadata.url}${item.url}`,
    })),
  };
}
