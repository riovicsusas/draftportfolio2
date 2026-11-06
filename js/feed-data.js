/**
 * Portfolio Activity Feed & Latest Updates
 */
const DEFAULT_FEED = [
      { id: 1, date: 'Sep 2026', text: 'Launched a full Shopify Flow automation suite for a fashion brand — reducing manual order processing by 80%.', tag: 'Shopify Flow', accent: false, link: '', image: '' },
      { id: 2, date: 'Aug 2026', text: 'Migrated 50,000+ product records using Matrixify with zero downtime for a multi-store merchant.',            tag: 'Matrixify',   accent: true, link: '', image: '' },
      { id: 3, date: 'Jul 2026', text: 'Built a Klaviyo email sequence that recovered 23% of abandoned carts within 48 hours of setup.',             tag: 'Klaviyo',     accent: true, link: '', image: '' },
      { id: 4, date: 'Jun 2026', text: 'Portfolio website goes live — you\'re looking at it!',                                                        tag: 'Personal',    accent: true, link: '', image: '' },
    ];

function getFeed() {
  try {
    const raw = localStorage.getItem('portfolio_feed');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch(e) {}
  return DEFAULT_FEED;
}
