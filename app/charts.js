// Canvas chart helpers for the Nippon Stat Atlas. Every chart is drawn in
// code from the figures in data.js; nothing is fetched and nothing is an
// image. All charts resize to their canvas element and redraw on demand.

const INK = '#1d2a44';
const MUTED = '#5d6b82';
const GRID = '#e3e8f0';
const ACCENT = '#c0392b';
const BLUE = '#1f5fa8';
const TEAL = '#0f766e';
const AMBER = '#b45309';
const PALETTE = [BLUE, ACCENT, TEAL, AMBER, '#6d28d9', '#0e7490', '#4d7c0f', '#be185d'];

function setupCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.max(1, Math.round(width * ratio));
  canvas.height = Math.max(1, Math.round(height * ratio));
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height };
}

function niceTicks(min, max, count = 4) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
  const stepNice = nice * mag;
  const start = Math.ceil(min / stepNice) * stepNice;
  const ticks = [];
  for (let v = start; v <= max + 1e-9; v += stepNice) ticks.push(v);
  return { ticks, lo: Math.min(min, ticks[0] ?? min), hi: Math.max(max, ticks[ticks.length - 1] ?? max) };
}

function formatTick(v) {
  if (Math.abs(v) >= 1000) return v.toLocaleString('en-US');
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// Draw a line chart. seriesList: [{label, values, color}]. labels: x labels.
export function drawLineChart(canvas, labels, seriesList, opts = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { l: 52, r: 14, t: 14, b: 30 };
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const all = seriesList.flatMap((s) => s.values);
  let min = Math.min(...all);
  let max = Math.max(...all);
  if (opts.zeroBaseline) min = Math.min(0, min);
  const padY = (max - min) * 0.08 || 1;
  const { ticks, lo, hi } = niceTicks(min - padY, max + padY);
  const y = (v) => pad.t + plotH - ((v - lo) / (hi - lo)) * plotH;
  const x = (i) => pad.l + (labels.length === 1 ? plotW / 2 : (i / (labels.length - 1)) * plotW);

  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  for (const t of ticks) {
    ctx.beginPath();
    ctx.moveTo(pad.l, y(t));
    ctx.lineTo(width - pad.r, y(t));
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatTick(t), pad.l - 8, y(t));
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((label, i) => {
    ctx.fillText(String(label), x(i), height - pad.b + 8);
  });
  if (opts.unit) {
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = MUTED;
    ctx.fillText(opts.unit, pad.l, 2);
  }

  seriesList.forEach((series) => {
    ctx.strokeStyle = series.color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    series.values.forEach((v, i) => {
      if (i === 0) ctx.moveTo(x(i), y(v));
      else ctx.lineTo(x(i), y(v));
    });
    ctx.stroke();
    ctx.fillStyle = series.color;
    series.values.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(x(i), y(v), 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}

// Draw a vertical bar chart. items: [{label, value}].
export function drawBarChart(canvas, items, opts = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { l: 52, r: 14, t: 14, b: 30 };
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const values = items.map((d) => d.value);
  let min = Math.min(0, ...values);
  let max = Math.max(...values);
  const padY = (max - min) * 0.08 || 1;
  const { ticks, lo, hi } = niceTicks(min - padY, max + padY);
  const y = (v) => pad.t + plotH - ((v - lo) / (hi - lo)) * plotH;
  const slot = plotW / items.length;
  const barW = Math.min(56, slot * 0.62);

  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  for (const t of ticks) {
    ctx.beginPath();
    ctx.moveTo(pad.l, y(t));
    ctx.lineTo(width - pad.r, y(t));
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatTick(t), pad.l - 8, y(t));
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  items.forEach((d, i) => {
    const cx = pad.l + slot * (i + 0.5);
    const top = y(Math.max(0, d.value));
    const bottom = y(Math.min(0, d.value));
    ctx.fillStyle = d.color || PALETTE[i % PALETTE.length];
    ctx.fillRect(cx - barW / 2, top, barW, Math.max(1, bottom - top));
    ctx.fillStyle = INK;
    ctx.textBaseline = 'bottom';
    ctx.fillText(formatTick(d.value), cx, top - 4);
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(d.label, cx, height - pad.b + 8);
  });
  if (opts.unit) {
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = MUTED;
    ctx.fillText(opts.unit, pad.l, 2);
  }
}

// Draw a horizontal bar list (best for named categories).
export function drawHBarChart(canvas, items, opts = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { l: 150, r: 52, t: 8, b: 8 };
  const plotW = width - pad.l - pad.r;
  const max = Math.max(...items.map((d) => d.value));
  const rowH = (height - pad.t - pad.b) / items.length;
  const barH = Math.min(22, rowH * 0.55);
  ctx.font = '12px system-ui, sans-serif';
  items.forEach((d, i) => {
    const cy = pad.t + rowH * (i + 0.5);
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(d.label, pad.l - 10, cy);
    const w = (d.value / max) * plotW;
    ctx.fillStyle = d.color || PALETTE[i % PALETTE.length];
    ctx.fillRect(pad.l, cy - barH / 2, Math.max(2, w), barH);
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.fillText(formatTick(d.value) + (opts.suffix || ''), pad.l + w + 8, cy);
  });
}

// Draw a donut chart with a centre label.
export function drawDonut(canvas, items, centreText) {
  const { ctx, width, height } = setupCanvas(canvas);
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 14;
  const inner = radius * 0.62;
  const total = items.reduce((sum, d) => sum + d.value, 0);
  let angle = -Math.PI / 2;
  items.forEach((d, i) => {
    const sweep = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = d.color || PALETTE[i % PALETTE.length];
    ctx.fill();
    angle += sweep;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText(centreText, cx, cy - 8);
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('million people', cx, cy + 12);
}

export const CHART_COLORS = { INK, MUTED, ACCENT, BLUE, TEAL, AMBER, PALETTE };
