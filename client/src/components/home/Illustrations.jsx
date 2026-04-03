// Cute cartoon-style SVG illustrations for GMCCP

// Person filing a complaint on laptop
export const FilingComplaintSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* === ROOM BACKGROUND === */}
    {/* Wall shelf */}
    <rect x="280" y="60" width="80" height="6" rx="3" fill="#4B5563" />
    <rect x="290" y="40" width="18" height="20" rx="3" fill="#3B82F6" opacity="0.3" />
    <rect x="314" y="35" width="14" height="25" rx="3" fill="#FF9933" opacity="0.3" />
    <rect x="336" y="42" width="16" height="18" rx="3" fill="#22C55E" opacity="0.25" />

    {/* Wall clock */}
    <circle cx="80" cy="65" r="22" fill="#1F2937" stroke="#374151" strokeWidth="2" />
    <circle cx="80" cy="65" r="18" fill="#111827" />
    <line x1="80" y1="65" x2="80" y2="52" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
    <line x1="80" y1="65" x2="90" y2="65" stroke="#F9FAFB" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="80" cy="65" r="2" fill="#60A5FA" />

    {/* === DESK === */}
    <rect x="55" y="228" width="290" height="14" rx="7" fill="#92400E" />
    <rect x="55" y="228" width="290" height="7" rx="4" fill="#A3550D" />
    {/* Desk legs */}
    <rect x="70" y="242" width="12" height="75" rx="4" fill="#78350F" />
    <rect x="318" y="242" width="12" height="75" rx="4" fill="#78350F" />
    {/* Desk drawer */}
    <rect x="160" y="242" width="80" height="30" rx="4" fill="#7C2D12" />
    <rect x="192" y="254" width="16" height="4" rx="2" fill="#A3550D" />

    {/* === CHAIR === */}
    {/* Chair back */}
    <rect x="165" y="200" width="70" height="8" rx="4" fill="#374151" />
    <rect x="172" y="140" width="56" height="65" rx="10" fill="#1F2937" />
    <rect x="172" y="140" width="56" height="65" rx="10" stroke="#374151" strokeWidth="1.5" fill="none" />
    {/* Chair cushion pattern */}
    <line x1="185" y1="155" x2="185" y2="195" stroke="#374151" strokeWidth="1" opacity="0.5" />
    <line x1="200" y1="155" x2="200" y2="195" stroke="#374151" strokeWidth="1" opacity="0.5" />
    <line x1="215" y1="155" x2="215" y2="195" stroke="#374151" strokeWidth="1" opacity="0.5" />
    {/* Chair base */}
    <rect x="193" y="270" width="14" height="30" rx="4" fill="#4B5563" />
    <ellipse cx="200" cy="302" rx="30" ry="5" fill="#374151" />
    {/* Chair wheels */}
    <circle cx="175" cy="305" r="4" fill="#4B5563" />
    <circle cx="225" cy="305" r="4" fill="#4B5563" />
    <circle cx="200" cy="308" r="4" fill="#4B5563" />

    {/* === PERSON === */}
    {/* Legs (visible below desk, sitting on chair) */}
    <rect x="182" y="248" width="13" height="40" rx="5" fill="#1E3A5F" />
    <rect x="205" y="248" width="13" height="40" rx="5" fill="#1E3A5F" />
    {/* Shoes */}
    <ellipse cx="188" cy="290" rx="12" ry="5" fill="#374151" />
    <ellipse cx="212" cy="290" rx="12" ry="5" fill="#374151" />
    {/* Shoe detail */}
    <path d="M180 289 C180 285, 188 283, 196 289" stroke="#4B5563" strokeWidth="1" fill="none" />
    <path d="M204 289 C204 285, 212 283, 220 289" stroke="#4B5563" strokeWidth="1" fill="none" />

    {/* Body / Shirt */}
    <path d="M175 185 C175 170, 185 162, 200 160 C215 162, 225 170, 225 185 L225 210 L175 210 Z" fill="#3B82F6" />
    {/* Shirt collar */}
    <path d="M188 162 L200 172 L212 162" stroke="#2563EB" strokeWidth="2" fill="none" />
    {/* Shirt pocket */}
    <rect x="208" y="178" width="10" height="10" rx="2" stroke="#2563EB" strokeWidth="1" fill="none" />
    <rect x="210" y="180" width="3" height="4" rx="1" fill="#DBEAFE" />

    {/* Arms reaching forward to keyboard */}
    <path d="M175 178 C163 190, 148 210, 148 222" stroke="#F5C6A0" strokeWidth="12" strokeLinecap="round" />
    <path d="M225 178 C237 190, 248 210, 248 222" stroke="#F5C6A0" strokeWidth="12" strokeLinecap="round" />
    {/* Hands visible on sides of laptop */}
    <ellipse cx="148" cy="225" rx="9" ry="7" fill="#F5C6A0" />
    <ellipse cx="248" cy="225" rx="9" ry="7" fill="#F5C6A0" />
    {/* Fingers wrapping around keyboard edge */}
    <path d="M142 223 L140 227" stroke="#E8B48A" strokeWidth="2" strokeLinecap="round" />
    <path d="M145 221 L143 226" stroke="#E8B48A" strokeWidth="2" strokeLinecap="round" />
    <path d="M151 222 L150 227" stroke="#E8B48A" strokeWidth="2" strokeLinecap="round" />
    <path d="M253 223 L255 227" stroke="#E8B48A" strokeWidth="2" strokeLinecap="round" />
    <path d="M250 221 L252 226" stroke="#E8B48A" strokeWidth="2" strokeLinecap="round" />
    <path d="M245 222 L246 227" stroke="#E8B48A" strokeWidth="2" strokeLinecap="round" />

    {/* === LAPTOP (back view - thinner/sleek design) === */}
    {/* Laptop lid (back side facing us) - thinner */}
    <rect x="130" y="170" width="120" height="52" rx="4" fill="#374151" />
    <rect x="130" y="170" width="120" height="52" rx="4" stroke="#4B5563" strokeWidth="1" fill="none" />
    {/* Lid inner panel */}
    <rect x="135" y="174" width="110" height="44" rx="3" fill="#1F2937" />
    {/* Brand logo on lid */}
    <circle cx="190" cy="196" r="8" fill="#4B5563" opacity="0.35" />
    <circle cx="190" cy="196" r="5" fill="#6B7280" opacity="0.25" />
    {/* Subtle light reflection on lid */}
    <path d="M140 178 L175 178 L148 186 Z" fill="#4B5563" opacity="0.12" />
    {/* Screen glow from top edge */}
    <rect x="140" y="168" width="100" height="2.5" rx="1.25" fill="#60A5FA" opacity="0.15" />

    {/* Laptop base - thinner */}
    <path d="M118 224 L130 224 L132 222 L248 222 L250 224 L262 224 L258 228 L122 228 Z" fill="#4B5563" />
    <rect x="132" y="222" width="116" height="2.5" rx="1.25" fill="#374151" />
    {/* Hinge */}
    <rect x="140" y="220" width="100" height="3" rx="1.5" fill="#4B5563" />
    <rect x="140" y="220" width="100" height="1.5" rx="0.75" fill="#6B7280" opacity="0.3" />

    {/* Head - tilted slightly down looking at screen */}
    <g transform="rotate(5, 200, 130)">
      <circle cx="200" cy="128" r="32" fill="#F5C6A0" />
      {/* Screen glow on face */}
      <ellipse cx="200" cy="135" rx="25" ry="18" fill="#93C5FD" opacity="0.06" />
      {/* Ear left */}
      <ellipse cx="168" cy="130" rx="5" ry="7" fill="#E8B48A" />
      {/* Ear right */}
      <ellipse cx="232" cy="130" rx="5" ry="7" fill="#E8B48A" />

      {/* Hair - stylish modern cut */}
      <path d="M168 118 C168 90, 195 80, 210 82 C228 85, 235 95, 234 112 L232 118 C230 108, 225 98, 210 95 C195 93, 178 98, 172 118 Z" fill="#1F2937" />
      {/* Hair side detail */}
      <path d="M168 118 C166 112, 167 105, 172 98" stroke="#111827" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Hair top highlight */}
      <path d="M185 88 C195 84, 210 85, 218 90" stroke="#374151" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Eyebrows - focused/concentrated */}
      <path d="M184 115 C187 112, 193 112, 196 114" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M205 114 C208 112, 214 112, 217 115" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Eyes - looking down at screen */}
      <ellipse cx="190" cy="122" rx="5" ry="5" fill="white" />
      <ellipse cx="210" cy="122" rx="5" ry="5" fill="white" />
      {/* Pupils looking down */}
      <circle cx="190" cy="124" r="3.5" fill="#1F2937" />
      <circle cx="210" cy="124" r="3.5" fill="#1F2937" />
      {/* Eye shine */}
      <circle cx="191.5" cy="122.5" r="1.5" fill="white" />
      <circle cx="211.5" cy="122.5" r="1.5" fill="white" />
      {/* Eyelids - slightly focused */}
      <path d="M185 119 C188 117.5, 192 117.5, 195 119" stroke="#F5C6A0" strokeWidth="2.5" fill="none" />
      <path d="M205 119 C208 117.5, 212 117.5, 215 119" stroke="#F5C6A0" strokeWidth="2.5" fill="none" />

      {/* Nose */}
      <path d="M198 129 C199 132, 201 132, 202 129" stroke="#E8B48A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Slight focused smile */}
      <path d="M193 137 Q200 142 207 137" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <ellipse cx="182" cy="133" rx="5" ry="3" fill="#FCA5A5" opacity="0.2" />
      <ellipse cx="218" cy="133" rx="5" ry="3" fill="#FCA5A5" opacity="0.2" />
    </g>

    {/* === DESK ITEMS === */}
    {/* Coffee mug */}
    <rect x="290" y="206" width="22" height="22" rx="4" fill="#DC2626" />
    <rect x="290" y="206" width="22" height="8" rx="4" fill="#EF4444" />
    <path d="M312 211 C320 211, 320 222, 312 222" stroke="#DC2626" strokeWidth="3" fill="none" />
    {/* Coffee inside */}
    <ellipse cx="301" cy="210" rx="8" ry="2" fill="#78350F" />
    {/* Steam */}
    <path d="M295 204 C296 198, 294 194, 296 188" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    <path d="M302 202 C303 196, 301 190, 303 184" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M309 204 C310 199, 308 195, 310 190" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25" />

    {/* Plant pot */}
    <path d="M60 210 L66 228 L86 228 L92 210 Z" fill="#D97706" />
    <rect x="58" y="206" width="36" height="6" rx="3" fill="#B45309" />
    {/* Plant leaves */}
    <ellipse cx="76" cy="192" rx="14" ry="10" fill="#22C55E" />
    <ellipse cx="66" cy="186" rx="10" ry="8" fill="#16A34A" />
    <ellipse cx="86" cy="184" rx="11" ry="9" fill="#15803D" />
    <ellipse cx="76" cy="178" rx="8" ry="7" fill="#22C55E" opacity="0.8" />
    {/* Plant stem */}
    <line x1="76" y1="200" x2="76" y2="208" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />

    {/* Pen holder */}
    <rect x="330" y="210" width="18" height="18" rx="3" fill="#4B5563" />
    <line x1="335" y1="210" x2="334" y2="198" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line x1="340" y1="210" x2="341" y2="195" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    <line x1="345" y1="210" x2="344" y2="200" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

    {/* === FLOATING UI ELEMENTS === */}
    {/* Notification bubble */}
    <rect x="270" y="130" width="65" height="30" rx="8" fill="#22C55E" opacity="0.9" />
    <path d="M280 160 L290 150 L300 160" fill="#22C55E" opacity="0.9" />
    <path d="M282 140 L288 146 L302 132" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="308" y="138" width="20" height="3" rx="1.5" fill="white" opacity="0.7" />
    <rect x="308" y="144" width="14" height="3" rx="1.5" fill="white" opacity="0.5" />

    {/* Small floating complaint icon */}
    <circle cx="55" cy="120" r="16" fill="#FF9933" opacity="0.15" />
    <rect x="47" y="113" width="16" height="14" rx="2" fill="#FF9933" opacity="0.6" />
    <rect x="50" y="117" width="10" height="2" rx="1" fill="white" opacity="0.5" />
    <rect x="50" y="121" width="7" height="2" rx="1" fill="white" opacity="0.5" />

    {/* Decorative dots */}
    <circle cx="350" cy="90" r="4" fill="#3B82F6" opacity="0.2" />
    <circle cx="365" cy="105" r="3" fill="#FF9933" opacity="0.2" />
    <circle cx="40" cy="160" r="3" fill="#22C55E" opacity="0.2" />
    <circle cx="370" cy="170" r="5" fill="#8B5CF6" opacity="0.15" />

    {/* Small sparkle */}
    <path d="M320 80 L322 74 L324 80 L318 78 L326 78 Z" fill="#FCD34D" opacity="0.5" />
    <path d="M50 95 L52 90 L54 95 L49 93 L55 93 Z" fill="#60A5FA" opacity="0.4" />
  </svg>
);

