import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { usePageLoading } from '../hooks/usePageLoading.ts';
import SkeletonLoader from '../components/SkeletonLoader.tsx';
import TerminalWindow from '../components/TerminalWindow.tsx';

export default function Services() {
  const { t, language } = useLanguage();
  const loading = usePageLoading();

  const servicesList = [
    {
      titleKey: 'services.websitesTitle',
      descKey: 'services.websitesDesc',
      chipKey: 'services.websitesChip',
      badgeClass: 'badge-indigo'
    },
    {
      titleKey: 'services.webSystemsTitle',
      descKey: 'services.webSystemsDesc',
      chipKey: 'services.webSystemsChip',
      badgeClass: 'badge-blue'
    },
    {
      titleKey: 'services.dashboardsTitle',
      descKey: 'services.dashboardsDesc',
      chipKey: 'services.dashboardsChip',
      badgeClass: 'badge-cyan'
    },
    {
      titleKey: 'services.saasTitle',
      descKey: 'services.saasDesc',
      chipKey: 'services.saasChip',
      badgeClass: 'badge-indigo'
    },
    {
      titleKey: 'services.mobileTitle',
      descKey: 'services.mobileDesc',
      chipKey: 'services.mobileChip',
      badgeClass: 'badge-mint'
    },
    {
      titleKey: 'services.backendTitle',
      descKey: 'services.backendDesc',
      chipKey: 'services.backendChip',
      badgeClass: 'badge-cyan'
    }
  ];

  const getTerminalTitle = (key: string) => {
    const raw = key.split('.').pop() || '';
    const cleaned = raw.replace('Title', '').replace(/([A-Z])/g, '_$1').toLowerCase();
    return `${cleaned}.sh`;
  };

  if (loading) {
    return (
      <div className="services-page-container fade-in">
        <SkeletonLoader variant="hero" />
        <SkeletonLoader variant="grid" count={6} />
      </div>
    );
  }

  return (
    <div className="services-page-container fade-in">
      
      {/* Header Section */}
      <section className="container services-header">
        <span className="badge">Expertise</span>
        <h1 className="hero-title">{t('services.title')}</h1>
        <p className="hero-subtitle">{t('services.subtitle')}</p>
      </section>

      {/* Services Grid (6 Services Only) */}
      <section className="container">
        <div className="services-grid">
          {servicesList.map((service, index) => (
            <TerminalWindow 
              key={index} 
              title={getTerminalTitle(service.titleKey)}
              className="service-card"
            >
              <div>
                <span className={`badge badge-outline ${service.badgeClass} badge-margin`}>
                  {t(service.chipKey)}
                </span>
                <h3 className="card-title">
                  {t(service.titleKey)}
                </h3>
                <p className="card-desc">
                  {t(service.descKey)}
                </p>
              </div>
            </TerminalWindow>
          ))}
        </div>
      </section>

      {/* Project Timeline Section */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-margin">Workflow</span>
            <h2 className="section-title">{t('services.timelineTitle')}</h2>
          </div>

          <div className="grid-2 timeline-grid">
            <div className="timeline-col">
              <TerminalWindow title="step_1_discovery.sh" className="timeline-card">
                <h4 className="timeline-title timeline-title-indigo">{t('services.timelineStep1')}</h4>
                <p className="timeline-desc">
                  {t('services.timelineStep1Desc')}
                </p>
              </TerminalWindow>
              <TerminalWindow title="step_2_planning.sh" className="timeline-card">
                <h4 className="timeline-title timeline-title-blue">{t('services.timelineStep2')}</h4>
                <p className="timeline-desc">
                  {t('services.timelineStep2Desc')}
                </p>
              </TerminalWindow>
            </div>
            <div className="timeline-col">
              <TerminalWindow title="step_3_development.sh" className="timeline-card">
                <h4 className="timeline-title timeline-title-cyan">{t('services.timelineStep3')}</h4>
                <p className="timeline-desc">
                  {t('services.timelineStep3Desc')}
                </p>
              </TerminalWindow>
              <TerminalWindow title="step_4_delivery.sh" className="timeline-card">
                <h4 className="timeline-title timeline-title-mint">{t('services.timelineStep4')}</h4>
                <p className="timeline-desc">
                  {t('services.timelineStep4Desc')}
                </p>
              </TerminalWindow>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container services-header">
        <h2 className="section-title">
          {language === 'en' ? 'Have a custom system to build?' : 'هل لديك نظام مخصص تريد بناءه؟'}
        </h2>
        <p className="hero-subtitle">
          {language === 'en' ? 'Get direct support mapping your timeline and goals.' : 'احصل على دعم مباشر لرسم خطة مشروعك وأهدافك.'}
        </p>
        <Link to="/contact" className="btn btn-primary btn-large">
          {t('nav.cta')}
        </Link>
      </section>

    </div>
  );
}
