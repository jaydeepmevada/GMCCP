import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import { HiClipboardList, HiClock, HiCheckCircle, HiUsers, HiTag, HiOfficeBuilding, HiExclamation, HiXCircle, HiArrowRight } from 'react-icons/hi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/admin/stats');
        setStats(res.data.stats);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const statCards = stats ? [
    { icon: HiClipboardList, label: 'Total Complaints', value: stats.totalComplaints, gradient: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20', link: '/admin/complaints' },
    { icon: HiExclamation, label: 'New', value: stats.newComplaints, gradient: 'from-amber-400 to-amber-500', shadow: 'shadow-amber-500/20', link: '/admin/complaints?status=New' },
    { icon: HiClock, label: 'In Progress', value: stats.inProgressComplaints, gradient: 'from-orange-500 to-orange-600', shadow: 'shadow-orange-500/20', link: '/admin/complaints?status=In Progress' },
    { icon: HiCheckCircle, label: 'Resolved', value: stats.resolvedComplaints, gradient: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/20', link: '/admin/complaints?status=Resolved' },
    { icon: HiXCircle, label: 'Closed', value: stats.closedComplaints, gradient: 'from-gray-500 to-gray-600', shadow: 'shadow-gray-500/20', link: '/admin/complaints?status=Closed' },
    { icon: HiUsers, label: 'Citizens', value: stats.totalUsers, gradient: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-500/20', link: '/admin/users?role=citizen' },
    { icon: HiUsers, label: 'Officers', value: stats.totalOfficers, gradient: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-500/20', link: '/admin/users?role=officer' },
    { icon: HiTag, label: 'Categories', value: stats.totalCategories, gradient: 'from-pink-500 to-pink-600', shadow: 'shadow-pink-500/20', link: '/admin/categories' },
    { icon: HiOfficeBuilding, label: 'Departments', value: stats.totalDepartments, gradient: 'from-teal-500 to-teal-600', shadow: 'shadow-teal-500/20', link: '/admin/departments' },
  ] : [];

  return (
    <div>
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {user?.name}. System overview at a glance.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 bg-gray-200 rounded-2xl" style={{ width: '52px', height: '52px' }}></div>
                <div className="space-y-2">
                  <div className="h-7 w-12 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((s, i) => (
            <Link
              key={i}
              to={s.link}
              className={`card-interactive flex items-center gap-4 group animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center shadow-lg ${s.shadow} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`} style={{ width: '52px', height: '52px' }}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-extrabold text-gray-100 tracking-tight">{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
              <HiArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
