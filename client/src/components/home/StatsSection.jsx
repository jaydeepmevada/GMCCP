import { HiClipboardList, HiCheckCircle, HiClock, HiUsers } from 'react-icons/hi';

const stats = [
  { icon: HiClipboardList, label: 'Total Complaints', value: '0', gradient: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20', bg: 'bg-blue-950' },
  { icon: HiCheckCircle, label: 'Resolved', value: '0', gradient: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/20', bg: 'bg-emerald-950' },
  { icon: HiClock, label: 'In Progress', value: '0', gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/20', bg: 'bg-amber-950' },
  { icon: HiUsers, label: 'Registered Citizens', value: '0', gradient: 'from-purple-500 to-indigo-500', shadow: 'shadow-purple-500/20', bg: 'bg-purple-950' },
];

const StatsSection = ({ statsData }) => {
  const displayStats = statsData
    ? [
        { ...stats[0], value: statsData.totalComplaints || '0' },
        { ...stats[1], value: statsData.resolved || '0' },
        { ...stats[2], value: statsData.inProgress || '0' },
        { ...stats[3], value: statsData.totalUsers || '0' },
      ]
    : stats;

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Live Statistics</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">Portal at a Glance</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Real-time overview of complaint management across Gujarat municipalities</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayStats.map((stat, index) => (
            <div key={index} className={`card-hover text-center group animate-fade-in-up stagger-${index + 1}`}>
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-5 shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold text-gray-100 tracking-tight">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1.5 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
