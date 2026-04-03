import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { HiPhotograph, HiX, HiClipboardList, HiArrowLeft } from 'react-icons/hi';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', city: '', state: 'Gujarat', address: '', image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try { const res = await API.get('/categories'); setCategories(res.data.categories); }
      catch (err) { toast.error('Failed to load categories'); }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { toast.error('Image size must be less than 5MB'); return; }
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => { setFormData({ ...formData, image: null }); setPreview(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => { if (val) data.append(key, val); });
      const res = await API.post('/complaints', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(`Complaint submitted! ID: ${res.data.complaint.complaintId}`);
      navigate('/dashboard');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to submit complaint'); }
    finally { setLoading(false); }
  };

  const gujaratCities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar',
    'Junagadh', 'Gandhinagar', 'Anand', 'Nadiad', 'Morbi', 'Mehsana',
    'Bharuch', 'Vapi', 'Navsari', 'Veraval', 'Porbandar', 'Godhra',
    'Bhuj', 'Palanpur', 'Valsad', 'Patan', 'Dahod', 'Botad', 'Amreli',
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in-up">
      <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-1 text-gray-500 hover:text-blue-400 text-sm mb-6 transition-colors">
        <HiArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <HiClipboardList className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-100 tracking-tight">Submit a Complaint</h1>
          <p className="text-gray-500 text-sm">Fill in the details below to register your complaint</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-3xl shadow-sm border border-gray-800 p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Complaint Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Brief title of your complaint" className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
          <select name="category" value={formData.category} onChange={handleChange} required className="input-field">
            <option value="">Select a category</option>
            {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Describe your complaint in detail..." className="input-field resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">City *</label>
            <select name="city" value={formData.city} onChange={handleChange} required className="input-field">
              <option value="">Select city</option>
              {gujaratCities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">State</label>
            <input type="text" name="state" value={formData.state} className="input-field bg-gray-800 cursor-not-allowed" readOnly />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Address *</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required rows={2} placeholder="Full address of the complaint location" className="input-field resize-none" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Upload Image (optional)</label>
          {!preview ? (
            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-900/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-blue-900/30 transition-colors">
                <HiPhotograph className="w-7 h-7 text-gray-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <span className="text-sm text-gray-400 font-medium">Click to upload image</span>
              <span className="text-xs text-gray-600 mt-1">JPG, PNG, GIF up to 5MB</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          ) : (
            <div className="relative inline-block w-full">
              <img src={preview} alt="Preview" className="w-full max-h-64 object-cover rounded-2xl border border-gray-700" />
              <button type="button" onClick={removeImage} className="absolute top-3 right-3 bg-red-600 hover:bg-red-500 text-white rounded-xl p-2 shadow-lg transition-colors">
                <HiX className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Submit Complaint'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="btn-ghost border border-gray-700 rounded-xl px-6">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;
