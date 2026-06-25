import { useEffect, useRef } from 'react';

export function use3DTilt(maxTilt = 6) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Range from -1 to 1
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      // Calculate rotations
      const rx = -(percentY * maxTilt);
      const ry = percentX * maxTilt;

      // Calculate mouse position inside element as percentages
      const mx = (x / rect.width) * 100;
      const my = (y / rect.height) * 100;

      element.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      element.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      element.style.setProperty('--mx', `${mx.toFixed(2)}%`);
      element.style.setProperty('--my', `${my.toFixed(2)}%`);
    };

    const handleMouseLeave = () => {
      element.style.setProperty('--rx', '0deg');
      element.style.setProperty('--ry', '0deg');
      element.style.setProperty('--mx', '50%');
      element.style.setProperty('--my', '50%');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return elementRef;
}
