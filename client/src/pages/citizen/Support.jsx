import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { HiSupport, HiPlus } from 'react-icons/hi';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchTickets(); }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get('/support');
      setTickets(res.data.tickets);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/support', formData);
      toast.success('Support ticket created');
      setFormData({ subject: '', message: '' });
      setShowForm(false);
      fetchTickets();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSubmitting(false); }
  };

  const statusColor = { Open: 'text-blue-400 bg-blue-50', Responded: 'text-green-700 bg-green-50', Closed: 'text-gray-300 bg-gray-100' };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Help & Support</h1>
          <p className="text-gray-500 text-sm">Submit queries and get help from admin</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-1 text-sm">
          <HiPlus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
          <input type="text" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required className="input-field" />
          <textarea placeholder="Describe your issue..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={4} className="input-field resize-none" />
          <div className="flex gap-2">
            <button type="submit" disabled={submitting} className="btn-primary text-sm disabled:opacity-50">Submit</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : tickets.length === 0 ? (
        <div className="card text-center py-12">
          <HiSupport className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">No support tickets yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t._id} className="card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-100">{t.subject}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor[t.status] || ''}`}>{t.status}</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{t.message}</p>
              {t.response && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-2">
                  <p className="text-xs font-semibold text-blue-400 mb-1">Admin Response:</p>
                  <p className="text-sm text-blue-800">{t.response}</p>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">{new Date(t.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Support;
