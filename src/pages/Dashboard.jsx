import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure this path matches your file structure

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define our Project Management Stages
  const stages = [
    'New Lead', 
    'Consultation Scheduled', 
    'Proposal Sent', 
    'Active Project', 
    'Completed'
  ];

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching clients:', error);
    else setClients(data);
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Failed to update status');
    } else {
      // Optimistically update the local state so the UI feels fast
      setClients(clients.map(c => c.id === id ? { ...c, status: newStatus } : c));
    }
  };

  return (
    <div className="min-vh-100 bg-white p-4">
      <div className="container-fluid">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold text-dark border-start border-4 border-macrotek-orange ps-3">
            PROJECT <span className="text-macrotek-orange">MANAGEMENT</span>
          </h2>
          <div className="text-muted small">
            Total Leads: {clients.length}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-macrotek-orange" role="status"></div>
          </div>
        ) : (
          <div className="table-responsive shadow-sm rounded border">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-macrotek-black text-white">
                <tr>
                  <th className="py-3 ps-4">Client Name</th>
                  <th className="py-3">Industries</th>
                  <th className="py-3">Preferred Date</th>
                  <th className="py-3">Current Stage</th>
                  <th className="py-3 pe-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td className="ps-4">
                      <div className="fw-bold text-dark">{client.first_name} {client.last_name}</div>
                      <div className="small text-muted">{client.email}</div>
                    </td>
                    <td>
                      {client.industries?.map((ind, i) => (
                        <span key={i} className="badge bg-light text-dark border me-1">
                          {ind}
                        </span>
                      ))}
                    </td>
                    <td className="text-muted small">
                      {client.preferred_date || 'Not set'}
                    </td>
                    <td>
                      <select 
                        className={`form-select form-select-sm fw-bold ${
                          client.status === 'Completed' ? 'text-success' : 'text-macrotek-orange'
                        }`}
                        style={{ width: '200px', borderColor: '#FF6B00' }}
                        value={client.status || 'New Lead'}
                        onChange={(e) => updateStatus(client.id, e.target.value)}
                      >
                        {stages.map(stage => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                    </td>
                    <td className="pe-4 text-end">
                      <button className="btn btn-sm btn-outline-dark me-2">View Info</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;