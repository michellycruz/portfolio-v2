// Redraw of the old robo1.png as inline SVG so the eyes and the arms are
// separate elements and can actually animate. The silhouette follows the theme
// ink instead of being baked black, which also stops the robot from sinking
// into the dark background.
export function RobotMechanic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 550 490"
      role="img"
      aria-label="Robô mecânico acenando ao lado da trajetória profissional"
      className={`robot text-ink dark:text-white/90 ${className}`}
    >
      <g className="robot-glow">
        <g fill="currentColor">
          {/* legs + feet */}
          <path d="M213 300h28v148h-28zM298 300h28v148h-28z" />
          <path d="M200 448h53v25h-53zM285 448h53v25h-53z" />

          {/* head: narrow at the top, flaring to the shoulders */}
          <path d="M227 90h86l20 85H207z" />

          {/* body: wide dome sitting over the legs */}
          <path d="M168 305c2-90 42-133 108-133s106 43 109 133z" />
        </g>

        {/* arms drawn as strokes — closer to the jointed limbs of the original */}
        <g fill="none" stroke="currentColor" strokeWidth="23" strokeLinecap="butt">
          <g className="robot-arm-left" style={{ transformOrigin: "200px 197px" }}>
            <path d="M200 197 143 137" />
            <path d="M136 133 146 82" />
            {/* wrench: ~290° arc, gap facing right */}
            <path d="M170.5 59.3A25 25 0 1 1 170.5 30.7" strokeWidth="16" />
          </g>
          <g className="robot-arm-right" style={{ transformOrigin: "349px 189px" }}>
            <path d="M349 189 408 206" />
            <path d="M414 212 437 286" />
            {/* same wrench, gap rotated to face down-left */}
            <path d="M413.5 340.5A25 25 0 1 1 437 357" strokeWidth="16" />
          </g>
        </g>

        {/* elbow joints, on top of the strokes */}
        <g fill="currentColor">
          <circle className="robot-arm-left" style={{ transformOrigin: "200px 197px" }} cx="137" cy="134" r="15" />
          <circle className="robot-arm-right" style={{ transformOrigin: "349px 189px" }} cx="412" cy="208" r="15" />
        </g>
      </g>

      {/* eyes — painted in the page colour so they read as cut out of the head.
          The body stays a solid silhouette. */}
      <g className="text-cream dark:text-cream-dark" fill="currentColor">
        <g className="robot-eyes" style={{ transformOrigin: "center 137px" }}>
          <rect x="243" y="125" width="15" height="24" rx="2" />
          <rect x="281" y="125" width="15" height="24" rx="2" />
        </g>
      </g>

      <rect x="0" y="472" width="550" height="8" fill="currentColor" />
    </svg>
  );
}
