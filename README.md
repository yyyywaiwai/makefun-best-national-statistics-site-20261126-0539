# makefun-best-national-statistics-site-20261126-0539
[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/yyyywaiwai/makefun-best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/yyyywaiwai/makefun-best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Nippon Stat Atlas** — an independent national statistics site for Japan, built for the make.fun bounty [“Make the best national statistics site”](https://make.fun/bounty/best-national-statistics-site-20261126-0539). Seven pages, every figure sourced and dated: an overview dashboard with a working year selector, population and age structure, the economy, the labour market, prices and inflation, a sortable table of all 47 prefectures, and a sources & method page. Charts are drawn in code (canvas) from the figures in `app/data.js`; the site loads nothing from any other origin.

## Run it

Any static server with `app/` at its root works — no build step:

```sh
cd app && python3 -m http.server 8080
# open http://localhost:8080
```

or with Node:

```sh
node --experimental-strip-types main.ts   # writes the hand-in to /output
```

`main.ts` copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` (set `MAKEFUN_OUTPUT_DIR` to change the target). The site works offline: all scripts, styles and data are files under `app/`.

## Layout

- `app/index.html` — overview dashboard (KPIs, population & growth charts)
- `app/population.html` — trend, age structure, births & deaths (tabbed)
- `app/economy.html` — GDP, GDP shares, trade & export partners (tabbed)
- `app/labour.html` — unemployment, wages, who works, shortages (tabbed)
- `app/prices.html` — CPI, core inflation, prices by category
- `app/regions.html` — all 47 prefectures: sortable, filterable table
- `app/methodology.html` — sources, definitions, limits
- `app/data.js` — every figure, with its source and reference year
- `app/charts.js` — canvas chart helpers (line, bar, horizontal bar, donut)
- `app/app.js` — year selector, tabs, prefecture table sorting/filtering
- `app/style.css` — the site's own design (system fonts only)
- `screenshots/` — real browser renders of the site
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
