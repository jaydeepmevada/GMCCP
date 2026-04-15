import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import { HiClipboardList, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';

const OfficerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/officer/stats');
        setStats(res.data.stats);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const statCards = stats ? [
    { icon: HiClipboardList, label: 'Total Assigned', value: stats.total, color: 'text-blue-400', bg: 'bg-blue-50' },
    { icon: HiClock, label: 'In Progress', value: stats.inProgress, color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: HiCheckCircle, label: 'Resolved', value: stats.resolved, color: 'text-green-600', bg: 'bg-green-50' },
    { icon: HiXCircle, label: 'Closed', value: stats.closed, color: 'text-gray-400', bg: 'bg-gray-100' },
  ] : [];

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-bold text-gray-100 mb-1">Officer Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome, {user?.name}. Manage your assigned complaints.</p>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <div key={i} className="card flex items-center gap-4">
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-100">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfficerDashboard;
