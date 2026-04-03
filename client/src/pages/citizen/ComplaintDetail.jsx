import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API, { MEDIA_BASE_URL } from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import Loader from '../../components/common/Loader';
import { HiArrowLeft, HiLocationMarker, HiCalendar, HiTag, HiUser, HiOfficeBuilding, HiPhotograph } from 'react-icons/hi';

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await API.get(`/complaints/${id}`);
        setComplaint(res.data.complaint);
      } catch (err) {
        console.error('Failed to fetch complaint:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  if (loading) return <Loader />;
  if (!complaint) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold text-gray-100 mb-2">Complaint Not Found</h2>
        <Link to="/dashboard" className="btn-primary mt-4">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-blue-400 hover:underline text-sm mb-6">
        <HiArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="card">
        {/* Header */}
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

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">Description</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{complaint.description}</p>
        </div>

        {/* Image */}
        {complaint.imageUrl && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
              <HiPhotograph className="w-4 h-4" /> Attached Image
            </h3>
            <img
              src={`${MEDIA_BASE_URL}${complaint.imageUrl}`}
              alt="Complaint"
              className="w-full max-h-80 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-2">
            <HiTag className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400">Category</p>
              <p className="text-sm font-medium text-gray-100">{complaint.category?.name || '-'}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <HiLocationMarker className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm font-medium text-gray-100">{complaint.city}, {complaint.state}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <HiCalendar className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400">Submitted On</p>
              <p className="text-sm font-medium text-gray-100">{new Date(complaint.createdAt).toLocaleString()}</p>
            </div>
          </div>
          {complaint.resolvedAt && (
            <div className="flex items-start gap-2">
              <HiCalendar className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Resolved On</p>
                <p className="text-sm font-medium text-green-700">{new Date(complaint.resolvedAt).toLocaleString()}</p>
              </div>
            </div>
          )}
          {complaint.assignedTo && (
            <div className="flex items-start gap-2">
              <HiUser className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Assigned Officer</p>
                <p className="text-sm font-medium text-gray-100">{complaint.assignedTo.name}</p>
              </div>
            </div>
          )}
          {complaint.department && (
            <div className="flex items-start gap-2">
              <HiOfficeBuilding className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Department</p>
                <p className="text-sm font-medium text-gray-100">{complaint.department.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">Address</h3>
          <p className="text-gray-400 text-sm">{complaint.address}</p>
        </div>

        {/* Remarks */}
        {complaint.remarks && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-green-800 mb-1">Officer Remarks</h3>
            <p className="text-green-700 text-sm">{complaint.remarks}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetail;
