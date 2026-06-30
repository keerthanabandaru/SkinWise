// SkinWise logo — dermatologist cross with leaf accent
export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SkinWise logo"
    >
      <circle cx="24" cy="24" r="24" fill="url(#sw-grad)" />
      <rect x="21" y="10" width="6" height="28" rx="3" fill="white" opacity="0.95" />
      <rect x="10" y="21" width="28" height="6" rx="3" fill="white" opacity="0.95" />
      <ellipse cx="33" cy="15" rx="4" ry="6.5" fill="white" opacity="0.35" transform="rotate(-35 33 15)" />
      <defs>
        <linearGradient id="sw-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  )
}
