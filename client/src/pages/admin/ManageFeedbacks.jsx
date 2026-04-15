import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { HiStar, HiTrash } from 'react-icons/hi';

const ManageFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchFeedbacks(); }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await API.get('/feedback');
      setFeedbacks(res.data.feedbacks);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this feedback?')) return;
    try {
      await API.delete(`/feedback/${id}`);
      toast.success('Feedback deleted');
      fetchFeedbacks();
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Manage Feedbacks</h1>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : feedbacks.length === 0 ? (
        <div className="card text-center py-12"><p className="text-gray-400">No feedbacks yet</p></div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb._id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-100">{fb.user?.name || 'Unknown'}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <HiStar key={s} className={`w-4 h-4 ${s <= fb.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  {fb.comment && <p className="text-sm text-gray-400">{fb.comment}</p>}
                  <p className="text-xs text-gray-400 mt-1">{new Date(fb.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => handleDelete(fb._id)} className="p-1.5 text-red-600 hover:bg-red-900/30 rounded">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFeedbacks;
