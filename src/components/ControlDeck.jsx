import { useState } from 'react';
import { PRESETS } from '../utils/presets';
import { THEMES } from '../utils/themes';

const STATUS_CYCLE = ['done', 'active', 'upcoming'];

const LABEL = 'font-mono text-xs tracking-widest uppercase text-neutral-500 mb-2 block';
const SECTION = 'border-t border-neutral-800 pt-6 mt-6';
const INPUT =
  'bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white font-mono text-sm w-full focus:border-orange-500 focus:outline-none transition-colors';

function StatusPill({ status, onClick }) {
  const styles = {
    done: 'bg-emerald-500/20 text-emerald-400',
    active: 'bg-orange-500/20 text-orange-400',
    upcoming: 'bg-neutral-700/50 text-neutral-400',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles[status]} rounded-full px-3 py-1 text-xs font-mono uppercase cursor-pointer select-none transition-colors`}
    >
      {status}
    </button>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-orange-500' : 'bg-neutral-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function ControlDeck({
  title,
  setTitle,
  targetDate,
  setTargetDate,
  milestones,
  setMilestones,
  themeId,
  setThemeId,
  showPhoneChrome,
  setShowPhoneChrome,
  onExport,
  onCopyLink,
  onLoadPreset,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateMilestone = (index, field, value) => {
    const next = milestones.map((m, i) => (i === index ? { ...m, [field]: value } : m));
    setMilestones(next);
  };

  const cycleStatus = (index) => {
    const current = milestones[index].status;
    const nextStatus = STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length];
    updateMilestone(index, 'status', nextStatus);
  };

  const presetEntries = Object.values(PRESETS);
  const themeEntries = Object.values(THEMES);

  return (
    <div className="bg-neutral-950 border-l border-neutral-800 h-full overflow-y-auto no-scrollbar p-6 flex flex-col gap-0">
      {/* 1. Header */}
      <div>
        <h1 className="font-display font-bold text-2xl tracking-[0.3em] text-white">T-MINUS</h1>
        <p className="font-mono text-xs tracking-widest text-neutral-500 mt-1">
          COUNTDOWN LOCK SCREEN STUDIO
        </p>
      </div>

      {/* 2. Quick Presets */}
      <div className={SECTION}>
        <span className={LABEL}>QUICK PRESETS</span>
        <div className="flex gap-2">
          {presetEntries.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onLoadPreset(preset.id)}
              className="border border-neutral-700 hover:border-neutral-500 rounded-lg px-3 py-2 text-sm font-mono text-white transition-colors cursor-pointer"
            >
              {preset.icon} {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Mission Title */}
      <div className={SECTION}>
        <label className={LABEL} htmlFor="mission-title">
          MISSION TITLE
        </label>
        <input
          id="mission-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={INPUT}
          placeholder="e.g. LAUNCH DAY"
        />
      </div>

      {/* 4. Target Date */}
      <div className={SECTION}>
        <label className={LABEL} htmlFor="target-date">
          TARGET DATE & TIME
        </label>
        <input
          id="target-date"
          type="datetime-local"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className={INPUT}
        />
      </div>

      {/* 5. Visual Theme */}
      <div className={SECTION}>
        <span className={LABEL}>VISUAL THEME</span>
        <div className="grid grid-cols-3 gap-3">
          {themeEntries.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setThemeId(theme.id)}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-left ${
                themeId === theme.id
                  ? 'border-white scale-105'
                  : 'border-neutral-700 hover:border-neutral-600'
              }`}
            >
              <div className="flex gap-1.5 mb-2">
                <span
                  className="w-4 h-4 rounded-full border border-neutral-600"
                  style={{ backgroundColor: theme.bg }}
                />
                <span
                  className="w-4 h-4 rounded-full border border-neutral-600"
                  style={{ backgroundColor: theme.accent }}
                />
                <span
                  className="w-4 h-4 rounded-full border border-neutral-600"
                  style={{ backgroundColor: theme.text }}
                />
              </div>
              <span className="text-xs font-mono text-neutral-300">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Milestone Editor */}
      <div className={SECTION}>
        <span className={LABEL}>MILESTONES</span>
        <div className="flex flex-col gap-3">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={m.title}
                onChange={(e) => updateMilestone(i, 'title', e.target.value)}
                className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white font-mono text-sm flex-1 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Milestone title"
              />
              <input
                type="text"
                value={m.tag}
                onChange={(e) => updateMilestone(i, 'tag', e.target.value)}
                className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-2 text-white font-mono text-xs w-20 text-center focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="D-0"
              />
              <StatusPill status={m.status} onClick={() => cycleStatus(i)} />
            </div>
          ))}
        </div>
      </div>

      {/* 7. Phone Chrome Toggle */}
      <div className={SECTION}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest uppercase text-neutral-500">
            SIMULATE PHONE CLOCK & BUTTONS
          </span>
          <ToggleSwitch checked={showPhoneChrome} onChange={setShowPhoneChrome} />
        </div>
      </div>

      {/* 8. Action Buttons */}
      <div className={SECTION}>
        <button
          type="button"
          onClick={onExport}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-sm font-bold py-3 rounded-lg transition-colors cursor-pointer"
        >
          Download Lock Screen PNG (1170×2532)
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full mt-3 border border-neutral-700 hover:border-neutral-500 text-neutral-300 font-mono text-sm py-3 rounded-lg transition-colors cursor-pointer"
        >
          {copied ? '✓ Copied!' : 'Copy Shareable Link'}
        </button>
      </div>
    </div>
  );
}
