import { useEffect, useState, useCallback } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Logo from "@/assets/Logo.png";
import "./SplashScreen.css";

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const [fadeOut, setFadeOut] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: any) => {
    console.log(container);
  }, []);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      
      {/* MODERN PARTICLES */}
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: "#0f172a" },

            fpsLimit: 60,

            particles: {
              number: { value: 40, density: { enable: true } },

              color: { value: "#8b5cf6" },

              shape: { type: "circle" },

              opacity: {
                value: 0.4
              },

              size: {
                value: { min: 2, max: 6 }
              },

              move: {
                enable: true,
                speed: 1,
                direction: "none",
                outModes: "bounce"
              },

              links: {
                enable: true,
                color: "#8b5cf6",
                distance: 150,
                opacity: 0.3
              }
            },

            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse"
                }
              }
            },

            detectRetina: true
          }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1
          }}
        />
      )}

      {/* LOGO */}
      <div className="relative z-10 flex flex-col items-center">
        <img src={Logo} alt="Logo" className="logo animate-logo" />
        <p className="text-white mt-3 text-sm opacity-70">
         
        </p>
      </div>

    </div>
  );
}