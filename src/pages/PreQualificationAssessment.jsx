import React, { useState } from 'react';
// FIX: We go up one level to 'src', then into 'components'
import NewsletterModal from '../components/NewsletterModal'; 

const PreQualificationAssessment = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(0); // Woz: New state to track score
  const [answers, setAnswers] = useState({
    q1: [], q2: [], q3: [], q4: [], q5: []
  });

  const questions = [
    {
      id: 'q1',
      question: "What is the current status of your business website?",
      options: [
        { label: "I don’t have a website at all.", value: "A" },
        { label: "I have one, but it’s outdated, broken, or doesn't represent me well.", value: "B" },
        { label: "I have a website and I’m very happy with how it looks and works.", value: "C" }
      ]
    },
    {
      id: 'q2',
      question: "How do you currently acquire most of your new clients?",
      options: [
        { label: "Strictly through word-of-mouth; I don't have a formal system.", value: "A" },
        { label: "A mix of social media and referrals, but it's very inconsistent.", value: "B" },
        { label: "I have a reliable, working system that generates leads regularly.", value: "C" }
      ]
    },
    {
      id: 'q3',
      question: "How do you handle follow-ups when a potential client reaches out?",
      options: [
        { label: "I do everything manually, or sometimes I forget to follow up.", value: "A" },
        { label: "I follow up when I can, but my process is inconsistent.", value: "B" },
        { label: "I have automated systems and reminders already in place.", value: "C" }
      ]
    },
    {
      id: 'q4',
      question: "What is the biggest challenge currently holding your business back?",
      options: [
        { label: "I need more clients and better professional credibility.", value: "A" },
        { label: "I'm stuck doing repetitive manual tasks and struggling to scale.", value: "B" },
        { label: "I don't currently have any major gaps in my digital process.", value: "C" }
      ]
    },
    {
      id: 'q5',
      question: "Which statement best describes your readiness to invest in your digital growth?",
      options: [
        { label: "I am ready to invest right now to get the right systems in place.", value: "A" },
        { label: "I am open to investing, but I need to see clear proof of ROI first.", value: "B" },
        { label: "I am only looking for free options or DIY advice at this time.", value: "C" }
      ]
    }
  ];

  const handleCheckboxChange = (questionId, value) => {
    setAnswers(prev => {
      const currentSelection = prev[questionId];
      if (currentSelection.includes(value)) {
        return { ...prev, [questionId]: currentSelection.filter(item => item !== value) };
      } else {
        return { ...prev, [questionId]: [...currentSelection, value] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Woz: Calculate score based on Benchmark Guide (A=1, B=2, C=3)
    const total = Object.values(answers).reduce((acc, currentSelection) => {
      if (currentSelection.length === 0) return acc;
      // If multiple selected, we take the highest value for the score
      const values = currentSelection.map(v => v === 'A' ? 1 : v === 'B' ? 2 : 3);
      return acc + Math.max(...values);
    }, 0);

    setAssessmentScore(total);
    setShowContactModal(true);
  };

  return (
    <div className="container py-5 mt-5 font-lato">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4 p-md-5 rounded-0" data-aos="fade-up">
            <h2 className="fw-bold text-center mb-2 font-montserrat">Business Growth Assessment</h2>
            <p className="text-muted text-center mb-5">
              Please select the answers that best describe your current business situation.
            </p>

            <form onSubmit={handleSubmit}>
              {questions.map((q, idx) => (
                <div key={q.id} className="mb-5" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <h5 className="fw-bold mb-3">{idx + 1}. {q.question}</h5>
                  <div className="d-flex flex-column gap-2">
                    {q.options.map((option) => (
                      <label 
                        key={option.value} 
                        className={`d-flex align-items-center p-3 border rounded-0 cursor-pointer transition-all ${
                          answers[q.id].includes(option.value) ? 'border-primary bg-light' : ''
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <input 
                          type="checkbox" 
                          className="form-check-input me-3"
                          checked={answers[q.id].includes(option.value)}
                          onChange={() => handleCheckboxChange(q.id, option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center mt-5">
                <button type="submit" className="btn btn-primary btn-lg px-5 py-3 rounded-0 fw-bold shadow-sm" style={{ backgroundColor: '#003366', border: 'none' }}>
                Submit to Start your Journey
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <NewsletterModal 
        show={showContactModal} 
        onClose={() => setShowContactModal(false)} 
        score={assessmentScore} // Woz: Passing the score to the modal
      />
    </div>
  );
};

export default PreQualificationAssessment;