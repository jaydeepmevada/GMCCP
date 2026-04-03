import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiLocationMarker, HiCalendar, HiTag, HiUser, HiOfficeBuilding } from 'react-icons/hi';

const AdminComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [officers, setOfficers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [assignData, setAssignData] = useState({ assignedTo: '', department: '' });

  useEffect(() => {
    fetchComplaint();
    fetchOfficers();
    fetchDepartments();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const res = await API.get(`/admin/complaints/${id}`);
      const found = res.data.complaint;
      if (found) {
        setComplaint(found);
        setAssignData({ assignedTo: found.assignedTo?._id || '', department: found.department?._id || '' });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchOfficers = async () => {
    try { const res = await API.get('/admin/users', { params: { role: 'officer', limit: 100 } }); setOfficers(res.data.users); } catch (err) {}
  };

  const fetchDepartments = async () => {
    try { const res = await API.get('/departments'); setDepartments(res.data.departments); } catch (err) {}
  };

  const handleAssign = async () => {
    try {
      await API.patch(`/admin/complaints/${id}/assign`, assignData);
      toast.success('Assigned successfully');
      fetchComplaint();
    } catch (err) { toast.error('Failed'); }
  };

  const handleStatusChange = async (status) => {
    try {
      await API.patch(`/admin/complaints/${id}/status`, { status });
      toast.success('Status updated');
      fetchComplaint();
    } catch (err) { toast.error('Failed'); }
  };

  if (loading) return <Loader />;
  if (!complaint) return <div className="text-center py-12"><p>Complaint not found</p><Link to="/admin/complaints" className="btn-primary mt-4">Back</Link></div>;

  return (
    <div>
      <Link to="/admin/complaints" className="inline-flex items-center gap-1 text-blue-400 hover:underline text-sm mb-6">
        <HiArrowLeft className="w-4 h-4" /> Back to Complaints
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-blue-400 font-mono font-semibold">{complaint.complaintId}</p>
              <h1 className="text-xl font-bold text-gray-100 mt-1">{complaint.title}</h1>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">{complaint.description}</p>
          {complaint.imageUrl && (
            <img src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${complaint.imageUrl}`} alt="Complaint" className="w-full max-h-60 object-cover rounded-lg border mb-4" />
          )}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2"><HiTag className="w-4 h-4 text-gray-400" />{complaint.category?.name}</div>
            <div className="flex items-center gap-2"><HiLocationMarker className="w-4 h-4 text-gray-400" />{complaint.city}</div>
            <div className="flex items-center gap-2"><HiUser className="w-4 h-4 text-gray-400" />{complaint.user?.name} ({complaint.user?.email})</div>
            <div className="flex items-center gap-2"><HiCalendar className="w-4 h-4 text-gray-400" />{new Date(complaint.createdAt).toLocaleString()}</div>
          </div>
          <p className="text-sm text-gray-500 mt-3"><strong>Address:</strong> {complaint.address}</p>
          {complaint.remarks && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
              <p className="text-sm font-semibold text-green-800 mb-1">Remarks</p>
              <p className="text-sm text-green-700">{complaint.remarks}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-gray-100 mb-3">Update Status</h3>
            <select value={complaint.status} onChange={(e) => handleStatusChange(e.target.value)} className="input-field text-sm">
              {['New', 'In Progress', 'Verified', 'Resolved', 'Closed'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-100 mb-3">Assign</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">Department</label>
                <select value={assignData.department} onChange={(e) => setAssignData({ ...assignData, department: e.target.value })} className="input-field text-sm">
                  <option value="">Select</option>
                  {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500">Officer</label>
                <select value={assignData.assignedTo} onChange={(e) => setAssignData({ ...assignData, assignedTo: e.target.value })} className="input-field text-sm">
                  <option value="">Select</option>
                  {officers.map((o) => <option key={o._id} value={o._id}>{o.name}</option>)}
                </select>
              </div>
              <button onClick={handleAssign} className="btn-primary w-full text-sm">Assign</button>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-100 mb-2">Current Assignment</h3>
            <div className="text-sm space-y-1">
              <p className="flex items-center gap-2"><HiOfficeBuilding className="w-4 h-4 text-gray-400" />{complaint.department?.name || 'Not assigned'}</p>
              <p className="flex items-center gap-2"><HiUser className="w-4 h-4 text-gray-400" />{complaint.assignedTo?.name || 'Not assigned'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetail;
