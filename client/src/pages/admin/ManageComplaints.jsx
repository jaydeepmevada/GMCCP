import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import toast from 'react-hot-toast';
import { HiSearch, HiEye, HiUserAdd, HiX } from 'react-icons/hi';

const ManageComplaints = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [officers, setOfficers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [assignModal, setAssignModal] = useState(null);
  const [assignData, setAssignData] = useState({ assignedTo: '', department: '' });
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  // Sync statusFilter with URL search params
  useEffect(() => {
    const urlStatus = searchParams.get('status') || '';
    if (urlStatus !== statusFilter) {
      setStatusFilter(urlStatus);
    }
  }, [searchParams]);

  useEffect(() => { fetchComplaints(); fetchOfficers(); fetchDepartments(); }, [statusFilter, pagination.page]);

  const fetchComplaints = async () => {
    try {
      const params = { page: pagination.page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;
      const res = await API.get('/admin/complaints', { params });
      setComplaints(res.data.complaints);
      setPagination(res.data.pagination);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchOfficers = async () => {
    try { const res = await API.get('/admin/users', { params: { role: 'officer', limit: 100 } }); setOfficers(res.data.users); } catch (err) {}
  };

  const fetchDepartments = async () => {
    try { const res = await API.get('/departments'); setDepartments(res.data.departments); } catch (err) {}
  };

  const handleAssign = async (complaintId) => {
    try {
      await API.patch(`/admin/complaints/${complaintId}/assign`, assignData);
      toast.success('Complaint assigned');
      setAssignModal(null);
      setAssignData({ assignedTo: '', department: '' });
      fetchComplaints();
    } catch (err) { toast.error('Failed to assign'); }
  };

  const handleStatusChange = async (complaintId, status) => {
    try {
      await API.patch(`/admin/complaints/${complaintId}/status`, { status });
      toast.success('Status updated');
      fetchComplaints();
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <h1 className="section-title">Manage Complaints</h1>
        <p className="section-subtitle">View, filter, assign and manage all complaints</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={(e) => { e.preventDefault(); setLoading(true); fetchComplaints(); }} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, ID..." className="input-field pl-11 text-sm" />
          </div>
          <button type="submit" className="btn-primary text-sm py-2.5">Search</button>
        </form>
        <select value={statusFilter} onChange={(e) => { const val = e.target.value; setStatusFilter(val); setLoading(true); if (val) { setSearchParams({ status: val }); } else { setSearchParams({}); } }} className="input-field w-auto text-sm">
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Verified">Verified</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Citizen</th>
              <th>City</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Officer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-12 text-gray-400">Loading...</td></tr>
            ) : complaints.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-12 text-gray-400">No complaints found</td></tr>
            ) : complaints.map((c) => (
              <tr key={c._id}>
                <td className="font-mono text-xs text-blue-400 font-bold">{c.complaintId}</td>
                <td className="font-semibold text-gray-100 max-w-[200px] truncate">{c.title}</td>
                <td className="text-gray-400">{c.user?.name}</td>
                <td className="text-gray-500">{c.city}</td>
                <td>
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    className="text-xs border border-gray-700 rounded-lg px-2 py-1.5 bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  >
                    {['New', 'In Progress', 'Verified', 'Resolved', 'Closed'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td><PriorityBadge priority={c.priority} /></td>
                <td className="text-gray-500 text-xs">{c.assignedTo?.name || <span className="text-gray-300">—</span>}</td>
                <td>
                  <div className="flex gap-1">
                    <Link to={`/admin/complaints/${c._id}`} className="p-2 text-blue-400 hover:bg-blue-50 rounded-xl transition-colors" title="View">
                      <HiEye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => { setAssignModal(c._id); setAssignData({ assignedTo: c.assignedTo?._id || '', department: c.department?._id || '' }); }} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors" title="Assign">
                      <HiUserAdd className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button key={i} onClick={() => setPagination({ ...pagination, page: i + 1 })} className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${pagination.page === i + 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-700/20' : 'bg-gray-900 text-gray-500 hover:bg-gray-800 border border-gray-700'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Assign Modal */}
      {assignModal && (
        <div className="modal-backdrop">
          <div className="modal-content max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-100">Assign Complaint</h3>
              <button onClick={() => setAssignModal(null)} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                <HiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Department</label>
                <select value={assignData.department} onChange={(e) => setAssignData({ ...assignData, department: e.target.value })} className="input-field text-sm">
                  <option value="">Select Department</option>
                  {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Officer</label>
                <select value={assignData.assignedTo} onChange={(e) => setAssignData({ ...assignData, assignedTo: e.target.value })} className="input-field text-sm">
                  <option value="">Select Officer</option>
                  {officers.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => handleAssign(assignModal)} className="btn-primary flex-1 text-sm">Assign</button>
                <button onClick={() => setAssignModal(null)} className="btn-ghost flex-1 text-sm border border-gray-700 rounded-xl">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageComplaints;
