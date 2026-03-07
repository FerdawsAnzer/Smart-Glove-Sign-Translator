import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import Logo from "@/assets/Logo.png";
import "./SplashScreen.css";

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500);
    const removeTimer = setTimeout(onFinish, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      {/* Animated particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#f0f4f8" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 150 } },
          },
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            color: { value: "#3b82f6" },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: true,
              anim: { enable: true, speed: 0.3, opacity_min: 0.2, sync: false },
            },
            size: {
              value: { min: 10, max: 30 },
              random: true,
              anim: { enable: true, speed: 2, size_min: 5, sync: false },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
            },
            links: { enable: false },
          },
          detectRetina: true,
        }}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      />

      {/* Logo */}
      <img src={Logo} alt="Logo" className="logo animate-logo" />
    </div>
  );
}