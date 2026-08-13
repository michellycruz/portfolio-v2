// Redraw of the old robo3.png. It is a rocket, not a robot — no eyes to blink,
// so the life comes from the exhaust flickering and a slow hover sway.
export function RobotRocket({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 250 250"
      role="img"
      aria-label="Foguete decolando"
      className={`robot text-ink dark:text-white/90 ${className}`}
    >
      <g className="robot-glow">
        {/* exhaust, behind the body */}
        <g className="robot-flame" style={{ transformOrigin: "128px 168px" }} fill="currentColor">
          <path d="M128 166l14 34-9-5-5 22-5-22-9 5z" />
        </g>

        <g className="robot-hover" style={{ transformOrigin: "128px 150px" }}>
          <g fill="currentColor">
            {/* landing legs */}
            <path d="M104 168c-20 4-38 16-42 38l14 3c3-16 16-24 32-27zM152 168c20 4 38 16 42 38l-14 3c-3-16-16-24-32-27z" />
            <path d="M56 202h18v24H56zM182 202h18v24h-18z" />

            {/* side fins */}
            <path d="M92 104c-24 4-46 18-54 44h54zM164 104c24 4 46 18 54 44h-54z" />

            {/* body */}
            <path d="M128 8c-24 0-38 40-38 84v56h76V92c0-44-14-84-38-84z" />

            {/* engine block */}
            <path d="M88 148h80v20H88z" />
          </g>

          {/* cut-outs */}
          <g className="text-cream dark:text-cream-dark" fill="currentColor">
            {/* nose highlight */}
            <path d="M122 22c-5 8-8 20-9 32l6 1c1-11 4-22 8-29z" />

            {/* porthole ring */}
            <circle cx="128" cy="90" r="30" />
            {/* rivets around it */}
            <circle cx="128" cy="56" r="11" />
            <circle cx="96" cy="90" r="11" />
            <circle cx="160" cy="90" r="11" />
            <circle cx="128" cy="124" r="11" />

            {/* fin slots */}
            <path d="M60 124h7v18h-7zM72 120h7v22h-7zM183 124h7v18h-7zM171 120h7v22h-7z" />

            {/* engine grill */}
            <path d="M96 152h6v12h-6zM108 152h6v12h-6zM120 152h6v12h-6zM132 152h6v12h-6zM144 152h6v12h-6zM156 152h6v12h-6z" />
          </g>

          {/* porthole glass + rivet crosses, back in ink */}
          <g fill="currentColor">
            <circle cx="128" cy="90" r="21" />
            <g className="text-cream dark:text-cream-dark" fill="currentColor">
              <circle cx="128" cy="90" r="11" />
              <path d="M126 50h4v12h-4zM122 54h12v4h-12zM94 84h4v12h-4zM90 88h12v4H90zM158 84h4v12h-4zM154 88h12v4h-12zM126 118h4v12h-4zM122 122h12v4h-12z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
