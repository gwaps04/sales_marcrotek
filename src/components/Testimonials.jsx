import React from 'react';

const Testimonials = () => {
  // Direct Unsplash links for "Asian Business Professional" vibe
  // Img 1: Professional Portrait
  const img1 = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80";
  // Img 2: Focused Working
  const img2 = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80";
  // Img 3: Partnership/Handshake
  const img3 = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80";

  return (
    <section id="testimonials" className="py-5 bg-light border-top border-bottom">
      <div className="container py-5">
        
        {/* HEADER */}
        <div className="row text-center mb-5" data-aos="fade-up">
          <div className="col-lg-8 mx-auto">
            <h6 className="text-uppercase text-danger fw-bold letter-spacing-2">
              A Note from the Founder
            </h6>
            <h2 className="display-5 fw-bold mb-3 font-montserrat">
              Building more than just websites. <br/>
              <span className="text-muted">We are building your business legacy.</span>
            </h2>
          </div>
        </div>

        {/* 3-COLUMN CONTENT */}
        <div className="row g-4">
          
          {/* COLUMN 1: THE VISION */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body p-4 text-center">
                {/* Image */}
                <img 
                  src={img1} 
                  alt="Founder Vision" 
                  className="rounded-circle mb-4 shadow-sm object-fit-cover"
                  style={{ width: '120px', height: '120px' }}
                />
                
                {/* Titles */}
                <h5 className="fw-bold font-montserrat">The Vision</h5>
                <p className="text-danger fw-bold small text-uppercase mb-3">
                  "We Speak Your Language"
                </p>
                
                {/* Quote Block */}
                <p className="text-muted fst-italic">
                  "I started Macrotek because I saw too many Filipino businesses struggling with disconnected tech. My promise is simple: we don't just write code; we understand your business model. We build systems that solve your specific operational headaches."
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 2: THE STANDARD */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body p-4 text-center">
                <img 
                  src={img2} 
                  alt="Founder Working" 
                  className="rounded-circle mb-4 shadow-sm object-fit-cover"
                  style={{ width: '120px', height: '120px' }}
                />
                
                <h5 className="fw-bold font-montserrat">The Standard</h5>
                <p className="text-danger fw-bold small text-uppercase mb-3">
                  "Enterprise Tech, SME Reach"
                </p>
                
                <p className="text-muted fst-italic">
                  "Small business shouldn't mean small impact. We are committed to bringing enterprise-grade automation and high-converting storefronts to local SMEs. You deserve the same powerful tools the big corporations use, but without the complexity."
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 3: THE PARTNERSHIP */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body p-4 text-center">
                <img 
                  src={img3} 
                  alt="Partnership" 
                  className="rounded-circle mb-4 shadow-sm object-fit-cover"
                  style={{ width: '120px', height: '120px' }}
                />
                
                <h5 className="fw-bold font-montserrat">The Partnership</h5>
                <p className="text-danger fw-bold small text-uppercase mb-3">
                  "Your Growth is Our Goal"
                </p>
                
                <p className="text-muted fst-italic">
                  "We are not a 'launch and leave' agency. Think of us as your digital partners. From the first line of code to your first automated sale, we are here to ensure your digital transformation actually delivers revenue, not just traffic."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;