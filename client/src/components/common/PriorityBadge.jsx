const priorityStyles = {
  Low: 'bg-gray-100 text-gray-700',
  Medium: 'bg-blue-100 text-blue-700',
  High: 'bg-orange-100 text-orange-700',
  Urgent: 'bg-red-100 text-red-700',
};

const PriorityBadge = ({ priority }) => {
  const style = priorityStyles[priority] || 'bg-gray-100 text-gray-700';

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${style}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;
