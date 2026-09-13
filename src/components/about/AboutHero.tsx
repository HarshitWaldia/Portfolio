import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import portraitImg from "@/assets/me.png";

/**
 * AboutHero
 * A dark, grid-background hero section with two oversized headline lines
 * that drift horizontally (in opposite directions) as the user scrolls
 * past the section. The portrait has its background removed so it sits
 * directly on the navy grid, same as the reference design.
 *
 * Requires: npm install framer-motion
 */
export default function AboutHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Tracks scroll progress of the section relative to the viewport.
  // 0 = section just entering bottom of viewport, 1 = section has fully left top.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Two lines move in opposite directions at different speeds.
  const xLine1 = useTransform(scrollYProgress, [0, 1], [-60, 140]);
  const xLine2 = useTransform(scrollYProgress, [0, 1], [80, -160]);

  return (
    <section ref={sectionRef} style={styles.hero}>
      <div style={styles.grid} />
      <div style={styles.vignette} />

      {/* top-left avatar pill */}
      <motion.div
        style={styles.badge}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#e7e9f0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </motion.div>

      {/* oversized headline, bleeds off both edges */}
      <div style={styles.typeWrap}>
        <motion.div style={{ ...styles.line, ...styles.line1, x: xLine1 }}>
          Engineering&nbsp;intelligent&nbsp;AI&nbsp;systems&nbsp;from&nbsp;models&nbsp;to&nbsp;production.
        </motion.div>
        <motion.div style={{ ...styles.line, ...styles.line2, x: xLine2 }}>
          LLMs&nbsp;•&nbsp;Computer&nbsp;Vision&nbsp;•&nbsp;Predictive&nbsp;Analytics&nbsp;•&nbsp;FastAPI&nbsp;Microservices
        </motion.div>
      </div>

      {/* portrait, background removed so it sits directly on the grid,
          centered and scaled so the text scrolls behind the lower section */}
      <motion.div
        style={styles.portraitWrap}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <img src={portraitImg} alt="Portrait" style={styles.portraitImg} />
      </motion.div>


    </section>
  );
}

const COLORS = {
  bgDeep: "#040611",
  bgNavy: "#0b1330",
  bgNavy2: "#111d45",
  gridLine: "rgba(255,255,255,0.10)",
  textWhite: "#f5f6f8",
  textDim: "#aab0c4",
};

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    background: `radial-gradient(120% 90% at 50% 0%, ${COLORS.bgNavy2} 0%, ${COLORS.bgNavy} 45%, ${COLORS.bgDeep} 100%)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "'Playfair Display', serif",
    color: COLORS.textWhite,
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(${COLORS.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gridLine} 1px, transparent 1px)`,
    backgroundSize: "64px 64px",
    WebkitMaskImage: "radial-gradient(120% 80% at 50% 20%, #000 40%, transparent 95%)",
    maskImage: "radial-gradient(120% 80% at 50% 20%, #000 40%, transparent 95%)",
    opacity: 0.9,
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(60% 50% at 50% 100%, rgba(0,0,0,0.75) 0%, transparent 60%), linear-gradient(180deg, rgba(4,6,17,0) 0%, rgba(4,6,17,0.55) 70%, rgba(4,6,17,0.95) 100%)",
    pointerEvents: "none",
  },
  badge: {
    position: "absolute",
    top: 28,
    left: 28,
    width: 44,
    height: 44,
    borderRadius: 14,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  typeWrap: {
    position: "absolute",
    width: "100%",
    top: "34%",
    left: 0,
    zIndex: 2,
    userSelect: "none",
  },
  line: {
    whiteSpace: "nowrap",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    width: "max-content",
    willChange: "transform",
    fontSize: "clamp(40px, 9vw, 92px)",
  },
  line1: {
    marginLeft: "-4vw",
    opacity: 0.96,
    color: COLORS.textWhite,
  },
  line2: {
    marginTop: "0.15em",
    marginLeft: "-14vw",
    color: "rgba(245,246,248,0.9)",
  },
  // enlarged: was min(62vw, 420px) — now fills much more of the section,
  // matching how large the figure reads in the reference design
  portraitWrap: {
    position: "relative",
    zIndex: 3,
    margin: "120px auto 20px",
    width: "min(90vw, 560px)",
    display: "block",
  },
  portraitImg: {
    width: "100%",
    display: "block",
    // grayscale + contrast to match the reference's monochrome look —
    // the image itself is already background-removed (transparent PNG),
    // so no dark box shows around the figure
    filter: "grayscale(1) contrast(1.2) brightness(0.85)",
    // fade only kicks in right at the very bottom, near the feet,
    // so it grounds into the vignette rather than cutting the figure off early
    WebkitMaskImage: "linear-gradient(180deg, #000 82%, transparent 99%)",
    maskImage: "linear-gradient(180deg, #000 82%, transparent 99%)",
  },
  footer: {
    position: "relative",
    zIndex: 4,
    padding: "0 28px 44px",
    marginTop: "auto",
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    letterSpacing: "0.06em",
    color: COLORS.textDim,
    marginBottom: 6,
  },
  title: {
    fontSize: "clamp(28px, 6vw, 40px)",
    fontWeight: 900,
    color: COLORS.textWhite,
  },
};
