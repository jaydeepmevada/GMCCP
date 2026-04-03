import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data.categories);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/categories/${editing}`, formData);
        toast.success('Category updated');
      } else {
        await API.post('/categories', formData);
        toast.success('Category created');
      }
      setFormData({ name: '', description: '' });
      setShowForm(false);
      setEditing(null);
      fetchCategories();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleEdit = (cat) => {
    setEditing(cat._id);
    setFormData({ name: cat.name, description: cat.description || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Deactivate this category?')) return;
    try {
      await API.delete(`/categories/${id}`);
      toast.success('Category deactivated');
      fetchCategories();
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Manage Categories</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setFormData({ name: '', description: '' }); }} className="btn-primary flex items-center gap-1 text-sm">
          {showForm ? <HiX className="w-4 h-4" /> : <HiPlus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
          <input type="text" placeholder="Category Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Description (optional)" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" />
          <button type="submit" className="btn-primary text-sm">{editing ? 'Update' : 'Create'}</button>
        </form>
      )}

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Description</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-800">
                <td className="px-4 py-3 font-medium text-gray-100">{cat.name}</td>
                <td className="px-4 py-3 text-gray-400">{cat.description || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(cat)} className="p-1.5 text-blue-400 hover:bg-blue-50 rounded"><HiPencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(cat._id)} className="p-1.5 text-red-600 hover:bg-red-900/30 rounded"><HiTrash className="w-4 h-4" /></button>
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

export default ManageCategories;
