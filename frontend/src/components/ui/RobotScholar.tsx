// Redraw of the old robo2.png. This one stands to the LEFT of the academic
// panel, so the arm that gestures is the right one — towards the content.
export function RobotScholar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 550 490"
      role="img"
      aria-label="Robô apontando para a trilha acadêmica"
      className={`robot text-ink dark:text-white/90 ${className}`}
    >
      <g className="robot-glow">
        <g fill="currentColor">
          {/* legs splay outwards slightly, as in the original */}
          <path d="M216 310h30l-14 130h-30zM304 310h30l14 130h-30z" />
          <path d="M186 438h70v27h-70zM294 438h70v27h-70z" />

          {/* head */}
          <path d="M228 8h92v92h-92z" />

          {/* hexagonal torso */}
          <path d="M215 100h125l50 105-50 105H215l-50-105z" />
        </g>

        <g fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="butt">
          {/* left arm: hangs down, ends in a square claw */}
          <g className="robot-arm-left" style={{ transformOrigin: "165px 130px" }}>
            <path d="M165 130 122 196" />
            <path d="M118 210 116 268" />
            {/* claw opens downwards: bar on top, two prongs hanging */}
            <path d="M100 304v-36h38v36" strokeWidth="15" />
          </g>

          {/* right arm: reaches towards the panel */}
          <g className="robot-arm-right" style={{ transformOrigin: "378px 126px" }}>
            <path d="M378 126 428 186" />
            <path d="M442 196 484 196" />
            {/* bracket-shaped hand, two prongs reaching right */}
            <path d="M506 172h-22v48h22" strokeWidth="15" />
          </g>
        </g>

        {/* shoulder + elbow joints */}
        <g fill="currentColor">
          <g className="robot-arm-left" style={{ transformOrigin: "165px 130px" }}>
            <circle cx="150" cy="126" r="21" />
            <circle cx="118" cy="203" r="18" />
          </g>
          <g className="robot-arm-right" style={{ transformOrigin: "378px 126px" }}>
            <circle cx="396" cy="122" r="21" />
            <circle cx="435" cy="192" r="17" />
          </g>
        </g>
      </g>

      {/* only the eyes are cut out; the torso stays a solid silhouette */}
      <g className="text-cream dark:text-cream-dark">
        <g className="robot-eyes" fill="currentColor" style={{ transformOrigin: "center 39px" }}>
          <rect x="252" y="26" width="16" height="27" rx="2" />
          <rect x="283" y="26" width="16" height="27" rx="2" />
        </g>
      </g>

      <rect x="0" y="472" width="550" height="8" fill="currentColor" />
    </svg>
  );
}
