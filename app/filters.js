// Filtering and sorting for the deal list. Pure functions: given the deals
// and a filter state, they return the deals a shopper should see, in order.

export function discountOf(deal) {
  if (!deal.usual || deal.usual <= deal.sale) return 0;
  return Math.round(((deal.usual - deal.sale) / deal.usual) * 100);
}

export function savedOf(deal) {
  return Math.max(0, deal.usual - deal.sale);
}

// The filter state the page keeps: what the shopper typed and picked.
export function blankState() {
  return {
    query: '',
    category: 'All',
    store: 'All',
    minDiscount: 0,
    verdict: 'All',
    sort: 'discount',
  };
}

function matchesQuery(deal, query) {
  if (!query) return true;
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = `${deal.name} ${deal.store} ${deal.category}`.toLowerCase();
  return words.every((word) => haystack.includes(word));
}

export function applyFilters(deals, state) {
  return deals.filter((deal) => {
    if (!matchesQuery(deal, state.query)) return false;
    if (state.category !== 'All' && deal.category !== state.category) return false;
    if (state.store !== 'All' && deal.store !== state.store) return false;
    if (state.verdict !== 'All' && deal.verdict !== state.verdict) return false;
    if (discountOf(deal) < state.minDiscount) return false;
    return true;
  });
}

const SORTERS = {
  // Biggest percentage cut first: the best bargains on top.
  discount: (a, b) => discountOf(b) - discountOf(a) || savedOf(b) - savedOf(a),
  // Most dollars saved first: the biggest-ticket wins on top.
  savings: (a, b) => savedOf(b) - savedOf(a) || discountOf(b) - discountOf(a),
  // Cheapest sale price first.
  priceLow: (a, b) => a.sale - b.sale || discountOf(b) - discountOf(a),
  // Most expensive first, for shoppers hunting big-ticket items.
  priceHigh: (a, b) => b.sale - a.sale || discountOf(b) - discountOf(a),
  // Alphabetical, for finding one product fast.
  name: (a, b) => a.name.localeCompare(b.name),
};

export function sortDeals(deals, sortKey) {
  const sorter = SORTERS[sortKey] ?? SORTERS.discount;
  return [...deals].sort(sorter);
}

export function visibleDeals(deals, state) {
  return sortDeals(applyFilters(deals, state), state.sort);
}

// Totals for the stats bar: how many deals, how much a shopper saves
// buying all of them at the sale price instead of the usual price.
export function totalsOf(deals) {
  let saved = 0;
  let usual = 0;
  for (const deal of deals) {
    saved += savedOf(deal);
    usual += deal.usual;
  }
  return { count: deals.length, saved, usual };
}
