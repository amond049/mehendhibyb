export default function HennaDivider() {
  return (
    <div className="flex justify-center my-16">
      <svg
        width="220"
        height="40"
        viewBox="0 0 220 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--henna-divider-color)]"
      >
        {/* Left line */}
        <line
          x1="0"
          y1="20"
          x2="80"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* Right line */}
        <line
          x1="140"
          y1="20"
          x2="220"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* Center ornament */}
        <g stroke="currentColor" strokeWidth="1.5" fill="none">
          <circle cx="110" cy="20" r="6" />
          <circle cx="110" cy="20" r="2" fill="currentColor" />

          {/* petals */}
          <path d="M110 8 C105 12 105 16 110 18 C115 16 115 12 110 8Z" />
          <path d="M110 32 C105 28 105 24 110 22 C115 24 115 28 110 32Z" />
          <path d="M98 20 C102 15 106 15 108 20 C106 25 102 25 98 20Z" />
          <path d="M122 20 C118 15 114 15 112 20 C114 25 118 25 122 20Z" />
        </g>
      </svg>
    </div>
  );
}