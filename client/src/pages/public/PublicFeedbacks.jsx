import { useState, useEffect } from 'react';
import API from '../../services/api';
import { HiStar } from 'react-icons/hi';

const PublicFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await API.get('/feedback');
        setFeedbacks(res.data.feedbacks);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchFeedbacks();
  }, []);

  const avgRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-[70vh]">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3 animate-fade-in-up">What Citizens Say</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up stagger-1 tracking-tight">Citizen Feedbacks</h1>
          <p className="text-blue-200/70 max-w-lg mx-auto animate-fade-in-up stagger-2">Real reviews from citizens who have used the GMCCP portal</p>
          {feedbacks.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-8 animate-fade-in-up stagger-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <HiStar key={s} className={`w-7 h-7 ${s <= Math.round(avgRating) ? 'text-yellow-400' : 'text-white/20'}`} />
                ))}
              </div>
              <span className="text-2xl font-bold">{avgRating}</span>
              <span className="text-blue-300/60 text-sm">({feedbacks.length} reviews)</span>
            </div>
          )}
        </div>
      </div>

      {/* Feedbacks Grid */}
      <div className="max-w-5xl mx-auto px-4 py-12 -mt-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 bg-gray-200 rounded-xl"></div>
                  <div className="space-y-2"><div className="h-4 w-24 bg-gray-200 rounded"></div><div className="h-3 w-16 bg-gray-100 rounded"></div></div>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <HiStar className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">No feedbacks yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedbacks.map((fb, i) => (
              <div key={fb._id} className="card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/15">
                    <span className="text-white font-bold text-sm">{fb.user?.name?.charAt(0) || '?'}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-100 text-sm">{fb.user?.name || 'Anonymous'}</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <HiStar key={s} className={`w-3.5 h-3.5 ${s <= fb.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                {fb.comment && <p className="text-sm text-gray-400 leading-relaxed">{fb.comment}</p>}
                <p className="text-xs text-gray-400 mt-3 font-medium">{new Date(fb.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicFeedbacks;
