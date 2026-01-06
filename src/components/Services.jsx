import React from 'react';
// Icons: Store (Retail), Funnel (Sales/Auto), Building (Enterprise)
import { FaStore, FaFunnelDollar, FaBuilding } from 'react-icons/fa';

const Services = () => {
  return (
    <section id="services" className="section-padding py-5 bg-gradient-midnight">
      <div className="container py-5">
        
        {/* HEADLINE */}
        <div className="row mb-5 text-center" data-aos="fade-up">
          <div className="col-lg-8 mx-auto text-white">
            <h6 className="text-uppercase text-danger fw-bold letter-spacing-2">What We Deliver</h6>
            <h2 className="display-5 fw-bold">Our Core Solutions</h2>
            <p className="lead opacity-75">
              Scalable digital infrastructure designed for every stage of business growth.
            </p>
          </div>
        </div>

        {/* 3 COLUMN ROW */}
        <div className="row g-4">
          
          {/* SERVICE 1: Storefront */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="service-card p-4 text-center">
              {/* Icon with Red Background */}
              <div className="icon-box bg-danger text-white shadow">
                <FaStore />
              </div>
              <h3 className="h4 fw-bold text-dark mb-3">Modern Storefronts</h3>
              <p className="text-muted">
                Perfect for local businesses needing a professional 24/7 presence. We build responsive, SEO-optimized sites that showcase your brand and capture local traffic.
              </p>
              <ul className="list-unstyled text-muted small mt-3 text-start px-3">
                <li className="mb-2">✓ Mobile-First Design</li>
                <li className="mb-2">✓ Google Maps Integration</li>
                <li>✓ Fast Loading Speed</li>
              </ul>
            </div>
          </div>

          {/* SERVICE 2: Sales & Automation (Highlighted) */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            {/* Added a border-danger to highlight this is the 'popular' choice */}
            <div className="service-card p-4 text-center border border-2 border-danger position-relative">
              
              {/* Optional 'Popular' Badge */}
              <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger px-3 py-2 z-1 shadow-sm">
                MOST POPULAR
              </span>

              <div className="icon-box bg-dark text-white shadow">
                <FaFunnelDollar />
              </div>
              <h3 className="h4 fw-bold text-dark mb-3">Sales & Automation</h3>
              <p className="text-muted">
                Turn visitors into revenue. We combine high-converting landing pages with backend workflow automation to follow up, schedule, and sell while you sleep.
              </p>
              <ul className="list-unstyled text-muted small mt-3 text-start px-3">
                <li className="mb-2">✓ CRM Integration (GHL/HubSpot)</li>
                <li className="mb-2">✓ Automated Email Sequences</li>
                <li>✓ Payment Gateway Setup</li>
              </ul>
            </div>
          </div>

          {/* SERVICE 3: Enterprise */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div className="service-card p-4 text-center">
              <div className="icon-box bg-danger text-white shadow">
                <FaBuilding />
              </div>
              <h3 className="h4 fw-bold text-dark mb-3">Enterprise Apps</h3>
              <p className="text-muted">
                Complex data solutions for large organizations. We architect custom web applications, internal dashboards, and secure databases tailored to your operations.
              </p>
              <ul className="list-unstyled text-muted small mt-3 text-start px-3">
                <li className="mb-2">✓ Custom Database Architecture</li>
                <li className="mb-2">✓ Staff/Admin Portals</li>
                <li>✓ Advanced Security Protocols</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;