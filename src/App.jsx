import { useEffect, useState } from 'react' // Added useState
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
import NewsletterModal from './components/NewsletterModal' // Import the Modal

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

    // --- POPUP LOGIC ---
    // Check if the user has already seen the newsletter
    const hasSeenNewsletter = localStorage.getItem('macrotek_newsletter_seen');

    if (!hasSeenNewsletter) {
      // If NOT seen, wait 2.5 seconds, then show it
      const timer = setTimeout(() => {
        setShowNewsletter(true);
        // Mark as seen immediately so it doesn't pop up on refresh
        localStorage.setItem('macrotek_newsletter_seen', 'true');
      }, 2500);

      return () => clearTimeout(timer); // Cleanup timer if user leaves quickly
    }
  }, []);

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
      
      {/* THE GLOBAL POPUP 
         It lives outside the Routes so it can overlay anything, 
         though logic above restricts it to first load only.
      */}
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