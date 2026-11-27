// Shared behaviour for the Nippon Stat Atlas pages: the year selector on
// the overview, the tab switchers, and the sortable, filterable prefecture
// table. Every control here actually changes what the page shows.
import { YEARS, SERIES, PREFECTURES, REGIONS, valueInYear, latest } from './data.js';

function fmt(value, decimals = 1) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function pctChange(seriesKey, year) {
  const now = valueInYear(seriesKey, year);
  const prev = valueInYear(seriesKey, year - 1);
  if (now === null || prev === null || prev === 0) return null;
  return ((now - prev) / Math.abs(prev)) * 100;
}

// ---- Overview: year selector updates the four KPI cards ----
function initYearSelector() {
  const select = document.querySelector('#year-select');
  if (!select) return;
  for (const y of YEARS) {
    const option = document.createElement('option');
    option.value = String(y);
    option.textContent = String(y);
    select.appendChild(option);
  }
  select.value = String(YEARS[YEARS.length - 1]);
  const update = () => {
    const year = Number(select.value);
    const cards = document.querySelectorAll('[data-kpi]');
    for (const card of cards) {
      const key = card.dataset.kpi;
      const value = valueInYear(key, year);
      const valueEl = card.querySelector('.value');
      const deltaEl = card.querySelector('.delta');
      if (value === null || !valueEl) continue;
      const unit = SERIES[key].unit;
      valueEl.innerHTML = `${fmt(value, key === 'population' || key === 'gdp' ? 1 : 1)} <small>${unit}</small>`;
      if (deltaEl) {
        const change = pctChange(key, year);
        if (change === null) {
          deltaEl.textContent = 'First year in series';
          deltaEl.className = 'delta flat';
        } else if (key === 'unemployment' || key === 'cpi') {
          // Rates read better as a change in percentage points, not as a
          // percent of the previous rate (a 2.7% → 3.2% rise is +0.5 pts,
          // not +18.5%).
          const now = valueInYear(key, year);
          const prev = valueInYear(key, year - 1);
          const pts = now - prev;
          const sign = pts > 0 ? '+' : '';
          const good = key === 'unemployment' ? pts < 0 : pts > 0;
          deltaEl.textContent = `${sign}${pts.toFixed(1)} pts on ${year - 1}`;
          deltaEl.className = `delta ${pts === 0 ? 'flat' : good ? 'up' : 'down'}`;
        } else {
          const sign = change > 0 ? '+' : '';
          const good = key === 'unemployment' ? change < 0 : change > 0;
          deltaEl.textContent = `${sign}${change.toFixed(1)}% on ${year - 1}`;
          deltaEl.className = `delta ${change === 0 ? 'flat' : good ? 'up' : 'down'}`;
        }
      }
    }
    const note = document.querySelector('#year-note');
    if (note) note.textContent = `Showing ${year} — the latest published year is ${YEARS[YEARS.length - 1]}. 2025 values are the most recent estimates.`;
  };
  select.addEventListener('change', update);
  update();
}

// ---- Tabs: switch the visible panel and redraw its chart ----
function initTabs() {
  const groups = document.querySelectorAll('[data-tabs]');
  for (const group of groups) {
    const buttons = group.querySelectorAll('button[data-panel]');
    const panels = group.querySelectorAll('[data-panel-body]');
    const show = (name) => {
      for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.panel === name));
      for (const panel of panels) panel.hidden = panel.dataset.panelBody !== name;
      const active = group.querySelector(`[data-panel-body="${name}"]`);
      if (active) active.dispatchEvent(new CustomEvent('panel-shown', { bubbles: true }));
    };
    for (const button of buttons) button.addEventListener('click', () => show(button.dataset.panel));
    show(buttons[0]?.dataset.panel ?? '');
  }
}

// ---- Prefecture table: sort, region filter, text search ----
function initPrefectureTable() {
  const table = document.querySelector('#pref-table');
  if (!table) return;
  const body = table.querySelector('tbody');
  const search = document.querySelector('#pref-search');
  const regionSelect = document.querySelector('#region-select');
  const count = document.querySelector('#pref-count');
  for (const region of REGIONS) {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  }
  let sortKey = 'pop';
  let sortDir = -1; // largest first

  const columns = [
    { key: 'name', label: 'Prefecture', numeric: false },
    { key: 'region', label: 'Region', numeric: false },
    { key: 'pop', label: 'Population (thousands)', numeric: true },
    { key: 'change', label: 'Change on 2024 (%)', numeric: true },
    { key: 'gdpPc', label: 'GDP per capita (¥m)', numeric: true },
    { key: 'unemp', label: 'Unemployment (%)', numeric: true },
  ];

  function renderRows(rows) {
    body.textContent = '';
    for (const row of rows) {
      const tr = document.createElement('tr');
      const cells = [
        row.name,
        row.region,
        row.pop.toLocaleString('en-US'),
        `${row.change > 0 ? '+' : ''}${row.change.toFixed(1)}`,
        row.gdpPc.toFixed(1),
        row.unemp.toFixed(1),
      ];
      cells.forEach((text, i) => {
        const td = document.createElement('td');
        td.textContent = text;
        if (i === 3) td.className = row.change < 0 ? 'num-neg' : 'num-pos';
        tr.appendChild(td);
      });
      body.appendChild(tr);
    }
    if (count) count.textContent = `${rows.length} of 47 prefectures shown`;
  }

  function currentRows() {
    const query = (search?.value ?? '').trim().toLowerCase();
    const region = regionSelect?.value ?? 'All regions';
    let rows = PREFECTURES.filter((p) => (region === 'All regions' || p.region === region)
      && (!query || p.name.toLowerCase().includes(query)));
    const column = columns.find((c) => c.key === sortKey);
    rows = [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return cmp * sortDir;
    });
    return rows;
  }

  function refresh() { renderRows(currentRows()); }

  const head = table.querySelector('thead tr');
  columns.forEach((column) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.dataset.key = column.key;
    th.textContent = column.label + (column.key === sortKey ? ' ▼' : '');
    th.addEventListener('click', () => {
      if (sortKey === column.key) sortDir *= -1;
      else { sortKey = column.key; sortDir = column.numeric ? -1 : 1; }
      for (const other of head.querySelectorAll('th')) {
        const key = other.dataset.key;
        const label = columns.find((c) => c.key === key).label;
        other.textContent = label + (key === sortKey ? (sortDir === 1 ? ' ▲' : ' ▼') : '');
      }
      refresh();
    });
    head.appendChild(th);
  });

  search?.addEventListener('input', refresh);
  regionSelect?.addEventListener('change', refresh);
  refresh();
}

// ---- Footer year ----
function initFooter() {
  const year = document.querySelector('#footer-year');
  if (year) year.textContent = String(new Date().getFullYear());
}

initYearSelector();
initTabs();
initPrefectureTable();
initFooter();

export { fmt, latest };
