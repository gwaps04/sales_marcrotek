import { useEffect, useState } from 'react' 
import { Routes, Route, useLocation } from 'react-router-dom' 
import MyNavbar from './components/MyNavbar'
import Hero from './components/Hero'
import AuthorityBar from './components/AuthorityBar'
import PainSolution from './components/PainSolution'
import Services from './components/Services'
import Testimonials from './components/Testimonials' 
import BookingSection from './components/BookingSection'
import Footer from './components/Footer' 
import ScrollToTop from './components/ScrollToTop'
import LeadMagnet from './pages/LeadMagnet' 
import BookingPage from './components/BookingPage'
import NewsletterModal from './components/NewsletterModal' 

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const location = useLocation();
  
  // STATE: Controls the Newsletter Popup
  const [showNewsletter, setShowNewsletter] = useState(false);

  // 1. REFRESH & ANIMATION LOGIC
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    const hasSeenNewsletter = localStorage.getItem('macrotek_newsletter_seen');

    if (!hasSeenNewsletter && location.pathname === '/') {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
        localStorage.setItem('macrotek_newsletter_seen', 'true');
      }, 2500);

      return () => clearTimeout(timer); 
    }
  }, [location.pathname]);

  // 2. SCROLL LOGIC
  useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100); 
        }
      } else {
        window.scrollTo(0, 0);
      }
  }, [location]); 

  return (
    <div className="d-flex flex-column min-vh-100"> 
      <MyNavbar />
      
      {/* GLOBAL POPUP */}
      <NewsletterModal 
        show={showNewsletter} 
        onClose={() => setShowNewsletter(false)} 
      />

      <Routes>
        {/* HOMEPAGE: Rendering sections directly as you had it before */}
        <Route path="/" element={
          <>
            <Hero />
            <AuthorityBar />
            <PainSolution />
            <Services />
            <Testimonials />
            <BookingSection />
          </>
        } />
        
        {/* OTHER PAGES */}
        <Route path="/free-audit" element={<LeadMagnet />} />
        <Route path="/book-now" element={<BookingPage />} />
      </Routes>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App