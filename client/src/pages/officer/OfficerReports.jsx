import { useState, useEffect } from 'react';
import API from '../../services/api';
import { HiDocumentReport } from 'react-icons/hi';

const OfficerReports = () => {
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, complaintsRes] = await Promise.all([
          API.get('/officer/stats'),
          API.get('/officer/complaints', { params: { limit: 100 } }),
        ]);
        setStats(statsRes.data.stats);
        setComplaints(complaintsRes.data.complaints);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const statusStats = complaints.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  const priorityStats = complaints.reduce((acc, c) => {
    acc[c.priority] = (acc[c.priority] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <div className="text-center py-12 text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <HiDocumentReport className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-100">My Reports</h1>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="card text-center"><p className="text-2xl font-bold text-blue-400">{stats.total}</p><p className="text-xs text-gray-500">Total</p></div>
          <div className="card text-center"><p className="text-2xl font-bold text-orange-600">{stats.inProgress}</p><p className="text-xs text-gray-500">In Progress</p></div>
          <div className="card text-center"><p className="text-2xl font-bold text-green-600">{stats.resolved}</p><p className="text-xs text-gray-500">Resolved</p></div>
          <div className="card text-center"><p className="text-2xl font-bold text-gray-400">{stats.closed}</p><p className="text-xs text-gray-500">Closed</p></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-100 mb-4">By Status</h3>
          <div className="space-y-3">
            {Object.entries(statusStats).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{status}</span>
                <span className="text-sm font-bold text-gray-100">{count}</span>
              </div>
            ))}
            {Object.keys(statusStats).length === 0 && <p className="text-gray-400 text-sm">No data</p>}
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-100 mb-4">By Priority</h3>
          <div className="space-y-3">
            {Object.entries(priorityStats).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{priority}</span>
                <span className="text-sm font-bold text-gray-100">{count}</span>
              </div>
            ))}
            {Object.keys(priorityStats).length === 0 && <p className="text-gray-400 text-sm">No data</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerReports;
