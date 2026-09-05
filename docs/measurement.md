# BitMan measurement

GA4 destination: G-16TNFTJZJJ (property 526480643). The existing GTM container configures the Google tag. Do not add a second config/page_view tag.

`assets/contact.js` queues `contact_click` through the Google tag dataLayer command API. `send_to` explicitly targets BitMan. It runs only on bitman.ch and www.bitman.ch, once per document. A single delegated click listener handles email, telephone and wa.me links. It does not delay or prevent navigation.

Parameters: contact_method (email/phone/whatsapp), service (fixed allowlist), page_language, page_location (origin/path only; no query string or fragment). It does not send message bodies, email subjects, clicked link URLs or user-entered text. Existing GTM pageview behaviour is unchanged.

This is a micro-conversion, not generate_lead and not a claim of an acquired customer. No new GA4 key event was created. Do not combine automatically collected outbound `click` with `contact_click` as two leads.

Validation: `node scripts/test-contact.cjs` exercises allowed/blocked hostnames, one event per action, destination routing and payload privacy. Static checks ensure the script is on every indexable page. Actual receipt in GA4 should be checked in Realtime/DebugView and then the Events report after traffic arrives; no synthetic production contacts were sent during deployment. Register event-scoped custom dimensions for contact_method/service/page_language if they are needed in standard GA4 reports; that Admin configuration has not been changed by this release.

Keep a separate record of real enquiries, qualification, offers and outcomes. A click on WhatsApp is not evidence that a message was sent.
