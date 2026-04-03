import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const ManageSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingTo, setRespondingTo] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => { fetchTickets(); }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get('/support/all');
      setTickets(res.data.tickets);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleRespond = async (id) => {
    try {
      await API.put(`/support/${id}`, { response, status: 'Responded' });
      toast.success('Response sent');
      setRespondingTo(null);
      setResponse('');
      fetchTickets();
    } catch (err) { toast.error('Failed'); }
  };

  const handleClose = async (id) => {
    try {
      await API.put(`/support/${id}`, { status: 'Closed' });
      toast.success('Ticket closed');
      fetchTickets();
    } catch (err) { toast.error('Failed'); }
  };

  const statusColor = { Open: 'bg-blue-900/30 text-blue-400', Responded: 'bg-green-100 text-green-700', Closed: 'bg-gray-100 text-gray-300' };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Manage Help/Support</h1>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : tickets.length === 0 ? (
        <div className="card text-center py-12"><p className="text-gray-400">No support tickets</p></div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t._id} className="card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-100">{t.subject}</h3>
                  <p className="text-xs text-gray-400">By: {t.user?.name} ({t.user?.email}) • {new Date(t.createdAt).toLocaleString()}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor[t.status] || ''}`}>{t.status}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{t.message}</p>

              {t.response && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">Your Response:</p>
                  <p className="text-sm text-green-800">{t.response}</p>
                </div>
              )}

              {respondingTo === t._id ? (
                <div className="space-y-2">
                  <textarea value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Type your response..." rows={3} className="input-field resize-none text-sm" />
                  <div className="flex gap-2">
                    <button onClick={() => handleRespond(t._id)} className="btn-primary text-sm">Send Response</button>
                    <button onClick={() => setRespondingTo(null)} className="btn-outline text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  {t.status !== 'Closed' && (
                    <>
                      <button onClick={() => { setRespondingTo(t._id); setResponse(t.response || ''); }} className="text-sm text-blue-400 hover:underline">Respond</button>
                      <button onClick={() => handleClose(t._id)} className="text-sm text-gray-500 hover:underline">Close</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSupport;
