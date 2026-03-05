import { useEffect, useState } from "react";

const INTRO_KEY = "intro_seen";

const IntroMotion = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem(INTRO_KEY, "true");

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3200);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-bg-page
        pointer-events-none
        intro-fade-out
      "
    >
      {/* Animated Background */}
      <div className="absolute inset-0 intro-gradient" />

      {/* Floating Particles */}
      <div className="absolute inset-0 intro-particles" />

      {/* Center Scene */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Expanding Halo */}
        <div className="absolute intro-halo" />

        {/* Core Shape */}
        <div className="intro-core">
          <div className="intro-core-inner" />
        </div>
      </div>
    </div>
  );
};

export default IntroMotion;
