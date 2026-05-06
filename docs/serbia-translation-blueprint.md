# Phase 2 — Serbian Market Translation Blueprint

## 1. Market Fit

[HIGH-CONFIDENCE INFERENCE] Serbian users will search by immediate problem (`ne mogu da spavam`, `nesanica`, `hrkanje`, `apneja u snu`), product need (`dušeci`, `najbolji dušek`, `anatomski jastuk`), budget (`cena`, `akcija`, `na rate`), and purchase friction (`dostava`, `garancija`, `povraćaj`, `gde probati`). [UNKNOWN / NEEDS VALIDATION] Exact volumes and SERP competitors require GSC/Keyword Planner/Ahrefs/Semrush or manual SERP collection.

Tone of voice: Serbian Latin, calm, practical, non-alarmist, medically cautious, and transparent about commercial relationships. Use `vi` for professional trust unless brand testing shows informal voice improves engagement.

Launch categories:

1. Dušeci.
2. Jastuci.
3. Problemi sa spavanjem: nesanica, hrkanje, apneja.
4. Higijena spavanja and sleep basics.
5. Tools: sleep calculator, mattress quiz.
6. Trust/legal pages.

## 2. Local Competitor and Partner Landscape

[HYPOTHESIS] Likely SERP competitors include Serbian health portals, lifestyle/mama portals, e-commerce category pages, domestic mattress retailers, pharmacies, clinic pages, and global translated content. [UNKNOWN / NEEDS VALIDATION] Direct sleep-only Serbian authority competitors must be verified via SERP crawl.

Partner hypotheses until verified:

- Domestic mattress manufacturers and retailers.
- Furniture/e-commerce chains.
- Pillow/bedding retailers.
- Pharmacies for sleep aids/supplements, if legally compliant.
- Sleep clinics/labs and pulmonology/ENT practices for education/lead-gen, if legally compliant.
- Affiliate networks plus direct deals where networks are weak.

## 3. Category Prioritization Matrix

| Category | Traffic | Monetization | Ease | Trust value | Legal sensitivity | Regional scale | Defensibility | AI readiness | Decision |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Dušeci | 8 | 9 | 7 | 7 | 3 | 8 | 8 | 8 | Launch immediately |
| Jastuci | 7 | 7 | 8 | 6 | 4 | 8 | 7 | 8 | Launch immediately |
| Nesanica | 8 | 3 | 6 | 10 | 9 | 9 | 8 | 9 | Launch immediately with review gate |
| Hrkanje | 7 | 6 | 6 | 9 | 8 | 8 | 8 | 9 | Launch immediately with review gate |
| Apneja u snu / CPAP | 6 | 8 | 4 | 10 | 10 | 8 | 9 | 9 | Phase 2/P0 research |
| Posteljina | 6 | 6 | 8 | 5 | 2 | 8 | 6 | 7 | Phase 2 |
| Baby sleep | 6 | 3 | 5 | 9 | 9 | 8 | 7 | 8 | Phase 2 with expert review |
| Supplements | 6 | 5 | 5 | 6 | 9 | 7 | 5 | 7 | Optional/later |
| Sleep tech | 5 | 6 | 7 | 5 | 3 | 7 | 6 | 7 | Optional/later |
| Prescription sleep meds | 5 | 1 | 3 | 8 | 10 | 7 | 4 | 6 | Avoid for now |

## 4. Localized Business Model

- Must copy: transparent affiliate disclosure, editorial independence policy, trust-first content funnel.
- Should adapt: direct deals and lead-gen because Serbian affiliate infrastructure may be thinner than the US market.
- Should outperform: local retailer policy database, showroom guides, RSD price bands, installment comparisons, regional availability.
- Should not copy: US product rankings, US doctors, US-only source claims, product testing claims without testing.

Revenue model:

1. Direct affiliate/direct referral with mattress/pillow retailers.
2. Lead-gen for sleep clinics/labs only after legal review and clear medical boundaries.
3. Sponsored placements only with visible labels and non-interference policy.
4. Newsletter as owned audience and retargeting asset.
5. Original tools and downloads as link/email assets.
6. Regional expansion after Serbian content is stable: BiH, Montenegro, Croatia, North Macedonia.

