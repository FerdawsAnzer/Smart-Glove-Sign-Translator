import { useEffect, useState, useRef } from "react";
import Logo from "@/assets/Logo.png";

type Props = { onFinish: () => void };

export default function SplashScreen({ onFinish }: Props) {
  const [fadeOut, setFadeOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.35 + 0.1,
      c: Math.random() > 0.5 ? "139,92,246" : "99,102,241",
    }));

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        pts.forEach((q) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);

          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${p.c},${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.o})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // timer
  useEffect(() => {
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 600);
    }, 3000);

    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center overflow-hidden z-[9999]
        transition-opacity duration-700
        ${fadeOut ? "opacity-0" : "opacity-100"}
      `}
    >
      {/* background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#050510,#0a0a1a,#0d0620)]" />

      {/* mesh overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,27,75,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(30,58,95,0.25),transparent_60%)]" />
      </div>

      {/* canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />

      {/* center content */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* logo */}
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          <div className="absolute inset-[-30px] rounded-full bg-purple-500/30 blur-2xl animate-pulse" />

          <img
            src={Logo}
            alt="SignBridge"
            className="w-[180px] h-[180px] relative z-10 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
          />
        </div>

        {/* brand */}
        <div className="text-center">
          <div className="text-[26px] font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            SignBridge
          </div>

          <div className="text-xs font-light tracking-[3px] uppercase text-white/30 mt-1">
            Sign Language Translator
          </div>
        </div>

        {/* loader */}
        <div className="w-[160px]">
          <div className="h-[2px] rounded bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 animate-[loadBar_2.2s_ease-in-out]" />
          </div>

          <div className="flex justify-center gap-[5px] mt-2">
            <div className="w-1 h-1 rounded-full bg-white/20 animate-bounce" />
            <div className="w-1 h-1 rounded-full bg-white/20 animate-bounce [animation-delay:200ms]" />
            <div className="w-1 h-1 rounded-full bg-white/20 animate-bounce [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
