import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const BookingForm = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    industries: [],
    automationAreas: [],
    selectedDate: '', 
    selectedSlot: '', 
  };

  const [formData, setFormData] = useState(initialState);
  const [existingBookings, setExistingBookings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Real-time validation state
  const [emailError, setEmailError] = useState('');
  
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isAutomationOpen, setIsAutomationOpen] = useState(false);
  const industryRef = useRef(null);
  const automationRef = useRef(null);

  const businessHours = [
    { label: "09:00 AM - 10:00 AM", value: "09:00 AM" },
    { label: "10:00 AM - 11:00 AM", value: "10:00 AM" },
    { label: "11:00 AM - 12:00 PM", value: "11:00 AM" },
    { label: "01:00 PM - 02:00 PM", value: "01:00 PM" },
    { label: "02:00 PM - 03:00 PM", value: "02:00 PM" },
    { label: "03:00 PM - 04:00 PM", value: "03:00 PM" },
    { label: "04:00 PM - 05:00 PM", value: "04:00 PM" },
    { label: "05:00 PM - 06:00 PM", value: "05:00 PM" },
    { label: "06:00 PM - 07:00 PM", value: "06:00 PM" },
    { label: "07:00 PM - 08:00 PM", value: "07:00 PM" },
  ];

  const industryOptions = [
    "Service Professional(s)", "Creatives & Freelancing", "Skilled Trades / Technical Works",
    "Health and Beauty Care", "Retail & Commerce", "Restaurants & Food Servicing",
    "Real Estate", "Education & Training", "Logistics & Transportation", "Health & Wellness",
    "Tourism", "Automotive", "Professional Services", "Construction & Engineering",
    "Human Resources & Recruitment", "Hospitality & Tourism", "Personal Services & Small Businesses",
    "Government offices", "NGOs", "Private corporations", "Multi-branch businesses",
    "Hospitals and medical networks", "Universities and large schools", "BPO and call center firms",
    "Cooperatives", "Fitness and Martial Arts", "Others"
  ];

  const automationOptions = [
    "Sales & Marketing – CRM, lead tracking",
    "Appointment Scheduling / Booking – online booking",
    "Customer Support – helpdesk, live chat",
    "Invoicing & Payments – gateways, billing",
    "Inventory Management – stock tracking",
    "Reporting & Analytics – dashboards",
    "Workflow Automation – approvals, tasks",
    "Social Media Management – scheduling",
    "Website / E-commerce – online store",
    "Data Entry & Integration – auto-transfer",
    "Document Management – file storage",
    "HR & Employee Management – onboarding",
    "Others"
  ];

  // --- VALIDATION HELPERS ---
  const isValidEmail = (email) => {
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return strictEmailRegex.test(email.trim());
  };

  const isValidMobile = (mobile) => {
    const sanitized = mobile.trim().replace(/\s/g, '');
    const phMobileRegex = /^(09|\+639)\d{9}$/;
    return phMobileRegex.test(sanitized);
  };

  // --- NEW: TIME-CHECK HELPER FOR MANILA ---
  const isSlotInPast = (slotValue) => {
    const todayInManila = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Asia/Manila',
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date()).replace(/\//g, '-');

    if (formData.selectedDate === todayInManila) {
      const now = new Date();
      const currentManilaHour = parseInt(new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        hour12: false
      }).format(now));

      const slotHour24 = parseInt(slotValue.split(':')[0]);
      const isPM = slotValue.includes('PM') && slotHour24 !== 12;
      const finalSlotHour = isPM ? slotHour24 + 12 : (slotValue.includes('AM') && slotHour24 === 12 ? 0 : slotHour24);

      return currentManilaHour >= finalSlotHour;
    }
    return false;
  };

  // --- LIVE SYNC LOGIC (SUPABASE REALTIME) ---
  useEffect(() => {
    const fetchTakenSlots = async () => {
      const { data } = await supabase.from('bookings').select('preferred_date');
      if (data) {
        setExistingBookings(data.map(b => b.preferred_date));
      }
    };
    fetchTakenSlots();

    const channel = supabase
      .channel('live-booking-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, 
      () => fetchTakenSlots()).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isSuccess]);

  // --- FORM HANDLING ---
  const toggleSelection = (field, val) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(val) ? current.filter(i => i !== val) : [...current, val];
      return { ...prev, [field]: updated };
    });
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormData({...formData, email: val});
    if (val && !isValidEmail(val)) {
      setEmailError('Invalid format. Use example@email.com');
    } else {
      setEmailError('');
    }
  };

  const isFormInvalid = 
    !formData.firstName || 
    !formData.lastName || 
    !isValidEmail(formData.email) || 
    !isValidMobile(formData.mobile) ||
    formData.industries.length === 0 ||
    formData.automationAreas.length === 0 ||
    !formData.selectedDate ||
    !formData.selectedSlot;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;

    const plainTextDateTime = `${formData.selectedDate} ${formData.selectedSlot}`;
    setIsSubmitting(true);

    try {
      const cleanEmail = formData.email.trim().toLowerCase();
      const cleanMobile = formData.mobile.trim().replace(/\s/g, '');

      const { data: existingLead } = await supabase
        .from('bookings')
        .select('email, mobile')
        .or(`email.eq.${cleanEmail},mobile.eq.${cleanMobile}`)
        .maybeSingle();

      if (existingLead) {
        alert("This Email or Mobile is already registered.");
        setIsSubmitting(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('bookings')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile: cleanMobile,
          email: cleanEmail,
          industries: formData.industries,
          automation_areas: formData.automationAreas,
          preferred_date: plainTextDateTime 
        }]);

      if (insertError) throw insertError;
      setIsSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to save booking. Check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SUCCESS STATE ---
  if (isSuccess) {
    return (
      <div className="text-center animate-fade-in font-narrow py-4 px-2">
        <div className="mb-4">
          <div className="display-1 text-success animate-pulse-subtle">
            <i className="bi bi-check-circle-fill"></i>
          </div>
        </div>
        <h2 className="fw-bold text-dark text-uppercase mb-2">Booking Confirmed!</h2>
        <p className="text-secondary mb-4 px-lg-5">Your session has been successfully scheduled. We look forward to meeting you.</p>

        <div className="bg-light rounded-4 p-4 mb-5 shadow-sm border border-1 mx-auto" style={{ maxWidth: '450px' }}>
          <h6 className="text-uppercase fw-bold text-danger letter-spacing-1 mb-3 small">Session Summary</h6>
          <div className="d-flex flex-column gap-3 text-start">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar3 text-danger me-3 h5 mb-0"></i>
              <div>
                <small className="text-secondary d-block x-small fw-bold text-uppercase">Date</small>
                <span className="fw-bold text-dark">{new Date(formData.selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-clock text-danger me-3 h5 mb-0"></i>
              <div>
                <small className="text-secondary d-block x-small fw-bold text-uppercase">Time Slot (Manila)</small>
                <span className="fw-bold text-dark">{formData.selectedSlot}</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-person-check text-danger me-3 h5 mb-0"></i>
              <div>
                <small className="text-secondary d-block x-small fw-bold text-uppercase">Representative</small>
                <span className="fw-bold text-dark">{formData.firstName} {formData.lastName}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 text-dark">
          <h6 className="fw-bold text-uppercase x-small text-secondary mb-3">What happens next?</h6>
          <div className="row g-3 justify-content-center">
            <div className="col-10 col-md-5 small"><i className="bi bi-envelope-at me-2 text-danger"></i>Check your email for an invite.</div>
            <div className="col-10 col-md-5 small"><i className="bi bi-zoom me-2 text-danger"></i>Meeting link arrives 15m before.</div>
          </div>
        </div>

        <button className="btn btn-outline-danger btn-lg rounded-pill px-5 fw-bold shadow-sm" onClick={() => { setIsSuccess(false); setFormData(initialState); }}>
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-dark font-narrow" noValidate>
      <div className="text-center mb-4">
        <h3 className="fw-bold text-uppercase letter-spacing-1 mb-1">Schedule Your Session</h3>
        <p className="text-muted small">All fields required. Button enables when valid.</p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label small fw-bold text-uppercase text-muted">First Name *</label>
          <input type="text" className="form-control form-control-lg bg-light border-0 shadow-sm" required 
            value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-bold text-uppercase text-muted">Last Name *</label>
          <input type="text" className="form-control form-control-lg bg-light border-0 shadow-sm" required 
            value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
        </div>
        
        <div className="col-md-6">
          <label className="form-label small fw-bold text-uppercase text-muted">Mobile Number *</label>
          <input type="tel" className="form-control form-control-lg bg-light border-0 shadow-sm" required 
            placeholder="09XXXXXXXXX" 
            value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold text-uppercase text-muted">Business Email *</label>
          <input type="email" className={`form-control form-control-lg bg-light border-0 shadow-sm ${emailError ? 'border border-danger' : ''}`} 
            required placeholder="name@email.com" value={formData.email} onChange={handleEmailChange} />
          {emailError && <div className="text-danger small fw-bold mt-1" style={{fontSize: '0.75rem'}}>{emailError}</div>}
        </div>

        {/* Dropdowns logic */}
        <div className="col-12 mt-3" ref={industryRef}>
          <label className="form-label small fw-bold text-uppercase text-muted">Industry *</label>
          <div className="form-select bg-light border-0 cursor-pointer py-2" onClick={() => { setIsIndustryOpen(!isIndustryOpen); setIsAutomationOpen(false); }}>
            {formData.industries.length === 0 ? "Choose Industry" : `${formData.industries.length} Selected`}
          </div>
          {isIndustryOpen && (
            <div className="position-absolute w-100 bg-white border rounded shadow-lg custom-dropdown-menu mt-1 p-3" style={{zIndex: 1060}}>
              {industryOptions.map((opt, i) => (
                <div className="form-check" key={i}>
                  <input className="form-check-input" type="checkbox" id={`ind-${i}`} checked={formData.industries.includes(opt)} onChange={() => toggleSelection('industries', opt)} />
                  <label className="form-check-label small" htmlFor={`ind-${i}`}>{opt}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-12 mt-3" ref={automationRef}>
          <label className="form-label small fw-bold text-uppercase text-muted">Automation Goals *</label>
          <div className="form-select bg-light border-0 cursor-pointer py-2" onClick={() => { setIsAutomationOpen(!isAutomationOpen); setIsIndustryOpen(false); }}>
            {formData.automationAreas.length === 0 ? "Choose Goals" : `${formData.automationAreas.length} Selected`}
          </div>
          {isAutomationOpen && (
            <div className="position-absolute w-100 bg-white border rounded shadow-lg custom-dropdown-menu mt-1 p-3" style={{zIndex: 1060}}>
              {automationOptions.map((opt, i) => (
                <div className="form-check" key={i}>
                  <input className="form-check-input" type="checkbox" id={`auto-${i}`} checked={formData.automationAreas.includes(opt)} onChange={() => toggleSelection('automationAreas', opt)} />
                  <label className="form-check-label small" htmlFor={`auto-${i}`}>{opt}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-12 mt-3">
          <label className="form-label small fw-bold text-uppercase text-muted">1. Select Date *</label>
          <input type="date" className="form-control form-control-lg bg-light border-0" required min={new Date().toISOString().split('T')[0]} 
            onChange={e => {
                const day = new Date(e.target.value).getDay();
                if (day === 0) { alert("Sundays unavailable."); e.target.value = ""; } 
                else { setFormData({...formData, selectedDate: e.target.value}); }
            }}
          />
        </div>

        {formData.selectedDate && (
          <div className="col-12 mt-4 animate-fade-in">
            <label className="form-label small fw-bold text-uppercase text-muted mb-2">2. Select Time Slot *</label>
            <div className="row g-2">
              {businessHours.map((slot, index) => {
                const checkString = `${formData.selectedDate} ${slot.value}`;
                const isBookedInDB = existingBookings.includes(checkString);
                const isFinishedToday = isSlotInPast(slot.value);
                const isUnavailable = isBookedInDB || isFinishedToday;
                const isSelected = formData.selectedSlot === slot.value;
                return (
                  <div className="col-6 col-sm-4" key={index}>
                    <div className={`slot-card ${isUnavailable ? 'slot-card-booked' : isSelected ? 'slot-card-selected' : ''}`}
                      onClick={() => !isUnavailable && setFormData({...formData, selectedSlot: slot.value})}>
                      <div className="small fw-bold">{slot.label}</div>
                      {isFinishedToday && !isBookedInDB && <div style={{fontSize: '0.6rem', opacity: 0.6}}>Passed</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting || isFormInvalid}
        className={`btn btn-danger btn-lg w-100 py-3 fw-bold rounded-pill shadow-lg mt-5 text-uppercase ${isFormInvalid ? 'bg-secondary border-secondary opacity-50 cursor-not-allowed' : ''}`}>
        {isSubmitting ? "Validating..." : isFormInvalid ? "Incomplete Form" : "Submit My Session Request"}
      </button>

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .cursor-not-allowed { cursor: not-allowed !important; }
        .custom-dropdown-menu { max-height: 250px; overflow-y: auto; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-pulse-subtle { animation: pulse-subtle 2s infinite ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-subtle { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </form>
  );
};

export default BookingForm;