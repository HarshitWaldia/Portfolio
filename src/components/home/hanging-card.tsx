"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface HangingCardProps {
  name?: string;
  title?: string;
  photoUrl?: string;
}

const HangingCard: React.FC<HangingCardProps> = ({
  name = "Harshit Waldia",
  title = "AI/ML Engineer",
  photoUrl = "/images/profile/harshit.jpg",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Scene / Camera / Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.6, 6.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.cursor = "grab";
    mount.appendChild(renderer.domElement);

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 0.4); // Subtle indigo tint
    fillLight.position.set(-5, 3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xc084fc, 0.5); // Subtle violet rim light
    rimLight.position.set(-3, -2, -4);
    scene.add(rimLight);

    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // --- Dynamic Anchor & Responsive Scaling ---
    const ANCHOR = new THREE.Vector3();
    const isPreview =
      typeof window !== "undefined" &&
      window.location.search.includes("preview=true");

    const SEGMENTS = 18;
    let segLength = 1.7 / (SEGMENTS - 1);
    let cardScale = 1;

    function positionComponents(w: number, h: number) {
      if (!w || !h) return;
      const aspect = w / h;
      const vHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const vWidth = vHeight * aspect;
      const topEdgeY = camera.position.y + (vHeight * 0.5);

      if (aspect >= 1.15) {
        // Desktop landscape: anchor to the left side (-0.28 vWidth) so it never blocks headline
        ANCHOR.set(-vWidth * 0.28, topEdgeY + 0.1, 0);
        const restLength = Math.min(2.1, Math.max(1.3, vHeight * 0.3));
        segLength = restLength / (SEGMENTS - 1);
        cardScale = Math.min(1.0, Math.max(0.72, vWidth / 10));
      } else {
        // Mobile portrait: anchor near top center, shorter rope and scaled card to never cover text
        ANCHOR.set(0, topEdgeY + 0.15, 0);
        const restLength = Math.min(1.15, Math.max(0.7, vHeight * 0.2));
        segLength = restLength / (SEGMENTS - 1);
        cardScale = Math.min(0.68, Math.max(0.44, vWidth / 5.2));
      }

      if (cardGroup) {
        cardGroup.scale.set(cardScale, cardScale, cardScale);
      }
    }

    // --- Verlet Rope (Lanyard Cord) ---
    interface Point {
      pos: THREE.Vector3;
      prevPos: THREE.Vector3;
      pinned: boolean;
    }

    const gravity = new THREE.Vector3(0, -9.8, 0);
    const DAMPING = 0.96;
    const CONSTRAINT_ITERATIONS = 6;
    const STIFFNESS = 0.82;
    const MAX_STRETCH_RATIO = 1.6;

    // Call dynamic positioning initially so ANCHOR and segLength are correctly set
    positionComponents(mount.clientWidth, mount.clientHeight);

    const points: Point[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const y = ANCHOR.y - i * segLength;
      points.push({
        pos: new THREE.Vector3(ANCHOR.x, y, ANCHOR.z),
        prevPos: new THREE.Vector3(ANCHOR.x, y, ANCHOR.z),
        pinned: i === 0,
      });
    }

    // Only swing on initial load if not in preview mode
    if (!isPreview) {
      points[points.length - 1].pos.x += 0.25;
      points[points.length - 1].prevPos.x += 0.08;
    }

    const ropeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // White cord
      roughness: 0.5,
      metalness: 0.1,
    });
    const curvePoints = points.map((p) => p.pos);
    const ropeCurve = new THREE.CatmullRomCurve3(curvePoints);
    let ropeMesh: THREE.Mesh | null = null;

    function rebuildRope() {
      const geo = new THREE.TubeGeometry(ropeCurve, SEGMENTS * 2, 0.026, 6, false);
      if (ropeMesh) {
        const oldGeo = ropeMesh.geometry;
        ropeMesh.geometry = geo;
        oldGeo.dispose();
      } else {
        ropeMesh = new THREE.Mesh(geo, ropeMaterial);
        scene.add(ropeMesh);
      }
    }
    rebuildRope();

    // --- Curated ID Card ---
    const CARD_W = 1.6;
    const CARD_H = 2.3;

    function roundRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      radius: number
    ) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
    }

    function buildPlaceholderTexture(loadedImage?: HTMLImageElement): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = Math.round((512 * CARD_H) / CARD_W);
      const ctx = canvas.getContext("2d")!;
      const w = canvas.width;
      const h = canvas.height;

      // Dark card base
      ctx.fillStyle = "#0c0a09"; // Slate dark/black
      roundRect(ctx, 0, 0, w, h, 28);
      ctx.fill();

      // Card border
      ctx.strokeStyle = "rgba(139, 92, 246, 0.25)"; // Glowing indigo border
      ctx.lineWidth = 6;
      roundRect(ctx, 3, 3, w - 6, h - 6, 28);
      ctx.stroke();

      // Draw photo area
      const photoH = h * 0.6;
      ctx.save();
      roundRect(ctx, 16, 16, w - 32, photoH, 22);
      ctx.clip();

      if (loadedImage) {
        // 1. Draw smooth white gradient behind portrait cutout
        const bgGrad = ctx.createLinearGradient(0, 16, 0, 16 + photoH);
        bgGrad.addColorStop(0, "#ffffff");
        bgGrad.addColorStop(0.6, "#f1f5f9");
        bgGrad.addColorStop(1, "#e2e8f0");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(16, 16, w - 32, photoH);

        // Calculate centering coordinates
        const boxW = w - 32;
        const scale = 0.88;
        const dw = boxW * scale;
        const dh = (dw * loadedImage.height) / loadedImage.width;
        const dx = 16 + (boxW - dw) / 2;
        const dy = 16 + 42;

        // 2. Draw image with grayscale filter applied
        ctx.save();
        ctx.filter = "grayscale(100%)";
        ctx.drawImage(loadedImage, dx, dy, dw, dh);
        ctx.restore();

        // 3. Draw black gradient at bottom of photo box to seamlessly blend into card body (#0c0a09)
        const gradStartY = 16 + photoH - 90;
        const gradEndY = 16 + photoH + 15;
        const photoGrad = ctx.createLinearGradient(0, gradStartY, 0, gradEndY);
        photoGrad.addColorStop(0, "rgba(12, 10, 9, 0)");
        photoGrad.addColorStop(0.8, "rgba(12, 10, 9, 1)");
        photoGrad.addColorStop(1, "rgba(12, 10, 9, 1)");
        ctx.fillStyle = photoGrad;
        ctx.fillRect(16, gradStartY, w - 32, 120);
      } else {
        // Fallback abstract gradient
        const grad = ctx.createLinearGradient(0, 0, 0, photoH);
        grad.addColorStop(0, "#4f46e5");
        grad.addColorStop(1, "#06b6d4");
        ctx.fillStyle = grad;
        ctx.fillRect(16, 16, w - 32, photoH);
      }
      ctx.restore();

      // Name Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 34px 'Segoe UI', Inter, Arial, sans-serif";
      ctx.fillText(name, 26, photoH + 54);

      // Title Text
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "500 20px 'Segoe UI', Inter, Arial, sans-serif";
      ctx.fillText(title, 26, photoH + 88);

      // Creative footer details
      ctx.fillStyle = "#6366f1";
      ctx.font = "800 12px monospace";
      ctx.fillText("DEV ID: 9942-88", 26, photoH + 116);

      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = 4;
      return tex;
    }

    let cardTexture: THREE.Texture;
    let triggerRender: (() => void) | null = null;

    const sideMat = new THREE.MeshStandardMaterial({ color: 0x1c1917 });
    const backMat = new THREE.MeshStandardMaterial({ color: 0x0c0a09 });
    const frontMat = new THREE.MeshStandardMaterial({ color: 0xffffff });

    if (photoUrl) {
      const profileImg = new Image();
      profileImg.src = photoUrl;
      profileImg.crossOrigin = "anonymous";
      profileImg.onload = () => {
        const tex = buildPlaceholderTexture(profileImg);
        tex.colorSpace = THREE.SRGBColorSpace;
        frontMat.map = tex;
        frontMat.needsUpdate = true;
        cardTexture = tex;
        if (triggerRender) triggerRender();
      };
      cardTexture = buildPlaceholderTexture();
      frontMat.map = cardTexture;
    } else {
      cardTexture = buildPlaceholderTexture();
      frontMat.map = cardTexture;
    }

    const cardMesh = new THREE.Mesh(
      new THREE.BoxGeometry(CARD_W, CARD_H, 0.05),
      [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]
    );
    cardMesh.position.set(0, -CARD_H / 2 - 0.12, 0);
    cardGroup.add(cardMesh);

    // Decorative lanyard ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.08, 0.016, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 })
    );
    ring.position.set(0, -0.12, 0.035);
    cardGroup.add(ring);

    // --- Drag Interaction ---
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    const dragPlane = new THREE.Plane();
    const planeHit = new THREE.Vector3();
    const grabOffset = new THREE.Vector3();
    let dragging = false;

    function updateMouseNDC(clientX: number, clientY: number) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onPointerDown(e: PointerEvent) {
      updateMouseNDC(e.clientX, e.clientY);
      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObject(cardMesh, false);
      if (hits.length > 0) {
        dragging = true;
        renderer.domElement.style.cursor = "grabbing";
        const camForward = camera.getWorldDirection(new THREE.Vector3());
        dragPlane.setFromNormalAndCoplanarPoint(camForward.negate(), hits[0].point);
        raycaster.ray.intersectPlane(dragPlane, planeHit);

        const lastPoint = points[points.length - 1];
        grabOffset.copy(planeHit).sub(lastPoint.pos);
        renderer.domElement.setPointerCapture(e.pointerId);
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      updateMouseNDC(e.clientX, e.clientY);
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(dragPlane, planeHit);

      const lastPoint = points[points.length - 1];
      lastPoint.prevPos.copy(lastPoint.pos);
      lastPoint.pos.copy(planeHit).sub(grabOffset);
    }

    function onPointerUp() {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // --- Physics Simulation Step ---
    let maxMovementSq = 1;
    function simulate(dt: number) {
      maxMovementSq = 0;
      // 1. Move verlet points
      for (const p of points) {
        if (p.pinned) continue;
        if (dragging && p === points[points.length - 1]) continue;

        const vel = p.pos.clone().sub(p.prevPos).multiplyScalar(DAMPING);
        const sq = vel.lengthSq();
        if (sq > maxMovementSq) maxMovementSq = sq;
        p.prevPos.copy(p.pos);
        p.pos.add(vel);
        p.pos.addScaledVector(gravity, dt * dt);
      }

      // 2. Solve segment constraints
      for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
        for (let i = 0; i < points.length - 1; i++) {
          const a = points[i];
          const b = points[i + 1];
          const delta = b.pos.clone().sub(a.pos);
          const dist = delta.length() || 0.0001;
          const diff = (dist - segLength) / dist;
          const correction = delta.multiplyScalar(diff * 0.5 * STIFFNESS);

          const aFixed = a.pinned;
          const bFixed = dragging && b === points[points.length - 1];

          if (!aFixed) a.pos.add(correction);
          if (!bFixed) b.pos.sub(correction);
        }
      }

      // 3. Elastic hard limit
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const delta = b.pos.clone().sub(a.pos);
        const dist = delta.length();
        const maxDist = segLength * MAX_STRETCH_RATIO;
        if (dist > maxDist) {
          delta.multiplyScalar(maxDist / dist);
          b.pos.copy(a.pos).add(delta);
        }
      }
    }

    const tmpDir = new THREE.Vector3();
    const downVec = new THREE.Vector3(0, -1, 0);
    const targetQuat = new THREE.Quaternion();

    function updateCardTransform() {
      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      cardGroup.position.copy(last.pos);

      if (isPreview) {
        cardGroup.quaternion.identity();
        return;
      }

      // Calculate orientation based on rope's last segment pull direction
      tmpDir.copy(last.pos).sub(prev.pos).normalize();
      targetQuat.setFromUnitVectors(downVec, tmpDir);
      cardGroup.quaternion.slerp(targetQuat, 0.22);
    }

    // --- Render Loop with Culling & Idle Sleep ---
    const clock = new THREE.Clock();
    let frameId = 0;
    let isVisible = true;
    let settledFrames = 0;

    function renderSingleFrame() {
      if (!mount) return;
      positionComponents(mount.clientWidth, mount.clientHeight);
      points[0].pos.copy(ANCHOR);
      if (isPreview) {
        for (let i = 0; i < SEGMENTS; i++) {
          points[i].pos.set(ANCHOR.x, ANCHOR.y - i * segLength, ANCHOR.z);
          points[i].prevPos.copy(points[i].pos);
        }
      }
      rebuildRope();
      updateCardTransform();
      renderer.render(scene, camera);
    }
    triggerRender = renderSingleFrame;

    function startLoop() {
      settledFrames = 0;
      if (!frameId && isVisible && !isPreview) {
        clock.getDelta(); // reset delta to prevent time jump
        frameId = requestAnimationFrame(animate);
      }
    }

    function animate() {
      if (!mount || !isVisible || isPreview) {
        frameId = 0;
        return;
      }
      const dt = Math.min(clock.getDelta(), 0.033);

      // 1. Responsive Layout Positioning of hidden Anchor
      positionComponents(mount.clientWidth, mount.clientHeight);
      points[0].pos.copy(ANCHOR);

      // 2. Physics step
      simulate(dt);
      rebuildRope();
      updateCardTransform();

      renderer.render(scene, camera);

      // Idle sleep: if resting and not dragging for ~1 second, pause RAF to save 100% CPU
      if (!dragging && maxMovementSq < 0.000008) {
        settledFrames++;
        if (settledFrames > 60) {
          frameId = 0;
          return;
        }
      } else {
        settledFrames = 0;
      }

      frameId = requestAnimationFrame(animate);
    }

    // Wake loop on pointer interactions
    const wakeAndMove = (e: PointerEvent) => {
      onPointerMove(e);
      if (dragging) startLoop();
    };

    const wakeAndDown = (e: PointerEvent) => {
      startLoop();
      onPointerDown(e);
    };

    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", wakeAndDown);
    window.addEventListener("pointermove", wakeAndMove);

    // Initial render
    renderSingleFrame();
    if (!isPreview) {
      startLoop();
    }

    // Viewport Intersection Observer: completely pause rendering when offscreen
    let observer: IntersectionObserver | null = null;
    if (!isPreview && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!wasVisible && isVisible) {
            startLoop();
          } else if (!isVisible && frameId) {
            cancelAnimationFrame(frameId);
            frameId = 0;
          }
        },
        { rootMargin: "100px" }
      );
      observer.observe(mount);
    }

    // --- Resize Handler ---
    function onResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderSingleFrame();
      startLoop();
    }
    window.addEventListener("resize", onResize);

    // --- Cleanup ---
    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", wakeAndMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerdown", wakeAndDown);
      renderer.dispose();
      if (cardTexture) cardTexture.dispose();
      if (ropeMesh) ropeMesh.geometry.dispose();

      // Dispose geometries & materials
      sideMat.dispose();
      backMat.dispose();
      frontMat.dispose();
      ring.geometry.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [name, title, photoUrl]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative select-none"
      style={{
        touchAction: "none",
      }}
    />
  );
};

export default HangingCard;
