import { HiUserAdd, HiClipboardList, HiCheckCircle, HiArrowRight } from 'react-icons/hi';

// Inline mini cartoon SVGs for each step
const SignupCharacter = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-36 h-36">
    {/* Phone */}
    <rect x="55" y="30" width="30" height="50" rx="5" fill="#1F2937" />
    <rect x="58" y="35" width="24" height="38" rx="2" fill="#60A5FA" />
    {/* Person icon on screen */}
    <circle cx="70" cy="48" r="6" fill="#BFDBFE" />
    <path d="M62 62 Q70 56 78 62" fill="#BFDBFE" />
    {/* Person */}
    <circle cx="40" cy="45" r="14" fill="#F5C6A0" />
    <path d="M26 42 C26 30, 54 30, 54 42" fill="#4A3728" />
    <circle cx="35" cy="44" r="2" fill="#1F2937" />
    <circle cx="45" cy="44" r="2" fill="#1F2937" />
    <path d="M37 51 Q40 55 43 51" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <rect x="30" y="60" width="22" height="28" rx="6" fill="#3B82F6" />
    {/* Hand pointing at phone */}
    <path d="M52 70 L58 55" stroke="#F5C6A0" strokeWidth="5" strokeLinecap="round" />
    {/* Sparkle */}
    <path d="M88 28 L90 24 L92 28 L88 26 L96 26 Z" fill="#FCD34D" />
  </svg>
);

const ComplaintCharacter = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-36 h-36">
    {/* Desk */}
    <rect x="20" y="75" width="80" height="5" rx="2" fill="#D4A574" />
    {/* Laptop */}
    <rect x="35" y="55" width="50" height="20" rx="3" fill="#374151" />
    <rect x="38" y="58" width="44" height="14" rx="2" fill="#FF9933" />
    {/* Form lines on screen */}
    <rect x="42" y="61" width="20" height="2" rx="1" fill="#FDE68A" />
    <rect x="42" y="66" width="30" height="2" rx="1" fill="#FDE68A" />
    <rect x="25" y="75" width="70" height="3" rx="1.5" fill="#4B5563" />
    {/* Person */}
    <circle cx="60" cy="35" r="14" fill="#F5C6A0" />
    <path d="M46 32 C46 20, 74 20, 74 32" fill="#1F2937" />
    <circle cx="55" cy="34" r="2" fill="#1F2937" />
    <circle cx="65" cy="34" r="2" fill="#1F2937" />
    <path d="M56 42 Q60 46 64 42" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <rect x="50" y="48" width="20" height="20" rx="5" fill="#FF9933" />
    {/* Arms typing */}
    <path d="M50 58 L40 68" stroke="#F5C6A0" strokeWidth="4" strokeLinecap="round" />
    <path d="M70 58 L80 68" stroke="#F5C6A0" strokeWidth="4" strokeLinecap="round" />
    {/* Camera icon (upload) */}
    <rect x="85" y="58" width="14" height="10" rx="2" fill="#8B5CF6" />
    <circle cx="92" cy="63" r="3" fill="#C4B5FD" />
  </svg>
);

const ResolvedCharacter = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-36 h-36">
    {/* Big checkmark circle */}
    <circle cx="75" cy="45" r="20" fill="#22C55E" opacity="0.15" />
    <circle cx="75" cy="45" r="14" fill="#22C55E" opacity="0.3" />
    <path d="M67 45 L73 51 L85 39" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Person celebrating */}
    <circle cx="40" cy="40" r="14" fill="#F5C6A0" />
    <path d="M26 37 C26 25, 54 25, 54 37" fill="#4A3728" />
    {/* Happy closed eyes */}
    <path d="M33 39 Q36 36 39 39" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M42 39 Q45 36 48 39" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Big smile */}
    <path d="M34 47 Q40 54 46 47" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
    <rect x="30" y="55" width="22" height="25" rx="6" fill="#16A34A" />
    {/* Arms up celebrating */}
    <path d="M30 60 L18 42" stroke="#F5C6A0" strokeWidth="5" strokeLinecap="round" />
    <path d="M52 60 L60 45" stroke="#F5C6A0" strokeWidth="5" strokeLinecap="round" />
    {/* Confetti */}
    <rect x="15" y="35" width="4" height="4" rx="1" fill="#FF9933" opacity="0.7" transform="rotate(20 17 37)" />
    <rect x="55" y="30" width="4" height="4" rx="1" fill="#3B82F6" opacity="0.7" transform="rotate(-15 57 32)" />
    <circle cx="22" cy="28" r="2" fill="#EF4444" opacity="0.6" />
    <circle cx="50" y="25" r="2" fill="#8B5CF6" opacity="0.6" />
    {/* Star */}
    <path d="M18 50 L20 46 L22 50 L18 48 L24 48 Z" fill="#FCD34D" />
  </svg>
);

