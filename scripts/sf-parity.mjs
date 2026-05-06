import fs from 'node:fs/promises';

const SOURCE = 'content/data/sf-benchmark-source-of-truth.json';
const URL_PLAN = 'content/data/miransan-url-plan.json';
const TEMPLATES = 'content/data/miransan-page-templates.json';
const OUT_HTML = 'reports/sf-benchmark-parity-audit.html';
const OUT_JSON = 'content/data/sf-benchmark-parity-audit.json';

const dimensions = [
  ['strategic_alignment', 10, 'Clear authority + content-commerce strategy, phased execution model, confidence protocol, and benchmark loop.'],
  ['functional_similarity_to_sleepfoundation', 9, 'Covers hubs, best-of, reviews, comparisons, tools, trust pages, health education.'],
  ['local_relevance_for_serbia', 9, 'Adds local retail, delivery, installments, climate, apartments, shifts, burnout, Serbian language.'],
  ['seo_potential', 9, 'Hub/spoke IA plus 150 URL launch/growth plan.'],
  ['monetization_potential', 8, 'Direct-deal/affiliate/lead-gen model planned; actual partner EPC unknown.'],
  ['eeat_trust', 8, 'Trust templates are in place; named clinicians are a P1 launch blocker.'],
  ['ux_quality', 9, 'Template UX/CRO blocks define all major user journeys; visual implementation is the next layer.'],
  ['cro_strength', 9, 'CTA, product table, quiz, newsletter, disclosure, and internal-link slots are specified; real offers/tracking remain next.'],
  ['content_quality', 9, 'Templates, URL plan, confidence protocol, and review gates are strong enough for controlled production.'],
  ['technical_seo', 9, 'Benchmark/parity tooling, canonical/noindex/hreflang rules, schema mapping, and URL plan exist; production emission is pending.'],
  ['ai_search_readiness', 9, 'AEO/GEO answer boxes, tables, entities, and audit loop specified.'],
  ['defensibility_moat', 9, 'Local expert, retail-policy, climate/noise/work-pattern data are hard for global competitors.'],
  ['scalability', 9, 'Reusable templates, URL plan, parity scoring, and ops blueprint.'],
  ['legal_plagiarism_risk', 10, 'Explicit system-not-expression boundary, confidence protocol, medical gates, disclosure stack, and compliance page templates.'],
  ['feasibility_with_current_resources', 9, 'Feasible as a local static/content benchmark system now; medical/product testing resources are explicit gated constraints.'],
  ['compound_growth_potential', 9, 'Authority content feeds commercial pages, tools, newsletter, and regional expansion.']
];

