import React, { useEffect, useState } from 'react';
import { FaTimes, FaSpinner, FaShieldAlt, FaLock, FaFileDownload } from 'react-icons/fa'; 
import { jsPDF } from "jspdf"; // Woz: Added for PDF generation

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx0-29RKhz3T0TqvHoRCdWyO7XAM3rtyCF4JJZx4tRDD3s2d5rLUuIhFpfdT9OKPeUL/exec"; 

const NewsletterModal = ({ show, onClose, score }) => {
  const [formData, setFormData] = useState({ fullName: '', mobile: '', email: '' });
  const [status, setStatus] = useState('idle'); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!show) {
      setStatus('idle');
      setMessage('');
      setFormData({ fullName: '', mobile: '', email: '' });
    }
  }, [show]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const primaryColor = "#003366";
    let benchmarkTitle = "";
    let benchmarkDesc = "";
    let benchmarkFocus = "";
    let statusColor = "";

    // Woz: Mapping the Score to Benchmarks based on Guide
    if (score <= 7) {
      benchmarkTitle = "FOUNDATION BENCHMARK";
      benchmarkDesc = "Your current position: Early-stage digital presence. This means limited website authority, no predictable lead system, and manual processes slowing growth.";
      benchmarkFocus = "Build a strong digital foundation (website + lead capture + basic automation).";
      statusColor = "#DC3545"; // Red
    } else if (score <= 11) {
      benchmarkTitle = "GROWTH BENCHMARK";
      benchmarkDesc = "Your current position: Developing but inconsistent systems. Marketing exists but lacks consistency; follow-ups and conversions need improvement.";
      benchmarkFocus = "Optimize systems and introduce automation for consistent lead flow.";
      statusColor = "#FD7E14"; // Orange
    } else {
      benchmarkTitle = "SCALE BENCHMARK";
      benchmarkDesc = "Your current position: High-performing digital system. Strong online presence and workflows with reliable lead generation.";
      benchmarkFocus = "Advanced automation, conversion optimization, and scaling strategies.";
      statusColor = "#198754"; // Green
    }

    // PDF Styling & Content
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor("#FFFFFF");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("MACROTEK DIGITAL SOLUTIONS", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("BUSINESS GROWTH BENCHMARK REPORT", 105, 30, { align: "center" });

    doc.setTextColor("#333333");
    doc.setFontSize(12);
    doc.text(`Client Name: ${formData.fullName}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 62);
    doc.text(`Total Assessment Score: ${score} / 15`, 20, 69);

    doc.setDrawColor(statusColor);
    doc.setLineWidth(1);
    doc.line(20, 75, 190, 75);

    doc.setTextColor(statusColor);
    doc.setFontSize(16);
    doc.text(benchmarkTitle, 105, 90, { align: "center" });

    doc.setTextColor("#444444");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const splitDesc = doc.splitTextToSize(benchmarkDesc, 170);
    doc.text(splitDesc, 20, 105);

    doc.setFont("helvetica", "bold");
    doc.text("RECOMMENDED STRATEGY FOCUS:", 20, 135);
    doc.setFont("helvetica", "normal");
    const splitFocus = doc.splitTextToSize(benchmarkFocus, 170);
    doc.text(splitFocus, 20, 142);

    doc.setDrawColor("#EEEEEE");
    doc.line(20, 160, 190, 160);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const closingLine = "Based on your results, we’ll recommend the most effective strategy to help you attract more clients, automate operations, and scale efficiently.";
    doc.text(doc.splitTextToSize(closingLine, 170), 20, 170);

    // Woz: Added Step 1 Journey Link at the bottom part
    doc.setDrawColor("#EEEEEE");
    doc.line(20, 190, 190, 190);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("OFFICIAL GROWTH JOURNEY (STEP 1):", 105, 200, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#DC143C");
    doc.text("https://sales-macrotek.vercel.app/step1-watch", 105, 208, { align: "center" });

    doc.save(`Macrotek_Benchmark_${formData.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData) 
      });
      const data = await response.json();
      if (data.result === "success") {
        setStatus('success');
        // Woz: Updated with a catchy punchline regarding email invitation
        setMessage("Your roadmap to scaling is ready! 🚀 We've also sent an exclusive invitation to your inbox to begin your automated business growth journey with us. Check your email now!");
      } else {
        setStatus('error');
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setStatus('error');
      setMessage("Connection failed. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="custom-modal-overlay d-flex align-items-center justify-content-center" 
         style={{ backgroundColor: 'rgba(0, 30, 60, 0.85)', zIndex: 1050, padding: '10px' }}
         onClick={onClose}>
      
      <div className="bg-white rounded-0 shadow-lg position-relative d-flex flex-column" 
        style={{ maxWidth: '500px', width: '100%', maxHeight: '92vh', overflow: 'hidden', borderTop: '6px solid #28a745' }}
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        <button onClick={onClose} className="btn-close position-absolute top-0 end-0 m-3" style={{ zIndex: 10 }}></button>

        <div style={{ overflowY: 'auto', flex: '1 1 auto' }}>
          <div className="p-4 text-center border-bottom bg-light">
            <div className="d-flex flex-column align-items-center gap-2">
              <FaShieldAlt className="text-success" size={40} /> 
              <h6 className="fw-bold mb-0 font-montserrat text-uppercase mt-2" style={{ color: '#003366', letterSpacing: '1px' }}>
                SAFE AND SECURE GUARANTEED
              </h6>
            </div>
          </div>

          <div className="p-4 p-md-5 pt-4">
            {status === 'success' ? (
              <div className="py-4 text-center">
                <div className="mb-3 text-success"><FaShieldAlt size={60} /></div>
                <h3 className="fw-bold text-dark mb-2">Results Ready!</h3>
                <p className="text-muted mb-4">{message}</p>
                <button 
                  onClick={generatePDF}
                  className="btn btn-success btn-lg rounded-0 fw-bold w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaFileDownload /> DOWNLOAD PDF BENCHMARK
                </button>
                <button onClick={onClose} className="btn btn-link text-muted mt-3 small text-decoration-none">Close</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-dark font-montserrat h5 mb-2">Complete Your Submission</h3>
                  <p className="text-muted small">Finalize your growth assessment and secure your results.</p>
                </div>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div className="form-group">
                    <label className="x-small fw-bold text-uppercase text-muted mb-1">Full Name</label>
                    <input type="text" name="fullName" className="form-control rounded-0" value={formData.fullName} onChange={handleChange} required disabled={status === 'submitting'} />
                  </div>
                  <div className="form-group">
                    <label className="x-small fw-bold text-uppercase text-muted mb-1">Mobile Number</label>
                    <input type="tel" name="mobile" className="form-control rounded-0" value={formData.mobile} onChange={handleChange} required disabled={status === 'submitting'} />
                  </div>
                  <div className="form-group">
                    <label className="x-small fw-bold text-uppercase text-muted mb-1">Business Email</label>
                    <input type="email" name="email" className="form-control rounded-0" value={formData.email} onChange={handleChange} required disabled={status === 'submitting'} />
                  </div>

                  {status === 'error' && <div className="alert alert-danger py-2 small">{message}</div>}

                  <button type="submit" className="btn btn-primary btn-lg rounded-0 fw-bold mt-2" style={{ backgroundColor: '#003366', borderColor: '#003366' }} disabled={status === 'submitting'}>
                    {status === 'submitting' ? <><FaSpinner className="spin-animation" /> SECURING...</> : "SUBMIT & SECURE RESULTS"}
                  </button> 
                </form>

                <div className="mt-4 pt-3 border-top text-center">
                  <p className="text-muted mb-0" style={{ fontSize: '0.7rem' }}>
                    <FaLock className="me-1 text-success" /> Your information is <strong>100% protected</strong> through the <strong>Data Privacy Act</strong>.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;