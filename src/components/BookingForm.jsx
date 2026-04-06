import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const BookingForm = () => {
  // Woz: Comprehensive list of international calling codes
  const countryCodes = [
    { name: "Philippines", code: "+63" },
    { name: "Afghanistan", code: "+93" },
    { name: "Albania", code: "+355" },
    { name: "Algeria", code: "+213" },
    { name: "American Samoa", code: "+1-684" },
    { name: "Andorra", code: "+376" },
    { name: "Angola", code: "+244" },
    { name: "Anguilla", code: "+1-264" },
    { name: "Antarctica", code: "+672" },
    { name: "Antigua and Barbuda", code: "+1-268" },
    { name: "Argentina", code: "+54" },
    { name: "Armenia", code: "+374" },
    { name: "Aruba", code: "+297" },
    { name: "Australia", code: "+61" },
    { name: "Austria", code: "+43" },
    { name: "Azerbaijan", code: "+994" },
    { name: "Bahamas", code: "+1-242" },
    { name: "Bahrain", code: "+973" },
    { name: "Bangladesh", code: "+880" },
    { name: "Barbados", code: "+1-246" },
    { name: "Belarus", code: "+375" },
    { name: "Belgium", code: "+32" },
    { name: "Belize", code: "+501" },
    { name: "Benin", code: "+229" },
    { name: "Bermuda", code: "+1-441" },
    { name: "Bhutan", code: "+975" },
    { name: "Bolivia", code: "+591" },
    { name: "Bosnia and Herzegovina", code: "+387" },
    { name: "Botswana", code: "+267" },
    { name: "Brazil", code: "+55" },
    { name: "British Indian Ocean Territory", code: "+246" },
    { name: "British Virgin Islands", code: "+1-284" },
    { name: "Brunei", code: "+673" },
    { name: "Bulgaria", code: "+359" },
    { name: "Burkina Faso", code: "+226" },
    { name: "Burundi", code: "+257" },
    { name: "Cambodia", code: "+855" },
    { name: "Cameroon", code: "+237" },
    { name: "Canada", code: "+1" },
    { name: "Cape Verde", code: "+238" },
    { name: "Cayman Islands", code: "+1-345" },
    { name: "Central African Republic", code: "+236" },
    { name: "Chad", code: "+235" },
    { name: "Chile", code: "+56" },
    { name: "China", code: "+86" },
    { name: "Christmas Island", code: "+61" },
    { name: "Cocos Islands", code: "+61" },
    { name: "Colombia", code: "+57" },
    { name: "Comoros", code: "+269" },
    { name: "Cook Islands", code: "+682" },
    { name: "Costa Rica", code: "+506" },
    { name: "Croatia", code: "+385" },
    { name: "Cuba", code: "+53" },
    { name: "Curacao", code: "+599" },
    { name: "Cyprus", code: "+357" },
    { name: "Czech Republic", code: "+420" },
    { name: "Democratic Republic of the Congo", code: "+243" },
    { name: "Denmark", code: "+45" },
    { name: "Djibouti", code: "+253" },
    { name: "Dominica", code: "+1-767" },
    { name: "Dominican Republic", code: "+1-809" },
    { name: "East Timor", code: "+670" },
    { name: "Ecuador", code: "+593" },
    { name: "Egypt", code: "+20" },
    { name: "El Salvador", code: "+503" },
    { name: "Equatorial Guinea", code: "+240" },
    { name: "Eritrea", code: "+291" },
    { name: "Estonia", code: "+372" },
    { name: "Ethiopia", code: "+251" },
    { name: "Falkland Islands", code: "+500" },
    { name: "Faroe Islands", code: "+298" },
    { name: "Fiji", code: "+679" },
    { name: "Finland", code: "+358" },
    { name: "France", code: "+33" },
    { name: "French Polynesia", code: "+689" },
    { name: "Gabon", code: "+241" },
    { name: "Gambia", code: "+220" },
    { name: "Georgia", code: "+995" },
    { name: "Germany", code: "+49" },
    { name: "Ghana", code: "+233" },
    { name: "Gibraltar", code: "+350" },
    { name: "Greece", code: "+30" },
    { name: "Greenland", code: "+299" },
    { name: "Grenada", code: "+1-473" },
    { name: "Guam", code: "+1-671" },
    { name: "Guatemala", code: "+502" },
    { name: "Guernsey", code: "+44-1481" },
    { name: "Guinea", code: "+224" },
    { name: "Guinea-Bissau", code: "+245" },
    { name: "Guyana", code: "+592" },
    { name: "Haiti", code: "+509" },
    { name: "Honduras", code: "+504" },
    { name: "Hong Kong", code: "+852" },
    { name: "Hungary", code: "+36" },
    { name: "Iceland", code: "+354" },
    { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" },
    { name: "Iran", code: "+98" },
    { name: "Iraq", code: "+964" },
    { name: "Ireland", code: "+353" },
    { name: "Isle of Man", code: "+44-1624" },
    { name: "Israel", code: "+972" },
    { name: "Italy", code: "+39" },
    { name: "Ivory Coast", code: "+225" },
    { name: "Jamaica", code: "+1-876" },
    { name: "Japan", code: "+81" },
    { name: "Jersey", code: "+44-1534" },
    { name: "Jordan", code: "+962" },
    { name: "Kazakhstan", code: "+7" },
    { name: "Kenya", code: "+254" },
    { name: "Kiribati", code: "+686" },
    { name: "Kosovo", code: "+383" },
    { name: "Kuwait", code: "+965" },
    { name: "Kyrgyzstan", code: "+996" },
    { name: "Laos", code: "+856" },
    { name: "Latvia", code: "+371" },
    { name: "Lebanon", code: "+961" },
    { name: "Lesotho", code: "+266" },
    { name: "Liberia", code: "+231" },
    { name: "Libya", code: "+218" },
    { name: "Liechtenstein", code: "+423" },
    { name: "Lithuania", code: "+370" },
    { name: "Luxembourg", code: "+352" },
    { name: "Macau", code: "+853" },
    { name: "Macedonia", code: "+389" },
    { name: "Madagascar", code: "+261" },
    { name: "Malawi", code: "+265" },
    { name: "Malaysia", code: "+60" },
    { name: "Maldives", code: "+960" },
    { name: "Mali", code: "+223" },
    { name: "Malta", code: "+356" },
    { name: "Marshall Islands", code: "+692" },
    { name: "Mauritania", code: "+222" },
    { name: "Mauritius", code: "+230" },
    { name: "Mayotte", code: "+262" },
    { name: "Mexico", code: "+52" },
    { name: "Micronesia", code: "+691" },
    { name: "Moldova", code: "+373" },
    { name: "Monaco", code: "+377" },
    { name: "Mongolia", code: "+976" },
    { name: "Montenegro", code: "+382" },
    { name: "Montserrat", code: "+1-664" },
    { name: "Morocco", code: "+212" },
    { name: "Mozambique", code: "+258" },
    { name: "Myanmar", code: "+95" },
    { name: "Namibia", code: "+264" },
    { name: "Nauru", code: "+674" },
    { name: "Nepal", code: "+977" },
    { name: "Netherlands", code: "+31" },
    { name: "Netherlands Antilles", code: "+599" },
    { name: "New Caledonia", code: "+687" },
    { name: "New Zealand", code: "+64" },
    { name: "Nicaragua", code: "+505" },
    { name: "Niger", code: "+227" },
    { name: "Nigeria", code: "+234" },
    { name: "Niue", code: "+683" },
    { name: "North Korea", code: "+850" },
    { name: "Northern Mariana Islands", code: "+1-670" },
    { name: "Norway", code: "+47" },
    { name: "Oman", code: "+968" },
    { name: "Pakistan", code: "+92" },
    { name: "Palau", code: "+680" },
    { name: "Palestine", code: "+970" },
    { name: "Panama", code: "+507" },
    { name: "Papua New Guinea", code: "+675" },
    { name: "Paraguay", code: "+595" },
    { name: "Peru", code: "+51" },
    { name: "Pitcairn", code: "+64" },
    { name: "Poland", code: "+48" },
    { name: "Portugal", code: "+351" },
    { name: "Puerto Rico", code: "+1-787" },
    { name: "Qatar", code: "+974" },
    { name: "Republic of the Congo", code: "+242" },
    { name: "Reunion", code: "+262" },
    { name: "Romania", code: "+40" },
    { name: "Russia", code: "+7" },
    { name: "Rwanda", code: "+250" },
    { name: "Saint Barthelemy", code: "+590" },
    { name: "Saint Helena", code: "+290" },
    { name: "Saint Kitts and Nevis", code: "+1-869" },
    { name: "Saint Lucia", code: "+1-758" },
    { name: "Saint Martin", code: "+590" },
    { name: "Saint Pierre and Miquelon", code: "+508" },
    { name: "Saint Vincent and the Grenadines", code: "+1-784" },
    { name: "Samoa", code: "+685" },
    { name: "San Marino", code: "+378" },
    { name: "Sao Tome and Principe", code: "+239" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Senegal", code: "+221" },
    { name: "Serbia", code: "+381" },
    { name: "Seychelles", code: "+248" },
    { name: "Sierra Leone", code: "+232" },
    { name: "Singapore", code: "+65" },
    { name: "Sint Maarten", code: "+1-721" },
    { name: "Slovakia", code: "+421" },
    { name: "Slovenia", code: "+386" },
    { name: "Solomon Islands", code: "+677" },
    { name: "Somalia", code: "+252" },
    { name: "South Africa", code: "+27" },
    { name: "South Korea", code: "+82" },
    { name: "South Sudan", code: "+211" },
    { name: "Spain", code: "+34" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Sudan", code: "+249" },
    { name: "Suriname", code: "+597" },
    { name: "Svalbard and Jan Mayen", code: "+47" },
    { name: "Swaziland", code: "+268" },
    { name: "Sweden", code: "+46" },
    { name: "Switzerland", code: "+41" },
    { name: "Syria", code: "+963" },
    { name: "Taiwan", code: "+886" },
    { name: "Tajikistan", code: "+992" },
    { name: "Tanzania", code: "+255" },
    { name: "Thailand", code: "+66" },
    { name: "Togo", code: "+228" },
    { name: "Tokelau", code: "+690" },
    { name: "Tonga", code: "+676" },
    { name: "Trinidad and Tobago", code: "+1-868" },
    { name: "Tunisia", code: "+216" },
    { name: "Turkey", code: "+90" },
    { name: "Turkmenistan", code: "+993" },
    { name: "Turks and Caicos Islands", code: "+1-649" },
    { name: "Tuvalu", code: "+688" },
    { name: "U.S. Virgin Islands", code: "+1-340" },
    { name: "Uganda", code: "+256" },
    { name: "Ukraine", code: "+380" },
    { name: "United Arab Emirates", code: "+971" },
    { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" },
    { name: "Uruguay", code: "+598" },
    { name: "Uzbekistan", code: "+998" },
    { name: "Vanuatu", code: "+678" },
    { name: "Vatican", code: "+379" },
    { name: "Venezuela", code: "+58" },
    { name: "Vietnam", code: "+84" },
    { name: "Wallis and Futuna", code: "+681" },
    { name: "Western Sahara", code: "+212" },
    { name: "Yemen", code: "+967" },
    { name: "Zambia", code: "+260" },
    { name: "Zimbabwe", code: "+263" }
  ];

  const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    countryCode: '+63', // Woz: Default to Philippines
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
  const [displayClientId, setDisplayClientId] = useState(''); 
  
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState(''); 
  
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isAutomationOpen, setIsAutomationOpen] = useState(false);
  const industryRef = useRef(null);
  const automationRef = useRef(null);

  const getNextClientId = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('client_id')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data || !data.client_id) return "client0001";

    const lastIdNumber = parseInt(data.client_id.replace('client', ''));
    const nextNumber = lastIdNumber + 1;
    return `client${nextNumber.toString().padStart(4, '0')}`;
  };

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

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  const isValidMobile = (mobile) => /^\d{7,15}$/.test(mobile.trim().replace(/\D/g, ''));

  const isSlotInPast = (slotValue) => {
    const todayInManila = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date()).replace(/\//g, '-');

    if (formData.selectedDate === todayInManila) {
      const now = new Date();
      const currentManilaHour = parseInt(new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila', hour: 'numeric', hour12: false
      }).format(now));
      const slotHour24 = parseInt(slotValue.split(':')[0]);
      const isPM = slotValue.includes('PM') && slotHour24 !== 12;
      const finalSlotHour = isPM ? slotHour24 + 12 : (slotValue.includes('AM') && slotHour24 === 12 ? 0 : slotHour24);
      return currentManilaHour >= finalSlotHour;
    }
    return false;
  };

  useEffect(() => {
    const fetchTakenSlots = async () => {
      const { data } = await supabase.from('schedules').select('booking_id');
      if (data) setExistingBookings(data.map(b => b.booking_id));
    };
    fetchTakenSlots();
  }, [isSuccess]);

  const toggleSelection = (field, val) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(val) ? current.filter(i => i !== val) : [...current, val];
      return { ...prev, [field]: updated };
    });
  };

  const isFormInvalid = !formData.firstName || !formData.lastName || !isValidEmail(formData.email) || !isValidMobile(formData.mobile) || formData.industries.length === 0 || formData.automationAreas.length === 0 || !formData.selectedDate || !formData.selectedSlot;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;
    setIsSubmitting(true);

    try {
      // Woz: 1. Format contact details for validation
      const cleanEmail = formData.email.toLowerCase().trim();
      const activeCountryCode = formData.countryCode || '+63';
      const cleanMobile = formData.mobile.replace(/\D/g, ''); 
      const fullMobile = `${activeCountryCode}${cleanMobile}`;

      // Woz: 2. Duplicate Check - Search for existing email OR mobile number
      const { data: existingClient, error: checkError } = await supabase
        .from('bookings')
        .select('email, mobile')
        .or(`email.eq.${cleanEmail},mobile.eq.${fullMobile}`)
        .maybeSingle();

      if (checkError) throw checkError;

      // Woz: 3. If a match is found, show an alert and stop the submission
      if (existingClient) {
        const isEmailMatch = existingClient.email.toLowerCase() === cleanEmail;
        alert(`A booking with this ${isEmailMatch ? 'email address' : 'mobile number'} already exists. Please use different contact details or contact support.`);
        setIsSubmitting(false);
        return;
      }

      // Woz: 4. Proceed with unique client creation
      const newClientId = await getNextClientId();
      const bookingIdValue = `${formData.selectedDate} ${formData.selectedSlot} (GMT+8)`;
      
      const { error: clientError } = await supabase
        .from('bookings')
        .insert([{
          client_id: newClientId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile: fullMobile,
          email: cleanEmail,
          industries: formData.industries,
          automation_areas: formData.automationAreas,
          meeting_date: bookingIdValue
        }]);

      if (clientError) throw clientError;

      const { error: scheduleError } = await supabase
        .from('schedules')
        .insert([{
          client_id: newClientId,
          booking_id: bookingIdValue
        }]);

      if (scheduleError) throw scheduleError;

      setDisplayClientId(newClientId);
      setIsSuccess(true);
    } catch (error) {
      console.error("Database error:", error);
      alert("Submission failed. Ensure the tables exist in Supabase.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center animate-fade-in font-narrow py-5 px-4">
        <div className="mb-4 text-success display-1"><i className="bi bi-check-circle-fill"></i></div>
        <h2 className="fw-bold text-dark text-uppercase mb-2">Booking Confirmed!</h2>
        
        <p className="text-secondary mb-1">A summary has been sent to:</p>
        <h4 className="text-macrotek-orange fw-bold mb-3">{formData.email}</h4>
        
        <p className="text-secondary mb-1">Scheduled Date (Manila Time):</p>
        <h4 className="text-dark fw-bold mb-4">{formData.selectedDate} at {formData.selectedSlot}</h4>

        <div className="bg-light rounded-4 p-4 mb-4 border shadow-sm">
          <p className="mb-0 small fw-bold text-uppercase text-macrotek-orange">Next Step</p>
          <p className="mb-0 small text-muted">
            Please check your email inbox (and spam folder) for your <strong>Confirmation and Acknowledgement</strong> notice.
          </p>
        </div>

        <button className="btn btn-outline-dark btn-lg rounded-pill px-5 fw-bold" onClick={() => { setIsSuccess(false); setFormData(initialState); }}>Return to Booking Form</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-dark font-narrow" noValidate>
      <div className="text-center mb-4">
        <h3 className="fw-bold text-uppercase letter-spacing-1 mb-1">Schedule Your Session</h3>
        <p className="text-muted small">All fields are required to proceed.</p>
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label small fw-bold text-muted">FIRST NAME *</label>
          <input type="text" className="form-control bg-light border-0 shadow-sm" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-bold text-muted">LAST NAME *</label>
          <input type="text" className="form-control bg-light border-0 shadow-sm" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
        </div>
        
        <div className="col-md-6">
          <label className="form-label small fw-bold text-muted">MOBILE NUMBER *</label>
          <div className="input-group">
            <select 
              className="form-select bg-light border-0 shadow-sm" 
              style={{ maxWidth: '130px', fontSize: '0.85rem' }}
              value={formData.countryCode}
              onChange={e => setFormData({...formData, countryCode: e.target.value})}
            >
              {countryCodes.map((c, i) => (
                <option key={i} value={c.code}>{c.name} ({c.code})</option>
              ))}
            </select>
            <input 
              type="tel" 
              className={`form-control bg-light border-0 shadow-sm ${mobileError ? 'border border-danger' : ''}`} 
              placeholder="9XXXXXXXXX" 
              value={formData.mobile} 
              onChange={e => { 
                const val = e.target.value.replace(/\D/g, ''); 
                setFormData({...formData, mobile: val}); 
                setMobileError(val && !isValidMobile(val) ? 'Invalid Number' : ''); 
              }} 
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold text-muted">BUSINESS EMAIL *</label>
          <input type="email" className={`form-control bg-light border-0 shadow-sm ${emailError ? 'border border-danger' : ''}`} placeholder="name@email.com" value={formData.email} onChange={e => { setFormData({...formData, email: e.target.value}); setEmailError(e.target.value && !isValidEmail(e.target.value) ? 'Invalid Email' : ''); }} />
        </div>
        <div className="col-12 mt-3" ref={industryRef}>
          <label className="form-label small fw-bold text-muted">INDUSTRY *</label>
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
          <label className="form-label small fw-bold text-muted">AUTOMATION GOALS *</label>
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
          <label className="form-label small fw-bold text-muted">Preferred date for the online meeting*</label>
          
          {/* Woz: Manila Timezone Disclaimer */}
          <div className="mb-2">
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm">
              <i className="bi bi-clock-fill me-2"></i>
              All times are shown in Manila Time (GMT+8)
            </span>
          </div>

          <input type="date" className="form-control form-control-lg bg-light border-0" min={new Date().toISOString().split('T')[0]} onChange={e => setFormData({...formData, selectedDate: e.target.value})} />
        </div>
        {formData.selectedDate && (
          <div className="col-12 mt-4 animate-fade-in">
            <label className="form-label small fw-bold text-muted mb-2">2. SELECT TIME SLOT *</label>
            <div className="row g-2">
              {businessHours.map((slot, index) => {
                const checkString = `${formData.selectedDate} ${slot.value} (GMT+8)`;
                const isUnavailable = existingBookings.includes(checkString) || isSlotInPast(slot.value);
                return (
                  <div className="col-6 col-sm-4" key={index}>
                    <div className={`slot-card ${isUnavailable ? 'slot-card-booked' : formData.selectedSlot === slot.value ? 'slot-card-selected' : ''}`} onClick={() => !isUnavailable && setFormData({...formData, selectedSlot: slot.value})}>
                      <div className="small fw-bold">{slot.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <button type="submit" disabled={isSubmitting || isFormInvalid} className={`btn btn-danger btn-lg w-100 py-3 fw-bold rounded-pill shadow-lg mt-5 text-uppercase ${isFormInvalid ? 'bg-secondary border-secondary opacity-50 cursor-not-allowed' : ''}`}>
        {isSubmitting ? "Generating Client ID..." : "Submit Session Request"}
      </button>
      <style>{`
        .cursor-pointer { cursor: pointer; }
        .cursor-not-allowed { cursor: not-allowed !important; }
        .custom-dropdown-menu { max-height: 250px; overflow-y: auto; z-index: 2000; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </form>
  );
};

export default BookingForm;