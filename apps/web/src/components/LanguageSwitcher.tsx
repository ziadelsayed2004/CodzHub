import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLanguageClick = (targetLang: 'en' | 'ar', e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (targetLang !== language) {
      setIsAnimating(true);
      toggleLanguage();
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 450);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <fieldset className={`switcher lang-${language} ${isAnimating ? 'is-animating' : ''}`}>
      <legend className="switcher__legend">Choose language</legend>
      <label 
        className="switcher__option"
        onClick={(e) => handleLanguageClick('en', e)}
      >
        <input
          className="switcher__input"
          type="radio"
          name="language"
          value="en"
          checked={language === 'en'}
          readOnly
        />
        <span className="switcher__lang-text">EN</span>
      </label>
      <label 
        className="switcher__option"
        onClick={(e) => handleLanguageClick('ar', e)}
      >
        <input
          className="switcher__input"
          type="radio"
          name="language"
          value="ar"
          checked={language === 'ar'}
          readOnly
        />
        <span className="switcher__lang-text">ع</span>
      </label>
      <div className="switcher__indicator"></div>
    </fieldset>
  );
}
