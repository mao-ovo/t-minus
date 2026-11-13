import React, { useRef, useState, useEffect } from 'react';

export default function PhoneFrame({ children, showChrome, theme }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setScale(width / 1170);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="aspect-[9/19.5] w-full max-w-[360px] rounded-[40px] border-2 border-neutral-700 bg-neutral-900 shadow-2xl overflow-hidden relative">
      {/* Scaled wallpaper canvas */}
      <div ref={containerRef} className="w-full h-full relative">
        <div
          style={{
            width: 1170,
            height: 2532,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>

      {/* Phone chrome overlays */}
      {showChrome && (
        <>
          {/* Top area — clock & date */}
          <div
            data-export-hide="true"
            className="absolute top-[15%] left-0 right-0 z-10 flex flex-col items-center pointer-events-none"
          >
            <span
              className="font-display font-semibold text-lg"
              style={{ color: theme?.text ?? '#ffffff' }}
            >
              9:41
            </span>
            <span
              className="text-xs font-display"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Thursday, November 12
            </span>
          </div>

          {/* Bottom area — flashlight, camera, home bar */}
          <div
            data-export-hide="true"
            className="absolute bottom-[4%] left-0 right-0 z-10 flex flex-col items-center pointer-events-none"
          >
            {/* Icon row */}
            <div className="w-full flex justify-between px-10 mb-3">
              {/* Flashlight */}
              <div className="w-10 h-10 rounded-full bg-neutral-800/60 backdrop-blur flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 2h6l1 7H8L9 2z" />
                  <rect x="8" y="9" width="8" height="12" rx="1" />
                  <circle cx="12" cy="14" r="1.5" fill="white" />
                </svg>
              </div>

              {/* Camera */}
              <div className="w-10 h-10 rounded-full bg-neutral-800/60 backdrop-blur flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            </div>

            {/* Home indicator bar */}
            <div
              className="rounded-full bg-white/30"
              style={{ width: 134, height: 5 }}
            />
          </div>
        </>
      )}
    </div>
  );
}
