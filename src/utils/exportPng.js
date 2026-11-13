import { toPng } from 'html-to-image';

export async function exportWallpaperPng(element, filename = 't-minus-lockscreen.png') {
  if (!element) return;

  try {
    const dataUrl = await toPng(element, {
      width: 1170,
      height: 2532,
      pixelRatio: 1,
      quality: 1.0,
      cacheBust: true,
      style: {
        transform: 'none',
        width: '1170px',
        height: '2532px',
      },
      fontEmbedCSS: '',
      filter: (node) => {
        // Exclude the phone chrome overlay
        if (node?.dataset?.exportHide === 'true') return false;
        return true;
      },
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.error('Export failed:', err);
    return false;
  }
}