// Worker fixing a road pothole
export const RoadWorkerSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground / Road */}
    <rect x="0" y="280" width="400" height="70" rx="0" fill="#6B7280" />
    <rect x="160" y="295" width="40" height="4" rx="2" fill="#FCD34D" />
    <rect x="240" y="295" width="40" height="4" rx="2" fill="#FCD34D" />
    <rect x="80" y="295" width="40" height="4" rx="2" fill="#FCD34D" />
    
    {/* Pothole */}
    <ellipse cx="220" cy="280" rx="35" ry="10" fill="#4B5563" />
    <ellipse cx="220" cy="280" rx="25" ry="7" fill="#374151" />
    
    {/* Worker body */}
    <rect x="130" y="210" width="40" height="50" rx="8" fill="#F97316" /> {/* Orange vest */}
    <rect x="135" y="215" width="4" height="40" rx="2" fill="#FCD34D" /> {/* Reflective strip */}
    <rect x="161" y="215" width="4" height="40" rx="2" fill="#FCD34D" />
    
    {/* Legs */}
    <rect x="137" y="258" width="14" height="30" rx="5" fill="#1E40AF" />
    <rect x="155" y="258" width="14" height="30" rx="5" fill="#1E40AF" />
    {/* Boots */}
    <rect x="134" y="282" width="20" height="10" rx="5" fill="#78350F" />
    <rect x="152" y="282" width="20" height="10" rx="5" fill="#78350F" />
    
    {/* Arms */}
    <path d="M130 225 C115 235, 100 250, 105 265" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    <path d="M170 225 C185 230, 200 240, 210 260" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    
    {/* Shovel */}
    <line x1="200" y1="240" x2="210" y2="280" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
    <path d="M200 275 L220 285 L215 275 Z" fill="#9CA3AF" />
    
    {/* Head */}
    <circle cx="150" cy="190" r="25" fill="#F5C6A0" />
    
    {/* Hard hat */}
    <path d="M125 185 C125 168, 175 168, 175 185" fill="#FCD34D" />
    <rect x="120" y="183" width="60" height="8" rx="4" fill="#F59E0B" />
    
    {/* Eyes */}
    <circle cx="142" cy="190" r="3" fill="#1F2937" />
    <circle cx="158" cy="190" r="3" fill="#1F2937" />
    
    {/* Determined smile */}
    <path d="M143 200 Q150 205 157 200" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Sweat drop */}
    <path d="M175 178 Q178 172 176 166" fill="#60A5FA" />
    <circle cx="176" cy="178" r="3" fill="#60A5FA" />
    
    {/* Traffic cone */}
    <polygon points="300,280 285,230 315,230" fill="#F97316" />
    <rect x="283" y="245" width="34" height="5" rx="2" fill="white" opacity="0.6" />
    <rect x="286" y="258" width="28" height="5" rx="2" fill="white" opacity="0.6" />
    <rect x="278" y="278" width="44" height="6" rx="3" fill="#EA580C" />
    
    {/* Second traffic cone */}
    <polygon points="70,280 58,240 82,240" fill="#F97316" />
    <rect x="56" y="252" width="28" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="50" y="278" width="40" height="6" rx="3" fill="#EA580C" />
    
    {/* Sun */}
    <circle cx="340" cy="60" r="25" fill="#FCD34D" />
    <circle cx="340" cy="60" r="20" fill="#FBBF24" />
    {/* Sun rays */}
    <line x1="340" y1="25" x2="340" y2="15" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
    <line x1="365" y1="35" x2="372" y2="28" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
    <line x1="375" y1="60" x2="385" y2="60" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
    <line x1="305" y1="60" x2="295" y2="60" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
    <line x1="315" y1="35" x2="308" y2="28" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Person cleaning / sweeping the street
export const CleaningWorkerSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground */}
    <rect x="0" y="290" width="400" height="60" rx="0" fill="#D1FAE5" />
    <ellipse cx="200" cy="290" rx="180" ry="8" fill="#A7F3D0" />
    
    {/* Tree in background */}
    <rect x="310" y="200" width="14" height="90" rx="5" fill="#92400E" />
    <circle cx="317" cy="180" r="35" fill="#22C55E" opacity="0.7" />
    <circle cx="300" cy="170" r="25" fill="#16A34A" opacity="0.8" />
    <circle cx="335" cy="175" r="28" fill="#15803D" opacity="0.7" />
    
    {/* Dustbin */}
    <rect x="260" y="250" width="35" height="40" rx="4" fill="#059669" />
    <rect x="256" y="246" width="43" height="8" rx="4" fill="#047857" />
    <line x1="268" y1="260" x2="268" y2="280" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <line x1="278" y1="260" x2="278" y2="280" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    {/* Recycle symbol */}
    <circle cx="278" cy="270" r="8" stroke="#A7F3D0" strokeWidth="1.5" fill="none" />
    
    {/* Worker body */}
    <rect x="140" y="200" width="40" height="55" rx="8" fill="#16A34A" /> {/* Green uniform */}
    
    {/* Legs */}
    <rect x="145" y="253" width="13" height="35" rx="5" fill="#1E3A5F" />
    <rect x="162" y="253" width="13" height="35" rx="5" fill="#1E3A5F" />
    {/* Shoes */}
    <ellipse cx="151" cy="290" rx="10" ry="5" fill="#4B5563" />
    <ellipse cx="168" cy="290" rx="10" ry="5" fill="#4B5563" />
    
    {/* Arms holding broom */}
    <path d="M140 215 C125 225, 110 240, 100 260" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    <path d="M180 215 C190 230, 115 250, 105 265" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    
    {/* Broom */}
    <line x1="100" y1="230" x2="85" y2="290" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
    {/* Broom bristles */}
    <line x1="85" y1="290" x2="70" y2="300" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
    <line x1="85" y1="290" x2="78" y2="302" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
    <line x1="85" y1="290" x2="85" y2="303" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
    <line x1="85" y1="290" x2="92" y2="302" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
    <line x1="85" y1="290" x2="100" y2="300" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
    
    {/* Dust particles */}
    <circle cx="65" cy="285" r="3" fill="#D4A574" opacity="0.5" />
    <circle cx="55" cy="278" r="2" fill="#D4A574" opacity="0.4" />
    <circle cx="72" cy="275" r="2.5" fill="#D4A574" opacity="0.3" />
    <circle cx="50" cy="288" r="2" fill="#D4A574" opacity="0.4" />
    
    {/* Head */}
    <circle cx="160" cy="178" r="26" fill="#F5C6A0" />
    
    {/* Cap */}
    <path d="M134 172 C134 155, 186 155, 186 172" fill="#16A34A" />
    <rect x="130" y="170" width="60" height="6" rx="3" fill="#15803D" />
    <rect x="145" y="164" width="30" height="8" rx="4" fill="#16A34A" />
    
    {/* Eyes */}
    <ellipse cx="152" cy="178" rx="3" ry="3.5" fill="#1F2937" />
    <ellipse cx="168" cy="178" rx="3" ry="3.5" fill="#1F2937" />
    <circle cx="153" cy="177" r="1.2" fill="white" />
    <circle cx="169" cy="177" r="1.2" fill="white" />
    
    {/* Happy smile */}
    <path d="M152 190 Q160 197 168 190" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Musical notes (whistling while working) */}
    <text x="190" y="165" fontSize="16" fill="#3B82F6" opacity="0.6">♪</text>
    <text x="205" y="155" fontSize="12" fill="#8B5CF6" opacity="0.5">♫</text>
    
    {/* Sparkles (clean effect) */}
    <path d="M45 260 L48 255 L51 260 L48 265 Z" fill="#FCD34D" opacity="0.6" />
    <path d="M110 250 L112 246 L114 250 L112 254 Z" fill="#FCD34D" opacity="0.5" />
    <path d="M60 265 L62 262 L64 265 L62 268 Z" fill="#FCD34D" opacity="0.4" />
  </svg>
);

// Officer reviewing complaints on clipboard
export const OfficerReviewSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Office background - window */}
    <rect x="250" y="50" width="100" height="120" rx="6" fill="#BFDBFE" />
    <line x1="300" y1="50" x2="300" y2="170" stroke="white" strokeWidth="3" />
    <line x1="250" y1="110" x2="350" y2="110" stroke="white" strokeWidth="3" />
    <rect x="246" y="46" width="108" height="128" rx="8" stroke="#9CA3AF" strokeWidth="4" fill="none" />
    {/* Clouds through window */}
    <ellipse cx="280" cy="80" rx="15" ry="8" fill="white" opacity="0.7" />
    <ellipse cx="320" cy="90" rx="12" ry="6" fill="white" opacity="0.5" />
    
    {/* Desk */}
    <rect x="50" y="240" width="300" height="12" rx="6" fill="#92400E" />
    <rect x="60" y="252" width="12" height="60" rx="4" fill="#78350F" />
    <rect x="328" y="252" width="12" height="60" rx="4" fill="#78350F" />
    
    {/* Person body - formal shirt */}
    <rect x="140" y="185" width="50" height="55" rx="10" fill="white" />
    <line x1="165" y1="190" x2="165" y2="240" stroke="#E5E7EB" strokeWidth="1.5" /> {/* Shirt line */}
    {/* Tie */}
    <polygon points="165,190 160,200 165,230 170,200" fill="#1E40AF" />
    
    {/* Arms */}
    <path d="M140 200 C120 210, 100 220, 95 230" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    <path d="M190 200 C200 215, 195 225, 190 235" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    
    {/* Clipboard in hand */}
    <rect x="75" y="215" width="45" height="55" rx="4" fill="#FEF3C7" />
    <rect x="90" y="212" width="15" height="8" rx="3" fill="#9CA3AF" />
    {/* Clipboard content */}
    <rect x="82" y="225" width="30" height="3" rx="1" fill="#D1D5DB" />
    <rect x="82" y="232" width="25" height="3" rx="1" fill="#D1D5DB" />
    <rect x="82" y="239" width="28" height="3" rx="1" fill="#D1D5DB" />
    <rect x="82" y="246" width="20" height="3" rx="1" fill="#D1D5DB" />
    {/* Checkmarks */}
    <path d="M80 226 L82 228 L86 224" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M80 233 L82 235 L86 231" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M80 240 L82 242 L86 238" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Head */}
    <circle cx="165" cy="155" r="28" fill="#F5C6A0" />
    
    {/* Hair - neat officer style */}
    <path d="M137 148 C137 125, 165 118, 180 120 C195 122, 195 135, 193 148" fill="#1F2937" />
    
    {/* Eyes - looking at clipboard */}
    <ellipse cx="155" cy="155" rx="3.5" ry="4" fill="#1F2937" />
    <ellipse cx="172" cy="155" rx="3.5" ry="4" fill="#1F2937" />
    <circle cx="154" cy="154" r="1.3" fill="white" />
    <circle cx="171" cy="154" r="1.3" fill="white" />
    
    {/* Eyebrows - focused */}
    <path d="M149 148 L160 146" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    <path d="M168 146 L179 148" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    
    {/* Slight smile */}
    <path d="M158 167 Q165 172 172 167" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Pen on desk */}
    <line x1="220" y1="235" x2="250" y2="225" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
    <circle cx="250" cy="225" r="2" fill="#1E40AF" />
    
    {/* Stack of papers */}
    <rect x="270" y="225" width="40" height="5" rx="2" fill="white" />
    <rect x="272" y="220" width="40" height="5" rx="2" fill="#F9FAFB" />
    <rect x="274" y="215" width="40" height="5" rx="2" fill="#F3F4F6" />
    
    {/* Thought bubble with checkmark */}
    <circle cx="220" cy="120" r="20" fill="white" stroke="#E5E7EB" strokeWidth="2" />
    <path d="M210 120 L217 127 L232 112" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="205" cy="140" r="5" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
    <circle cx="198" cy="150" r="3" fill="white" stroke="#E5E7EB" strokeWidth="1" />
  </svg>
);

// Water pipe repair worker
export const PlumberSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground */}
    <rect x="0" y="290" width="400" height="60" fill="#E5E7EB" />
    
    {/* Water pipe */}
    <rect x="0" y="200" width="150" height="20" rx="10" fill="#6B7280" />
    <rect x="200" y="200" width="200" height="20" rx="10" fill="#6B7280" />
    {/* Pipe joint */}
    <rect x="145" y="195" width="15" height="30" rx="3" fill="#9CA3AF" />
    <rect x="195" y="195" width="15" height="30" rx="3" fill="#9CA3AF" />
    
    {/* Water leak */}
    <path d="M165 210 Q170 230 160 250" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M175 215 Q180 240 170 260" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M185 210 Q188 225 182 245" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Water drops */}
    <circle cx="160" cy="255" r="4" fill="#60A5FA" opacity="0.6" />
    <circle cx="172" cy="265" r="3" fill="#60A5FA" opacity="0.5" />
    <circle cx="180" cy="250" r="3.5" fill="#60A5FA" opacity="0.6" />
    {/* Water puddle */}
    <ellipse cx="170" cy="290" rx="40" ry="6" fill="#93C5FD" opacity="0.4" />
    
    {/* Worker body */}
    <rect x="240" y="210" width="45" height="50" rx="8" fill="#3B82F6" /> {/* Blue uniform */}
    
    {/* Legs - kneeling */}
    <path d="M250 258 C250 270, 240 280, 230 285" stroke="#1E3A5F" strokeWidth="14" strokeLinecap="round" />
    <path d="M275 258 C275 275, 280 285, 285 290" stroke="#1E3A5F" strokeWidth="14" strokeLinecap="round" />
    {/* Shoes */}
    <ellipse cx="225" cy="288" rx="12" ry="6" fill="#78350F" />
    <ellipse cx="290" cy="292" rx="12" ry="6" fill="#78350F" />
    
    {/* Arms reaching to pipe */}
    <path d="M240 225 C220 225, 200 215, 195 210" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    <path d="M285 225 C295 230, 300 240, 295 250" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    
    {/* Wrench in hand */}
    <rect x="185" y="200" width="20" height="8" rx="3" fill="#9CA3AF" />
    <circle cx="185" cy="204" r="6" stroke="#9CA3AF" strokeWidth="3" fill="none" />
    
    {/* Head */}
    <circle cx="262" cy="188" r="25" fill="#8B6914" />
    <circle cx="262" cy="190" r="24" fill="#F5C6A0" />
    
    {/* Cap */}
    <path d="M237 183 C237 168, 287 168, 287 183" fill="#3B82F6" />
    <rect x="233" y="181" width="58" height="6" rx="3" fill="#2563EB" />
    
    {/* Eyes - focused on pipe */}
    <circle cx="253" cy="190" r="3" fill="#1F2937" />
    <circle cx="268" cy="190" r="3" fill="#1F2937" />
    
    {/* Concentrated expression */}
    <path d="M255 200 L265 200" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    
    {/* Toolbox */}
    <rect x="310" y="265" width="50" height="25" rx="4" fill="#DC2626" />
    <rect x="325" y="260" width="20" height="8" rx="4" fill="#B91C1C" />
    <line x1="335" y1="270" x2="335" y2="285" stroke="#FCA5A5" strokeWidth="1.5" />
    
    {/* Floating tools */}
    <rect x="330" y="240" width="4" height="18" rx="2" fill="#9CA3AF" transform="rotate(-20 332 249)" />
    <rect x="345" y="245" width="4" height="15" rx="2" fill="#F59E0B" transform="rotate(10 347 252)" />
  </svg>
);

// Happy citizen with resolved complaint - celebration
export const HappyCitizenSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background buildings */}
    <rect x="20" y="180" width="50" height="120" rx="4" fill="#E5E7EB" />
    <rect x="26" y="190" width="12" height="12" rx="2" fill="#BFDBFE" />
    <rect x="44" y="190" width="12" height="12" rx="2" fill="#BFDBFE" />
    <rect x="26" y="210" width="12" height="12" rx="2" fill="#BFDBFE" />
    <rect x="44" y="210" width="12" height="12" rx="2" fill="#BFDBFE" />
    <rect x="26" y="230" width="12" height="12" rx="2" fill="#FDE68A" />
    <rect x="44" y="230" width="12" height="12" rx="2" fill="#BFDBFE" />
    
    <rect x="330" y="160" width="55" height="140" rx="4" fill="#D1D5DB" />
    <rect x="336" y="170" width="12" height="12" rx="2" fill="#BFDBFE" />
    <rect x="354" y="170" width="12" height="12" rx="2" fill="#FDE68A" />
    <rect x="336" y="190" width="12" height="12" rx="2" fill="#BFDBFE" />
    <rect x="354" y="190" width="12" height="12" rx="2" fill="#BFDBFE" />
    <rect x="336" y="210" width="12" height="12" rx="2" fill="#BFDBFE" />
    <rect x="354" y="210" width="12" height="12" rx="2" fill="#BFDBFE" />
    
    {/* Ground */}
    <rect x="0" y="300" width="400" height="50" fill="#D1FAE5" />
    
    {/* Person body */}
    <rect x="170" y="210" width="50" height="55" rx="10" fill="#FF9933" /> {/* Kurta */}
    <rect x="170" y="210" width="50" height="55" rx="10" stroke="#E6862E" strokeWidth="1" fill="none" />
    
    {/* Legs */}
    <rect x="178" y="263" width="14" height="35" rx="5" fill="#F3F4F6" />
    <rect x="198" y="263" width="14" height="35" rx="5" fill="#F3F4F6" />
    {/* Sandals */}
    <ellipse cx="185" cy="300" rx="10" ry="4" fill="#92400E" />
    <ellipse cx="205" cy="300" rx="10" ry="4" fill="#92400E" />
    
    {/* Arms raised in celebration */}
    <path d="M170 220 C150 210, 130 190, 120 170" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    <path d="M220 220 C240 210, 260 190, 270 170" stroke="#F5C6A0" strokeWidth="10" strokeLinecap="round" />
    
    {/* Hands */}
    <circle cx="118" cy="168" r="8" fill="#F5C6A0" />
    <circle cx="272" cy="168" r="8" fill="#F5C6A0" />
    
    {/* Phone in hand showing "Resolved" */}
    <rect x="258" y="150" width="28" height="45" rx="5" fill="#1F2937" />
    <rect x="261" y="155" width="22" height="32" rx="2" fill="#22C55E" />
    <path d="M267 168 L271 172 L280 163" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Head */}
    <circle cx="195" cy="180" r="28" fill="#F5C6A0" />
    
    {/* Hair */}
    <path d="M167 172 C167 150, 195 142, 210 145 C225 148, 225 160, 223 172" fill="#1F2937" />
    
    {/* Eyes - happy closed */}
    <path d="M183 178 Q187 174 191 178" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M200 178 Q204 174 208 178" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    
    {/* Big happy smile */}
    <path d="M185 192 Q195 202 208 192" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    
    {/* Mustache */}
    <path d="M188 188 Q195 185 195 188 Q195 185 202 188" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Confetti / celebration elements */}
    <rect x="130" y="130" width="8" height="8" rx="1" fill="#FF9933" opacity="0.7" transform="rotate(30 134 134)" />
    <rect x="250" y="120" width="8" height="8" rx="1" fill="#3B82F6" opacity="0.7" transform="rotate(-20 254 124)" />
    <rect x="160" y="100" width="6" height="6" rx="1" fill="#22C55E" opacity="0.6" transform="rotate(45 163 103)" />
    <rect x="230" y="140" width="7" height="7" rx="1" fill="#EF4444" opacity="0.6" transform="rotate(15 233 143)" />
    <circle cx="140" cy="150" r="4" fill="#8B5CF6" opacity="0.5" />
    <circle cx="260" cy="140" r="3" fill="#F59E0B" opacity="0.6" />
    <circle cx="180" cy="120" r="3" fill="#EC4899" opacity="0.5" />
    <circle cx="220" cy="110" r="4" fill="#14B8A6" opacity="0.5" />
    
    {/* Stars */}
    <path d="M100 140 L103 133 L106 140 L99 135 L111 135 Z" fill="#FCD34D" opacity="0.7" />
    <path d="M290 130 L292 125 L294 130 L289 127 L299 127 Z" fill="#FCD34D" opacity="0.6" />
    <path d="M195 90 L198 82 L201 90 L193 85 L207 85 Z" fill="#FCD34D" opacity="0.8" />
  </svg>
);

// Animated floating illustration wrapper
export const FloatingWrapper = ({ children, className = '', delay = 0 }) => (
  <div
    className={`${className}`}
    style={{
      animation: `float 4s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    {children}
  </div>
);
