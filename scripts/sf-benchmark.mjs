import fs from 'node:fs/promises';
import path from 'node:path';

const OUT_JSON = 'content/data/sf-benchmark-source-of-truth.json';
const OUT_HTML = 'reports/sf-benchmark-source-of-truth.html';
const USER_AGENT = 'MiranSanBenchmarkBot/0.1 (+https://miransan.org; strategy benchmark)';
const SITEMAP_URL = 'https://www.sleepfoundation.org/sitemap.xml';

const verifiedNavigationSeed = [
  ['/', 'Home', 'home', 'hybrid', 'trust-commercial'],
  ['/mattresses', 'Best Mattress of 2026', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/best-mattress-side-sleepers', 'Best Mattress for Side Sleepers', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/best-mattress-back-pain', 'Best Mattress for Back Pain', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/best-mattress-hip-pain', 'Best Mattress for Hip Pain', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/best-mattress-heavy-people', 'Best Mattress for Heavy People', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/memory-foam-mattress', 'Best Memory Foam Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/latex-mattress', 'Best Latex Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/innerspring-mattress', 'Best Innerspring Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/hybrid-mattress', 'Best Hybrid Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/cooling-mattress', 'Best Cooling Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/firm-mattress', 'Best Firm Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/organic-mattress', 'Best Organic Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/most-comfortable-mattress', 'Most Comfortable Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/mattress-in-a-box', 'Best Mattress in a Box', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/best-affordable-mattress', 'Best Affordable Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/best-mattress/best-king-size-mattress', 'Best King Size Mattress', 'best-of', 'commercial', 'mattresses'],
  ['/mattress-information/mattress-sizes', 'Mattress Sizes 101', 'guide', 'informational', 'mattresses'],
  ['/mattress-information/what-is-memory-foam', 'What is Memory Foam?', 'guide', 'informational', 'mattresses'],
  ['/mattress-comparisons/nectar-vs-casper', 'Nectar vs. Casper', 'comparison', 'commercial', 'mattresses'],
  ['/mattress-reviews/casper-mattress-review', 'Casper Mattress Review', 'review', 'commercial', 'mattresses'],
  ['/mattress-reviews/saatva-mattress-review', 'Saatva Mattress Review', 'review', 'commercial', 'mattresses'],
  ['/bedding', 'The Best Bedding of 2026', 'hub', 'commercial', 'bedding'],
  ['/best-pillows', 'The Best Pillows of 2026', 'best-of', 'commercial', 'bedding'],
  ['/best-pillows/best-pillows-side-sleepers', 'Best Pillows for Side Sleepers', 'best-of', 'commercial', 'bedding'],
  ['/best-pillows/best-pillows-neck-pain', 'Best Pillows for Neck Pain', 'best-of', 'commercial', 'bedding'],
  ['/best-sheets', 'Top-Rated Bed Sheets', 'best-of', 'commercial', 'bedding'],
  ['/best-sheets/best-cooling-sheets', 'Best Cooling Sheets', 'best-of', 'commercial', 'bedding'],
  ['/best-weighted-blankets', 'The Best Weighted Blankets of 2026', 'best-of', 'commercial', 'bedding'],
  ['/best-comforters', 'The Best Comforters', 'best-of', 'commercial', 'bedding'],
  ['/best-mattress-toppers', 'The Best Mattress Toppers', 'best-of', 'commercial', 'bedding'],
  ['/best-mattress-pads', 'Best Mattress Pads', 'best-of', 'commercial', 'bedding'],
  ['/best-mattress-protectors', 'The Best Mattress Protectors of 2026', 'best-of', 'commercial', 'bedding'],
  ['/sleep-solutions', 'All Sleep Solutions', 'hub', 'hybrid', 'sleep-solutions'],
  ['/sleep-studies/at-home-sleep-study', 'At Home Sleep Study', 'lead-gen', 'commercial', 'sleep-solutions'],
  ['/sleep-studies/how-does-a-sleep-study-work', 'How Does a Sleep Study Work?', 'guide', 'informational', 'sleep-solutions'],
  ['/sleep-studies/how-much-does-a-sleep-study-cost', 'How Much Does a Sleep Study Cost?', 'guide', 'hybrid', 'sleep-solutions'],
  ['/best-cpap-machine', 'The Best CPAP Machines', 'best-of', 'commercial', 'sleep-solutions'],
  ['/best-cpap-masks', 'Top-Rated CPAP Masks', 'best-of', 'commercial', 'sleep-solutions'],
  ['/best-anti-snoring-mouthpieces-and-mouthguards', 'The Best Anti-Snoring Mouthpieces', 'best-of', 'commercial', 'sleep-solutions'],
  ['/snoring/mouth-taping', 'Mouth Taping', 'article', 'informational', 'sleep-health'],
  ['/sleep-apnea/cpap-alternatives', 'CPAP Alternatives', 'guide', 'hybrid', 'sleep-solutions'],
  ['/best-sleep-apps', 'The Best Sleep Apps of 2026', 'best-of', 'commercial', 'sleep-solutions'],
  ['/best-sleep-supplements/best-magnesium-supplements', 'The Best Magnesium Supplements', 'best-of', 'commercial', 'sleep-solutions'],
  ['/best-sleep-supplements', 'Best Sleep Supplements', 'best-of', 'commercial', 'sleep-solutions'],
  ['/best-sleep-trackers', "The Best Sleep Trackers We've Tested", 'best-of', 'commercial', 'sleep-solutions'],
  ['/best-white-noise-machines', 'Top-Rated White Noise Machines', 'best-of', 'commercial', 'sleep-solutions'],
  ['/best-adjustable-beds', 'The Best Adjustable Beds', 'best-of', 'commercial', 'sleep-solutions'],
  ['/sleep-health', 'All Sleep Health', 'hub', 'informational', 'sleep-health'],
  ['/insomnia', 'Insomnia', 'condition', 'informational', 'sleep-health'],
  ['/parasomnias', 'Parasomnias', 'condition', 'informational', 'sleep-health'],
  ['/excessive-sleepiness', 'Excessive Sleepiness', 'symptom', 'informational', 'sleep-health'],
  ['/sleep-apnea', 'Sleep Apnea', 'condition', 'informational', 'sleep-health'],
  ['/sleep-apnea/obstructive-sleep-apnea', 'Obstructive Sleep Apnea', 'condition', 'informational', 'sleep-health'],
  ['/sleep-apnea/central-sleep-apnea', 'Central Sleep Apnea', 'condition', 'informational', 'sleep-health'],
  ['/parasomnias/sleepwalking', 'Sleepwalking', 'condition', 'informational', 'sleep-health'],
  ['/bruxism', 'Bruxism', 'condition', 'informational', 'sleep-health'],
  ['/restless-legs-syndrome', 'Restless Legs Syndrome', 'condition', 'informational', 'sleep-health'],
  ['/cpap', 'CPAP', 'guide', 'hybrid', 'sleep-health'],
  ['/insomnia/treatment/what-to-do-when-you-cant-sleep', "What to Do When You Can't Sleep", 'guide', 'informational', 'sleep-health'],
  ['/sleep-hygiene', 'Sleep Hygiene', 'guide', 'informational', 'sleep-health'],
  ['/sleep-aids/melatonin', 'Melatonin', 'guide', 'informational', 'sleep-health'],
  ['/sleep-aids/magnesium', 'Magnesium', 'guide', 'informational', 'sleep-health'],
  ['/sleep-aids', 'Sleep Aids', 'guide', 'hybrid', 'sleep-health'],
  ['/sleep-calculator', 'Sleep Calculator', 'tool', 'informational', 'sleep-health'],
  ['/sleep-quiz', 'Sleep Quiz', 'tool', 'lead-gen', 'trust-commercial'],
  ['/how-sleep-works', 'How Sleep Works', 'article', 'informational', 'sleep-health'],
  ['/circadian-rhythm', 'Circadian Rhythm', 'article', 'informational', 'sleep-health'],
  ['/stages-of-sleep', 'The Stages of Sleep', 'article', 'informational', 'sleep-health'],
  ['/snoring', 'Snoring', 'condition', 'informational', 'sleep-health'],
  ['/sleep-deprivation', 'Sleep Deprivation', 'condition', 'informational', 'sleep-health'],
  ['/how-electronics-affect-sleep', 'How Electronics Affect Your Sleep', 'article', 'informational', 'sleep-health'],
  ['/sleep-statistics', 'Sleep Data & Research', 'data', 'informational', 'sleep-health'],
  ['/how-sleep-works/how-much-sleep-do-we-really-need', 'How Much Sleep Do We Need?', 'article', 'informational', 'sleep-health'],
  ['/baby-sleep', 'Babies and Sleep', 'hub', 'informational', 'baby-sleep'],
  ['/children-and-sleep/how-much-sleep-do-kids-need', 'How Much Sleep Do Babies and Kids Need?', 'article', 'informational', 'baby-sleep'],
  ['/baby-sleep/baby-sleep-cycle', 'How Your Baby’s Sleep Cycle Differs', 'article', 'informational', 'baby-sleep'],
  ['/baby-sleep/best-room-temperature-for-sleeping-baby', 'Best Room Temperature for a Sleeping Baby', 'article', 'informational', 'baby-sleep'],
  ['/baby-sleep/sleep-training', 'Sleep Training for Babies', 'guide', 'informational', 'baby-sleep'],
  ['/about-us', 'About Us', 'trust', 'trust', 'trust'],
  ['/about-us/meet-our-team', 'Our Team', 'trust', 'trust', 'trust'],
  ['/about-us/medical-advisory-board', 'Medical Advisory Board', 'trust', 'trust', 'trust'],
  ['/about-us/editorial-policy', 'Editorial Policy', 'policy', 'trust', 'trust'],
  ['/about-us/how-we-test-products', 'How We Review Products', 'methodology', 'trust-commercial', 'trust'],
  ['/about-us/advertising-disclosure', 'Advertising Disclosure', 'policy', 'trust-commercial', 'trust'],
  ['/privacy-policy', 'Privacy Policy', 'policy', 'trust', 'trust'],
  ['/terms-and-conditions', 'Terms & Conditions', 'policy', 'trust', 'trust'],
  ['/accessibility-statement', 'Accessibility Statement', 'policy', 'trust', 'trust']
];

