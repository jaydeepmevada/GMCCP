import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import { HiEye } from 'react-icons/hi';

const OfficerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => { fetchComplaints(); }, [statusFilter, priorityFilter]);

  const fetchComplaints = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const res = await API.get('/officer/complaints', { params });
      setComplaints(res.data.complaints);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Assigned Complaints</h1>

      <div className="flex gap-3 mb-6">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setLoading(true); }} className="input-field w-auto text-sm">
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <select value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setLoading(true); }} className="input-field w-auto text-sm">
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Citizen</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">City</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Priority</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={8} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : complaints.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-8 text-gray-400">No complaints assigned</td></tr>
            ) : complaints.map((c) => (
              <tr key={c._id} className="hover:bg-gray-800">
                <td className="px-4 py-3 font-mono text-xs text-blue-400">{c.complaintId}</td>
                <td className="px-4 py-3 font-medium text-gray-100 max-w-[200px] truncate">{c.title}</td>
                <td className="px-4 py-3 text-gray-400">{c.user?.name}</td>
                <td className="px-4 py-3 text-gray-400">{c.city}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link to={`/officer/complaints/${c._id}`} className="p-1.5 text-blue-400 hover:bg-blue-50 rounded inline-block">
                    <HiEye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerComplaints;
