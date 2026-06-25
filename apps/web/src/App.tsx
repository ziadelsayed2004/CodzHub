import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Services from './pages/Services.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import DisplacementFilters from './components/DisplacementFilters.tsx';
import Preloader from './components/Preloader.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';

export default function App() {
  return (
    <Router>
      <Preloader />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <DisplacementFilters />
    </Router>
  );
}
