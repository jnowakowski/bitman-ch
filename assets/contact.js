// The existing GTM container configures GA4. This file only queues contact events.
(() => {
  if (!['bitman.ch', 'www.bitman.ch'].includes(location.hostname) || window.bitmanContactTracking) return;
  window.bitmanContactTracking = true;
  window.dataLayer = window.dataLayer || [];
  function event() { window.dataLayer.push(arguments); }
  document.addEventListener('click', (click) => {
    const link = click.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    let method;
    if (url.protocol === 'mailto:') method = 'email';
    else if (url.protocol === 'tel:') method = 'phone';
    else if (url.protocol === 'https:' && url.hostname === 'wa.me') method = 'whatsapp';
    else return;
    const service = link.closest('[data-service]')?.dataset.service || 'general';
    event('event', 'contact_click', {
      send_to: 'G-16TNFTJZJJ',
      contact_method: method,
      service: ['consulting', 'integration', 'websites', 'setup', 'backup'].includes(service) ? service : 'general',
      page_language: document.documentElement.lang,
      page_location: location.origin + location.pathname,
      transport_type: 'beacon'
    });
  });
})();
