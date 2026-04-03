const statusStyles = {
  New: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-orange-100 text-orange-800',
  Verified: 'bg-purple-100 text-purple-800',
  Resolved: 'bg-green-100 text-green-800',
  Closed: 'bg-gray-100 text-gray-800',
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
