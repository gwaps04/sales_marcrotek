import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ManageClient = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  
  const [client, setClient] = useState(null);
  const [lookingFor, setLookingFor] = useState('');
  const [responses, setResponses] = useState({});
  const [phases, setPhases] = useState({
    consultation_done: false,
    sow_invoice_sent: false,
    ready_for_next_stage: false
  });

  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');

  const checklists = {
    'Creative Web Design': [
      "Does the website feel outdated?", "Is your website difficult to use on mobile devices or slow to load?", "Are you getting fewer than 5 quality inquiries or leads per week from your website?", "Do visitors struggle to find your contact details or how to reach you?", "Is it unclear what action visitors should take (e.g., 'Get a Quote', 'Book Now')?", "Do your competitors have more modern or higher-performing websites than yours?", "Do you feel your services, products, or portfolio are not presented effectively?", "Is your branding (logo, colors, fonts) inconsistent across your website?", "Are you missing content features like blogs, updates, or resources to attract traffic?", "Do you believe improving your website could increase your sales or bookings in the next 3 months?"
    ],
    'Enterprise Systems (Custom CRM)': [
      "Do you manually manage customer data using spreadsheets or multiple tools?", "Do you sometimes forget to follow up with leads or potential clients?", "Do you lack automated responses (email/SMS) after someone contacts you?", "Do you need a dashboard to track sales, tasks, or customer activity in real time?", "Do multiple team members need access to shared customer information?", "Do you want clients to log in and view their orders, invoices, or project updates?", "Are repetitive tasks (reminders, invoicing, follow-ups) taking too much time?", "Do you need your system to integrate with tools like email, accounting, or calendars?", "Are you struggling with customer retention or repeat business?", "Do you lack a centralized system to track all customer interactions and history?"
    ],
    'Both': [
      "Do you need both a better website and a more organized way to manage clients?", "Do you want website inquiries to automatically create leads and tasks in a system?", "Do you want clients to have their own secure portal on your website?", "Is your website underperforming AND you don’t have a proper follow-up system?", "Are you planning to scale your business significantly (e.g., 10 → 100+ clients)?", "Do you want your website and internal system to work seamlessly together?", "Are both brand image and operational efficiency equally important to you?", "Do you have the budget for a complete, all-in-one solution?", "Would you invest more to eliminate manual work and data duplication?", "Do you prefer one provider to handle both your website and your internal systems?"
    ]
  };

  useEffect(() => {
    const loadData = async () => {
      // 1. Fetch Client Profile
      const { data: c } = await supabase.from('bookings').select('*').eq('client_id', clientId).single();
      setClient(c);

      // 2. Fetch Consultation Responses
      const { data: r } = await supabase.from('consultation_responses').select('*').eq('client_id', clientId).maybeSingle();
      if (r) { setLookingFor(r.looking_for); setResponses(r.responses); }

      // 3. Fetch Operational Phase Toggles
      const { data: p } = await supabase.from('client_phases').select('*').eq('client_id', clientId).maybeSingle();
      if (p) setPhases(p);

      // 4. Fetch Business Details
      const { data: b } = await supabase.from('business_details').select('*').eq('client_id', clientId).maybeSingle();
      if (b) {
        setBusinessName(b.business_name || '');
        setBusinessAddress(b.business_address || '');
      }
    };
    loadData();
  }, [clientId]);

  const saveManagementData = async () => {
    try {
      await supabase.from('consultation_responses').upsert({ client_id: clientId, looking_for: lookingFor, responses });
      await supabase.from('client_phases').upsert({ client_id: clientId, ...phases });
      await supabase.from('business_details').upsert({ client_id: clientId, business_name: businessName, business_address: businessAddress });
      alert("Notes and Business Profile Synced Successfully.");
    } catch (e) { console.error(e); alert("Save failed."); }
  };

  const initializePipeline = async () => {
    if (!phases.ready_for_next_stage) {
      alert("Validation Error: Toggle 'Ready for Next Phase' to ON before initializing.");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Ensure Business details and phases are saved first
      await supabase.from('business_details').upsert({ client_id: clientId, business_name: businessName, business_address: businessAddress });
      await supabase.from('client_phases').upsert({ client_id: clientId, ...phases });

      // Create the Closed Won record
      await supabase.from('stage_closed_won').upsert({
        client_id: clientId,
        closed_won_date: new Date().toISOString().split('T')[0],
        payment_status_at_close: 'Pending'
      });

      // Update pipeline history
      await supabase.from('pipeline_history').update({ is_current: false, exited_at: new Date().toISOString() }).eq('client_id', clientId).eq('is_current', true);
      
      await supabase.from('pipeline_history').insert({
        client_id: clientId,
        stage_name: 'Closed Won',
        is_current: true,
        triggered_by: user?.email || 'Admin'
      });

      alert("Success! Client initialized in the Pipeline.");
      navigate('/administrator');
    } catch (err) { console.error(err); alert("Initialization failed."); }
  };

  if (!client) return <div className="p-5 text-center">Connecting to Command Center...</div>;

  return (
    <div className="min-vh-100 bg-white p-4 font-narrow">
      <div className="container" style={{ maxWidth: '900px' }}>
        <button onClick={() => navigate('/administrator')} className="btn btn-sm btn-outline-dark mb-4">← Return to Administrator</button>
        
        <div className="p-4 bg-macrotek-black text-white rounded-4 shadow-sm mb-4">
          <h2 className="fw-bold mb-0 text-uppercase">Managing: <span className="text-macrotek-orange">{client.first_name} {client.last_name}</span></h2>
          <p className="small text-muted mb-0">System ID: {client.client_id} | {client.email}</p>
        </div>

        <section className="mb-5">
          <h5 className="fw-bold border-start border-4 border-macrotek-orange ps-3 mb-3 text-uppercase">1. Project Direction</h5>
          <div className="row g-3">
            {Object.keys(checklists).map(type => (
              <div className="col-md-4" key={type}>
                <div className={`p-3 border rounded-3 text-center cursor-pointer transition-all ${lookingFor === type ? 'border-macrotek-orange bg-light' : ''}`} onClick={() => setLookingFor(type)}>
                  <div className={`fw-bold small ${lookingFor === type ? 'text-macrotek-orange' : 'text-muted'}`}>{type}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {lookingFor && (
          <section className="mb-5 animate-fade-in">
            <h5 className="fw-bold border-start border-4 border-macrotek-orange ps-3 mb-3 text-uppercase">2. Consultation Checklist</h5>
            <div className="bg-light p-4 rounded-4 border">
              {checklists[lookingFor].map((q, idx) => (
                <div key={idx} className="mb-4 pb-3 border-bottom last-child-border-0">
                  <p className="fw-bold text-dark mb-2">{q}</p>
                  <div className="d-flex gap-2">
                    {['Yes', 'No', 'Unsure', 'Not Applicable'].map(ans => (
                      <button key={ans} className={`btn btn-sm px-3 rounded-pill fw-bold ${responses[q] === ans ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setResponses({...responses, [q]: ans})}>{ans}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-5">
          <h5 className="fw-bold border-start border-4 border-macrotek-orange ps-3 mb-3 text-uppercase">3. Business Profile</h5>
          <div className="bg-light p-4 rounded-4 border">
            <div className="mb-3">
              <label className="form-label fw-bold small text-uppercase">Business Name</label>
              <input type="text" className="form-control rounded-3" placeholder="Business Entity Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            </div>
            <div className="mb-0">
              <label className="form-label fw-bold small text-uppercase">Business Address</label>
              <textarea className="form-control rounded-3" rows="2" placeholder="Full Operational Address" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)}></textarea>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <h5 className="fw-bold border-start border-4 border-macrotek-orange ps-3 mb-3 text-uppercase">4. Operational Stage</h5>
          <div className="row g-3">
            {[{ key: 'consultation_done', label: 'Consultation Meeting Done' }, { key: 'sow_invoice_sent', label: 'Scope of Work + Invoice Sent' }, { key: 'ready_for_next_stage', label: 'Ready for Next Phase' }].map(stage => (
              <div className="col-12" key={stage.key}>
                <div className="form-check form-switch p-3 border rounded-3 d-flex justify-content-between align-items-center">
                  <label className="form-check-label fw-bold text-dark ps-2">{stage.label}</label>
                  <input className="form-check-input" type="checkbox" checked={phases[stage.key]} onChange={e => setPhases({...phases, [stage.key]: e.target.checked})} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="d-flex gap-3 mb-5">
          <button onClick={saveManagementData} className="btn btn-outline-dark w-50 py-3 fw-bold rounded-pill text-uppercase">Sync Notes & Profile</button>
          <button onClick={initializePipeline} className="btn btn-macrotek-orange w-50 py-3 fw-bold rounded-pill shadow text-uppercase">🚀 Initialize Pipeline</button>
        </div>
      </div>
    </div>
  );
};

export default ManageClient;