import { useEffect, useState } from "react";
import Logo from "@/assets/Logo.png"; // your logo

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000); // start fade-out after 2s
    const removeTimer = setTimeout(onFinish, 2500); // remove splash after 2.5s
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <img src={Logo} alt="Logo" className="logo animate-logo" />
    </div>
  );
}