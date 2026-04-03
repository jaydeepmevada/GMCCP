import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import { HiLocationMarker, HiCalendar, HiTag, HiArrowRight } from 'react-icons/hi';

const ComplaintCard = ({ complaint, linkPrefix = '/complaints' }) => {
  return (
    <Link
      to={`${linkPrefix}/${complaint._id}`}
      className="card-interactive block group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-blue-400 font-mono font-bold tracking-wide mb-1.5">{complaint.complaintId}</p>
          <h3 className="text-base font-bold text-gray-100 group-hover:text-blue-400 transition-colors truncate">
            {complaint.title}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-1.5 ml-3 flex-shrink-0">
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
        </div>
      </div>

      <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">{complaint.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {complaint.category && (
            <span className="flex items-center gap-1">
              <HiTag className="w-3.5 h-3.5" />
              {complaint.category.name || complaint.category}
            </span>
          )}
          <span className="flex items-center gap-1">
            <HiLocationMarker className="w-3.5 h-3.5" />
            {complaint.city}
          </span>
          <span className="flex items-center gap-1">
            <HiCalendar className="w-3.5 h-3.5" />
            {new Date(complaint.createdAt).toLocaleDateString()}
          </span>
        </div>
        <HiArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

export default ComplaintCard;
