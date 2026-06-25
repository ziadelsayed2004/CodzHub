import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate progress percentage
      if (docHeight > 0) {
        setProgress(scrollTop / docHeight);
      } else {
        setProgress(0);
      }

      // Show button if scrolled more than 300px
      if (scrollTop > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Circumference of r=18 is 2 * pi * 18 = 113.1
  const circumference = 113.1;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <button
      className={`scroll-to-top ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg className="scroll-to-top__circle" width="46" height="46" viewBox="0 0 46 46">
        <circle
          className="scroll-to-top__circle-bg"
          cx="23"
          cy="23"
          r="18"
          fill="none"
          strokeWidth="3"
        />
        <circle
          className="scroll-to-top__circle-progress"
          cx="23"
          cy="23"
          r="18"
          fill="none"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="material-symbols-outlined scroll-to-top__icon">arrow_upward</span>
    </button>
  );
}
