import React from 'react';
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

        <div className="row g-4">
          {/* SERVICE 1: Storefront */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="service-card p-4 text-center">
              <div className="icon-box bg-danger text-white shadow">
                <FaStore />
              </div>
              {/* Changed text-dark to text-white */}
              <h3 className="h4 fw-bold text-white mb-3">Modern Storefronts</h3>
              {/* Changed text-muted to text-light */}
              <p className="text-light opacity-75">
                Perfect for local businesses needing a professional 24/7 presence. We build responsive, SEO-optimized sites that showcase your brand.
              </p>
              <ul className="list-unstyled text-light small mt-3 text-start px-3 opacity-75">
                <li className="mb-2">✓ Mobile-First Design</li>
                <li className="mb-2">✓ Google Maps Integration</li>
                <li>✓ Fast Loading Speed</li>
              </ul>
            </div>
          </div>

          {/* SERVICE 2: Sales & Automation */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="service-card p-4 text-center border border-2 border-danger position-relative">
              <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger px-3 py-2 z-1 shadow-sm">
                MOST POPULAR
              </span>
              <div className="icon-box bg-white text-danger shadow">
                <FaFunnelDollar />
              </div>
              <h3 className="h4 fw-bold text-white mb-3">Sales & Automation</h3>
              <p className="text-light opacity-75">
                Turn visitors into revenue. We combine high-converting landing pages with backend workflow automation to follow up and sell.
              </p>
              <ul className="list-unstyled text-light small mt-3 text-start px-3 opacity-75">
                <li className="mb-2">✓ CRM Integration</li>
                <li className="mb-2">✓ Automated Sequences</li>
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
              <h3 className="h4 fw-bold text-white mb-3">Enterprise Apps</h3>
              <p className="text-light opacity-75">
                Complex data solutions for large organizations. We architect custom applications, dashboards, and secure databases.
              </p>
              <ul className="list-unstyled text-light small mt-3 text-start px-3 opacity-75">
                <li className="mb-2">✓ Custom DB Architecture</li>
                <li className="mb-2">✓ Staff/Admin Portals</li>
                <li>✓ Advanced Security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;