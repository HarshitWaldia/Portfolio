import { useEffect } from "react";
import { siteMetadata } from "../lib/seo/site-metadata";

interface MetadataOptions {
  title?: string;
  description?: string;
}

export function useMetadata({ title, description }: MetadataOptions = {}) {
  useEffect(() => {
    const metaTitle = title
      ? `${title} — ${siteMetadata.name}`
      : siteMetadata.title;
    const metaDescription = description ?? siteMetadata.description;

    document.title = metaTitle;

    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement("meta");
      descMeta.setAttribute("name", "description");
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute("content", metaDescription);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", metaTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", metaDescription);
  }, [title, description]);
}
