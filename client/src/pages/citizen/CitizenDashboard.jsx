import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import ComplaintCard from '../../components/complaints/ComplaintCard';
import Loader from '../../components/common/Loader';
import { HiPlus, HiClipboardList, HiClock, HiCheckCircle, HiInbox } from 'react-icons/hi';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => { fetchComplaints(); }, [filter]);

  const fetchComplaints = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const res = await API.get('/complaints', { params });
      setComplaints(res.data.complaints);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter((c) => c.status === 'In Progress' || c.status === 'New').length,
    resolved: complaints.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length,
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your complaints and track their status</p>
        </div>
        <Link to="/submit-complaint" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff9933] to-[#f08c28] hover:from-[#e6862e] hover:to-[#d97a22] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-orange-400/20 hover:shadow-xl hover:shadow-orange-400/30 active:scale-[0.98]">
          <HiPlus className="w-5 h-5" /> New Complaint
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: HiClipboardList, label: 'Total Complaints', value: stats.total, gradient: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/15' },
          { icon: HiClock, label: 'Pending / In Progress', value: stats.inProgress, gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/15' },
          { icon: HiCheckCircle, label: 'Resolved / Closed', value: stats.resolved, gradient: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/15' },
        ].map((s, i) => (
          <div key={i} className={`card-hover flex items-center gap-4 animate-fade-in-up stagger-${i + 1}`}>
            <div className={`w-13 h-13 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center shadow-lg ${s.shadow} flex-shrink-0`} style={{ width: '52px', height: '52px' }}>
              <s.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-100 tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 animate-fade-in-up stagger-4">
        {['', 'New', 'In Progress', 'Verified', 'Resolved', 'Closed'].map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setLoading(true); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              filter === s
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-gray-800'
            }`}
          >
            {s || 'All'}
          </button>
        ))}
      </div>

      {/* Complaints */}
      {complaints.length === 0 ? (
        <div className="card text-center py-20 animate-fade-in-up">
          <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <HiInbox className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-300 mb-2">No complaints yet</h3>
          <p className="text-gray-500 mb-6 text-sm">Submit your first complaint to get started</p>
          <Link to="/submit-complaint" className="btn-primary inline-flex items-center gap-2">
            <HiPlus className="w-4 h-4" /> Submit Complaint
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up stagger-5">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
