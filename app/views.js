// Rendering: turns deals into HTML for the list page and the deal page.
// All prices are shown from the deal data; the discount badge is computed
// from the two prices so the numbers on screen always agree.

import { CHECKED_ON, CHECKED_NOTE, VERDICTS } from './deals.js';
import { discountOf, savedOf } from './filters.js';

export function money(amount) {
  return '$' + amount.toFixed(2).replace(/\.00$/, '');
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function verdictBadge(deal) {
  const verdict = VERDICTS[deal.verdict];
  return `<span class="verdict verdict-${deal.verdict}" title="${escapeHtml(verdict.hint)}">${verdict.label}</span>`;
}

function storeLink(deal, label) {
  return `<a class="store-link" href="${escapeHtml(deal.url)}" target="_blank" rel="noopener">` +
    `${label} at ${escapeHtml(deal.store)} &rarr;</a>`;
}

export function dealCard(deal) {
  const pct = discountOf(deal);
  return `<article class="card">
    <div class="card-top">
      <span class="category">${escapeHtml(deal.category)}</span>
      ${verdictBadge(deal)}
    </div>
    <h3><a href="#/deal/${deal.slug}">${escapeHtml(deal.name)}</a></h3>
    <p class="store-line">${escapeHtml(deal.store)} &middot; checked ${CHECKED_ON}</p>
    <div class="prices">
      <span class="sale">${money(deal.sale)}</span>
      <span class="usual"><s>${money(deal.usual)}</s></span>
      <span class="pct">-${pct}%</span>
    </div>
    <p class="save-line">You save ${money(savedOf(deal))}</p>
    <p class="note">${escapeHtml(deal.note)}</p>
    ${storeLink(deal, 'View deal')}
  </article>`;
}

export function renderList(root, deals, totalCount) {
  const shown = deals.length;
  const heading = shown === totalCount
    ? `All ${totalCount} deals`
    : `${shown} of ${totalCount} deals`;
  root.innerHTML = `<section class="list-head">
      <h2>${heading}</h2>
      <p class="list-sub">Sorted by biggest discount. Every price was checked on ${CHECKED_ON}.</p>
    </section>
    <div class="grid">${deals.map(dealCard).join('')}</div>
    ${shown === 0 ? '<p class="empty">No deals match those filters. Try clearing the search or lowering the discount.</p>' : ''}`;
}

export function renderDetail(root, deal) {
  const pct = discountOf(deal);
  const verdict = VERDICTS[deal.verdict];
  root.innerHTML = `<article class="detail">
    <p class="back"><a href="#/">&larr; All deals</a></p>
    <div class="card-top">
      <span class="category">${escapeHtml(deal.category)}</span>
      ${verdictBadge(deal)}
    </div>
    <h2>${escapeHtml(deal.name)}</h2>
    <p class="store-line">${escapeHtml(deal.store)} &middot; checked ${CHECKED_ON}</p>
    <div class="prices big">
      <span class="sale">${money(deal.sale)}</span>
      <span class="usual"><s>${money(deal.usual)}</s></span>
      <span class="pct">-${pct}%</span>
    </div>
    <p class="save-line">You save ${money(savedOf(deal))} off the usual price of ${money(deal.usual)}.</p>
    <section class="verdict-box">
      <h3>Is it really a deal? ${verdict.label}</h3>
      <p>${escapeHtml(deal.note)}</p>
      <p class="fine">${escapeHtml(verdict.hint)}.</p>
    </section>
    <section class="proof-box">
      <h3>Where the price was checked</h3>
      <p>Sale price ${money(deal.sale)} and usual price ${money(deal.usual)} read from ${escapeHtml(deal.source)}; re-checked ${CHECKED_ON}.</p>
      <p class="fine">${escapeHtml(CHECKED_NOTE)}</p>
    </section>
    <p class="cta">${storeLink(deal, 'Buy this deal')}</p>
  </article>`;
}

export function renderNotFound(root, slug) {
  root.innerHTML = `<article class="detail">
    <p class="back"><a href="#/">&larr; All deals</a></p>
    <h2>Deal not found</h2>
    <p>There is no deal called &ldquo;${escapeHtml(slug)}&rdquo; in this finder.</p>
  </article>`;
}