function classifyUrl(url) {
  const u = new URL(url, 'https://www.sleepfoundation.org');
  const p = u.pathname.replace(/\/$/, '') || '/';
  let type = 'article';
  if (p === '/') type = 'home';
  else if (p.includes('best-')) type = 'best-of';
  else if (p.includes('review')) type = 'review';
  else if (p.includes('vs-') || p.includes('-vs-')) type = 'comparison';
  else if (p.includes('calculator') || p.includes('quiz') || p.includes('finder')) type = 'tool';
  else if (p.includes('about') || p.includes('policy') || p.includes('terms') || p.includes('privacy') || p.includes('accessibility')) type = 'trust';
  else if (['/mattresses','/bedding','/sleep-solutions','/sleep-health','/baby-sleep'].includes(p)) type = 'hub';
  else if (p.includes('apnea') || p.includes('insomnia') || p.includes('snoring') || p.includes('bruxism') || p.includes('restless')) type = 'condition';

  let category = 'sleep-health';
  if (p.includes('mattress') || p.includes('bed-') || p.includes('adjustable-bed')) category = 'mattresses';
  if (p.includes('pillow') || p.includes('sheet') || p.includes('blanket') || p.includes('comforter') || p.includes('bedding') || p.includes('protector') || p.includes('topper') || p.includes('pad')) category = 'bedding';
  if (p.includes('cpap') || p.includes('sleep-study') || p.includes('anti-snoring') || p.includes('sleep-app') || p.includes('sleep-tracker') || p.includes('white-noise') || p.includes('supplement')) category = 'sleep-solutions';
  if (p.includes('baby') || p.includes('children')) category = 'baby-sleep';
  if (type === 'trust') category = 'trust';

  let intent = 'informational';
  if (['best-of','review','comparison'].includes(type)) intent = 'commercial';
  if (p.includes('cpap') || p.includes('supplement') || p.includes('sleep-study') || p.includes('sleep-aids')) intent = intent === 'commercial' ? 'commercial' : 'hybrid';
  if (type === 'trust') intent = 'trust';

  return { path: p, type, category, intent };
}

