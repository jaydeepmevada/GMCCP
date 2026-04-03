import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { HiSearch, HiPencil, HiBan, HiCheckCircle } from 'react-icons/hi';

const ManageUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState(searchParams.get('role') || '');
  const [editingUser, setEditingUser] = useState(null);
  const [departments, setDepartments] = useState([]);

  // Sync roleFilter with URL search params
  useEffect(() => {
    const urlRole = searchParams.get('role') || '';
    if (urlRole !== roleFilter) {
      setRoleFilter(urlRole);
    }
  }, [searchParams]);

  useEffect(() => { fetchUsers(); fetchDepartments(); }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (search) params.search = search;
      const res = await API.get('/admin/users', { params });
      setUsers(res.data.users);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchDepartments = async () => {
    try {
      const res = await API.get('/departments');
      setDepartments(res.data.departments);
    } catch (err) { console.error(err); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchUsers();
  };

  const handleUpdateUser = async (userId, data) => {
    try {
      await API.put(`/admin/users/${userId}`, data);
      toast.success('User updated');
      setEditingUser(null);
      fetchUsers();
    } catch (err) { toast.error('Failed to update user'); }
  };

  const handleToggleActive = async (userId, isActive) => {
    try {
      await API.put(`/admin/users/${userId}`, { isActive: !isActive });
      toast.success(isActive ? 'User deactivated' : 'User activated');
      fetchUsers();
    } catch (err) { toast.error('Failed'); }
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-700',
    officer: 'bg-blue-900/30 text-blue-400',
    citizen: 'bg-green-100 text-green-700',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Manage Users</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="input-field pl-9 text-sm" />
          </div>
          <button type="submit" className="btn-primary text-sm">Search</button>
        </form>
        <select value={roleFilter} onChange={(e) => { const val = e.target.value; setRoleFilter(val); setLoading(true); if (val) { setSearchParams({ role: val }); } else { setSearchParams({}); } }} className="input-field w-auto text-sm">
          <option value="">All Roles</option>
          <option value="citizen">Citizens</option>
          <option value="officer">Officers</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Role</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">No users found</td></tr>
            ) : users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-800">
                <td className="px-4 py-3 font-medium text-gray-100">{u.name}</td>
                <td className="px-4 py-3 text-gray-400">{u.email}</td>
                <td className="px-4 py-3">
                  {editingUser === u._id ? (
                    <select
                      defaultValue={u.role}
                      onChange={(e) => handleUpdateUser(u._id, { role: e.target.value })}
                      className="input-field text-xs py-1 px-2 w-24"
                    >
                      <option value="citizen">Citizen</option>
                      <option value="officer">Officer</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${roleColors[u.role] || ''}`}>{u.role}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => setEditingUser(editingUser === u._id ? null : u._id)} className="p-1.5 text-blue-400 hover:bg-blue-50 rounded" title="Edit role">
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleToggleActive(u._id, u.isActive)} className={`p-1.5 rounded ${u.isActive ? 'text-red-600 hover:bg-red-900/30' : 'text-green-600 hover:bg-green-50'}`} title={u.isActive ? 'Deactivate' : 'Activate'}>
                      {u.isActive ? <HiBan className="w-4 h-4" /> : <HiCheckCircle className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
