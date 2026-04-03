import { NavLink } from 'react-router-dom';
import {
  HiHome,
  HiUsers,
  HiClipboardList,
  HiTag,
  HiOfficeBuilding,
  HiDocumentReport,
  HiSupport,
  HiChat,
  HiX,
} from 'react-icons/hi';
import { LogoIcon } from './Logo';

const adminLinks = [
  { to: '/admin', icon: HiHome, label: 'Dashboard', end: true },
  { to: '/admin/users', icon: HiUsers, label: 'Manage Users' },
  { to: '/admin/complaints', icon: HiClipboardList, label: 'Complaints' },
  { to: '/admin/categories', icon: HiTag, label: 'Categories' },
  { to: '/admin/departments', icon: HiOfficeBuilding, label: 'Departments' },
  { to: '/admin/reports', icon: HiDocumentReport, label: 'Reports' },
  { to: '/admin/support', icon: HiSupport, label: 'Help/Support' },
  { to: '/admin/feedbacks', icon: HiChat, label: 'Feedbacks' },
];

const officerLinks = [
  { to: '/officer', icon: HiHome, label: 'Dashboard', end: true },
  { to: '/officer/complaints', icon: HiClipboardList, label: 'My Complaints' },
  { to: '/officer/reports', icon: HiDocumentReport, label: 'Reports' },
];

const Sidebar = ({ role = 'admin', isOpen, onClose }) => {
  const links = role === 'admin' ? adminLinks : officerLinks;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-[260px] bg-gray-900 border-r border-gray-800 z-50 transform transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl shadow-black/50' : '-translate-x-full'
        }`}
      >
        {/* Mobile close */}
        <div className="lg:hidden flex justify-between items-center px-5 py-4 border-b border-gray-800">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Menu</span>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
            <HiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Role Badge */}
        <div className="px-5 py-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
            role === 'admin' ? 'bg-red-900/40 text-red-400 border border-red-800' : 'bg-blue-900/40 text-blue-400 border border-blue-800'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${role === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
            {role} Panel
          </div>
        </div>

        {/* Nav Links */}
        <nav className="px-3 pb-4 space-y-0.5 overflow-y-auto h-[calc(100%-8rem)]">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-900/40 text-blue-400 shadow-sm shadow-blue-900/20'
                    : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isActive ? 'bg-blue-600 shadow-md shadow-blue-600/20' : 'bg-gray-800 group-hover:bg-gray-700'
                  }`}>
                    <link.icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  </div>
                  <span>{link.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full"></div>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
