import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import LogoMark from './LogoMark.tsx';

export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Monitor scroll height to trigger liquid glass active state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
        <div className="nav-shell container glass glass-pill">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo-container">
            <LogoMark size={42} className="brand-logo-mark" />
            <span className="brand-logo-text">
              <span className="brand-text-codz">Codz</span>
              <span className="brand-text-hub">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop mobile-hide">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              {t('nav.home')}
            </Link>
            <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>
              {t('nav.services')}
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              {t('nav.about')}
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="nav-actions-desktop mobile-hide">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Link to="/contact" className="btn btn-primary nav-cta-btn">
              {t('nav.cta')}
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''} desktop-hide`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`mobile-dropdown ${menuOpen ? 'open' : ''} desktop-hide`}>
          <div className="dropdown-inner glass glass-strong">
            <nav className="dropdown-links">
              <Link to="/" className={`dropdown-link ${isActive('/') ? 'active' : ''}`}>
                {t('nav.home')}
              </Link>
              <Link to="/services" className={`dropdown-link ${isActive('/services') ? 'active' : ''}`}>
                {t('nav.services')}
              </Link>
              <Link to="/about" className={`dropdown-link ${isActive('/about') ? 'active' : ''}`}>
                {t('nav.about')}
              </Link>
              <Link to="/contact" className={`dropdown-link ${isActive('/contact') ? 'active' : ''}`}>
                {t('nav.contact')}
              </Link>
            </nav>
            
            <div className="dropdown-divider" />
            
            <div className="dropdown-actions">
              <div className="dropdown-switchers-row">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              <Link to="/contact" className="btn btn-primary btn-fluid">
                {t('nav.cta')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Dropdown Overlay */}
      <div className={`dropdown-overlay ${menuOpen ? 'open' : ''} desktop-hide`} onClick={() => setMenuOpen(false)} />
    </>
  );
}
