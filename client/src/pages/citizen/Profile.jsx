import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HiPencil, HiCheck, HiX } from 'react-icons/hi';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    address: user?.address || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      city: user?.city || '',
      address: user?.address || '',
    });
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">My Profile</h1>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="btn-outline flex items-center gap-1 text-sm py-2 px-4">
            <HiPencil className="w-4 h-4" /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={loading} className="btn-primary flex items-center gap-1 text-sm py-2 px-4 disabled:opacity-50">
              <HiCheck className="w-4 h-4" /> Save
            </button>
            <button onClick={handleCancel} className="btn-danger flex items-center gap-1 text-sm py-2 px-4">
              <HiX className="w-4 h-4" /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
          <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-400">{user?.name?.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-100">{user?.name}</h2>
            <p className="text-gray-500 capitalize text-sm">{user?.role} Account</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">Full Name</label>
            {editing ? (
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field mt-1" />
            ) : (
              <p className="text-gray-100 font-medium mt-1">{user?.name}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">Email</label>
            <p className="text-gray-100 font-medium mt-1">{user?.email}</p>
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">Phone</label>
            {editing ? (
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field mt-1" placeholder="Enter phone number" />
            ) : (
              <p className="text-gray-100 font-medium mt-1">{user?.phone || 'Not provided'}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">City</label>
            {editing ? (
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field mt-1" placeholder="Enter city" />
            ) : (
              <p className="text-gray-100 font-medium mt-1">{user?.city || 'Not provided'}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">Address</label>
            {editing ? (
              <textarea name="address" value={formData.address} onChange={handleChange} className="input-field mt-1 resize-none" rows={2} placeholder="Enter address" />
            ) : (
              <p className="text-gray-100 font-medium mt-1">{user?.address || 'Not provided'}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">Member Since</label>
            <p className="text-gray-100 font-medium mt-1">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
