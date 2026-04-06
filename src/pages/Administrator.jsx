import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Administrator = () => {
  const [clientLog, setClientLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Filtering States ---
  const [searchTerm, setSearchTerm] = useState(''); 
  const [stageFilter, setStageFilter] = useState('All'); 

  // --- Modal States ---
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'won', 'onboarding', 'in_progress', 'qa', or 'live'

  const [dealData, setDealData] = useState({
    contract_signed_date: '',
    deal_value: '',
    payment_status_at_close: 'not_paid', 
    closed_won_notes: ''
  });

  const [onboardingData, setOnboardingData] = useState({
    awaiting_started_at: '',
    kickoff_scheduled_date: '',
    info_collection_sent_at: '',
    info_collection_completed_at: '',
    awaiting_reason: ''
  });

  const [inProgData, setInProgData] = useState({
    estimated_completion_date: '',
    dev_status: 'Work in Progress',
    checklist: [],
    blocked_reason: '',
    project_note: ''
  });

  const [qaData, setQaData] = useState({
    qa_started_at: '',
    qa_completed_at: '',
    bugs_found_count: 0,
    bugs_fixed_count: 0,
    client_approval_received_at: '',
    uat_status: 'In Review / QA Testing'
  });

  // New State for Live / Delivered
  const [liveData, setLiveData] = useState({
    launch_date: '',
    launch_successful: true,
    post_launch_support_until: '',
    handover_docs_sent_at: '',
    final_payment_received_at: '',
    project_closed_at: ''
  });

  const devChecklistOptions = [
    "Frontend Development",
    "Logic Flow & Client-Side Functionality",
    "Backend Development & API Layer",
    "Database Design & Management",
    "Security",
    "Authentication & Deployment Prep"
  ];

  const pipelineStages = [
    "Closed Won", "Awaiting Onboarding", "Onboarding in Progress", "Ready for Launch / QA", "Live / Delivered"
  ];

  useEffect(() => { fetchAdministratorData(); }, []);

  const fetchAdministratorData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        client_phases ( consultation_done, sow_invoice_sent, ready_for_next_stage ),
        business_details ( business_name, business_address ),
        pipeline_history ( stage_name, is_current ),
        stage_closed_won ( contract_signed_date, deal_value, payment_status_at_close, closed_won_notes ),
        stage_awaiting_onboarding ( awaiting_started_at, kickoff_scheduled_date, info_collection_sent_at, info_collection_completed_at, awaiting_reason ),
        stage_onboarding_in_progress ( dev_started_at, estimated_completion_date, dev_status, blocked_reason, project_note ),
        stage_ready_for_launch_qa ( qa_started_at, qa_completed_at, bugs_found_count, bugs_fixed_count, client_approval_received_at, uat_status ),
        stage_live_delivered ( launch_date, launch_successful, post_launch_support_until, handover_docs_sent_at, final_payment_received_at, project_closed_at )
      `)
      .order('created_at', { ascending: false });

    if (error) { 
      console.error('CRM Fetch Error:', error); 
    } else { 
      setClientLog(data || []); 
    }
    setLoading(false);
  };

  /**
   * Woz: Calculate Total Gross Income
   */
  const totalGrossIncome = clientLog.reduce((acc, client) => {
    const wonData = Array.isArray(client.stage_closed_won) ? client.stage_closed_won[0] : client.stage_closed_won;
    const value = parseFloat(wonData?.deal_value) || 0;
    return acc + value;
  }, 0);

  const formattedIncome = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(totalGrossIncome);

  const filteredClients = clientLog.filter(client => {
    const bizData = Array.isArray(client.business_details) ? client.business_details[0] : client.business_details;
    const currentStage = client.pipeline_history?.find(h => h.is_current)?.stage_name || "Not Started";
    const matchesSearch = `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) || (bizData?.business_name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'All' || currentStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const openClosedWonModal = (client) => {
    setSelectedClient(client);
    setActiveModal('won');
    const wonDetails = Array.isArray(client.stage_closed_won) ? client.stage_closed_won[0] : client.stage_closed_won;
    setDealData({
      contract_signed_date: wonDetails?.contract_signed_date || '',
      deal_value: wonDetails?.deal_value || '',
      payment_status_at_close: wonDetails?.payment_status_at_close || 'not_paid',
      closed_won_notes: wonDetails?.closed_won_notes || ''
    });
  };

  const openOnboardingModal = (client) => {
    setSelectedClient(client);
    setActiveModal('onboarding');
    const obDetails = Array.isArray(client.stage_awaiting_onboarding) ? client.stage_awaiting_onboarding[0] : client.stage_awaiting_onboarding;
    const toDate = (ts) => ts ? ts.split('T')[0] : '';
    setOnboardingData({
      awaiting_started_at: toDate(obDetails?.awaiting_started_at),
      kickoff_scheduled_date: obDetails?.kickoff_scheduled_date || '',
      info_collection_sent_at: toDate(obDetails?.info_collection_sent_at),
      info_collection_completed_at: toDate(obDetails?.info_collection_completed_at),
      awaiting_reason: obDetails?.awaiting_reason || ''
    });
  };

  const openInProgModal = (client) => {
    setSelectedClient(client);
    setActiveModal('in_progress');
    const progDetails = Array.isArray(client.stage_onboarding_in_progress) ? client.stage_onboarding_in_progress[0] : client.stage_onboarding_in_progress;
    const statusStr = progDetails?.dev_status || 'Work in Progress';
    const hasChecklist = statusStr.includes('[') && statusStr.includes(']');
    const baseStatus = hasChecklist ? statusStr.split(' [')[0] : statusStr;
    const extractedChecklist = hasChecklist ? statusStr.split('[')[1].split(']')[0].split(', ') : [];

    setInProgData({
      estimated_completion_date: progDetails?.estimated_completion_date || '',
      dev_status: baseStatus === 'In Progress' ? 'Work in Progress' : baseStatus,
      checklist: extractedChecklist,
      blocked_reason: progDetails?.blocked_reason || '',
      project_note: progDetails?.project_note || ''
    });
  };

  const openQaModal = (client) => {
    setSelectedClient(client);
    setActiveModal('qa');
    const qaDetails = Array.isArray(client.stage_ready_for_launch_qa) ? client.stage_ready_for_launch_qa[0] : client.stage_ready_for_launch_qa;
    const toDate = (ts) => ts ? ts.split('T')[0] : '';
    setQaData({
      qa_started_at: toDate(qaDetails?.qa_started_at),
      qa_completed_at: toDate(qaDetails?.qa_completed_at),
      bugs_found_count: qaDetails?.bugs_found_count || 0,
      bugs_fixed_count: qaDetails?.bugs_fixed_count || 0,
      client_approval_received_at: toDate(qaDetails?.client_approval_received_at),
      uat_status: qaDetails?.uat_status || 'In Review / QA Testing'
    });
  };

  const openLiveModal = (client) => {
    setSelectedClient(client);
    setActiveModal('live');
    const liveDetails = Array.isArray(client.stage_live_delivered) ? client.stage_live_delivered[0] : client.stage_live_delivered;
    const toDate = (ts) => ts ? ts.split('T')[0] : '';

    setLiveData({
      launch_date: toDate(liveDetails?.launch_date),
      launch_successful: liveDetails?.launch_successful ?? true,
      post_launch_support_until: toDate(liveDetails?.post_launch_support_until),
      handover_docs_sent_at: toDate(liveDetails?.handover_docs_sent_at),
      final_payment_received_at: toDate(liveDetails?.final_payment_received_at),
      project_closed_at: toDate(liveDetails?.project_closed_at)
    });
  };

  const saveClosedWonDetails = async () => {
    try {
      await supabase.from('stage_closed_won').upsert({ client_id: selectedClient.client_id, ...dealData });
      alert("Deal Details Saved!");
      setSelectedClient(null);
      fetchAdministratorData();
    } catch (err) { console.error(err); }
  };

  const saveOnboardingDetails = async () => {
    try {
      await supabase.from('stage_awaiting_onboarding').upsert({ client_id: selectedClient.client_id, ...onboardingData, updated_at: new Date().toISOString() });
      alert("Onboarding Schedule Saved!");
      setSelectedClient(null);
      fetchAdministratorData();
    } catch (err) { console.error(err); }
  };

  const saveInProgDetails = async () => {
    try {
      let finalStatus = inProgData.dev_status;
      if (finalStatus === 'Work in Progress' && inProgData.checklist.length > 0) {
        finalStatus = `${finalStatus} [${inProgData.checklist.join(', ')}]`;
      }
      const { error } = await supabase.from('stage_onboarding_in_progress').upsert({
        client_id: selectedClient.client_id,
        estimated_completion_date: inProgData.estimated_completion_date || null,
        dev_status: finalStatus,
        blocked_reason: inProgData.dev_status === 'Road-Block' ? inProgData.blocked_reason : null,
        project_note: inProgData.project_note || '',
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      alert("Development Progress Sync Successful.");
      setSelectedClient(null);
      fetchAdministratorData();
    } catch (err) { console.error(err); }
  };

  const saveQaDetails = async () => {
    try {
      const { error } = await supabase.from('stage_ready_for_launch_qa').upsert({
        client_id: selectedClient.client_id,
        qa_started_at: qaData.qa_started_at || null,
        qa_completed_at: qaData.qa_completed_at || null,
        bugs_found_count: qaData.bugs_found_count,
        bugs_fixed_count: qaData.bugs_fixed_count,
        client_approval_received_at: qaData.client_approval_received_at || null,
        uat_status: qaData.uat_status,
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      alert("QA and UAT Data Synced Successfully.");
      setSelectedClient(null);
      fetchAdministratorData();
    } catch (err) { console.error('QA Save Error:', err); }
  };

  const saveLiveDetails = async () => {
    try {
      const { error } = await supabase.from('stage_live_delivered').upsert({
        client_id: selectedClient.client_id,
        launch_date: liveData.launch_date || null,
        launch_successful: liveData.launch_successful,
        post_launch_support_until: liveData.post_launch_support_until || null,
        handover_docs_sent_at: liveData.handover_docs_sent_at || null,
        final_payment_received_at: liveData.final_payment_received_at || null,
        project_closed_at: liveData.project_closed_at || null,
        updated_at: new Date().toISOString()
      });

      if (error) throw error;
      alert("Project Delivery Records Synced!");
      setSelectedClient(null);
      fetchAdministratorData();
    } catch (err) { console.error('Live Sync Error:', err); }
  };

  const moveClient = async (clientId, newStage) => {
    const targetClient = clientLog.find(c => c.client_id === clientId);

    if (newStage === "Awaiting Onboarding") {
      const wonDetails = Array.isArray(targetClient.stage_closed_won) ? targetClient.stage_closed_won[0] : targetClient.stage_closed_won;
      if (!wonDetails?.contract_signed_date) {
        alert("Action Blocked: You must declare a 'Contract Signed Date' first.");
        return;
      }
      
      const { data: existing } = await supabase.from('stage_awaiting_onboarding').select('client_id').eq('client_id', clientId).maybeSingle();
      if (!existing) {
        await supabase.from('stage_awaiting_onboarding').insert({ client_id: clientId, awaiting_started_at: new Date().toISOString() });
      }
    }

    if (newStage === "Onboarding in Progress") {
      const { data: existing } = await supabase.from('stage_onboarding_in_progress').select('client_id').eq('client_id', clientId).maybeSingle();
      if (!existing) {
        await supabase.from('stage_onboarding_in_progress').insert({ 
          client_id: clientId, 
          dev_started_at: new Date().toISOString(), 
          dev_status: 'Work in Progress', 
          updated_at: new Date().toISOString() 
        });
      }
    }

    if (newStage === "Ready for Launch / QA") {
      const { data: existing } = await supabase.from('stage_ready_for_launch_qa').select('client_id').eq('client_id', clientId).maybeSingle();
      if (!existing) {
        await supabase.from('stage_ready_for_launch_qa').insert({ 
          client_id: clientId, 
          qa_started_at: new Date().toISOString(), 
          uat_status: 'In Review / QA Testing', 
          updated_at: new Date().toISOString() 
        });
      }
    }

    if (newStage === "Live / Delivered") {
      const { data: existing } = await supabase.from('stage_live_delivered').select('client_id').eq('client_id', clientId).maybeSingle();
      if (!existing) {
        await supabase.from('stage_live_delivered').insert({
          client_id: clientId,
          launch_date: new Date().toISOString().split('T')[0],
          launch_successful: true,
          updated_at: new Date().toISOString()
        });
      }
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('pipeline_history').update({ is_current: false, exited_at: new Date().toISOString() }).eq('client_id', clientId).eq('is_current', true);
      await supabase.from('pipeline_history').insert({ client_id: clientId, stage_name: newStage, is_current: true, triggered_by: user?.email || 'Admin' });
      fetchAdministratorData();
    } catch (err) { console.error(err); }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  const handleChecklistToggle = (item) => {
    setInProgData(prev => {
      const newChecklist = prev.checklist.includes(item) ? prev.checklist.filter(i => i !== item) : [...prev.checklist, item];
      return { ...prev, checklist: newChecklist };
    });
  };

  return (
    <div className="min-vh-100 bg-light font-narrow pb-5 text-start">
      <nav className="navbar navbar-dark bg-macrotek-black py-3 shadow mb-4">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold letter-spacing-1">MACROTEK <span className="text-macrotek-orange">COMMAND CENTER</span></span>
          <button onClick={handleLogout} className="btn btn-outline-light btn-sm rounded-pill px-3">Terminate Session</button>
        </div>
      </nav>

      <div className="container-fluid px-4">
        <div className="bg-white rounded-4 shadow-sm overflow-hidden border mb-5">
          <div className="p-4 border-bottom bg-light">
            <div className="row g-3 align-items-center">
              <div className="col-md-2">
                <h5 className="mb-0 fw-bold text-dark text-uppercase">Operational Client Log</h5>
              </div>
              <div className="col-md-3">
                <input type="text" className="form-control form-control-sm rounded-pill px-3 border-2" placeholder="🔍 Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="col-md-2">
                <select className="form-select form-select-sm rounded-pill px-3 border-2" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
                  <option value="All">All Stages</option>
                  <option value="Not Started">Not Started</option>
                  {pipelineStages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              
              {/** * Woz: Updated Gross Income Label 
               * Increased font size (fs-4) and padding for visibility.
               */}
              <div className="col-md-5 text-end d-flex align-items-center justify-content-end gap-3">
                <div className="bg-dark text-white px-4 py-2 rounded-pill shadow-lg fs-4 border border-2 border-macrotek-orange">
                  <span className="text-macrotek-orange fw-bold">TOTAL GROSS:</span> {formattedIncome}
                </div>
                <button onClick={fetchAdministratorData} className="btn btn-sm btn-macrotek-orange px-3 shadow-sm h-100">Refresh CRM</button>
              </div>
            </div>
          </div>
          <div className="table-responsive" style={{ maxHeight: '450px', overflowY: 'auto' }}>
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-macrotek-black text-white x-small text-uppercase sticky-top">
                <tr><th className="py-3 ps-4">ID</th><th>Client Profile</th><th>Business Name</th><th>Industries</th><th className="text-center">Action</th><th className="text-center">Active Stage</th><th className="pe-4 text-center">Status</th></tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-5"><div className="spinner-border text-macrotek-orange"></div></td></tr>
                ) : (
                  filteredClients.map((client) => {
                    const bizData = Array.isArray(client.business_details) ? client.business_details[0] : client.business_details;
                    const currentStage = client.pipeline_history?.find(h => h.is_current)?.stage_name;
                    return (
                      <tr key={client.client_id}>
                        <td className="ps-4 fw-bold text-macrotek-orange small">{client.client_id}</td>
                        <td><div className="fw-bold text-dark">{client.first_name} {client.last_name}</div><div className="x-small text-muted">{client.email}</div></td>
                        <td className="fw-bold text-uppercase small text-dark">{bizData?.business_name || "N/A"}</td>
                        <td>{client.industries?.map((ind, i) => (<span key={i} className="badge bg-dark text-white x-small me-1 fw-normal">{ind}</span>))}</td>
                        <td className="text-center"><button onClick={() => navigate(`/administrator/manage/${client.client_id}`)} className="btn btn-sm btn-macrotek-orange fw-bold rounded-pill px-4 shadow-sm">Manage</button></td>
                        <td className="text-center"><span className="badge bg-light text-macrotek-orange border border-macrotek-orange x-small px-3">{currentStage || "Not Started"}</span></td>
                        <td className="pe-4 text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <span className={`badge rounded-pill ${client.client_phases?.[0]?.consultation_done ? 'bg-success' : 'bg-light text-muted border'}`}>C</span>
                            <span className={`badge rounded-pill ${client.client_phases?.[0]?.sow_invoice_sent ? 'bg-success' : 'bg-light text-muted border'}`}>S</span>
                            <span className={`badge rounded-pill ${client.client_phases?.[0]?.ready_for_next_stage ? 'bg-success' : 'bg-light text-muted border'}`}>R</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <h5 className="fw-bold text-dark text-uppercase border-start border-4 border-macrotek-orange ps-3 mb-4">Pipeline Management</h5>
        <div className="d-flex gap-3 pb-3 overflow-auto">
          {pipelineStages.map((stage) => (
            <div key={stage} className="flex-grow-1 bg-white rounded-4 border shadow-sm p-3" style={{ minWidth: '280px', maxWidth: '350px' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-uppercase x-small text-muted mb-0">{stage}</h6>
                <span className="badge bg-macrotek-orange rounded-pill">{clientLog.filter(c => c.pipeline_history?.some(h => h.is_current && h.stage_name === stage)).length}</span>
              </div>
              <div className="pe-2" style={{ maxHeight: '650px', overflowY: 'auto', overflowX: 'hidden' }}>
                <div className="d-flex flex-column gap-3">
                  {clientLog
                    .filter(c => c.pipeline_history?.some(h => h.is_current && h.stage_name === stage))
                    .map(client => {
                      const bizData = Array.isArray(client.business_details) ? client.business_details[0] : client.business_details;
                      return (
                        <div 
                          key={client.client_id} 
                          className={`p-3 bg-white rounded-4 border shadow-sm animate-fade-in border cursor-pointer`}
                          onClick={() => {
                            if (stage === 'Closed Won') openClosedWonModal(client);
                            if (stage === 'Awaiting Onboarding') openOnboardingModal(client);
                            if (stage === 'Onboarding in Progress') openInProgModal(client);
                            if (stage === 'Ready for Launch / QA') openQaModal(client);
                            if (stage === 'Live / Delivered') openLiveModal(client);
                          }}
                        >
                          <div className="fw-bold fs-2 text-uppercase text-macrotek-orange mb-0" style={{ lineHeight: '1.1' }}>{bizData?.business_name || "Name Pending"}</div>
                          <div className="fw-bold text-dark mb-1">{client.first_name} {client.last_name}</div>
                          <div className="x-small text-muted fw-bold mb-3">{client.mobile} | <span className="text-macrotek-orange">ID: {client.client_id}</span></div>
                          <select className="form-select form-select-sm x-small border-2" style={{ borderColor: '#FF6B00' }} value={stage} onClick={(e) => e.stopPropagation()} onChange={(e) => { e.stopPropagation(); moveClient(client.client_id, e.target.value); }}>
                            {pipelineStages.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODALS (PRESERVED) --- */}
      {selectedClient && activeModal === 'won' && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered"><div className="modal-content rounded-4 border-0 shadow-lg font-narrow text-start"><div className="modal-header bg-macrotek-black text-white rounded-top-4 border-0"><h5 className="modal-title fw-bold text-uppercase">Finalize <span className="text-macrotek-orange">Closed Won</span> Details</h5><button type="button" className="btn-close btn-close-white" onClick={() => setSelectedClient(null)}></button></div><div className="modal-body p-4"><div className="mb-4 p-3 bg-light rounded-3 border"><div className="fw-bold fs-4 text-macrotek-orange text-uppercase">{(Array.isArray(selectedClient.business_details) ? selectedClient.business_details[0] : selectedClient.business_details)?.business_name || 'N/A'}</div><div className="fw-bold text-dark">{selectedClient.first_name} {selectedClient.last_name}</div></div><div className="row g-3"><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Contract Signed Date</label><input type="date" className="form-control" value={dealData.contract_signed_date} onChange={(e) => setDealData({...dealData, contract_signed_date: e.target.value})} /></div><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Payment Status</label><select className="form-select" value={dealData.payment_status_at_close} onChange={(e) => setDealData({...dealData, payment_status_at_close: e.target.value})}><option value="not_paid">Not Paid</option><option value="partially_paid">Partially Paid</option><option value="fully_paid">Fully Paid</option></select></div><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Amount Paid (₱)</label><input type="number" className="form-control" value={dealData.deal_value} onChange={(e) => setDealData({...dealData, deal_value: e.target.value})} /></div><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Notes</label><textarea className="form-control" rows="3" value={dealData.closed_won_notes} onChange={(e) => setDealData({...dealData, closed_won_notes: e.target.value})}></textarea></div></div></div><div className="modal-footer border-0 p-4 pt-0 text-end"><button type="button" className="btn btn-macrotek-orange rounded-pill px-4 fw-bold shadow-sm" onClick={saveClosedWonDetails}>Save Deal Details</button></div></div></div>
        </div>
      )}

      {selectedClient && activeModal === 'onboarding' && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered"><div className="modal-content rounded-4 border-0 shadow-lg font-narrow text-start"><div className="modal-header bg-macrotek-black text-white rounded-top-4 border-0"><h5 className="modal-title fw-bold text-uppercase">Project <span className="text-macrotek-orange">Onboarding</span> Setup</h5><button type="button" className="btn-close btn-close-white" onClick={() => setSelectedClient(null)}></button></div><div className="modal-body p-4"><div className="mb-4 p-3 bg-light rounded-3 border"><div className="fw-bold fs-4 text-macrotek-orange text-uppercase">{(Array.isArray(selectedClient.business_details) ? selectedClient.business_details[0] : selectedClient.business_details)?.business_name || 'N/A'}</div><div className="fw-bold text-dark">{selectedClient.first_name} {selectedClient.last_name}</div></div><div className="row g-3"><div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Awaiting Started At</label><input type="date" className="form-control" value={onboardingData.awaiting_started_at} onChange={(e) => setOnboardingData({...onboardingData, awaiting_started_at: e.target.value})} /></div><div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Kickoff Scheduled</label><input type="date" className="form-control" value={onboardingData.kickoff_scheduled_date} onChange={(e) => setOnboardingData({...onboardingData, kickoff_scheduled_date: e.target.value})} /></div><div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Info Collection Sent</label><input type="date" className="form-control" value={onboardingData.info_collection_sent_at} onChange={(e) => setOnboardingData({...onboardingData, info_collection_sent_at: e.target.value})} /></div><div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Info Completed At</label><input type="date" className="form-control" value={onboardingData.info_collection_completed_at} onChange={(e) => setOnboardingData({...onboardingData, info_collection_completed_at: e.target.value})} /></div><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Awaiting Reason / Notes</label><textarea className="form-control" rows="3" placeholder="e.g. Waiting for assets..." value={onboardingData.awaiting_reason} onChange={(e) => setOnboardingData({...onboardingData, awaiting_reason: e.target.value})}></textarea></div></div></div><div className="modal-footer border-0 p-4 pt-0 text-end"><button type="button" className="btn btn-macrotek-orange rounded-pill px-4 fw-bold shadow-sm" onClick={saveOnboardingDetails}>Save Onboarding Schedule</button></div></div></div>
        </div>
      )}

      {selectedClient && activeModal === 'in_progress' && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered"><div className="modal-content rounded-4 border-0 shadow-lg font-narrow text-start"><div className="modal-header bg-macrotek-black text-white rounded-top-4 border-0"><h5 className="modal-title fw-bold text-uppercase">Development <span className="text-macrotek-orange">Status & Tracking</span></h5><button type="button" className="btn-close btn-close-white" onClick={() => setSelectedClient(null)}></button></div><div className="modal-body p-4"><div className="mb-4 p-3 bg-light rounded-3 border"><div className="fw-bold fs-4 text-macrotek-orange text-uppercase">{(Array.isArray(selectedClient.business_details) ? selectedClient.business_details[0] : selectedClient.business_details)?.business_name || 'N/A'}</div><div className="fw-bold text-dark">{selectedClient.first_name} {selectedClient.last_name}</div></div><div className="row g-3"><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Estimated Completion Date</label><input type="date" className="form-control" value={inProgData.estimated_completion_date} onChange={(e) => setInProgData({...inProgData, estimated_completion_date: e.target.value})} /></div><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Development Status</label><select className="form-select" value={inProgData.dev_status} onChange={(e) => setInProgData({...inProgData, dev_status: e.target.value})}><option value="Work in Progress">Work in Progress</option><option value="Road-Block">Road-Block</option></select></div>{inProgData.dev_status === 'Work in Progress' && (<div className="col-12 animate-fade-in"><label className="form-label x-small fw-bold text-uppercase text-muted mb-2">Development Areas (Check all in-progress/complete)</label><div className="p-3 border rounded bg-light">{devChecklistOptions.map((item, idx) => (<div key={idx} className="form-check mb-2"><input className="form-check-input" type="checkbox" checked={inProgData.checklist.includes(item)} onChange={() => handleChecklistToggle(item)} id={`dev-item-${idx}`} /><label className="form-check-label small" htmlFor={`dev-item-${idx}`}>{item}</label></div>))}</div></div>)}{inProgData.dev_status === 'Road-Block' && (<div className="col-12 animate-fade-in"><label className="form-label x-small fw-bold text-uppercase text-muted">Reason for Road-Block</label><textarea className="form-control" rows="3" value={inProgData.blocked_reason} onChange={(e) => setInProgData({...inProgData, blocked_reason: e.target.value})}></textarea></div>)}<div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Project Note</label><textarea className="form-control" rows="3" value={inProgData.project_note} onChange={(e) => setInProgData({...inProgData, project_note: e.target.value})}></textarea></div></div></div><div className="modal-footer border-0 p-4 pt-0 text-end"><button type="button" className="btn btn-macrotek-orange rounded-pill px-4 fw-bold shadow-sm" onClick={saveInProgDetails}>Save Progress Tracker</button></div></div></div>
        </div>
      )}

      {selectedClient && activeModal === 'qa' && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered"><div className="modal-content rounded-4 border-0 shadow-lg font-narrow text-start"><div className="modal-header bg-macrotek-black text-white rounded-top-4 border-0"><h5 className="modal-title fw-bold text-uppercase">Quality Assurance <span className="text-macrotek-orange">& UAT Testing</span></h5><button type="button" className="btn-close btn-close-white" onClick={() => setSelectedClient(null)}></button></div><div className="modal-body p-4"><div className="mb-4 p-3 bg-light rounded-3 border"><div className="fw-bold fs-4 text-macrotek-orange text-uppercase">{(Array.isArray(selectedClient.business_details) ? selectedClient.business_details[0] : selectedClient.business_details)?.business_name || 'N/A'}</div><div className="fw-bold text-dark">{selectedClient.first_name} {selectedClient.last_name}</div></div><div className="row g-3"><div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">QA Started At</label><input type="date" className="form-control" value={qaData.qa_started_at} onChange={(e) => setQaData({...qaData, qa_started_at: e.target.value})} /></div><div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">QA Completed At</label><input type="date" className="form-control" value={qaData.qa_completed_at} onChange={(e) => setQaData({...qaData, qa_completed_at: e.target.value})} /></div><div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Bugs Found</label><select className="form-select" value={qaData.bugs_found_count} onChange={(e) => setQaData({...qaData, bugs_found_count: parseInt(e.target.value)})}>{[...Array(51).keys()].map(n => <option key={n} value={n}>{n}</option>)}</select></div><div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Bugs Fixed</label><select className="form-select" value={qaData.bugs_fixed_count} onChange={(e) => setQaData({...qaData, bugs_fixed_count: parseInt(e.target.value)})}>{[...Array(51).keys()].map(n => <option key={n} value={n}>{n}</option>)}</select></div><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">UAT Status</label><select className="form-select" value={qaData.uat_status} onChange={(e) => setQaData({...qaData, uat_status: e.target.value})}><option value="In Review / QA Testing">In Review / QA Testing</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option></select></div><div className="col-12"><label className="form-label x-small fw-bold text-uppercase text-muted">Client Approval Received At</label><input type="date" className="form-control" value={qaData.client_approval_received_at} onChange={(e) => setQaData({...qaData, client_approval_received_at: e.target.value})} /></div></div></div><div className="modal-footer border-0 p-4 pt-0 text-end"><button type="button" className="btn btn-macrotek-orange rounded-pill px-4 fw-bold shadow-sm" onClick={saveQaDetails}>Save QA Progress</button></div></div></div>
        </div>
      )}

      {selectedClient && activeModal === 'live' && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg font-narrow text-start">
              <div className="modal-header bg-macrotek-black text-white rounded-top-4 border-0">
                <h5 className="modal-title fw-bold text-uppercase">Project <span className="text-macrotek-orange">Delivery & Closure</span></h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedClient(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-4 p-3 bg-light rounded-3 border">
                  <div className="fw-bold fs-4 text-macrotek-orange text-uppercase">{(Array.isArray(selectedClient.business_details) ? selectedClient.business_details[0] : selectedClient.business_details)?.business_name || 'N/A'}</div>
                  <div className="fw-bold text-dark">{selectedClient.first_name} {selectedClient.last_name}</div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Official Launch Date</label><input type="date" className="form-control" value={liveData.launch_date} onChange={(e) => setLiveData({...liveData, launch_date: e.target.value})} /></div>
                  <div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Launch Successful?</label><div className="d-flex gap-4 mt-2"><div className="form-check"><input className="form-check-input" type="radio" name="launchStatus" id="launchYes" checked={liveData.launch_successful === true} onChange={() => setLiveData({...liveData, launch_successful: true})} /><label className="form-check-label small" htmlFor="launchYes">Yes</label></div><div className="form-check"><input className="form-check-input" type="radio" name="launchStatus" id="launchNo" checked={liveData.launch_successful === false} onChange={() => setLiveData({...liveData, launch_successful: false})} /><label className="form-check-label small" htmlFor="launchNo">No</label></div></div></div>
                  <div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Support Until</label><input type="date" className="form-control" value={liveData.post_launch_support_until} onChange={(e) => setLiveData({...liveData, post_launch_support_until: e.target.value})} /></div>
                  <div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Handover Docs Sent At</label><input type="date" className="form-control" value={liveData.handover_docs_sent_at} onChange={(e) => setLiveData({...liveData, handover_docs_sent_at: e.target.value})} /></div>
                  <div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Final Payment Received</label><input type="date" className="form-control" value={liveData.final_payment_received_at} onChange={(e) => setLiveData({...liveData, final_payment_received_at: e.target.value})} /></div>
                  <div className="col-md-6"><label className="form-label x-small fw-bold text-uppercase text-muted">Project Officially Closed</label><input type="date" className="form-control" value={liveData.project_closed_at} onChange={(e) => setLiveData({...liveData, project_closed_at: e.target.value})} /></div>
                </div>
              </div>
              <div className="modal-footer border-0 p-4 pt-0 text-end">
                <button type="button" className="btn btn-macrotek-orange rounded-pill px-4 fw-bold shadow-sm" onClick={saveLiveDetails}>Finalize Delivery</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrator;