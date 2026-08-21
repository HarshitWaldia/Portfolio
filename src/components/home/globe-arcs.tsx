import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

/* ═══════════════════════════════════════════════════════════
   GLOBE — three-globe: dotted continents + animated flight arcs
   Lazy-loaded chunk (three + three-globe are heavy), see bento.tsx
   ═══════════════════════════════════════════════════════════ */

type City = { name: string; lat: number; lng: number };

const HOME: City = { name: "NEW DELHI", lat: 28.6139, lng: 77.209 };
const CITIES: City[] = [
  { name: "LONDON", lat: 51.5074, lng: -0.1278 },
  { name: "TOKYO", lat: 35.6762, lng: 139.6503 },
  { name: "SAN FRANCISCO", lat: 37.7749, lng: -122.4194 },
  { name: "NEW YORK", lat: 40.7128, lng: -74.006 },
  { name: "DUBAI", lat: 25.2048, lng: 55.2708 },
];

const ARCS = CITIES.map((c, i) => ({
  startLat: HOME.lat,
  startLng: HOME.lng,
  endLat: c.lat,
  endLng: c.lng,
  color: i % 2 === 0 ? "#60a5fa" : "#8b7bf6",
}));

const SIZE = 300;

export default function GlobeArcs() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "150px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !canvasHostRef.current) return;
    let destroyed = false;
    let raf: number;
    let renderer: THREE.WebGLRenderer;

    (async () => {
      const res = await fetch("/globe/countries.json");
      const countries = await res.json();
      if (destroyed || !canvasHostRef.current || !wrapRef.current) return;

      let width = wrapRef.current.clientWidth;
      let height = wrapRef.current.clientHeight;
      if (!width || !height) {
        width = 300;
        height = 300;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.set(0, 0, 170 * (height / width));

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      canvasHostRef.current.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 1.4));
      const dLight = new THREE.DirectionalLight(0xbfd4ff, 1.1);
      dLight.position.set(-200, 100, 150);
      scene.add(dLight);

      const globe = new ThreeGlobe()
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .hexPolygonColor(() => `rgba(255,255,255,${0.35 + Math.random() * 0.35})`)
        .showAtmosphere(true)
        .atmosphereColor("#ffffff")
        .atmosphereAltitude(0.18)
        .arcsData(ARCS)
        .arcColor((d: unknown) => (d as { color: string }).color)
        .arcAltitude(0.28)
        .arcStroke(0.4)
        .arcDashLength(0.4)
        .arcDashGap(2.2)
        .arcDashInitialGap(() => Math.random() * 5)
        .arcDashAnimateTime(2200)
        .pointsData(CITIES)
        .pointColor(() => "#8bb4ff")
        .pointAltitude(0.005)
        .pointRadius(0.32)
        .ringsData(CITIES)
        .ringColor(() => (t: number) => `rgba(96,165,250,${1 - t})`)
        .ringMaxRadius(4.5)
        .ringPropagationSpeed(2.5)
        .ringRepeatPeriod(1400);

      const gMat = globe.globeMaterial() as THREE.MeshPhongMaterial;
      gMat.color = new THREE.Color("#0b0b12");
      gMat.transparent = true;
      gMat.opacity = 0.92;

      globe.rotation.set(0.32, 0.9, 0);
      scene.add(globe);

      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const handlePointerDown = (e: PointerEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        if (wrapRef.current) {
          wrapRef.current.style.cursor = "grabbing";
        }
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        globe.rotation.y += deltaX * 0.005;
        globe.rotation.x += deltaY * 0.005;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const handlePointerUp = () => {
        isDragging = false;
        if (wrapRef.current) {
          wrapRef.current.style.cursor = "grab";
        }
      };

      const canvasEl = renderer.domElement;
      canvasEl.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);

      const handleResize = () => {
        if (!wrapRef.current || !renderer) return;
        const w = wrapRef.current.clientWidth;
        const h = wrapRef.current.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.position.z = 170 * (h / w);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        width = w;
        height = h;
      };
      window.addEventListener("resize", handleResize);

      function frame() {
        if (destroyed) return;

        // Auto rotate on X axis if not dragging
        if (!isDragging) {
          globe.rotation.x += 0.0026;
        }

        // project city labels to screen space, hide those on the far side
        CITIES.forEach((c, i) => {
          const el = labelRefs.current[i];
          if (!el) return;
          const coords = globe.getCoords(c.lat, c.lng, 0.02) as unknown as THREE.Vector3;
          const local = new THREE.Vector3(coords.x, coords.y, coords.z);
          const normal = local.clone().normalize().applyQuaternion(globe.quaternion);
          const world = local.clone().applyMatrix4(globe.matrixWorld);
          const camDir = camera.position.clone().sub(world).normalize();
          const facing = normal.dot(camDir);

          const ndc = world.clone().project(camera);
          const x = (ndc.x * 0.5 + 0.5) * width;
          const y = (-ndc.y * 0.5 + 0.5) * height;

          const isVisible = facing > 0.08;
          el.style.opacity = isVisible ? String(Math.min(1, (facing - 0.08) * 3)) : "0";
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
      setReady(true);

      cleanupRef.current = () => {
        window.removeEventListener("resize", handleResize);
        canvasEl.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        cancelAnimationFrame(raf);
        renderer.dispose();
        gMat.dispose();
        canvasHostRef.current?.removeChild(renderer.domElement);
      };
    })();

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [visible]);

  return (
    <div ref={wrapRef} className="relative flex items-center justify-center w-full h-full">
      <div
        ref={canvasHostRef}
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      />
      {CITIES.map((c, i) => (
        <div
          key={c.name}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 text-[7px] font-bold font-mono text-white/60 tracking-widest pointer-events-none px-1.5 py-0.5 rounded bg-black/40 whitespace-nowrap transition-opacity duration-150"
          style={{ opacity: 0, zIndex: 5 }}
        >
          {c.name}
        </div>
      ))}
    </div>
  );
}
