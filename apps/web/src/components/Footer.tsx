import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import LogoMark from './LogoMark.tsx';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top-row">
          {/* Brand Logo and Owner Info */}
          <div>
            <Link to="/" className="brand-logo-container">
              <LogoMark size={42} className="brand-logo-mark" />
              <span className="brand-logo-text">
                <span className="brand-text-codz">Codz</span>
                <span className="brand-text-hub">Hub</span>
              </span>
            </Link>
            <p className="footer-brand-desc">
              {t('footer.owner')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <Link to="/" className="footer-link-item">{t('nav.home')}</Link>
            <Link to="/services" className="footer-link-item">{t('nav.services')}</Link>
            <Link to="/about" className="footer-link-item">{t('nav.about')}</Link>
            <Link to="/contact" className="footer-link-item">{t('nav.contact')}</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-row">
          <p>&copy; {currentYear} CodzHub. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
