import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdministratorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(`Authorization Failed: ${error.message}`);
      setLoading(false);
    } else {
      navigate('/administrator');
    }
  };

  return (
    <div className="container-fluid bg-macrotek-black min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 border-0 bg-white" style={{ maxWidth: '400px', width: '100%', borderRadius: '24px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-0">COMMAND <span className="text-macrotek-orange">CENTER</span></h2>
          <p className="text-muted x-small text-uppercase letter-spacing-1 mt-1">Administrator Authorization</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label x-small fw-bold text-uppercase text-muted">Secure Email</label>
            <input type="email" className="form-control py-3 border-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label x-small fw-bold text-uppercase text-muted">Access Key</label>
            <input type="password" className="form-control py-3 border-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-macrotek-orange w-100 fw-bold py-3 text-uppercase shadow-sm" disabled={loading}>
            {loading ? 'Authenticating...' : 'Establish Connection'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdministratorLogin;