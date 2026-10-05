/* Stand-in visual for the Guitar Tutor until a screen capture exists.
 * Frets sit at real positions (distance from nut = 1 - 2^(-n/12) of scale
 * length, 12th fret at the right edge) with C-major chord targets drawn on. */
const W = 1425;
const H = 900;
const FRETS = 12;
const fretX = (n) => (W * (1 - 2 ** (-n / 12))) / 0.5;
const STRINGS = 6;
const top = 250;
const bottom = 650;
const stringY = (s) => top + ((bottom - top) * s) / (STRINGS - 1);

/* C major, low E = string 5. [string index from top (high e = 0), fret] */
const targets = [
  [4, 3],
  [3, 2],
  [1, 1],
];

const inlays = [3, 5, 7, 9];

export default function FretboardArt({ accent }) {
  const mid = (n) => (fretX(n - 1) + fretX(n)) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10201b" />
          <stop offset="100%" stopColor="#24342c" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#fb-bg)" />
      <rect x="0" y={top - 40} width={W} height={bottom - top + 80} fill="#2c2018" opacity="0.9" />

      {inlays.map((n) => (
        <circle key={n} cx={mid(n)} cy={(top + bottom) / 2} r="14" fill="#e9e1cf" opacity="0.25" />
      ))}
      <circle cx={mid(12)} cy={stringY(1.5)} r="14" fill="#e9e1cf" opacity="0.25" />
      <circle cx={mid(12)} cy={stringY(3.5)} r="14" fill="#e9e1cf" opacity="0.25" />

      {Array.from({ length: FRETS + 1 }, (_, n) => (
        <line
          key={n}
          x1={fretX(n)}
          x2={fretX(n)}
          y1={top - 40}
          y2={bottom + 40}
          stroke={n === 0 ? "#f3ecdc" : "#b9b2a3"}
          strokeWidth={n === 0 ? 14 : 5}
        />
      ))}

      {Array.from({ length: STRINGS }, (_, s) => (
        <line key={s} x1="0" x2={W} y1={stringY(s)} y2={stringY(s)} stroke="#d8d2c4" strokeWidth={1.5 + s * 0.7} />
      ))}

      {targets.map(([s, f]) => (
        <g key={`${s}-${f}`}>
          <circle cx={mid(f)} cy={stringY(s)} r="30" fill={accent} opacity="0.28" />
          <circle cx={mid(f)} cy={stringY(s)} r="17" fill={accent} />
        </g>
      ))}
    </svg>
  );
}
