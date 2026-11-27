// Figures for the Nippon Stat Atlas. Every series carries its source and
// reference year; values are the published figures as of late 2025 / early
// 2026, rounded for display. Sources: Statistics Bureau of Japan, Cabinet
// Office, Bank of Japan, Ministry of Health, Labour and Welfare.

export const SOURCES = {
  population: 'Statistics Bureau of Japan, Population Estimates (1 Oct 2025)',
  census: 'Statistics Bureau of Japan, Population Census 2020',
  gdp: 'Cabinet Office, National Accounts (2024 annual, 2nd preliminary)',
  labour: 'Statistics Bureau of Japan, Labour Force Survey (2025 average)',
  cpi: 'Statistics Bureau of Japan, Consumer Price Index (2025 average)',
  trade: 'Ministry of Finance, Trade Statistics of Japan (2024)',
  prefectures: 'Statistics Bureau of Japan, Population Estimates 2024; Cabinet Office, Prefectural Accounts 2022',
  wages: 'Ministry of Health, Labour and Welfare, Monthly Labour Survey (2025)',
};

// Headline indicators, one value per year. GDP is nominal, trillion yen.
export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

export const SERIES = {
  population: { label: 'Total population', unit: 'million', values: [126.17, 125.71, 125.50, 124.95, 124.35, 123.97, 123.72], source: SOURCES.population },
  gdp: { label: 'Nominal GDP', unit: '¥ trillion', values: [557.9, 539.1, 553.5, 560.9, 592.8, 609.3, 620.4], source: SOURCES.gdp },
  gdpGrowth: { label: 'Real GDP growth', unit: '%', values: [-0.4, -4.1, 2.6, 0.9, 1.7, -0.1, 1.0], source: SOURCES.gdp },
  unemployment: { label: 'Unemployment rate', unit: '%', values: [2.4, 2.8, 2.8, 2.6, 2.6, 2.5, 2.5], source: SOURCES.labour },
  cpi: { label: 'Consumer prices (CPI, all items)', unit: '% y/y', values: [0.5, 0.0, -0.2, 2.5, 3.3, 2.7, 3.2], source: SOURCES.cpi },
  cpiCore: { label: 'CPI excl. fresh food and energy', unit: '% y/y', values: [0.6, 0.2, -0.5, 1.0, 3.8, 2.3, 3.0], source: SOURCES.cpi },
  labourForce: { label: 'Labour force', unit: 'million', values: [68.9, 68.7, 68.8, 69.0, 69.1, 69.2, 69.3], source: SOURCES.labour },
  exports: { label: 'Exports', unit: '¥ trillion', values: [76.9, 68.4, 83.1, 98.2, 100.9, 107.9, 109.6], source: SOURCES.trade },
  imports: { label: 'Imports', unit: '¥ trillion', values: [78.6, 68.0, 84.8, 118.2, 110.2, 112.6, 113.1], source: SOURCES.trade },
};

// Age structure, 1 Oct 2025 (millions).
export const AGE_GROUPS = [
  { group: '0–14', value: 13.9, note: 'Children' },
  { group: '15–24', value: 11.4, note: 'Youth' },
  { group: '25–34', value: 13.2, note: 'Young adults' },
  { group: '35–44', value: 15.9, note: 'Adults' },
  { group: '45–54', value: 17.6, note: 'Middle-aged' },
  { group: '55–64', value: 15.7, note: 'Pre-retirement' },
  { group: '65–74', value: 16.6, note: 'Early elderly' },
  { group: '75+', value: 19.4, note: 'Late elderly' },
];

export const DEMOGRAPHICS_2025 = {
  total: 123.72,
  under15: 13.9,
  workingAge: 73.8,
  over65: 36.0,
  over65Share: 29.1,
  medianAge: 49.5,
  fertilityRate: 1.15,
  fertilityYear: 2024,
  lifeExpectancy: 84.0,
  births2024: 720988,
  deaths2024: 1605298,
};

// GDP by expenditure, share of nominal GDP, 2024 (%).
export const GDP_SHARES = [
  { component: 'Household consumption', share: 54.6 },
  { component: 'Private investment', share: 16.8 },
  { component: 'Government consumption', share: 20.8 },
  { component: 'Public investment', share: 5.4 },
  { component: 'Net exports', share: -1.2 },
  { component: 'Other / inventories', share: 3.6 },
];

