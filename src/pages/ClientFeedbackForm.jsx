import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; 

const ClientFeedbackForm = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // 1. New state for the success view
  const [formData, setFormData] = useState({
    easeOfUse: '',
    timeToComfort: '',
    logicalLayout: '',
    overallRating: '',
    recommendLikelihood: '',
    reliability: '',
    oneWordSummary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('client_feedback')
        .insert([
          {
            ease_of_use: parseInt(formData.easeOfUse),
            time_to_comfort: formData.timeToComfort,
            logical_layout: formData.logicalLayout,
            overall_rating: formData.overallRating,
            recommend_likelihood: parseInt(formData.recommendLikelihood),
            reliability: formData.reliability,
            one_word_summary: formData.oneWordSummary,
          },
        ]);

      if (error) throw error;

      // 2. Trigger the professional success view instead of alert
      setShowSuccess(true);
      
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      alert('Submit failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Professional Success View
  if (showSuccess) {
    return (
      <div className="container py-5 animate-fade-in">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9 text-center">
            <div className="text-center mb-4">
              <img 
                src="/imgs/macroteklogo.png" 
                alt="Macrotek Logo" 
                style={{ maxHeight: '120px', width: 'auto' }}
                className="img-fluid"
              />
            </div>
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden p-5">
              <div style={{ height: '6px', backgroundColor: '#FF6B00', position: 'absolute', top: 0, left: 0, right: 0 }}></div>
              <div className="py-4">
                {/* Visual Checkmark Icon */}
                <div 
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255, 107, 0, 0.1)', border: '2px solid #FF6B00' }}
                >
                  <span style={{ fontSize: '2.5rem', color: '#FF6B00' }}>✓</span>
                </div>
                
                <h2 className="fw-bold mb-3" style={{ color: '#1A1A1A' }}>Thank You.</h2>
                <p className="lead text-muted mb-4 px-lg-5">
                  Your feedback has been successfully recorded. Your insights are vital in helping us refine and evolve the Macrotek experience.
                </p>
                <div className="pt-3">
                  <button 
                    onClick={() => window.location.href = '/'} 
                    className="btn btn-macrotek-orange px-5 py-2 fw-bold text-uppercase tracking-wider rounded-pill"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Standard Form View
  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          
          <div className="text-center mb-4">
            <img 
              src="/imgs/macroteklogo.png" 
              alt="Macrotek Logo" 
              style={{ maxHeight: '120px', width: 'auto' }}
              className="img-fluid"
            />
          </div>

          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div style={{ height: '6px', backgroundColor: '#FF6B00' }}></div>
            
            <div className="card-body p-4 p-md-5">
              <h2 className="mb-2 fw-bold text-center" style={{ color: '#1A1A1A' }}>
                System Feedback
              </h2>
              <p className="text-muted text-center mb-5 small">
                Help us refine the Macrotek experience.
              </p>

              <form onSubmit={handleSubmit}>
                {/* --- Question 1 --- */}
                <div className="mb-5">
                  <label className="form-label fw-bold small text-uppercase tracking-wider">
                    1. Ease of Use without assistance
                  </label>
                  <div className="d-flex justify-content-between mb-2 opacity-75">
                    <span className="x-small fw-bold">DIFFICULT</span>
                    <span className="x-small fw-bold">VERY EASY</span>
                  </div>
                  <div className="bg-light p-3 rounded-3 d-flex justify-content-between align-items-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="form-check form-check-inline m-0">
                        <input 
                          className="form-check-input shadow-none" 
                          type="radio" 
                          name="easeOfUse" 
                          id={`ease${num}`} 
                          value={num} 
                          onChange={handleChange}
                          checked={formData.easeOfUse === num.toString()}
                          required
                        />
                        <label className="form-check-label fw-semibold" htmlFor={`ease${num}`}>{num}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- Question 2 --- */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase">
                    2. Navigation Comfort Time
                  </label>
                  <select 
                    className="form-select border-2 py-2 shadow-none" 
                    name="timeToComfort" 
                    value={formData.timeToComfort}
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select an option...</option>
                    <option value="Very short time">Very short time</option>
                    <option value="A few tries">A few tries</option>
                    <option value="Took a while">Took a while</option>
                    <option value="Still figuring it out">Still figuring it out</option>
                  </select>
                </div>

                {/* --- Question 3 --- */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase">
                    3. Layout & Workflow Logic
                  </label>
                  <div className="list-group">
                    <label className="list-group-item d-flex gap-3 py-3 border-2 rounded-3 mb-2 cursor-pointer">
                      <input 
                        className="form-check-input flex-shrink-0" 
                        type="radio" 
                        name="logicalLayout" 
                        value="Yes" 
                        checked={formData.logicalLayout === 'Yes'}
                        onChange={handleChange} 
                        required 
                      />
                      <span className="small">Yes, it matched my process</span>
                    </label>
                    <label className="list-group-item d-flex gap-3 py-3 border-2 rounded-3 cursor-pointer">
                      <input 
                        className="form-check-input flex-shrink-0" 
                        type="radio" 
                        name="logicalLayout" 
                        value="No" 
                        checked={formData.logicalLayout === 'No'}
                        onChange={handleChange} 
                        required 
                      />
                      <span className="small">No, I had to adapt my process</span>
                    </label>
                  </div>
                </div>

                {/* --- Question 4 --- */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase">
                    4. Overall System Rating
                  </label>
                  <select 
                    className="form-select border-2 py-2 shadow-none" 
                    name="overallRating" 
                    value={formData.overallRating}
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Rate your experience...</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                    <option value="Very Poor">Very Poor</option>
                  </select>
                </div>

                {/* --- Question 5 --- */}
                <div className="mb-5">
                  <label className="form-label fw-bold small text-uppercase">
                    5. Likelihood to Recommend
                  </label>
                  <div className="bg-light p-3 rounded-3 d-flex justify-content-between align-items-center">
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="form-check form-check-inline m-0">
                        <input 
                          className="form-check-input shadow-none" 
                          type="radio" 
                          name="recommendLikelihood" 
                          id={`rec${num}`} 
                          value={num} 
                          checked={formData.recommendLikelihood === num.toString()}
                          onChange={handleChange} 
                          required 
                        />
                        <label className="form-check-label fw-semibold" htmlFor={`rec${num}`}>{num}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- Question 6 --- */}
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase">
                    6. System Reliability
                  </label>
                  <div className="row g-2">
                    {['Always stable', 'Occasional minor glitches', 'Frequent interruptions'].map((opt, idx) => (
                      <div className="col-12" key={idx}>
                        <div className="form-check p-0">
                           <input 
                            className="btn-check" 
                            type="radio" 
                            name="reliability" 
                            id={`rel${idx}`} 
                            value={opt} 
                            checked={formData.reliability === opt}
                            onChange={handleChange} 
                            autoComplete="off" 
                            required 
                          />
                          <label className="btn btn-outline-dark w-100 text-start py-2 small border-2 shadow-none" htmlFor={`rel${idx}`}>
                            {opt}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- Question 7 --- */}
                <div className="mb-5">
                  <label className="form-label fw-bold small text-uppercase">
                    7. One Word Experience
                  </label>
                  <input 
                    type="text" 
                    className="form-control border-0 border-bottom border-2 rounded-0 shadow-none px-0 py-2" 
                    name="oneWordSummary" 
                    value={formData.oneWordSummary}
                    placeholder="Describe it in one word..." 
                    style={{ fontSize: '1.1rem' }}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-macrotek-orange w-100 py-3 fw-bold rounded-3 text-uppercase tracking-wider"
                >
                  {loading ? 'Submitting...' : 'Submit Final Feedback'}
                </button>
              </form>
            </div>
          </div>
          
          <p className="text-center mt-4 x-small text-muted text-uppercase tracking-widest">
            © 2024 Macrotek Solutions. Confidential Feedback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientFeedbackForm;