import type { ProductRecord, VisualVariant } from '@/types/content';

/**
 * Original Heatnexis minimalist industrial SVG visuals.
 * Strictly zero third-party reference images; every visual carries a clear
 * non-intrusive pending-photography cue while matching measured surface luminance.
 */
export function ProductDeviceVisual({
  variant = 'white-square',
  theme = 'dark',
  view = 0,
  label,
}: {
  variant?: ProductRecord['variantStyle'];
  theme?: 'dark' | 'light';
  view?: number;
  label?: string;
}) {
  const isDark = theme === 'dark';
  const bgFill = isDark ? '#252c33' : '#eff2f5';
  const plinthFill = isDark ? '#14181d' : '#dfe5ec';
  const strokeMain = isDark ? '#4a5562' : '#c5ced8';
  const badgeText = isDark ? 'rgba(255,255,255,0.42)' : 'rgba(46,55,66,0.52)';
  const viewTag = ['FRONT VIEW', 'REAR VIEW', 'DIMENSIONS', 'WIRING'][view] || 'FRONT VIEW';

  // Rear / Dimensions / Wiring technical schematic view for gallery tabs
  if (view > 0) {
    return (
      <svg
        viewBox="0 0 400 300"
        width="100%"
        height="100%"
        role="img"
        aria-label={`${label || 'Heatnexis thermostat'} — ${viewTag} (Approved photography pending)`}
        style={{ display: 'block' }}
      >
        <rect width="400" height="300" fill={bgFill} />
        <g stroke={strokeMain} strokeWidth="1" opacity="0.35">
          <line x1="0" y1="60" x2="400" y2="60" />
          <line x1="0" y1="150" x2="400" y2="150" />
          <line x1="0" y1="240" x2="400" y2="240" />
          <line x1="100" y1="0" x2="100" y2="300" />
          <line x1="200" y1="0" x2="200" y2="300" />
          <line x1="300" y1="0" x2="300" y2="300" />
        </g>
        {view === 1 && (
          <g>
            <rect x="125" y="58" width="150" height="150" fill="#ffffff" stroke="#8a96a6" strokeWidth="2" />
            <rect x="155" y="88" width="90" height="90" fill="#eef2f6" stroke="#8a96a6" strokeWidth="1.5" />
            <g fill="#4c505f">
              <rect x="165" y="152" width="10" height="14" />
              <rect x="180" y="152" width="10" height="14" />
              <rect x="195" y="152" width="10" height="14" />
              <rect x="210" y="152" width="10" height="14" />
              <rect x="225" y="152" width="10" height="14" />
            </g>
            <text x="200" y="128" textAnchor="middle" fontSize="11" fill="#4c505f" fontWeight="700">
              BACK TERMINAL BLOCK
            </text>
          </g>
        )}
        {view === 2 && (
          <g>
            <rect x="118" y="66" width="128" height="128" fill="#ffffff" stroke="#0067e7" strokeWidth="1.5" />
            <rect x="268" y="66" width="24" height="128" fill="#ffffff" stroke="#0067e7" strokeWidth="1.5" />
            <line x1="118" y1="210" x2="246" y2="210" stroke="#0067e7" strokeWidth="1.5" />
            <line x1="268" y1="210" x2="292" y2="210" stroke="#0067e7" strokeWidth="1.5" />
            <text x="182" y="226" textAnchor="middle" fontSize="11" fill="#0067e7" fontWeight="600">
              WIDTH (TBD mm)
            </text>
            <text x="280" y="226" textAnchor="middle" fontSize="10" fill="#0067e7" fontWeight="600">
              DEPTH
            </text>
            <text x="182" y="134" textAnchor="middle" fontSize="11" fill="#4c505f" fontWeight="600">
              CAD DRAWING PENDING
            </text>
          </g>
        )}
        {view === 3 && (
          <g>
            <rect x="92" y="62" width="216" height="136" fill="#ffffff" stroke="#4c505f" strokeWidth="1.5" />
            {[120, 152, 184, 216, 248, 280].map((x, idx) => (
              <g key={x}>
                <circle cx={x} cy="116" r="10" fill="#eef2f6" stroke="#0067e7" strokeWidth="1.5" />
                <text x={x} y="120" textAnchor="middle" fontSize="10" fill="#272727" fontWeight="700">
                  {idx + 1}
                </text>
                <line x1={x} y1="126" x2={x} y2="178" stroke="#4c505f" strokeWidth="1.2" strokeDasharray="3 3" />
              </g>
            ))}
            <text x="200" y="90" textAnchor="middle" fontSize="11" fill="#0067e7" fontWeight="700">
              SCHEMATIC PENDING VERIFIED DATASHEET
            </text>
          </g>
        )}
        <text x="200" y="274" textAnchor="middle" fontSize="10.5" fill={badgeText} letterSpacing="1.2">
          {viewTag} · Heatnexis APPROVED ASSET PENDING
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 300"
      width="100%"
      height="100%"
      role="img"
      aria-label={`${label || 'Heatnexis product'} visual placeholder (Approved photography pending)`}
      style={{ display: 'block' }}
    >
      <rect width="400" height="300" fill={bgFill} />
      {/* Studio plinth */}
      <polygon points="48,248 80,224 320,224 352,248" fill={plinthFill} />
      <rect x="48" y="248" width="304" height="52" fill={isDark ? '#101418' : '#d5dde6'} />

      {variant === 'white-square' && (
        <g>
          <rect x="122" y="42" width="156" height="156" rx="6" fill="#ffffff" stroke="#d0d7de" strokeWidth="2" />
          <rect x="140" y="60" width="120" height="96" rx="2" fill="#e9f0f7" stroke="#c3ceda" strokeWidth="1.5" />
          <text x="152" y="82" fontSize="11" fill="#4c505f" fontWeight="600">
            SET 21.5°C
          </text>
          <text x="200" y="128" textAnchor="middle" fontSize="34" fill="#1b222c" fontWeight="700">
            22.0°
          </text>
          <text x="200" y="146" textAnchor="middle" fontSize="9.5" fill="#0067e7" fontWeight="700">
            AUTO · WIFI
          </text>
          <g fill="#6c7785">
            <circle cx="152" cy="176" r="4" />
            <circle cx="176" cy="176" r="4" />
            <circle cx="200" cy="176" r="4" />
            <circle cx="224" cy="176" r="4" />
            <circle cx="248" cy="176" r="4" />
          </g>
        </g>
      )}

      {variant === 'black-square' && (
        <g>
          <rect x="122" y="42" width="156" height="156" rx="6" fill="#11151a" stroke="#3c4652" strokeWidth="2" />
          <rect x="136" y="56" width="128" height="104" rx="2" fill="#182028" />
          <text x="148" y="78" fontSize="10.5" fill="#8ea4bf" fontWeight="600">
            ROOM TEMP
          </text>
          <text x="200" y="124" textAnchor="middle" fontSize="36" fill="#ffffff" fontWeight="700">
            23.5°
          </text>
          <text x="200" y="145" textAnchor="middle" fontSize="10" fill="#4da1ff" fontWeight="600">
            PROGRAMMABLE
          </text>
          <rect x="136" y="170" width="128" height="18" fill="#232c36" />
          <g fill="#cfd8e3">
            <circle cx="156" cy="179" r="3" />
            <circle cx="185" cy="179" r="3" />
            <circle cx="215" cy="179" r="3" />
            <circle cx="244" cy="179" r="3" />
          </g>
        </g>
      )}

      {variant === 'round-dial' && (
        <g>
          <circle cx="200" cy="122" r="78" fill="#ffffff" stroke="#c8d0da" strokeWidth="3" />
          <circle cx="200" cy="122" r="65" fill="#141a21" stroke="#0067e7" strokeWidth="2.5" />
          <text x="200" y="96" textAnchor="middle" fontSize="10" fill="#8ea4bf" fontWeight="600">
            Heatnexis DIAL SERIES
          </text>
          <text x="200" y="132" textAnchor="middle" fontSize="34" fill="#ffffff" fontWeight="700">
            21.0°
          </text>
          <text x="200" y="155" textAnchor="middle" fontSize="10" fill="#4da1ff" fontWeight="600">
            SET 22.0°C
          </text>
          <rect x="160" y="198" width="80" height="12" rx="4" fill="#dfe5ec" />
        </g>
      )}

      {variant === 'valve' && (
        <g>
          <rect x="162" y="38" width="76" height="134" rx="14" fill="#ffffff" stroke="#c5ced8" strokeWidth="2" />
          <rect x="174" y="62" width="52" height="44" rx="4" fill="#141a21" />
          <text x="200" y="90" textAnchor="middle" fontSize="18" fill="#ffffff" fontWeight="700">
            21.5°
          </text>
          <rect x="178" y="172" width="44" height="22" fill="#9ea8b4" stroke="#6d7785" strokeWidth="1.5" />
          <rect x="172" y="194" width="56" height="16" fill="#7c8794" />
        </g>
      )}

      {variant === 'actuator' && (
        <g>
          <rect x="154" y="54" width="92" height="114" rx="8" fill="#ffffff" stroke="#c5ced8" strokeWidth="2" />
          <rect x="178" y="42" width="44" height="16" rx="2" fill="#0067e7" />
          <line x1="154" y1="112" x2="246" y2="112" stroke="#d5dde6" strokeWidth="2" />
          <rect x="172" y="168" width="56" height="26" fill="#4c505f" />
          <path d="M246 130 C278 130 286 155 286 196" fill="none" stroke="#8a96a6" strokeWidth="4" />
        </g>
      )}

      {variant === 'hub' && (
        <g>
          <rect x="92" y="76" width="216" height="118" rx="4" fill="#ffffff" stroke="#c5ced8" strokeWidth="2" />
          <rect x="108" y="92" width="184" height="24" fill="#1c242e" />
          <text x="200" y="108" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="700">
            Heatnexis MULTI-ZONE CONTROL HUB
          </text>
          {[120, 146, 172, 198, 224, 250, 276].map((x) => (
            <circle key={x} cx={x} cy="136" r="4.5" fill="#0067e7" />
          ))}
          <rect x="112" y="156" width="176" height="22" fill="#eef2f6" stroke="#c5ced8" />
        </g>
      )}

      <text x="200" y="278" textAnchor="middle" fontSize="10" fill={badgeText} letterSpacing="1.1">
        HEATNEXIS · APPROVED PHOTOGRAPHY PENDING
      </text>
    </svg>
  );
}

export function HeroShowcaseVisual({ slideType }: { slideType: 'oem' | 'thermostats' | 'smart-hvac' }) {
  return (
    <svg
      viewBox="0 0 640 460"
      width="100%"
      height="100%"
      role="img"
      aria-label="Heatnexis smart thermostat platform technical showcase (Approved photography pending)"
      style={{ display: 'block' }}
    >
      <rect width="640" height="460" fill="#182028" stroke="rgba(255,255,255,0.12)" />
      {/* Technical blueprint grid */}
      <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
        {[80, 160, 240, 320, 400, 480, 560].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="460" />
        ))}
        {[92, 184, 276, 368].map((y) => (
          <line key={y} x1="0" y1={y} x2="640" y2={y} />
        ))}
      </g>

      {/* Main Hero Device Cluster */}
      {slideType === 'oem' && (
        <g>
          {/* Left square white thermostat */}
          <rect x="52" y="140" width="152" height="152" rx="6" fill="#ffffff" />
          <rect x="68" y="156" width="120" height="92" fill="#e8eff6" />
          <text x="128" y="212" textAnchor="middle" fontSize="30" fill="#141a21" fontWeight="700">
            23.0°
          </text>
          {/* Center rotary smart thermostat */}
          <circle cx="320" cy="206" r="102" fill="#ffffff" stroke="#0067e7" strokeWidth="3" />
          <circle cx="320" cy="206" r="84" fill="#121820" />
          <text x="320" y="176" textAnchor="middle" fontSize="12" fill="#6ab0ff" fontWeight="700">
            Heatnexis OEM/ODM
          </text>
          <text x="320" y="220" textAnchor="middle" fontSize="42" fill="#ffffff" fontWeight="700">
            21.5°
          </text>
          <text x="320" y="248" textAnchor="middle" fontSize="11" fill="#8fa4bc">
            WIFI · ZIGBEE · RF
          </text>
          {/* Right black glass thermostat */}
          <rect x="436" y="140" width="152" height="152" rx="6" fill="#11161c" stroke="#3c4856" strokeWidth="2" />
          <text x="512" y="212" textAnchor="middle" fontSize="30" fill="#ffffff" fontWeight="700">
            24.5°
          </text>
          <text x="512" y="242" textAnchor="middle" fontSize="10" fill="#4da1ff" fontWeight="600">
            TOUCH SERIES
          </text>
        </g>
      )}

      {slideType === 'thermostats' && (
        <g>
          {[76, 244, 412].map((x, idx) => (
            <g key={x}>
              <rect
                x={x}
                y="112"
                width="152"
                height="182"
                rx="4"
                fill={idx === 1 ? '#11161c' : '#ffffff'}
                stroke="#0067e7"
                strokeWidth={idx === 1 ? '2.5' : '1.5'}
              />
              <text
                x={x + 76}
                y="198"
                textAnchor="middle"
                fontSize="32"
                fill={idx === 1 ? '#ffffff' : '#141a21'}
                fontWeight="700"
              >
                {['21.0°', '22.5°', '20.5°'][idx]}
              </text>
              <text
                x={x + 76}
                y="244"
                textAnchor="middle"
                fontSize="11"
                fill="#0067e7"
                fontWeight="700"
              >
                {['BOILER', 'FLOOR', 'HYDRONIC'][idx]}
              </text>
            </g>
          ))}
        </g>
      )}

      {slideType === 'smart-hvac' && (
        <g>
          <rect x="86" y="96" width="220" height="130" rx="4" fill="#ffffff" />
          <text x="196" y="156" textAnchor="middle" fontSize="14" fill="#0067e7" fontWeight="700">
            8-ZONE WIRING CENTRE
          </text>
          <text x="196" y="182" textAnchor="middle" fontSize="12" fill="#4c505f">
            Thermostats · Actuators · Boiler
          </text>
          <line x1="306" y1="160" x2="394" y2="160" stroke="#0067e7" strokeWidth="2.5" strokeDasharray="6 4" />
          <rect x="394" y="88" width="154" height="154" rx="6" fill="#121820" stroke="#0067e7" strokeWidth="2" />
          <text x="471" y="166" textAnchor="middle" fontSize="34" fill="#ffffff" fontWeight="700">
            22.0°
          </text>
          <text x="471" y="198" textAnchor="middle" fontSize="11" fill="#6ab0ff" fontWeight="600">
            MULTI-ZONE HUB
          </text>
        </g>
      )}

      <rect x="24" y="408" width="592" height="32" fill="rgba(0,0,0,0.45)" />
      <text x="320" y="428" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.68)" letterSpacing="1">
        HEATNEXIS CONCEPT VISUAL · APPROVED COMMERCIAL PHOTOGRAPHY PENDING
      </text>
    </svg>
  );
}

export function DarkSectionBackdrop({
  theme = 'tech',
  label,
}: {
  theme?: 'tech' | 'service' | 'application' | 'building' | 'news';
  label?: string;
}) {
  const fills: Record<string, [string, string]> = {
    tech: ['#0e1824', '#1b2d44'],
    service: ['#18202a', '#283443'],
    application: ['#1e262f', '#34414f'],
    building: ['#163150', '#244d78'],
    news: ['#15202e', '#1f334a'],
  };
  const [c1, c2] = fills[theme] || fills.tech;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      role="img"
      aria-label={label || 'Heatnexis visual placeholder (Approved photography pending)'}
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <rect width="800" height="500" fill={c1} />
      <polygon points="460,0 800,0 800,500 320,500" fill={c2} opacity="0.72" />
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="500" />
        ))}
        {[100, 200, 300, 400].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} />
        ))}
      </g>
      {theme === 'building' && (
        <g stroke="rgba(255,255,255,0.18)" fill="rgba(255,255,255,0.05)" strokeWidth="1.5">
          <rect x="440" y="110" width="280" height="390" />
          <rect x="520" y="160" width="200" height="340" />
          {[150, 210, 270, 330, 390].map((y) => (
            <line key={y} x1="460" y1={y} x2="700" y2={y} />
          ))}
        </g>
      )}
      {theme === 'service' && (
        <g stroke="rgba(106,176,255,0.28)" fill="none" strokeWidth="1.5">
          <circle cx="400" cy="210" r="110" />
          <circle cx="400" cy="210" r="68" />
          <rect x="355" y="165" width="90" height="90" />
        </g>
      )}
      {theme === 'application' && (
        <g>
          <rect x="490" y="110" width="160" height="160" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
          <text x="570" y="200" textAnchor="middle" fontSize="28" fill="rgba(255,255,255,0.75)" fontWeight="700">
            22.0°
          </text>
        </g>
      )}
      {theme === 'news' && (
        <g>
          <rect x="52" y="56" width="120" height="28" fill="#0067e7" />
          <text x="112" y="75" textAnchor="middle" fontSize="13" fill="#ffffff" fontWeight="700">
            Heatnexis INSIGHTS
          </text>
          <rect x="500" y="120" width="180" height="180" rx="6" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.24)" />
          <text x="590" y="220" textAnchor="middle" fontSize="34" fill="#ffffff" fontWeight="700">
            21.5°
          </text>
        </g>
      )}
    </svg>
  );
}

export function variantStyleFromIcon(icon: VisualVariant): ProductRecord['variantStyle'] {
  switch (icon) {
    case 'boiler':
      return 'white-square';
    case 'electric':
      return 'black-square';
    case 'water':
      return 'round-dial';
    case 'trv':
      return 'valve';
    case 'actuator':
      return 'actuator';
    case 'wiring':
    case 'controller':
      return 'hub';
  }
}
