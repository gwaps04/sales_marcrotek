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

    // --- POPUP LOGIC (UPDATED) ---
    const hasSeenNewsletter = localStorage.getItem('macrotek_newsletter_seen');

    // FIX: Add check for "location.pathname === '/'"
    // This ensures it ONLY runs on the Homepage
    if (!hasSeenNewsletter && location.pathname === '/') {
      
      const timer = setTimeout(() => {
        setShowNewsletter(true);
        localStorage.setItem('macrotek_newsletter_seen', 'true');
      }, 2500);

      // Cleanup: If user leaves the homepage before 2.5s, cancel the timer!
      return () => clearTimeout(timer); 
    }
  }, [location.pathname]); // FIX: Re-run this check whenever the URL changes

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
      {/* NOTE: MyNavbar is here. If you want to hide the navbar on the audit page too,
         we can add a check like: {location.pathname === '/' && <MyNavbar />}
         For now, keeping it visible as per standard.
      */}
      <MyNavbar />
      
      {/* GLOBAL POPUP */}
      <NewsletterModal 
        show={showNewsletter} 
        onClose={() => setShowNewsletter(false)} 
      />

      <Routes>
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
        <Route path="/free-audit" element={<LeadMagnet />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App