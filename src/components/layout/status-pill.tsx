"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Cloud, MapPin } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Greetings — famous-country languages, Hindi always in the mix      */
/* ------------------------------------------------------------------ */

type Greeting = { lang: string; text: string; emoji: string };

const HINDI: Greeting = { lang: "Hindi (India)", text: "नमस्ते", emoji: "🙏" };

const GREETING_POOL: Greeting[] = [
  { lang: "Swedish", text: "Hej", emoji: "👋" },
  { lang: "Swahili", text: "Habari", emoji: "🔥" },
  { lang: "Japanese", text: "Konnichiwa", emoji: "🌸" },
  { lang: "Spanish", text: "Hola", emoji: "☀️" },
  { lang: "French", text: "Bonjour", emoji: "🥐" },
  { lang: "Italian", text: "Ciao", emoji: "🍕" },
  { lang: "German", text: "Hallo", emoji: "🍺" },
  { lang: "Korean", text: "Annyeonghaseyo", emoji: "🌷" },
  { lang: "Portuguese", text: "Olá", emoji: "🎉" },
  { lang: "Arabic", text: "Marhaba", emoji: "🌙" },
];

function pickTrio(): Greeting[] {
  const shuffled = [...GREETING_POOL].sort(() => Math.random() - 0.5);
  const pair = shuffled.slice(0, 2);
  return [...pair, HINDI].sort(() => Math.random() - 0.5);
}

/* ------------------------------------------------------------------ */
/*  Weather                                                            */
/* ------------------------------------------------------------------ */

type WeatherState =
  | { status: "idle" | "loading" }
  | { status: "denied" | "error" }
  | { status: "ready"; temp: number; location: string };

function truncate(s: string, max = 13) {
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
}

function useWeather() {
  const [weather, setWeather] = useState<WeatherState>({ status: "idle" });

  const request = () => {
    if (!("geolocation" in navigator)) {
      setWeather({ status: "error" });
      return;
    }
    setWeather({ status: "loading" });
    // Asks the visitor for their location via the native browser prompt.
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const [weatherRes, geoRes] = await Promise.all([
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            ),
            fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            ),
          ]);
          const weatherJson = await weatherRes.json();
          const geoJson = await geoRes.json();

          const temp = Math.round(weatherJson?.current_weather?.temperature ?? NaN);
          const location =
            geoJson?.city || geoJson?.locality || geoJson?.principalSubdivision || "Your area";

          if (Number.isNaN(temp)) {
            setWeather({ status: "error" });
            return;
          }
          setWeather({ status: "ready", temp, location: truncate(location) });
        } catch {
          setWeather({ status: "error" });
        }
      },
      () => setWeather({ status: "denied" }),
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { weather, retry: request };
}

/* ------------------------------------------------------------------ */
/*  Slide model                                                        */
/* ------------------------------------------------------------------ */

type Slide =
  | { kind: "visitors"; count: number }
  | { kind: "greeting"; greeting: Greeting }
  | { kind: "weather" };

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StatusPill() {
  const { weather, retry } = useWeather();

  const [trio, setTrio] = useState<Greeting[]>(() => pickTrio());
  const [visitorCount, setVisitorCount] = useState(2472);
  const [slideIndex, setSlideIndex] = useState(0);
  const tickRef = useRef(0);

  const slides: Slide[] = [
    { kind: "visitors", count: visitorCount },
    { kind: "greeting", greeting: trio[0] },
    { kind: "greeting", greeting: trio[1] },
    { kind: "greeting", greeting: trio[2] },
    { kind: "weather" },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      tickRef.current += 1;
      setSlideIndex((prev) => {
        const next = (prev + 1) % slides.length;
        if (next === 0) {
          // starting a fresh cycle: new language pair + a little "live" bump
          setTrio(pickTrio());
          setVisitorCount((c) => c + Math.floor(Math.random() * 8) + 1);
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const slide = slides[slideIndex];
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <style>{CSS}</style>
      <motion.div layout transition={SPRING} className="sp-pill">
        <AnimatePresence mode="wait">
          {slide.kind === "visitors" && (
            <motion.div key="visitors" className="sp-row" {...FADE}>
              <Users size={15} className="sp-icon" strokeWidth={2.25} />
              <span className="sp-strong">{slide.count.toLocaleString()}</span>
              <span className="sp-divider">|</span>
              <span className="sp-muted">VISITORS</span>
            </motion.div>
          )}

          {slide.kind === "greeting" && (
            <motion.div key={`greet-${slide.greeting.lang}`} className="sp-row" {...FADE}>
              <span className="sp-strong">
                {slide.greeting.text} {slide.greeting.emoji}, Good Morning ✨
              </span>
            </motion.div>
          )}

          {slide.kind === "weather" && (
            <motion.div key="weather" className="sp-row" {...FADE}>
              {weather.status === "ready" ? (
                <>
                  <Cloud size={15} className="sp-icon" strokeWidth={2.25} />
                  <span className="sp-strong">{weather.temp}°C</span>
                  <span className="sp-divider">|</span>
                  <span className="sp-muted">{weather.location}</span>
                  <span className="sp-divider">|</span>
                  <span className="sp-muted">{time}</span>
                </>
              ) : weather.status === "loading" || weather.status === "idle" ? (
                <>
                  <MapPin size={15} className="sp-icon sp-pulse" strokeWidth={2.25} />
                  <span className="sp-muted">Detecting your location…</span>
                </>
              ) : (
                <button type="button" className="sp-retry" onClick={retry}>
                  <MapPin size={15} className="sp-icon" strokeWidth={2.25} />
                  <span className="sp-muted">Enable location for weather</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <span className="sp-kbd">⌘K</span>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion presets                                                     */
/* ------------------------------------------------------------------ */

const SPRING = { type: "spring" as const, stiffness: 320, damping: 28, mass: 0.6 };

const FADE = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
};

/* ------------------------------------------------------------------ */
/*  Styles                                                              */
/* ------------------------------------------------------------------ */

const CSS = `
.sp-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px 9px 16px;
  border-radius: 999px;
  background: linear-gradient(180deg, #1b1b1c 0%, #141415 100%);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.04) inset,
    0 12px 28px rgba(0,0,0,0.55);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
  white-space: nowrap;
  overflow: hidden;
}

.sp-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sp-icon {
  color: #f2f2f2;
  flex-shrink: 0;
}

.sp-pulse {
  animation: sp-pulse 1.4s ease-in-out infinite;
}
@keyframes sp-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.sp-strong {
  font-size: 13.5px;
  font-weight: 600;
  color: #f5f5f5;
  letter-spacing: 0.01em;
}

.sp-muted {
  font-size: 12.5px;
  font-weight: 500;
  color: #9a9a9a;
  letter-spacing: 0.04em;
}

.sp-divider {
  color: rgba(255,255,255,0.16);
  font-weight: 300;
  font-size: 13px;
}

.sp-retry {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}
.sp-retry .sp-icon { color: #f2b23a; }
.sp-retry:hover .sp-muted { color: #cfcfcf; }

.sp-kbd {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #a5a5a5;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 999px;
  padding: 5px 9px;
}
`;
