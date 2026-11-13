// Helper: offset days from a base date
function daysFromNow(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
}

export const PRESETS = {
  hackathon: {
    id: 'hackathon',
    name: 'Hackathon / Software Launch',
    icon: '🚀',
    title: 'SHIP PRODUCTION V1.0',
    targetDate: daysFromNow(14),
    milestones: [
      { title: 'ARCHITECTURE REVIEW', tag: 'D-12', status: 'done' },
      { title: 'CORE API COMPLETE', tag: 'D-8', status: 'done' },
      { title: 'UI INTEGRATION', tag: 'D-4', status: 'active' },
      { title: 'FINAL QA & DEPLOY', tag: 'D-1', status: 'upcoming' },
    ],
  },
  finals: {
    id: 'finals',
    name: 'Finals Week Boss Fight',
    icon: '📚',
    title: 'FINALS WEEK SURVIVAL',
    targetDate: daysFromNow(10),
    milestones: [
      { title: 'ORGANIC CHEM REVIEW', tag: 'D-8', status: 'done' },
      { title: 'CALCULUS PROBLEM SETS', tag: 'D-5', status: 'active' },
      { title: 'ESSAY DRAFT COMPLETE', tag: 'D-3', status: 'upcoming' },
      { title: 'FINAL STUDY SESSION', tag: 'D-1', status: 'upcoming' },
    ],
  },
  marathon: {
    id: 'marathon',
    name: 'Half-Marathon Taper',
    icon: '🏃',
    title: 'HALF MARATHON RACE DAY',
    targetDate: daysFromNow(21),
    milestones: [
      { title: '16 KM LONG RUN', tag: 'D-18', status: 'done' },
      { title: 'TEMPO INTERVALS', tag: 'D-12', status: 'done' },
      { title: 'TAPER WEEK BEGINS', tag: 'D-7', status: 'active' },
      { title: 'GEAR & NUTRITION CHECK', tag: 'D-2', status: 'upcoming' },
    ],
  },
};

export function getPreset(id) {
  return PRESETS[id] || PRESETS.hackathon;
}