const steps = [
  {
    icon: HiUserAdd,
    title: 'Register & Login',
    description: 'Create your citizen account in seconds. Secure authentication keeps your data safe.',
    step: '01',
    gradient: 'from-blue-600 to-blue-700',
    shadow: 'shadow-blue-600/30',
    accent: 'bg-blue-100 text-blue-700',
    Character: SignupCharacter,
  },
  {
    icon: HiClipboardList,
    title: 'Submit Complaint',
    description: 'Select category, describe the issue, upload photo evidence, and submit your complaint.',
    step: '02',
    gradient: 'from-[#ff9933] to-[#e6862e]',
    shadow: 'shadow-orange-500/30',
    accent: 'bg-orange-100 text-orange-700',
    Character: ComplaintCharacter,
  },
  {
    icon: HiCheckCircle,
    title: 'Track & Resolve',
    description: 'Monitor real-time status updates. Get notified when your complaint is resolved.',
    step: '03',
    gradient: 'from-emerald-600 to-emerald-700',
    shadow: 'shadow-emerald-600/30',
    accent: 'bg-emerald-100 text-emerald-700',
    Character: ResolvedCharacter,
  },
];

const StepCard = ({ step, index }) => (
  <div className="group animate-fade-in-up w-full" style={{ animationDelay: `${index * 0.15}s` }}>
    <div className="text-center p-8 rounded-3xl border border-gray-800 hover:border-gray-700 bg-gray-900 hover:shadow-xl hover:shadow-black/30 transition-all duration-500 group-hover:-translate-y-1 h-full">
      {/* Step Number */}
      <div className={`inline-flex items-center justify-center w-8 h-8 ${step.accent} rounded-full text-xs font-bold mb-4`}>
        {step.step}
      </div>

      {/* Cartoon Character */}
      <div className="flex justify-center mb-3 group-hover:scale-105 transition-transform duration-500">
        <div className="animate-float-slow">
          <step.Character />
        </div>
      </div>

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl mb-5 shadow-xl ${step.shadow} group-hover:scale-110 transition-transform duration-500`}>
        <step.icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-xl font-bold text-gray-100 mb-3">{step.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
    </div>
  </div>
);

const ConnectorArrowHorizontal = () => (
  <div className="hidden md:flex items-center justify-center shrink-0 mx-2 lg:mx-4 self-center">
    <div className="flex items-center gap-1">
      <div className="w-5 lg:w-8 h-px border-t-2 border-dashed border-gray-700"></div>
      <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shadow-lg shadow-black/20">
        <HiArrowRight className="w-4 h-4 text-blue-400" />
      </div>
      <div className="w-5 lg:w-8 h-px border-t-2 border-dashed border-gray-700"></div>
    </div>
  </div>
);

const ConnectorArrowVertical = () => (
  <div className="flex flex-col items-center py-1 md:hidden">
    <div className="h-4 w-px border-l-2 border-dashed border-gray-700"></div>
    <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shadow-lg shadow-black/20">
      <HiArrowRight className="w-3.5 h-3.5 text-blue-400 rotate-90" />
    </div>
    <div className="h-4 w-px border-l-2 border-dashed border-gray-700"></div>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">How It Works</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">Three simple steps to raise and resolve your municipal complaints</p>
        </div>

        {/* Desktop: Flex row with arrows between cards */}
        <div className="hidden md:flex items-stretch justify-center">
          {steps.map((step, index) => (
            <div key={index} className="contents">
              <div className="flex-1 max-w-sm">
                <StepCard step={step} index={index} />
              </div>
              {index < steps.length - 1 && <ConnectorArrowHorizontal />}
            </div>
          ))}
        </div>

        {/* Mobile: Vertical stack with arrows between cards */}
        <div className="flex flex-col items-center md:hidden">
          {steps.map((step, index) => (
            <div key={index} className="w-full">
              <StepCard step={step} index={index} />
              {index < steps.length - 1 && <ConnectorArrowVertical />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
