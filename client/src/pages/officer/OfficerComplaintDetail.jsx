import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API, { MEDIA_BASE_URL } from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiLocationMarker, HiCalendar, HiTag, HiUser, HiPhone, HiMail } from 'react-icons/hi';

const OfficerComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => { fetchComplaint(); }, [id]);

  const fetchComplaint = async () => {
    try {
      const res = await API.get(`/officer/complaints/${id}`);
      setComplaint(res.data.complaint);
      setRemarks(res.data.complaint.remarks || '');
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleStatusChange = async (status) => {
    setActionLoading(true);
    try {
      await API.patch(`/officer/complaints/${id}/status`, { status });
      toast.success(`Status updated to ${status}`);
      fetchComplaint();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const handleResolve = async () => {
    setActionLoading(true);
    try {
      await API.patch(`/officer/complaints/${id}/resolve`, { remarks });
      toast.success('Complaint resolved');
      fetchComplaint();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const handlePriority = async (priority) => {
    try {
      await API.patch(`/officer/complaints/${id}/priority`, { priority });
      toast.success(`Priority set to ${priority}`);
      fetchComplaint();
    } catch (err) { toast.error('Failed'); }
  };

  const handleClose = async () => {
    setActionLoading(true);
    try {
      await API.patch(`/officer/complaints/${id}/close`);
      toast.success('Complaint closed');
      fetchComplaint();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  if (loading) return <Loader />;
  if (!complaint) return <div className="text-center py-12"><p>Complaint not found</p></div>;

  return (
    <div>
      <Link to="/officer/complaints" className="inline-flex items-center gap-1 text-blue-400 hover:underline text-sm mb-6">
        <HiArrowLeft className="w-4 h-4" /> Back to Complaints
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
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
              <img src={`${MEDIA_BASE_URL}${complaint.imageUrl}`} alt="Complaint" className="w-full max-h-60 object-cover rounded-lg border mb-4" />
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2"><HiTag className="w-4 h-4 text-gray-400" /><span>{complaint.category?.name}</span></div>
              <div className="flex items-center gap-2"><HiLocationMarker className="w-4 h-4 text-gray-400" /><span>{complaint.city}</span></div>
              <div className="flex items-center gap-2"><HiCalendar className="w-4 h-4 text-gray-400" /><span>{new Date(complaint.createdAt).toLocaleDateString()}</span></div>
            </div>
            <p className="text-sm text-gray-500 mt-3"><strong>Address:</strong> {complaint.address}</p>
          </div>

          {/* Citizen Info */}
          <div className="card">
            <h3 className="font-semibold text-gray-100 mb-3">Citizen Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2"><HiUser className="w-4 h-4 text-gray-400" />{complaint.user?.name}</div>
              <div className="flex items-center gap-2"><HiMail className="w-4 h-4 text-gray-400" />{complaint.user?.email}</div>
              {complaint.user?.phone && <div className="flex items-center gap-2"><HiPhone className="w-4 h-4 text-gray-400" />{complaint.user.phone}</div>}
            </div>
          </div>
        </div>

        {/* Actions Panel */}
        <div className="space-y-4">
          {/* Status Actions */}
          <div className="card">
            <h3 className="font-semibold text-gray-100 mb-3">Update Status</h3>
            <div className="space-y-2">
              {['In Progress', 'Verified'].map((s) => (
                <button key={s} onClick={() => handleStatusChange(s)} disabled={actionLoading || complaint.status === s} className="w-full text-left px-3 py-2 text-sm rounded-lg border hover:bg-gray-800 disabled:opacity-50 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="card">
            <h3 className="font-semibold text-gray-100 mb-3">Set Priority</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Low', 'Medium', 'High', 'Urgent'].map((p) => (
                <button key={p} onClick={() => handlePriority(p)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${complaint.priority === p ? 'bg-blue-600 text-white border-blue-700' : 'hover:bg-gray-800'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Resolve */}
          {complaint.status !== 'Resolved' && complaint.status !== 'Closed' && (
            <div className="card">
              <h3 className="font-semibold text-gray-100 mb-3">Resolve Complaint</h3>
              <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Enter resolution remarks..." rows={3} className="input-field resize-none text-sm mb-3" />
              <button onClick={handleResolve} disabled={actionLoading} className="btn-primary w-full text-sm disabled:opacity-50">
                Mark as Resolved
              </button>
            </div>
          )}

          {/* Close */}
          {complaint.status === 'Resolved' && (
            <div className="card">
              <button onClick={handleClose} disabled={actionLoading} className="btn-danger w-full text-sm disabled:opacity-50">
                Close Complaint
              </button>
            </div>
          )}

          {/* Remarks */}
          {complaint.remarks && (
            <div className="card bg-green-50 border-green-200">
              <h3 className="font-semibold text-green-800 mb-1 text-sm">Resolution Remarks</h3>
              <p className="text-sm text-green-700">{complaint.remarks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficerComplaintDetail;
