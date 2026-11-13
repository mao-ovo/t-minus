// Encode app state to URL query params
export function encodeStateToUrl(state) {
  const params = new URLSearchParams();
  params.set('title', state.title);
  params.set('target', state.targetDate);
  params.set('theme', state.themeId);
  state.milestones.forEach((m, i) => {
    params.set(`m${i}t`, m.title);
    params.set(`m${i}tag`, m.tag);
    params.set(`m${i}s`, m.status);
  });
  const url = new URL(window.location.href);
  url.search = params.toString();
  return url.toString();
}

// Decode URL query params to app state (returns null if no params)
export function decodeStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('title')) return null;

  const milestones = [];
  for (let i = 0; i < 4; i++) {
    const title = params.get(`m${i}t`);
    const tag = params.get(`m${i}tag`);
    const status = params.get(`m${i}s`);
    if (title && tag && status) {
      milestones.push({ title, tag, status });
    }
  }

  if (milestones.length !== 4) return null;

  return {
    title: params.get('title'),
    targetDate: params.get('target'),
    themeId: params.get('theme') || 'obsidian',
    milestones,
  };
}
