import { useEffect } from 'react'
import MyNavbar from './components/MyNavbar'
import Hero from './components/Hero'
import AuthorityBar from './components/AuthorityBar'
import PainSolution from './components/PainSolution'
import Services from './components/Services'
import Testimonials from './components/Testimonials' 
import BookingSection from './components/BookingSection'
import Footer from './components/Footer' 
import ScrollToTop from './components/ScrollToTop'

import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  
  // 1. THIS IS THE NEW LOGIC FOR REFRESH
  useEffect(() => {
    // Tell the browser NOT to restore the scroll position automatically
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force the window to jump to the very top
    window.scrollTo(0, 0);

    // Initialize Animations
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []); // Empty array [] means this runs exactly once on page load/refresh

  return (
    <div className="d-flex flex-column min-vh-100"> 
      
      <MyNavbar />
      <Hero />
      <AuthorityBar />
      <PainSolution />
      <Services />
      <Testimonials />
      <BookingSection />
      <Footer />

      <ScrollToTop />

    </div>
  )
}

export default Home;