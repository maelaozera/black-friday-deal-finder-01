// Bootstrap and routing for Black Friday Scout.
// Hash routes: #/ is the deal list, #/deal/<slug> is one deal's page.
// The filter controls live in index.html; this module wires them up,
// keeps the filter state, and re-renders the list as the shopper types.

import { CATEGORIES, CHECKED_ON, DEALS, STORES, VERDICTS } from './deals.js';
import { blankState, totalsOf, visibleDeals } from './filters.js';
import { renderDetail, renderList, renderNotFound } from './views.js';

const app = document.getElementById('app');
const stats = document.getElementById('stats');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const storeSelect = document.getElementById('store');
const discountSelect = document.getElementById('discount');
const verdictSelect = document.getElementById('verdict');
const sortSelect = document.getElementById('sort');
const controls = document.getElementById('controls');

const state = blankState();

function fillSelect(select, values, firstLabel) {
  for (const value of values) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value === 'All' ? firstLabel : value;
    select.appendChild(option);
  }
}

function fillVerdictSelect() {
  const all = document.createElement('option');
  all.value = 'All';
  all.textContent = 'Any verdict';
  verdictSelect.appendChild(all);
  for (const [value, verdict] of Object.entries(VERDICTS)) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = verdict.label;
    verdictSelect.appendChild(option);
  }
}

function renderStats() {
  const totals = totalsOf(DEALS);
  const newLows = DEALS.filter((deal) => deal.verdict === 'new-low').length;
  stats.innerHTML =
    `<strong>${totals.count} deals</strong> from <strong>${STORES.length} stores</strong>` +
    ` &middot; <strong>${newLows} new lows</strong>` +
    ` &middot; <strong>$${Math.round(totals.saved).toLocaleString('en-US')} total savings</strong>` +
    ` &middot; prices checked ${CHECKED_ON}`;
}

function renderRoute() {
  const hash = window.location.hash || '#/';
  const detailMatch = hash.match(/^#\/deal\/([a-z0-9-]+)$/);
  if (detailMatch) {
    controls.hidden = true;
    const deal = DEALS.find((candidate) => candidate.slug === detailMatch[1]);
    if (deal) renderDetail(app, deal);
    else renderNotFound(app, detailMatch[1]);
    window.scrollTo(0, 0);
    return;
  }
  controls.hidden = false;
  renderList(app, visibleDeals(DEALS, state), DEALS.length);
}

function readControls() {
  state.query = searchInput.value.trim();
  state.category = categorySelect.value;
  state.store = storeSelect.value;
  state.minDiscount = Number(discountSelect.value);
  state.verdict = verdictSelect.value;
  state.sort = sortSelect.value;
}

function onControlChange() {
  readControls();
  renderRoute();
}

fillSelect(categorySelect, ['All', ...CATEGORIES], 'All categories');
fillSelect(storeSelect, ['All', ...STORES], 'All stores');
fillVerdictSelect();

for (const control of [searchInput, categorySelect, storeSelect, discountSelect, verdictSelect, sortSelect]) {
  control.addEventListener('input', onControlChange);
  control.addEventListener('change', onControlChange);
}

window.addEventListener('hashchange', renderRoute);

renderStats();
renderRoute();
