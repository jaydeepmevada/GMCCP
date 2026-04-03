import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in-up">
        <div className="text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <HiHome className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
