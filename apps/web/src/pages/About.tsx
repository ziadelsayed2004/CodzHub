import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import SkeletonLoader from '../components/SkeletonLoader.tsx';
import TerminalWindow from '../components/TerminalWindow.tsx';

export default function About() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="about-page-container fade-in">
        <SkeletonLoader variant="about" />
      </div>
    );
  }

  return (
    <div className="about-page-container fade-in">
      
      {/* 1. About Hero Section */}
      <section className="container about-header">
        <span className="badge">Our Studio</span>
        <h1 className="hero-title">{t('about.title')}</h1>
        <p className="hero-subtitle">{t('about.subtitle')}</p>
      </section>

      {/* 2. Founder Section */}
      <section className="container">
        <TerminalWindow title="founder@codzhub:~" className="grid-2 founder-card">
          {/* Stylized CSS monogram block to serve as Ziad Elsayed's profile representation without using a fake photo */}
          <div className="monogram-container">
            <div className="monogram-block">
              <span className="monogram-initials">
                ZE
              </span>
              <span className="monogram-subtitle">
                Founder
              </span>
            </div>
          </div>

          <div>
            <span className="badge badge-margin">Founder & Lead</span>
            <h2 className="card-title">{t('about.bioTitle')}</h2>
            <p className="bio-text">
              {t('about.bioText')}
            </p>
          </div>
        </TerminalWindow>
      </section>

      {/* 3. Principles Section */}
      <section className="container">
        <div className="section-header">
          <h2 className="section-title">{t('about.valuesTitle')}</h2>
        </div>

        <div className="grid-2">
          <TerminalWindow title="values/innovation.sh" className="value-terminal-card">
            <div className="value-card-header">
              <span className="material-symbols-outlined value-title-mint">auto_awesome</span>
              <h3 className="value-title-mint">
                {t('about.value1Title')}
              </h3>
            </div>
            <p className="card-desc">
              {t('about.value1Text')}
            </p>
          </TerminalWindow>
          <TerminalWindow title="values/craftsmanship.sh" className="value-terminal-card">
            <div className="value-card-header">
              <span className="material-symbols-outlined value-title-cyan">auto_awesome</span>
              <h3 className="value-title-cyan">
                {t('about.value2Title')}
              </h3>
            </div>
            <p className="card-desc">
              {t('about.value2Text')}
            </p>
          </TerminalWindow>
        </div>
      </section>

      {/* 4. Technical Mindset Section */}
      <section className="why-us-section">
        <div className="container mindset-container">
          <TerminalWindow title="mindset@codzhub:~" className="mindset-inner">
            <span className="badge badge-margin">Quality First</span>
            <h2 className="section-title">{t('about.mindsetTitle')}</h2>
            <p className="why-us-text">
              {t('about.mindsetDesc')}
            </p>
          </TerminalWindow>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="container about-header">
        <h2 className="section-title">{t('about.ctaTitle')}</h2>
        <p className="hero-subtitle">{t('about.ctaSubtitle')}</p>
        <Link to="/contact" className="btn btn-primary btn-large">
          {t('about.ctaButton')}
        </Link>
      </section>

    </div>
  );
}
