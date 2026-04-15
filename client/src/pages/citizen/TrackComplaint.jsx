import { useState } from 'react';
import API from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import toast from 'react-hot-toast';
import { HiSearch, HiCalendar, HiTag, HiLocationMarker } from 'react-icons/hi';

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!complaintId.trim()) {
      toast.error('Please enter a complaint ID');
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await API.get(`/complaints/track/${complaintId.trim()}`);
      setComplaint(res.data.complaint);
    } catch (err) {
      setComplaint(null);
      toast.error(err.response?.data?.message || 'Complaint not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-1">Track Your Complaint</h1>
        <p className="text-gray-500">Enter your complaint ID to check the current status</p>
      </div>

      <form onSubmit={handleTrack} className="card mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              placeholder="e.g., GMCCP-2025-00001"
              className="input-field pl-10"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Track'
            )}
          </button>
        </div>
      </form>

      {/* Result */}
      {searched && !loading && complaint && (
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-blue-400 font-mono font-semibold">{complaint.complaintId}</p>
              <h2 className="text-lg font-bold text-gray-100 mt-1">{complaint.title}</h2>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {complaint.category && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <HiTag className="w-4 h-4 text-gray-400" />
                {complaint.category.name}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <HiLocationMarker className="w-4 h-4 text-gray-400" />
              {complaint.city}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <HiCalendar className="w-4 h-4 text-gray-400" />
              Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
            </div>
            {complaint.resolvedAt && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <HiCalendar className="w-4 h-4" />
                Resolved: {new Date(complaint.resolvedAt).toLocaleDateString()}
              </div>
            )}
          </div>

          {complaint.remarks && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
              <p className="text-sm font-semibold text-green-800 mb-1">Officer Remarks</p>
              <p className="text-sm text-green-700">{complaint.remarks}</p>
            </div>
          )}

          {/* Status Timeline */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Status Timeline</h3>
            <div className="space-y-3">
              {['New', 'In Progress', 'Verified', 'Resolved', 'Closed'].map((s, i) => {
                const statusOrder = ['New', 'In Progress', 'Verified', 'Resolved', 'Closed'];
                const currentIndex = statusOrder.indexOf(complaint.status);
                const isCompleted = i <= currentIndex;
                const isCurrent = s === complaint.status;

                return (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      isCurrent ? 'bg-blue-600 ring-4 ring-blue-100' :
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                    <span className={`text-sm ${isCurrent ? 'font-semibold text-blue-400' : isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {searched && !loading && !complaint && (
        <div className="card text-center py-8">
          <p className="text-gray-400">No complaint found with this ID. Please check and try again.</p>
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;
