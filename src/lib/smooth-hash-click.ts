import type Lenis from "lenis";

export function smoothHashClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) {
  if (typeof window === "undefined") return;
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;

  const targetPath = href.slice(0, hashIndex) || "/";
  const hash = href.slice(hashIndex + 1);
  const onCorrectPage =
    targetPath === window.location.pathname || targetPath === "";

  if (!onCorrectPage || !hash) return;

  const el = document.getElementById(hash);
  const lenis = (window as typeof window & { lenis?: Lenis }).lenis;
  if (!el || !lenis) return;

  e.preventDefault();
  lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  window.history.pushState(null, "", href);
}
