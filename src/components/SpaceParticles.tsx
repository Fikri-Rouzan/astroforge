import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const SpaceParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const isDarkRef = useRef(isDark);
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const darkColors = ["#ffffff", "#06b6d4", "#818cf8"];
    const lightColors = ["#312e81", "#0284c7", "#4338ca", "#0f172a"];

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.6,
      colorIndex: Math.floor(Math.random() * 4),
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentIsDark = isDarkRef.current;
      const activeColors = currentIsDark ? darkColors : lightColors;

      particles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.alpha += (Math.random() - 0.5) * 0.02;
        const minAlpha = currentIsDark ? 0.15 : 0.35;
        const maxAlpha = currentIsDark ? 0.8 : 0.85;

        if (p.alpha < minAlpha) p.alpha = minAlpha;
        if (p.alpha > maxAlpha) p.alpha = maxAlpha;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = activeColors[p.colorIndex % activeColors.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};
