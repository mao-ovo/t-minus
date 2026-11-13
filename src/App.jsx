import React, { useState, useRef, useEffect } from 'react';
import WallpaperCanvas from './components/WallpaperCanvas';
import PhoneFrame from './components/PhoneFrame';
import ControlDeck from './components/ControlDeck';
import { getTheme } from './utils/themes';
import { getPreset } from './utils/presets';
import { exportWallpaperPng } from './utils/exportPng';
import { encodeStateToUrl, decodeStateFromUrl } from './utils/urlState';

export default function App() {
  const [title, setTitle] = useState('SHIP PRODUCTION V1.0');
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    // Format as YYYY-MM-DDTHH:mm for datetime-local input compatibility
    return d.toISOString().slice(0, 16);
  });
  const [themeId, setThemeId] = useState('obsidian');
  const [showPhoneChrome, setShowPhoneChrome] = useState(true);
  const [milestones, setMilestones] = useState([
    { title: 'ARCHITECTURE REVIEW', tag: 'D-12', status: 'done' },
    { title: 'CORE API COMPLETE', tag: 'D-8', status: 'done' },
    { title: 'UI INTEGRATION', tag: 'D-4', status: 'active' },
    { title: 'FINAL QA & DEPLOY', tag: 'D-1', status: 'upcoming' },
  ]);
  const canvasRef = useRef(null);

  // Restore state from URL on mount
  useEffect(() => {
    const state = decodeStateFromUrl();
    if (state) {
      if (state.title) setTitle(state.title);
      if (state.targetDate) setTargetDate(state.targetDate);
      if (state.themeId) setThemeId(state.themeId);
      if (state.milestones) setMilestones(state.milestones);
    }
  }, []);

  const theme = getTheme(themeId);

  const handleExport = () => {
    exportWallpaperPng(canvasRef.current);
  };

  const handleCopyLink = async () => {
    const url = encodeStateToUrl({ title, targetDate, themeId, milestones });
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };

  const handleLoadPreset = (presetId) => {
    const preset = getPreset(presetId);
    if (!preset) return;
    if (preset.title) setTitle(preset.title);
    if (preset.targetDate) setTargetDate(preset.targetDate);
    if (preset.themeId) setThemeId(preset.themeId);
    if (preset.milestones) setMilestones(preset.milestones);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">
      {/* Left: Preview Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 min-h-[60vh] lg:min-h-screen">
        <PhoneFrame showChrome={showPhoneChrome} theme={theme}>
          <WallpaperCanvas
            title={title}
            targetDate={targetDate}
            milestones={milestones}
            theme={theme}
            canvasRef={canvasRef}
          />
        </PhoneFrame>
      </div>

      {/* Right: Control Deck */}
      <div className="w-full lg:w-[440px] xl:w-[480px] lg:h-screen lg:overflow-y-auto no-scrollbar">
        <ControlDeck
          title={title}
          setTitle={setTitle}
          targetDate={targetDate}
          setTargetDate={setTargetDate}
          milestones={milestones}
          setMilestones={setMilestones}
          themeId={themeId}
          setThemeId={setThemeId}
          showPhoneChrome={showPhoneChrome}
          setShowPhoneChrome={setShowPhoneChrome}
          onExport={handleExport}
          onCopyLink={handleCopyLink}
          onLoadPreset={handleLoadPreset}
        />
      </div>
    </div>
  );
}
