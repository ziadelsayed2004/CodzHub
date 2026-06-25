import { useState, useEffect } from 'react';
import LogoMark from './LogoMark.tsx';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Lock body scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`cz-preloader-container ${fade ? 'fade-out' : ''}`}>
      <div className="cz-preloader-card">
        <LogoMark size={130} className="cz-preloader-logo" />
        <div className="cz-preloader-text-wrapper">
          <span className="cz-preloader-text-codz">Codz</span>
          <span className="cz-preloader-text-hub">Hub</span>
        </div>
      </div>
    </div>
  );
}
