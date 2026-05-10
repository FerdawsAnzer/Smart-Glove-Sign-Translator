import { useEffect, useState, useCallback, useRef } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Logo from "@/assets/Logo.png";
import "./SplashScreen.css";

type Props = { onFinish: () => void };

export default function SplashScreen({ onFinish }: Props) {
  const [fadeOut, setFadeOut]   = useState(false);
  const [init, setInit]         = useState(false);
  const canvasRef               = useRef<HTMLCanvasElement>(null);

  // particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  // canvas particles (fallback / extra layer)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const pts = Array.from({ length: 50 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      o:  Math.random() * 0.35 + 0.1,
      c:  Math.random() > 0.5 ? "139,92,246" : "99,102,241",
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
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

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>

      {/* mesh bg */}
      <div className="splash-bg" />

      {/* canvas particles */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
      />

     
    

      {/* center content */}
      <div className="relative z-10 flex flex-col items-center gap-5">

        {/* logo */}
        <div className="logo-wrap">
          <div className="logo-glow" />
          <img src={Logo} alt="SignBridge" className="logo" />
        </div>

        {/* brand */}
        <div className="splash-brand">
          <div className="splash-brand-name">SignBridge</div>
          <div className="splash-brand-tag">Sign Language Translator</div>
        </div>

        {/* loader */}
        <div className="splash-loader">
          <div className="loader-track">
            <div className="loader-fill" />
          </div>
          <div className="loader-dots">
            <div className="loader-dot" />
            <div className="loader-dot" />
            <div className="loader-dot" />
          </div>
        </div>

      </div>
    </div>
  );
}