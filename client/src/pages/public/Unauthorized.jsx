import { Link } from 'react-router-dom';
import { HiShieldExclamation, HiArrowLeft } from 'react-icons/hi';

const Unauthorized = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <HiShieldExclamation className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">You don't have permission to access this page. Please contact an administrator if you believe this is an error.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <HiArrowLeft className="w-4 h-4" /> Go Back
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
