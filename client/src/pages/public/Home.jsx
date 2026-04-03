import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import HeroSection from '../../components/home/HeroSection';
import StatsSection from '../../components/home/StatsSection';
import HowItWorks from '../../components/home/HowItWorks';
import { HiShieldCheck, HiLightningBolt, HiEye, HiChat } from 'react-icons/hi';
import { RoadWorkerSVG, CleaningWorkerSVG, PlumberSVG, OfficerReviewSVG, HappyCitizenSVG } from '../../components/home/Illustrations';

const features = [
  { icon: HiShieldCheck, title: 'Secure & Private', desc: 'Your data is protected with industry-standard encryption and JWT authentication.', gradient: 'from-blue-500 to-blue-600' },
  { icon: HiLightningBolt, title: 'Fast Resolution', desc: 'Complaints are automatically routed to the right department for quick action.', gradient: 'from-amber-500 to-orange-500' },
  { icon: HiEye, title: 'Full Transparency', desc: 'Track every step of your complaint from submission to resolution.', gradient: 'from-emerald-500 to-emerald-600' },
  { icon: HiChat, title: 'Direct Support', desc: 'Get help from our support team anytime through the built-in help desk.', gradient: 'from-purple-500 to-purple-600' },
];

const workerShowcase = [
  {
    Illustration: RoadWorkerSVG,
    title: 'Road Repair',
    desc: 'Our dedicated workers fix potholes and maintain roads across the city.',
    bg: 'bg-orange-950/40',
    border: 'border-orange-900/50',
    textColor: 'text-orange-400',
    animClass: 'animate-float',
  },
  {
    Illustration: CleaningWorkerSVG,
    title: 'City Cleaning',
    desc: 'Sanitation teams keep our streets and public spaces clean every day.',
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-900/50',
    textColor: 'text-emerald-400',
    animClass: 'animate-float-delay-1',
  },
  {
    Illustration: PlumberSVG,
    title: 'Water & Plumbing',
    desc: 'Quick response teams handle water supply issues and pipe repairs.',
    bg: 'bg-blue-950/40',
    border: 'border-blue-900/50',
    textColor: 'text-blue-400',
    animClass: 'animate-float-delay-2',
  },
  {
    Illustration: OfficerReviewSVG,
    title: 'Officer Review',
    desc: 'Officers review and prioritize every complaint for fastest resolution.',
    bg: 'bg-purple-950/40',
    border: 'border-purple-900/50',
    textColor: 'text-purple-400',
    animClass: 'animate-float-delay-3',
  },
];

const Home = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try { const res = await API.get('/public/stats'); setStats(res.data); }
      catch (err) { console.error(err); }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <HeroSection />
      <StatsSection statsData={stats} />
      <HowItWorks />

      {/* ===== Workers Illustration Showcase Section ===== */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-900/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Our Heroes at Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">Making Your City Better, Every Day</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">From road repairs to sanitation — our teams work round the clock to resolve your complaints</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workerShowcase.map((worker, i) => (
              <div
                key={i}
                className={`group rounded-3xl ${worker.bg} border ${worker.border} p-6 transition-all duration-500 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-2 cursor-default`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`flex justify-center mb-5 ${worker.animClass}`}>
                  <worker.Illustration className="w-64 h-56 drop-shadow-sm" />
                </div>
                <h3 className={`text-lg font-bold ${worker.textColor} mb-2 text-center`}>{worker.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed text-center">{worker.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Why Choose GMCCP</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">Built for Citizens, by Government</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">A modern, transparent, and efficient complaint management system</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-hover text-center group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${f.gradient} rounded-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-100 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section with Happy Citizen ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="hidden lg:flex justify-center">
              <div className="animate-float">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <HappyCitizenSVG className="w-[400px] h-[340px]" />
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Ready to Make a Difference?</h2>
              <p className="text-blue-200/70 mb-10 text-lg">Join thousands of citizens who are improving their cities through GMCCP. Your voice matters!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff9933] to-[#f08c28] hover:from-[#e6862e] hover:to-[#d97a22] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-orange-500/20 hover:shadow-2xl text-lg">
                  Register Now
                </Link>
                <Link to="/track-complaint" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 border border-white/20 text-lg">
                  Track Complaint
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
