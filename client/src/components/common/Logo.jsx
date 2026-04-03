// GMCCP Text Logo - Modern gradient style

const LogoIcon = ({ size = 40, className = '' }) => (
  <div
    className={`relative inline-flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
  >
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id="iBg" x1="0" y1="0" x2="44" y2="44">
          <stop stopColor="#6366f1" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="iAccent" x1="0" y1="0" x2="44" y2="0">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="40" height="40" rx="13" fill="url(#iBg)" />
      {/* Shine */}
      <rect x="2" y="2" width="40" height="20" rx="13" fill="white" opacity="0.08" />
      {/* Accent bar */}
      <rect x="8" y="3" width="28" height="2.5" rx="1.25" fill="url(#iAccent)" opacity="0.7" />
      {/* GM text */}
      <text x="22" y="30" textAnchor="middle" fill="white" fontSize="17" fontWeight="900" fontFamily="Inter, system-ui, sans-serif" letterSpacing="-1" opacity="0.95">GM</text>
    </svg>
  </div>
);

const LogoIconLight = ({ size = 40, className = '' }) => (
  <div
    className={`relative inline-flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
  >
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id="iBgL" x1="0" y1="0" x2="44" y2="44">
          <stop stopColor="#7c3aed" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="iAccentL" x1="0" y1="0" x2="44" y2="0">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="40" height="40" rx="13" fill="url(#iBgL)" />
      <rect x="2" y="2" width="40" height="20" rx="13" fill="white" opacity="0.1" />
      <rect x="8" y="3" width="28" height="2.5" rx="1.25" fill="url(#iAccentL)" opacity="0.65" />
      <text x="22" y="30" textAnchor="middle" fill="white" fontSize="17" fontWeight="900" fontFamily="Inter, system-ui, sans-serif" letterSpacing="-1" opacity="0.9">GM</text>
    </svg>
  </div>
);

const LogoFull = ({ size = 'default', variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';

  const mainSize = size === 'large' ? 'text-[30px]' : size === 'small' ? 'text-[18px]' : 'text-[23px]';
  const subSize = size === 'large' ? 'text-[10px]' : size === 'small' ? 'text-[7px]' : 'text-[8px]';
  const barH = size === 'large' ? 'h-[3px]' : size === 'small' ? 'h-[2px]' : 'h-[2.5px]';
  const dotSize = size === 'large' ? 'w-1.5 h-1.5' : 'w-1 h-1';

  return (
    <div className={`flex items-center ${className}`}>
      <div className="min-w-0 flex flex-col items-center">
        {/* GMCCP text */}
        <div className="flex items-baseline leading-none justify-center">
          <span
            className={`font-black tracking-tight ${mainSize}`}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            G
          </span>
          <span
            className={`font-black tracking-tight ${mainSize}`}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            M
          </span>
          <span
            className={`font-black tracking-tight ${mainSize}`}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            C
          </span>
          <span
            className={`font-black tracking-tight ${mainSize}`}
            style={{
              background: 'linear-gradient(135deg, #a855f7, #d946ef)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            C
          </span>
          <span
            className={`font-black tracking-tight ${mainSize}`}
            style={{
              background: 'linear-gradient(135deg, #d946ef, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            P
          </span>
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className={`${dotSize} rounded-full bg-cyan-400 flex-shrink-0`}></div>
          <span className={`${subSize} font-semibold tracking-[0.15em] uppercase leading-tight ${isLight ? 'text-white/60' : 'text-gray-500'}`}>
            Gujarat Municipal Complaint Portal
          </span>
          <div className={`${dotSize} rounded-full bg-pink-400 flex-shrink-0`}></div>
        </div>
      </div>
    </div>
  );
};

export { LogoIcon, LogoIconLight, LogoFull };
export default LogoFull;