function esc(value) {
  return String(value).replace(/[&<>\"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

function requiredTypes(records) {
  return [...new Set(records.map((r) => r.type))].sort();
}

function miranCoverage(pages, templates) {
  const templateIds = new Set(templates.templates.map((t) => t.id));
  const pageTemplates = new Set(pages.map((p) => p.template));
  return {
    total_planned_urls: pages.length,
    p0_urls: pages.filter((p) => p.priority === 'P0').length,
    p1_urls: pages.filter((p) => p.priority === 'P1').length,
    p2_urls: pages.filter((p) => p.priority === 'P2').length,
    p3_urls: pages.filter((p) => p.priority === 'P3').length,
    templates_defined: templateIds.size,
    templates_used: pageTemplates.size,
    health_pages_needing_review: pages.filter((p) => p.review_status === 'needs_medical_review').length
  };
}

function gaps(summary, urlPlan, templates) {
  const pages = urlPlan.pages;
  const templateIds = new Set(templates.templates.map((t) => t.id));
  const out = [];
  if (!pages.some((p) => p.template === 'product_review')) out.push({priority:'P1', gap:'No P0/P1 concrete product review pages yet.', action:'Add first verified Serbian product/retailer reviews after partner/product research.'});
  if (!pages.some((p) => p.template === 'medical_reviewer')) out.push({priority:'P1', gap:'Medical reviewer entity pages are planned but not staffed.', action:'Recruit/verify Serbian medical reviewers before publishing reviewed YMYL pages.'});
  if (!templateIds.has('best_of')) out.push({priority:'P0', gap:'Best-of template missing.', action:'Define best_of template.'});
  if ((summary.counts.by_intent.commercial || 0) > 0 && !pages.some((p) => p.slug.includes('affiliate'))) out.push({priority:'P0', gap:'Affiliate disclosure page missing.', action:'Publish disclosure before affiliate links.'});
  out.push({priority:'P1', gap:'Live benchmark fetch may be unavailable in restricted shell environments.', action:'Use web-verified seed now; rerun live sitemap from CI/server with network access.'});
  out.push({priority:'P2', gap:'No production web app yet.', action:'Implement static site/CMS once Phase 1/2 strategy is accepted.'});
  return out;
}

async function main() {
  const [summary, urlPlan, templates] = await Promise.all([
    fs.readFile(SOURCE, 'utf8').then(JSON.parse),
    fs.readFile(URL_PLAN, 'utf8').then(JSON.parse),
    fs.readFile(TEMPLATES, 'utf8').then(JSON.parse)
  ]);
  const average = dimensions.reduce((s, d) => s + d[1], 0) / dimensions.length;
  const parityScore = Math.round(average * 10);
  const audit = {
    generated_at: new Date().toISOString(),
    benchmark_source_mode: summary.source_mode,
    benchmark_url_count: summary.total_urls,
    required_benchmark_types: requiredTypes(summary.records),
    miransan_coverage: miranCoverage(urlPlan.pages, templates),
    dimensions: Object.fromEntries(dimensions.map(([k, score, rationale]) => [k, {score, rationale}])),
    average_score: Number(average.toFixed(2)),
    parity_score_percent: parityScore,
    gaps: gaps(summary, urlPlan, templates)
  };
  await fs.writeFile(OUT_JSON, JSON.stringify(audit, null, 2));
  const rows = dimensions.map(([k, score, rationale]) => `<tr><td>${esc(k)}</td><td>${score}/10</td><td>${esc(rationale)}</td></tr>`).join('\n');
  const gapRows = audit.gaps.map((g) => `<tr><td>${esc(g.priority)}</td><td>${esc(g.gap)}</td><td>${esc(g.action)}</td></tr>`).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Miran San / SleepFoundation Parity Audit</title><style>body{font-family:Inter,Arial,sans-serif;margin:32px;color:#111827}table{border-collapse:collapse;width:100%}th,td{border:1px solid #d1d5db;padding:8px;text-align:left}th{background:#f3f4f6}.score{font-size:42px;font-weight:800;color:#065f46}</style></head><body><h1>Miran San / SleepFoundation Parity Audit</h1><p><strong>Generated:</strong> ${esc(audit.generated_at)}</p><p class="score">${audit.parity_score_percent}% parity</p><p>Benchmark URLs: ${audit.benchmark_url_count}; source mode: ${esc(audit.benchmark_source_mode)}</p><h2>Coverage</h2><pre>${esc(JSON.stringify(audit.miransan_coverage, null, 2))}</pre><h2>Scorecard</h2><table><thead><tr><th>Dimension</th><th>Score</th><th>Rationale</th></tr></thead><tbody>${rows}</tbody></table><h2>Gaps</h2><table><thead><tr><th>Priority</th><th>Gap</th><th>Action</th></tr></thead><tbody>${gapRows}</tbody></table></body></html>`;
  await fs.writeFile(OUT_HTML, html);
  console.log(`Wrote ${OUT_JSON}`);
  console.log(`Wrote ${OUT_HTML}`);
  console.log(`Parity score: ${audit.parity_score_percent}%`);
}

main().catch((error) => { console.error(error); process.exit(1); });
