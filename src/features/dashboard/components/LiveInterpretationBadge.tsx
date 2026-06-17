export function LiveInterpretationBadge() {
  return (
    <div className="inline-flex items-center gap-3">
      {/* Ripple dot */}
      <div className="relative w-3.5 h-3.5 flex-shrink-0">
        <span className="absolute inset-0 rounded-full bg-violet-600 animate-ping opacity-60" />
        <span
          className="absolute inset-0 rounded-full bg-violet-600 animate-ping opacity-40"
          style={{ animationDelay: "0.5s" }}
        />
        <span className="absolute inset-[1px] rounded-full bg-violet-600" />
      </div>

      {/* Waveform bars */}
      <div className="flex items-center gap-[3px] h-[22px]">
        {[0, 0.1, 0.2, 0.05, 0.15, 0.25, 0.3].map((delay, i) => (
          <span
            key={i}
            className="w-[2px] rounded-sm bg-violet-600"
            style={{
              height: "22px",
              transformOrigin: "center",
              animation: "wave 0.9s ease-in-out infinite",
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-[1px]">
        <span className="text-[15px] font-semibold text-indigo-950 leading-none tracking-tight">
          Interpreting
        </span>
        <span
          className="text-[13px] font-medium text-violet-600 tracking-widest"
          style={{ animation: "drift 2s ease-in-out infinite" }}
        >
          ● REAL-TIME
        </span>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.15); }
          50%       { transform: scaleY(1); }
        }
        @keyframes drift {
          0%, 100% { opacity: 0.4; transform: translateX(0); }
          50%       { opacity: 1;   transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}