## 5. Serbian IA

Top-level sitemap, max 7 categories:

1. `/duseci` — dušeci, naddušeci, dimenzije, kupovina.
2. `/jastuci` — jastuci and neck/position needs.
3. `/posteljina` — sheets, blankets, protectors, temperature.
4. `/problemi-sa-spavanjem` — nesanica, hrkanje, apneja, pospanost, bruksizam.
5. `/bolji-san` — sleep hygiene, routines, light, caffeine, stress, shift work.
6. `/bebe-i-san` — baby/child sleep with strict review.
7. `/alati` — calculator, quiz, sleep diary, checklists.

URL rules: Serbian Latin, ASCII-only slugs without diacritics, lowercase, hyphen-separated, no dates in evergreen slugs unless required, stable canonical URLs.

Breadcrumb logic: Home > Category > Subcategory > Page. Commercial modifiers should roll up into product hubs; condition pages should roll up into problem hubs.

Canonical/hreflang: canonical clean page URL; noindex drafts and review pages; hreflang only after true localized regional versions exist.

The first 150 URL plan is stored in `content/data/miransan-url-plan.json`.

## 6. Local Differentiation Layer

Defensible assets to build early:

1. Local mattress/retailer policy database.
2. Serbian price-band guide in RSD.
3. Installment-payment guide.
4. Delivery and old-mattress removal data.
5. Showroom and trial maps.
6. Return/warranty explainers using Serbian consumer-law context after legal review.
7. Summer heat and no-AC sleep guides.
8. Apartment noise guide.
9. Shift work guide.
10. Burnout/stress and sleep series.
11. Podno grejanje compatibility guide.
12. Small apartment bed/storage guide.
13. Local expert interviews.
14. Sleep clinic/lab directory only after legal review.
15. Serbian sleep myths series.
16. Original surveys on Serbian sleep habits.
17. Regional retailer availability tracking.
18. Serbian glossary for medical/product terms.
19. Downloadable mattress buying checklist.
20. AI-search citation audit with original tables and definitions.

## 7. MVP Plan

Minimum viable authority site:

- 6 hubs: home, dušeci, jastuci, problemi sa spavanjem, bolji san, alati.
- 20 P0 pages from the URL plan.
- 4 commercial pages: best mattresses, best pillows, mattress buying guide, pillow buying guide.
- 4 YMYL pages gated for medical review: nesanica, hrkanje, apneja, medical disclaimer.
- 2 tools: sleep calculator and mattress quiz.
- Trust/legal pages: about, editorial policy, affiliate disclosure, privacy, cookie, terms, correction policy, medical disclaimer, methodology.
- Draft/review/published statuses: no public indexing until editorial and required medical/compliance QA are complete.

## 8. Operations and KPIs

Pipeline: keyword research → brief → outline → draft → edit → medical review → SEO QA → affiliate QA → publish → promote → monitor → update.

North Star: affiliate/direct-deal revenue per 1000 sessions (RPM), measured only after compliant tracking is implemented.

Launch KPIs: published/reviewed pages, index coverage, GSC impressions, Core Web Vitals, internal CTR, email signups.

Growth KPIs: organic sessions, top-10 rankings, affiliate clicks, subscribers, first revenue, partner response rate.

Scale KPIs: monthly revenue, RPM, brand search, direct partner revenue, links/mentions, LLM citations.

## 9. Risks / Unknowns

- [UNKNOWN / NEEDS VALIDATION] Serbian keyword volumes and SERP difficulty.
- [UNKNOWN / NEEDS VALIDATION] Affiliate/direct-deal economics.
- [UNKNOWN / NEEDS VALIDATION] Legal constraints for clinic/sleep-test/supplement lead-gen.
- [UNKNOWN / NEEDS VALIDATION] Medical reviewer availability and cost.
- [HYPOTHESIS] Google YMYL algorithms may require stronger entity authority before medical pages rank.

## 10. Immediate Next Actions

1. Run benchmark/parity scripts after every strategy or IA change.
2. Validate Serbian SERPs for top 50 P0/P1 keywords.
3. Recruit medical reviewers or mark YMYL pages as non-indexable drafts.
4. Build first legal/trust pages before affiliate links.
5. Start local partner/retailer policy database.
