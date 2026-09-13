"use client";

import { useEffect, useRef } from "react";

export default function ShaderBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class representing stars orbiting a black hole
    class Particle {
      x = 0;
      y = 0;
      angle = Math.random() * Math.PI * 2;
      distance = Math.random() * (Math.min(width, height) * 0.6) + 50;
      speed = (0.002 + Math.random() * 0.003) * (150 / this.distance); // Closer = faster
      size = Math.random() * 1.5 + 0.5;
      color = "";

      constructor() {
        this.reset();
      }

      reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * (Math.min(width, height) * 0.6) + 40;
        this.speed = (0.001 + Math.random() * 0.002) * (180 / this.distance);
        
        // Colors ranging from purple, indigo, pink, to white
        const rand = Math.random();
        if (rand < 0.4) {
          this.color = `rgba(139, 92, 246, ${Math.random() * 0.4 + 0.2})`; // Violet
        } else if (rand < 0.7) {
          this.color = `rgba(236, 72, 153, ${Math.random() * 0.3 + 0.2})`; // Pink
        } else {
          this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`; // White stars
        }
      }

      update(centerX: number, centerY: number, mouseX: number, mouseY: number) {
        // Orbit update
        this.angle += this.speed;
        
        // Slight pull towards black hole center
        this.distance -= 0.05;
        if (this.distance < 30) {
          this.reset();
        }

        // Calculate positions
        let targetX = centerX + Math.cos(this.angle) * this.distance;
        let targetY = centerY + Math.sin(this.angle) * this.distance;

        // Subtle mouse interaction/distortion
        const dx = mouseX - targetX;
        const dy = mouseY - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          targetX -= (dx / dist) * force * 15;
          targetY -= (dy / dist) * force * 15;
        }

        this.x = targetX;
        this.y = targetY;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }
    }

    const particles: Particle[] = [];
    const count = 180;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const render = () => {
      const centerX = width / 2;
      const centerY = height / 2;

      // Dark fade trails effect
      ctx.fillStyle = "rgba(13, 13, 15, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Draw black hole gravitational lens glow at the center
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        width * 0.4
      );
      gradient.addColorStop(0, "rgba(88, 28, 135, 0.15)"); // Dark purple core
      gradient.addColorStop(0.3, "rgba(139, 92, 246, 0.05)");
      gradient.addColorStop(0.6, "rgba(236, 72, 153, 0.01)");
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        p.update(centerX, centerY, mouseX, mouseY);
        p.draw(ctx);
      });

      // Subtle accretion disk visual overlay
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 45, 10, Math.PI / 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139, 92, 246, 0.05)";
      ctx.fill();

      // Accretion disk core (absolute black hole event horizon)
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#09090b";
      ctx.fill();
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    render();

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#0d0d0f] pointer-events-none"
    />
  );
}
