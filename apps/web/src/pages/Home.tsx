import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import TerminalWindow from '../components/TerminalWindow.tsx';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-page-container fade-in">
      
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <TerminalWindow title="identity@codzhub:~" className="hero-terminal" noTilt>
            <h1 className="hero-title">
              {t('home.heroTitle')}
            </h1>
            <p className="hero-subtitle">
              {t('home.heroSubtitle')}
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary btn-large">
                {t('home.cta')}
              </Link>
              <Link to="/services" className="btn btn-secondary btn-large">
                {t('nav.services')}
              </Link>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* 2. Services Preview Section */}
      <section className="container">
        <div className="section-header">
          <h2 className="section-title">{t('home.servicesPreviewTitle')}</h2>
          <p className="section-subtitle">
            {t('home.servicesPreviewSubtitle')}
          </p>
        </div>

        <div className="grid-3">
          <TerminalWindow title="web-app.sh" className="card-glass-flex">
            <div>
              <span className="badge badge-margin">App</span>
              <h3 className="card-title">{t('services.webAppTitle')}</h3>
              <p className="card-desc">{t('services.webAppDesc')}</p>
            </div>
            <Link to="/services" className="card-link">
              <span>{t('nav.services')}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </TerminalWindow>

          <TerminalWindow title="architecture.sh" className="card-glass-flex">
            <div>
              <span className="badge badge-margin">DB & API</span>
              <h3 className="card-title">{t('services.architectureTitle')}</h3>
              <p className="card-desc">{t('services.architectureDesc')}</p>
            </div>
            <Link to="/services" className="card-link">
              <span>{t('nav.services')}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </TerminalWindow>

          <TerminalWindow title="consultancy.sh" className="card-glass-flex">
            <div>
              <span className="badge badge-margin">Audits</span>
              <h3 className="card-title">{t('services.consultancyTitle')}</h3>
              <p className="card-desc">{t('services.consultancyDesc')}</p>
            </div>
            <Link to="/services" className="card-link">
              <span>{t('nav.services')}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </TerminalWindow>
        </div>
      </section>

      {/* 3. Why CodzHub Section */}
      <section className="why-us-section">
        <div className="container grid-2 grid-align-center">
          <div>
            <span className="badge badge-margin">Elite standards</span>
            <h2 className="why-us-title">
              {t('home.whyUsTitle')}
            </h2>
            <p className="why-us-text">
              {t('home.whyUsDesc')}
            </p>
          </div>
          <div className="why-us-list">
            <TerminalWindow title="zero-bloat.sh" className="why-us-card">
              <h4 className="why-us-icon-title why-us-card-mint">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Zero Bloat Design</span>
              </h4>
              <p className="why-us-card-desc">
                No heavy bundles or frameworks. Blazing-fast loading times.
              </p>
            </TerminalWindow>
            <TerminalWindow title="direct-comms.sh" className="why-us-card">
              <h4 className="why-us-icon-title why-us-card-cyan">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Direct Communication</span>
              </h4>
              <p className="why-us-card-desc">
                You collaborate directly with Ziad Elsayed. Zero administrative overhead.
              </p>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section className="container">
        <div className="section-header">
          <h2 className="section-title">{t('home.processTitle')}</h2>
        </div>

        <div className="grid-3">
          <TerminalWindow title="discover.sh" className="process-step">
            <h3 className="process-step-title process-step-title-primary">{t('home.step1Title')}</h3>
            <p className="process-step-desc">{t('home.step1Desc')}</p>
          </TerminalWindow>
          <TerminalWindow title="build.sh" className="process-step">
            <h3 className="process-step-title process-step-title-accent">{t('home.step2Title')}</h3>
            <p className="process-step-desc">{t('home.step2Desc')}</p>
          </TerminalWindow>
          <TerminalWindow title="launch.sh" className="process-step">
            <h3 className="process-step-title process-step-title-mint">{t('home.step3Title')}</h3>
            <p className="process-step-desc">{t('home.step3Desc')}</p>
          </TerminalWindow>
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="container final-cta-section">
        <TerminalWindow title="hire@codzhub:~" className="final-cta-card" noTilt>
          <h2 className="section-title">{t('home.finalCtaTitle')}</h2>
          <p className="hero-subtitle">
            {t('home.finalCtaSubtitle')}
          </p>
          <Link to="/contact" className="btn btn-primary btn-xlarge">
            {t('home.finalCtaButton')}
          </Link>
        </TerminalWindow>
      </section>

    </div>
  );
}