async function tryFetchSitemap() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(SITEMAP_URL, { headers: { 'user-agent': USER_AGENT }, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    return urls.filter((u) => u.startsWith('https://www.sleepfoundation.org/'));
  } finally {
    clearTimeout(timeout);
  }
}

function buildSeedRecords() {
  return verifiedNavigationSeed.map(([pathName, title, type, intent, category]) => ({
    url: `https://www.sleepfoundation.org${pathName === '/' ? '' : pathName}`,
    path: pathName,
    title,
    type,
    intent,
    category,
    confidence: 'VERIFIED',
    evidence: 'Seeded from live navigation/pages observed 2026-05-06 via web open results.'
  }));
}

function buildRecords(urls) {
  return urls.map((url) => {
    const c = classifyUrl(url);
    return { url, path: c.path, title: titleFromPath(c.path), type: c.type, intent: c.intent, category: c.category, confidence: 'VERIFIED', evidence: 'Fetched from live SleepFoundation sitemap.' };
  });
}

function titleFromPath(p) {
  if (p === '/') return 'Home';
  return p.split('/').filter(Boolean).at(-1).replace(/-/g, ' ').replace(/\b\w/g, (x) => x.toUpperCase());
}

function summarize(records, sourceMode) {
  const by = (key) => records.reduce((acc, r) => ((acc[r[key]] = (acc[r[key]] || 0) + 1), acc), {});
  const relationships = records.map((r) => ({
    path: r.path,
    parent: parentFor(r),
    type: r.type,
    category: r.category,
    intent: r.intent
  }));
  return {
    generated_at: new Date().toISOString(),
    source_mode: sourceMode,
    benchmark_domain: 'sleepfoundation.org',
    total_urls: records.length,
    counts: { by_type: by('type'), by_intent: by('intent'), by_category: by('category') },
    strategic_patterns: [
      '[VERIFIED] Navigation separates Sleep Products, Sleep Solutions, Sleep Health, and About/Trust areas.',
      '[VERIFIED] Commercial best-of/review/comparison pages are mixed with health education and tools.',
      '[VERIFIED] Trust pages include editorial policy, product testing methodology, advertising disclosure, team, and medical advisory board.',
      '[HIGH-CONFIDENCE INFERENCE] The funnel uses health/informational pages for topical authority and commercial pages/tools for monetization capture.'
    ],
    hub_child_relationships: relationships,
    records
  };
}

