# CounterMind Pitch Deck Outline

## One-liner

**CounterMind is the AI-native Swiss Army knife for small merchants: customer apps, mobile ordering, sats rewards, staff operations, inventory, financial updates, and AI-native merchant agents in one merchant-owned stack.**

## 30-second pitch

CounterMind turns the Trails Coffee ecosystem into a reusable merchant operating system for independent businesses. It combines iOS, Android, and PWA customer apps with mobile ordering, Bitcoin rewards, Nostr identity, encrypted chat, staff checklists, inventory reporting, discrepancy tracking, procedures, Square sales sync, and AI-native owner briefings. The goal is to give small merchants the integrated infrastructure big chains have — without locking them into closed platforms.

## 2-minute pitch

Small merchants are forced to run their businesses across disconnected tools: POS, online ordering, loyalty, staff checklists, inventory spreadsheets, messaging apps, social media, and dashboards. Big chains can afford integrated infrastructure; independent merchants stitch things together manually.

CounterMind solves this by packaging the real Trails Coffee ecosystem as a modular merchant operating system. The customer layer includes native iOS and Android apps plus a progressive web app for ordering, wallet, rewards, chat, social updates, events, fundraisers, and Bitcoin education. The operations layer includes staff checklists, procedures, prep lists, inventory reports, discrepancy tracking, waste logs, Square sales sync, forecasting, and financial updates. The intelligence layer is native to the platform: merchant agents brief the owner, guide staff, support customers, and act with real business context.

The architecture is open-source-first: Bitcoin and BTCPay Server for sats rewards and Lightning invoices, Nostr for identity and messaging, PWA/native apps for access, Square integration for existing merchant workflows, and an AI agent runtime for native automation. Trails Coffee is the live proof-of-concept. The customer-facing story is the finished hosted platform: merchant-owned customer channels, AI-native operations, open rails, and managed infrastructure.

## Merchant onboarding / launch packet

The final page of the deck now summarizes what a hosted merchant must provide before deployment:

- Credentials and accounts: DNS approval, Square, BTCPay Server or CounterMind-hosted BTCPay approval, Breez/Spark, Nostr, AI agent runtime, Apple Developer, Google Play, API tokens, optional Sheets/Maton/SMTP.
- Merchant assets: app names, logos, icons, brand colors, photos, app store listings, menu/catalog, staff procedures, inventory, rewards policy.
- Operator architecture: the current source repos should consolidate into one CounterMind platform repo/monorepo. GitHub is a CounterMind operator dependency for hosted merchants, not a merchant prerequisite.

Full worksheet: `docs/merchant-onboarding-requirements.md`.

## Get Started form

Added a hosted merchant intake form at `get-started.html`.

It asks for business basics, desired CounterMind modules, readiness for Square/BTCPay/Spark/Nostr/AI agent runtime, domains, brand assets, screenshot status, and the custom onboarding question:

> If CounterMind could remove one recurring weekly headache from your business in the next 30 days, what would it be — and what would “fixed” look like?

The static form generates an intake packet with copy, JSON download, and email-draft handoff. Screenshot files can be provided separately and later added to the deck/site.

## Product screenshot gallery

Added JP-provided Trails Coffee screenshots under `site/assets/screenshots/` and used them in:

- A new deck slide: **Live product proof**
- The Get Started page product gallery

Screens represented: home/rewards, menu ordering, cart with sats discount, card checkout, sats checkout, social feed/zaps, events calendar, fundraiser list, fundraiser QR, and sats donation modal.

## Additional screenshot batch

Added a second JP-provided screenshot batch covering marketplace services, wallet receive QR/recent activity, wallet settings with Spark/Nostr identity, seed/iCloud backup, and shop chat/order assistance.

The deck now has a second live screenshot slide: **More live surfaces**, and the Get Started gallery includes all 15 screenshots.

## Architecture + naming update

Added a comprehensive customer-facing architecture page at `architecture.html` and linked it from the deck and intake page.

The architecture is framed as a hosted merchant operating system with these layers:

1. Customer surfaces — iOS, Android, PWA, website embeds, QR entry points, chat
2. Merchant/staff surfaces — owner dashboard, staff checklist PWA, inventory screens, procedure library, prep lists, reports
3. AI/workflow layer — AI-native assistant, owner briefings, staff guidance, customer support, alerts, workflow agents
4. Commerce layer — menu/catalog sync, mobile ordering, Square POS, KDS routing, payment links, inventory signals
5. Bitcoin rewards/wallet layer — BTCPay Server, Bitcoin Rewards plugin, Lightning invoices, Spark wallet, LNURL/QR, sats policy
6. Identity/community layer — Nostr profiles, NIP-05 names, encrypted DMs, social feed, events, marketplace
7. Data/operating memory — tenant config, operational DB, catalog cache, checklist history, media storage, analytics
8. Hosted cloud infrastructure — API gateway, workers, secrets, backups, monitoring, deploy pipeline

Naming brainstorm added. Recommendation: **CounterMind** — “the AI-native operating system behind the counter.” `Open_Ops` remains an internal/repo codename until domain/trademark checks.
