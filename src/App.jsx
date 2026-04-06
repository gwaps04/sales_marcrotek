import { useEffect, useState } from 'react' 
import { Routes, Route, useLocation, Navigate } from 'react-router-dom' 
import { supabase } from './supabaseClient'

// Layout Components
import MyNavbar from './components/MyNavbar'
import Footer from './components/Footer' 
import ScrollToTop from './components/ScrollToTop'
import NewsletterModal from './components/NewsletterModal' 

// Landing Page Sections
import Hero from './components/Hero'
import AuthorityBar from './components/AuthorityBar'
import PainSolution from './components/PainSolution'
import Services from './components/Services'
import Testimonials from './components/Testimonials' 
import BookingSection from './components/BookingSection'

// Page Components
import Step1Watch from './pages/Step1Watch' // Woz: Added new page
import BookingPage from './components/BookingPage'
import PreQualificationAssessment from './pages/PreQualificationAssessment'
import ClientFeedbackForm from './pages/ClientFeedbackForm'

// --- ADMINISTRATOR & CRM COMPONENTS ---
import AdministratorLogin from './pages/AdministratorLogin'
import Administrator from './pages/Administrator'
import ManageClient from './pages/ManageClient' 

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const location = useLocation();
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [session, setSession] = useState(null);

  // Woz: Updated logic to hide navbar/footer on CRM pages AND the new step1-watch page.
  const hideLayout = 
    location.pathname === '/admin-login' || 
    location.pathname.startsWith('/administrator') || 
    location.pathname === '/feedback' ||
    location.pathname === '/step1-watch'; // Woz: Hide layout for the new page

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, [location.pathname]);

  useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          setTimeout(() => { element.scrollIntoView({ behavior: 'smooth' }); }, 100); 
        }
      } else {
        window.scrollTo(0, 0);
      }
  }, [location]); 

  return (
    <div className="d-flex flex-column min-vh-100"> 
      {!hideLayout && <MyNavbar />}
      
      {!hideLayout && (
        <NewsletterModal 
          show={showNewsletter} 
          onClose={() => setShowNewsletter(false)} 
        />
      )}

      <Routes>
        {/* Main Landing Page */}
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
        
        {/* Client-Facing Routes */}
        {/* Woz: Removed LeadMagnet and result routes per instructions */}
        <Route path="/step1-watch" element={<Step1Watch />} />
        <Route path="/book-now" element={<BookingPage />} />
        <Route path="/assessment" element={<PreQualificationAssessment />} />
        <Route path="/feedback" element={<ClientFeedbackForm />} />
        
        {/* --- ADMINISTRATOR ROUTES --- */}
        <Route path="/admin-login" element={<AdministratorLogin />} />
        
        <Route 
          path="/administrator" 
          element={session ? <Administrator /> : <Navigate to="/admin-login" />} 
        />

        <Route 
          path="/administrator/manage/:clientId" 
          element={session ? <ManageClient /> : <Navigate to="/admin-login" />} 
        />

        <Route path="/dashboard" element={<Navigate to="/administrator" />} />
      </Routes>

      {!hideLayout && <Footer />}
      <ScrollToTop />
    </div>
  )
}

export default App