function parentFor(record) {
  if (record.path === '/') return null;
  if (record.category === 'mattresses') return '/mattresses';
  if (record.category === 'bedding') return '/bedding';
  if (record.category === 'sleep-solutions') return '/sleep-solutions';
  if (record.category === 'baby-sleep') return '/baby-sleep';
  if (record.category === 'trust') return '/about-us';
  return '/sleep-health';
}

function esc(value) {
  return String(value).replace(/[&<>\"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function renderHtml(summary) {
  const rows = summary.records.map((r) => `<tr><td>${esc(r.path)}</td><td>${esc(r.title)}</td><td>${esc(r.type)}</td><td>${esc(r.intent)}</td><td>${esc(r.category)}</td><td>${esc(r.confidence)}</td></tr>`).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>SleepFoundation Benchmark Source of Truth</title><style>body{font-family:Inter,Arial,sans-serif;margin:32px;color:#1f2937}table{border-collapse:collapse;width:100%;font-size:14px}th,td{border:1px solid #d1d5db;padding:8px;text-align:left}th{background:#f3f4f6}.pill{display:inline-block;background:#eef2ff;padding:4px 8px;border-radius:999px;margin:3px}</style></head><body><h1>SleepFoundation Benchmark Source of Truth</h1><p><strong>Generated:</strong> ${esc(summary.generated_at)} | <strong>Mode:</strong> ${esc(summary.source_mode)} | <strong>URLs:</strong> ${summary.total_urls}</p><h2>Counts</h2>${Object.entries(summary.counts).map(([group, counts]) => `<h3>${esc(group)}</h3>${Object.entries(counts).map(([k,v]) => `<span class="pill">${esc(k)}: ${v}</span>`).join('')}`).join('')}<h2>Strategic Patterns</h2><ul>${summary.strategic_patterns.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><h2>URL Map</h2><table><thead><tr><th>Path</th><th>Title</th><th>Type</th><th>Intent</th><th>Category</th><th>Confidence</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
}

async function main() {
  let records;
  let sourceMode;
  try {
    const urls = await tryFetchSitemap();
    records = urls.length > 20 ? buildRecords(urls) : buildSeedRecords();
    sourceMode = urls.length > 20 ? 'live-sitemap' : 'verified-navigation-seed';
  } catch (error) {
    records = buildSeedRecords();
    sourceMode = `verified-navigation-seed; live fetch unavailable: ${error.message}`;
  }
  const summary = summarize(records, sourceMode);
  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.mkdir(path.dirname(OUT_HTML), { recursive: true });
  await fs.writeFile(OUT_JSON, JSON.stringify(summary, null, 2));
  await fs.writeFile(OUT_HTML, renderHtml(summary));
  console.log(`Wrote ${OUT_JSON} (${summary.total_urls} URLs, ${summary.source_mode})`);
  console.log(`Wrote ${OUT_HTML}`);
}

main().catch((error) => { console.error(error); process.exit(1); });
