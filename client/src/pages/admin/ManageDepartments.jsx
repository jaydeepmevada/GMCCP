import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', contactEmail: '', contactPerson: '' });

  useEffect(() => { fetchDepartments(); }, []);

  const fetchDepartments = async () => {
    try {
      const res = await API.get('/departments');
      setDepartments(res.data.departments);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/departments/${editing}`, formData);
        toast.success('Department updated');
      } else {
        await API.post('/departments', formData);
        toast.success('Department created');
      }
      setFormData({ name: '', description: '', contactEmail: '', contactPerson: '' });
      setShowForm(false);
      setEditing(null);
      fetchDepartments();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleEdit = (dept) => {
    setEditing(dept._id);
    setFormData({ name: dept.name, description: dept.description || '', contactEmail: dept.contactEmail || '', contactPerson: dept.contactPerson || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Deactivate this department?')) return;
    try {
      await API.delete(`/departments/${id}`);
      toast.success('Department deactivated');
      fetchDepartments();
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Manage Departments</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setFormData({ name: '', description: '', contactEmail: '', contactPerson: '' }); }} className="btn-primary flex items-center gap-1 text-sm">
          {showForm ? <HiX className="w-4 h-4" /> : <HiPlus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Department'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
          <input type="text" placeholder="Department Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="input-field" />
            <input type="text" placeholder="Contact Person" value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} className="input-field" />
          </div>
          <button type="submit" className="btn-primary text-sm">{editing ? 'Update' : 'Create'}</button>
        </form>
      )}

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Contact Person</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : departments.map((dept) => (
              <tr key={dept._id} className="hover:bg-gray-800">
                <td className="px-4 py-3 font-medium text-gray-100">{dept.name}</td>
                <td className="px-4 py-3 text-gray-400">{dept.contactPerson || '-'}</td>
                <td className="px-4 py-3 text-gray-400">{dept.contactEmail || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${dept.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {dept.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(dept)} className="p-1.5 text-blue-400 hover:bg-blue-50 rounded"><HiPencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(dept._id)} className="p-1.5 text-red-600 hover:bg-red-900/30 rounded"><HiTrash className="w-4 h-4" /></button>
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

export default ManageDepartments;
