import { useState, useEffect } from 'react';

export function useCountdown(targetDateStr) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const target = new Date(targetDateStr);
  const diff = target.getTime() - now.getTime();

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Calculate progress: from when the page first loaded (or a reasonable start)
  // We'll assume the "start" was when milestones began, so calculate based on days
  // For a simpler approach: percentage of time elapsed
  const startDate = new Date(targetDateStr);
  startDate.setDate(startDate.getDate() - 30); // Assume 30-day window
  const totalDuration = target.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  const isExpired = diff <= 0;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    progress,
    isExpired,
    targetDate: target,
  };
}
