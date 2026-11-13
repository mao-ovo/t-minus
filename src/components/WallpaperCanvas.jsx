import { useCountdown } from '../hooks/useCountdown';

const DISPLAY_FONT = '"Space Grotesk", system-ui, sans-serif';
const MONO_FONT = '"JetBrains Mono", monospace';

function formatTargetDate(date) {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ];
  const m = months[date.getMonth()];
  const d = date.getDate().toString().padStart(2, '0');
  const y = date.getFullYear();
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  // Derive short timezone name
  const tz =
    Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName')?.value || 'CST';
  return `${m} ${d}, ${y} — ${h}:${min} ${tz}`;
}

/* ─── Milestone node icons ─── */

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 7.5L5.5 10.5L11.5 3.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Single milestone row ─── */

function MilestoneRow({ milestone, theme, isLast }) {
  const { title, tag, status } = milestone;

  const nodeSize = 24;

  /* Node circle */
  let nodeContent;
  if (status === 'done') {
    nodeContent = (
      <div
        style={{
          width: nodeSize,
          height: nodeSize,
          borderRadius: '50%',
          backgroundColor: theme.doneColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CheckIcon />
      </div>
    );
  } else if (status === 'active') {
    nodeContent = (
      <div
        className="animate-pulse-glow"
        style={{
          width: nodeSize,
          height: nodeSize,
          borderRadius: '50%',
          border: `3px solid ${theme.accent}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 0 12px ${theme.accentGlow}`,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: theme.accent,
          }}
        />
      </div>
    );
  } else {
    // upcoming
    nodeContent = (
      <div
        style={{
          width: nodeSize,
          height: nodeSize,
          borderRadius: '50%',
          border: `2px solid ${theme.nodeStroke}`,
          flexShrink: 0,
        }}
      />
    );
  }

  /* Tag pill */
  const tagPill = (
    <span
      style={{
        fontFamily: MONO_FONT,
        fontSize: 18,
        padding: '2px 10px',
        borderRadius: 6,
        backgroundColor: status === 'active' ? theme.accentGlow : theme.tagBg,
        border: `1px solid ${status === 'active' ? theme.accent : theme.tagBorder}`,
        color: status === 'active' ? theme.accent : theme.tagText,
        whiteSpace: 'nowrap',
      }}
    >
      {tag}
    </span>
  );

  /* Title color & style */
  const titleStyle = {
    fontFamily: MONO_FONT,
    fontSize: 26,
    color:
      status === 'active'
        ? theme.accent
        : status === 'done'
          ? theme.textSecondary
          : theme.text,
    fontWeight: status === 'active' ? 700 : 400,
    textDecoration: status === 'done' ? 'line-through' : 'none',
    lineHeight: 1.3,
  };

  return (
    <div style={{ display: 'flex', position: 'relative', minHeight: 72 }}>
      {/* Spine segment – runs from center of this node to center of next */}
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            left: nodeSize / 2 - 1,
            top: nodeSize,
            bottom: 0,
            width: 2,
            backgroundColor: theme.border,
          }}
        />
      )}

      {/* Node */}
      <div
        style={{
          width: nodeSize,
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 2,
          flexShrink: 0,
        }}
      >
        {nodeContent}
      </div>

      {/* Content */}
      <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 24 }}>
        <span style={titleStyle}>{title}</span>
        <div>{tagPill}</div>
      </div>
    </div>
  );
}

/* ─── Main WallpaperCanvas component ─── */

export default function WallpaperCanvas({ title, targetDate, milestones, theme, canvasRef }) {
  const { days, progress, targetDate: parsedTarget } = useCountdown(targetDate);

  const WIDTH = 1170;
  const HEIGHT = 2532;
  const TOP_ZONE = 810; // 32%
  const BOTTOM_ZONE = 355; // 14%
  // Active zone: from 810 to 2177 (~1367px)

  return (
    <div
      ref={canvasRef}
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: DISPLAY_FONT,
      }}
    >
      {/* ─── Grid texture covers entire canvas ─── */}
      <div
        className={theme.gridClass}
        style={{
          position: 'absolute',
          inset: 0,
          color: theme.gridColor,
          pointerEvents: 'none',
        }}
      />

      {/* ─── Top safe zone (32%) — empty ─── */}
      {/* Nothing here — phone clock area */}

      {/* ─── Active content zone (54%) ─── */}
      <div
        style={{
          position: 'absolute',
          top: TOP_ZONE,
          left: 0,
          right: 0,
          bottom: BOTTOM_ZONE,
          display: 'flex',
          flexDirection: 'column',
          padding: '0 72px',
        }}
      >
        {/* 1. Status Pill */}
        <div style={{ marginBottom: 32 }}>
          <span
            style={{
              fontFamily: MONO_FONT,
              fontSize: 20,
              color: theme.textSecondary,
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: 999,
              padding: '6px 20px',
              display: 'inline-block',
            }}
          >
            STATUS: IN PROGRESS // TRACKING
          </span>
        </div>

        {/* 2. Mission Title */}
        <div
          style={{
            fontFamily: DISPLAY_FONT,
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: theme.text,
            lineHeight: 1.3,
            marginBottom: 24,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </div>

        {/* 3. Hero Countdown */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 48,
          }}
        >
          {/* Giant days */}
          <div
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 700,
              fontSize: 220,
              lineHeight: 1,
              color: theme.text,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(days).padStart(3, '0')}
          </div>

          {/* DAYS REMAINING */}
          <div
            style={{
              fontFamily: MONO_FONT,
              fontSize: 22,
              letterSpacing: '0.3em',
              color: theme.textSecondary,
              marginTop: 8,
            }}
          >
            DAYS REMAINING
          </div>

          {/* Target date */}
          <div
            style={{
              fontFamily: MONO_FONT,
              fontSize: 20,
              color: theme.textSecondary,
              marginTop: 8,
            }}
          >
            {formatTargetDate(parsedTarget)}
          </div>

          {/* Progress bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 24,
              width: '100%',
            }}
          >
            <div
              style={{
                flex: 1,
                height: 12,
                borderRadius: 6,
                backgroundColor: theme.progressBg,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${Math.round(progress)}%`,
                  height: '100%',
                  borderRadius: 6,
                  backgroundColor: theme.progressFill,
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: MONO_FONT,
                fontSize: 20,
                color: theme.textSecondary,
                whiteSpace: 'nowrap',
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* 4. Milestone Track */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(milestones || []).map((ms, i) => (
            <MilestoneRow
              key={i}
              milestone={ms}
              theme={theme}
              isLast={i === (milestones || []).length - 1}
            />
          ))}
        </div>
      </div>

      {/* ─── Bottom safe zone (14%) — empty ─── */}
      {/* Nothing here — flashlight/camera area */}
    </div>
  );
}