// Exports by destination, share of total exports, 2024 (%).
export const EXPORT_PARTNERS = [
  { partner: 'United States', share: 19.6 },
  { partner: 'China', share: 17.5 },
  { partner: 'South Korea', share: 7.0 },
  { partner: 'Taiwan', share: 6.1 },
  { partner: 'Hong Kong', share: 4.7 },
  { partner: 'Thailand', share: 3.9 },
  { partner: 'Other', share: 41.2 },
];

// Monthly wages: average cash earnings, yen per month.
export const WAGES = [
  { year: 2019, wage: 322689 },
  { year: 2020, wage: 318751 },
  { year: 2021, wage: 319461 },
  { year: 2022, wage: 326157 },
  { year: 2023, wage: 329859 },
  { year: 2024, wage: 339831 },
  { year: 2025, wage: 347900 },
];

// All 47 prefectures. Population: thousands, 1 Oct 2024.
// change: population change on the previous year, %.
// gdpPc: GDP per capita, million yen, 2022 (Cabinet Office prefectural accounts).
// unemp: unemployment rate, %, 2024 (model-based estimate).
export const PREFECTURES = [
  { name: 'Hokkaido', region: 'Hokkaido', pop: 5140, change: -0.7, gdpPc: 3.7, unemp: 2.9 },
  { name: 'Aomori', region: 'Tohoku', pop: 1208, change: -1.2, gdpPc: 3.3, unemp: 2.7 },
  { name: 'Iwate', region: 'Tohoku', pop: 1173, change: -1.1, gdpPc: 3.6, unemp: 2.4 },
  { name: 'Miyagi', region: 'Tohoku', pop: 2268, change: -0.7, gdpPc: 4.2, unemp: 2.6 },
  { name: 'Akita', region: 'Tohoku', pop: 909, change: -1.4, gdpPc: 3.2, unemp: 2.5 },
  { name: 'Yamagata', region: 'Tohoku', pop: 1038, change: -1.1, gdpPc: 3.5, unemp: 2.2 },
  { name: 'Fukushima', region: 'Tohoku', pop: 1764, change: -1.0, gdpPc: 3.8, unemp: 2.6 },
  { name: 'Ibaraki', region: 'Kanto', pop: 2867, change: -0.4, gdpPc: 4.3, unemp: 2.4 },
  { name: 'Tochigi', region: 'Kanto', pop: 1908, change: -0.6, gdpPc: 4.4, unemp: 2.3 },
  { name: 'Gunma', region: 'Kanto', pop: 1910, change: -0.6, gdpPc: 4.4, unemp: 2.4 },
  { name: 'Saitama', region: 'Kanto', pop: 7345, change: -0.1, gdpPc: 3.7, unemp: 2.6 },
  { name: 'Chiba', region: 'Kanto', pop: 6296, change: -0.1, gdpPc: 4.0, unemp: 2.5 },
  { name: 'Tokyo', region: 'Kanto', pop: 14183, change: 0.3, gdpPc: 8.5, unemp: 2.7 },
  { name: 'Kanagawa', region: 'Kanto', pop: 9249, change: 0.0, gdpPc: 4.0, unemp: 2.7 },
  { name: 'Niigata', region: 'Chubu', pop: 2155, change: -1.0, gdpPc: 3.8, unemp: 2.3 },
  { name: 'Toyama', region: 'Chubu', pop: 1007, change: -0.9, gdpPc: 4.6, unemp: 2.2 },
  { name: 'Ishikawa', region: 'Chubu', pop: 1115, change: -0.9, gdpPc: 4.2, unemp: 2.4 },
  { name: 'Fukui', region: 'Chubu', pop: 750, change: -0.8, gdpPc: 4.4, unemp: 2.1 },
  { name: 'Yamanashi', region: 'Chubu', pop: 800, change: -0.8, gdpPc: 3.9, unemp: 2.4 },
  { name: 'Nagano', region: 'Chubu', pop: 2012, change: -0.8, gdpPc: 3.9, unemp: 2.3 },
  { name: 'Gifu', region: 'Chubu', pop: 1929, change: -0.7, gdpPc: 4.0, unemp: 2.2 },
  { name: 'Shizuoka', region: 'Chubu', pop: 3547, change: -0.7, gdpPc: 4.7, unemp: 2.4 },
  { name: 'Aichi', region: 'Chubu', pop: 7477, change: -0.2, gdpPc: 5.5, unemp: 2.4 },
  { name: 'Mie', region: 'Kinki', pop: 1726, change: -0.7, gdpPc: 4.3, unemp: 2.3 },
  { name: 'Shiga', region: 'Kinki', pop: 1412, change: -0.3, gdpPc: 4.6, unemp: 2.4 },
  { name: 'Kyoto', region: 'Kinki', pop: 2555, change: -0.5, gdpPc: 4.2, unemp: 2.7 },
  { name: 'Osaka', region: 'Kinki', pop: 8837, change: -0.2, gdpPc: 4.6, unemp: 3.0 },
  { name: 'Hyogo', region: 'Kinki', pop: 5383, change: -0.4, gdpPc: 4.1, unemp: 2.6 },
  { name: 'Nara', region: 'Kinki', pop: 1312, change: -0.6, gdpPc: 3.4, unemp: 2.5 },
  { name: 'Wakayama', region: 'Kinki', pop: 890, change: -1.0, gdpPc: 3.5, unemp: 2.6 },
  { name: 'Tottori', region: 'Chugoku', pop: 540, change: -1.0, gdpPc: 3.5, unemp: 2.3 },
  { name: 'Shimane', region: 'Chugoku', pop: 649, change: -1.0, gdpPc: 3.6, unemp: 2.2 },
  { name: 'Okayama', region: 'Chugoku', pop: 1865, change: -0.6, gdpPc: 4.0, unemp: 2.4 },
  { name: 'Hiroshima', region: 'Chugoku', pop: 2760, change: -0.6, gdpPc: 4.3, unemp: 2.5 },
  { name: 'Yamaguchi', region: 'Chugoku', pop: 1290, change: -1.0, gdpPc: 4.4, unemp: 2.4 },
  { name: 'Tokushima', region: 'Shikoku', pop: 695, change: -1.1, gdpPc: 3.9, unemp: 2.4 },
  { name: 'Kagawa', region: 'Shikoku', pop: 927, change: -0.8, gdpPc: 4.0, unemp: 2.3 },
  { name: 'Ehime', region: 'Shikoku', pop: 1286, change: -0.9, gdpPc: 3.7, unemp: 2.4 },
  { name: 'Kochi', region: 'Shikoku', pop: 673, change: -1.1, gdpPc: 3.4, unemp: 2.6 },
  { name: 'Fukuoka', region: 'Kyushu', pop: 5118, change: -0.2, gdpPc: 4.0, unemp: 2.8 },
  { name: 'Saga', region: 'Kyushu', pop: 799, change: -0.8, gdpPc: 3.6, unemp: 2.3 },
  { name: 'Nagasaki', region: 'Kyushu', pop: 1267, change: -1.0, gdpPc: 3.4, unemp: 2.5 },
  { name: 'Kumamoto', region: 'Kyushu', pop: 1714, change: -0.7, gdpPc: 3.7, unemp: 2.5 },
  { name: 'Oita', region: 'Kyushu', pop: 1098, change: -0.9, gdpPc: 3.9, unemp: 2.4 },
  { name: 'Miyazaki', region: 'Kyushu', pop: 1046, change: -0.9, gdpPc: 3.4, unemp: 2.5 },
  { name: 'Kagoshima', region: 'Kyushu', pop: 1580, change: -0.9, gdpPc: 3.4, unemp: 2.6 },
  { name: 'Okinawa', region: 'Kyushu', pop: 1468, change: 0.0, gdpPc: 3.0, unemp: 3.2 },
];

export const REGIONS = ['All regions', 'Hokkaido', 'Tohoku', 'Kanto', 'Chubu', 'Kinki', 'Chugoku', 'Shikoku', 'Kyushu'];

export function valueInYear(seriesKey, year) {
  const series = SERIES[seriesKey];
  const i = YEARS.indexOf(year);
  return i === -1 ? null : series.values[i];
}

export function latest(seriesKey) {
  const series = SERIES[seriesKey];
  return series.values[series.values.length - 1];
}
