import { Link } from 'react-router-dom';
import { HiClipboardList, HiSearch, HiShieldCheck, HiClock, HiUserGroup } from 'react-icons/hi';
import { FilingComplaintSVG, RoadWorkerSVG, CleaningWorkerSVG } from './Illustrations';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-orange-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Government Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10 animate-fade-in-up">
              <div className="w-2 h-2 bg-[#ff9933] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-100">Government of Gujarat • Digital Initiative</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] mb-8 animate-fade-in-up stagger-1 tracking-tight">
              Raise Your Voice.{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#ff9933] to-[#ffb366] bg-clip-text text-transparent">Transform Your City.</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 2 100 2 150 6C200 10 250 4 298 8" stroke="#ff9933" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-200/80 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up stagger-2">
              Gujarat Municipal Corporation Complaint Portal empowers citizens to report
              civic issues, upload evidence, and track resolution — all in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up stagger-3">
              <Link
                to="/submit-complaint"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#ff9933] to-[#f08c28] hover:from-[#e6862e] hover:to-[#d97a22] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-0.5 text-lg"
              >
                <HiClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Register Complaint
              </Link>
              <Link
                to="/track-complaint"
                className="group inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40 text-lg"
              >
                <HiSearch className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Track Complaint
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 animate-fade-in-up stagger-4">
              <div className="flex items-center gap-2 text-blue-200/60">
                <HiShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">Secure & Verified</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200/60">
                <HiClock className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200/60">
                <HiUserGroup className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">10,000+ Citizens</span>
              </div>
            </div>
          </div>

          {/* Right side - Cartoon Illustrations */}
          <div className="hidden lg:flex flex-col items-center justify-center relative">
            {/* Main illustration - person filing complaint */}
            <div className="animate-float relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl">
                <FilingComplaintSVG className="w-[420px] h-[360px]" />
              </div>
            </div>

            {/* Small floating worker illustrations */}
            <div className="absolute -bottom-8 -left-12 animate-float-delay-1 z-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-lg">
                <RoadWorkerSVG className="w-48 h-40" />
              </div>
            </div>

            <div className="absolute -top-4 -right-8 animate-float-delay-2 z-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-lg">
                <CleaningWorkerSVG className="w-44 h-36" />
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute top-8 left-4 animate-wiggle">
              <div className="w-4 h-4 bg-[#ff9933] rounded-full opacity-40"></div>
            </div>
            <div className="absolute bottom-16 right-8 animate-float-delay-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full opacity-40"></div>
            </div>
            <div className="absolute top-1/2 -left-4 animate-float-slow">
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 36C840 48 960 64 1080 64C1200 64 1320 48 1380 40L1440 32V80H0Z" fill="#030712" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
