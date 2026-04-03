import { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { HiStar } from 'react-icons/hi';

const Feedback = () => {
  const [myFeedbacks, setMyFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchMyFeedbacks(); }, []);

  const fetchMyFeedbacks = async () => {
    try {
      const res = await API.get('/feedback/my');
      setMyFeedbacks(res.data.feedbacks);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) { toast.error('Please select a rating'); return; }
    setSubmitting(true);
    try {
      await API.post('/feedback', { rating, comment });
      toast.success('Feedback submitted!');
      setRating(0); setComment('');
      fetchMyFeedbacks();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-1">Give Feedback</h1>
      <p className="text-gray-500 text-sm mb-8">Share your experience with GMCCP</p>

      {/* Submit Form */}
      <form onSubmit={handleSubmit} className="card mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <HiStar className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-600'
                }`} />
              </button>
            ))}
            {rating > 0 && <span className="ml-2 text-sm text-gray-500 self-center">{rating}/5</span>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Comment (optional)</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="Tell us about your experience..." className="input-field resize-none" />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary text-sm disabled:opacity-50">Submit Feedback</button>
      </form>

      {/* My Feedbacks */}
      <h2 className="text-lg font-semibold text-gray-100 mb-4">My Feedbacks</h2>
      {loading ? (
        <p className="text-gray-400 text-center py-4">Loading...</p>
      ) : myFeedbacks.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-400">You haven't submitted any feedback yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myFeedbacks.map((fb) => (
            <div key={fb._id} className="card">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <HiStar key={s} className={`w-4 h-4 ${s <= fb.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                ))}
              </div>
              {fb.comment && <p className="text-sm text-gray-400">{fb.comment}</p>}
              <p className="text-xs text-gray-400 mt-2">{new Date(fb.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;
