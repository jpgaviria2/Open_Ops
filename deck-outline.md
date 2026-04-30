# Open Ops Pitch Deck Outline

## One-liner

**Open Ops is the open-source Swiss Army knife for small merchants: customer apps, mobile ordering, sats rewards, staff operations, inventory, financial updates, and OpenClaw AI chat in one merchant-owned stack.**

## 30-second pitch

Open Ops turns the Trails Coffee ecosystem into a reusable merchant operating system for independent businesses. It combines iOS, Android, and PWA customer apps with mobile ordering, Bitcoin rewards, Nostr identity, encrypted chat, staff checklists, inventory reporting, discrepancy tracking, procedures, Square sales sync, and OpenClaw AI owner briefings. The goal is to give small merchants the integrated infrastructure big chains have — without locking them into closed platforms.

## 2-minute pitch

Small merchants are forced to run their businesses across disconnected tools: POS, online ordering, loyalty, staff checklists, inventory spreadsheets, messaging apps, social media, and dashboards. Big chains can afford integrated infrastructure; independent merchants stitch things together manually.

Open Ops solves this by packaging the real Trails Coffee ecosystem as a modular merchant operating system. The customer layer includes native iOS and Android apps plus a progressive web app for ordering, wallet, rewards, chat, social updates, events, fundraisers, and Bitcoin education. The operations layer includes staff checklists, procedures, prep lists, inventory reports, discrepancy tracking, waste logs, Square sales sync, forecasting, and financial updates. The intelligence layer is OpenClaw chat, which can brief the owner, guide staff, and help customers using actual business context.

The architecture is open-source-first: Bitcoin and BTCPay Server for sats rewards and Lightning invoices, Nostr for identity and messaging, PWA/native apps for access, Square integration for existing merchant workflows, and OpenClaw for AI automation. Trails Coffee is the live proof-of-concept. The next step is to make the system reusable, onboard pilot merchants, and turn a single cafe ecosystem into an open merchant platform.

## Merchant onboarding / launch packet

The final page of the deck now summarizes what a hosted merchant must provide before deployment:

- Credentials and accounts: DNS approval, Square, BTCPay Server or Open Ops-hosted BTCPay approval, Breez/Spark, Nostr, OpenClaw, Apple Developer, Google Play, API tokens, optional Sheets/Maton/SMTP.
- Merchant assets: app names, logos, icons, brand colors, photos, app store listings, menu/catalog, staff procedures, inventory, rewards policy.
- Operator architecture: the current source repos should consolidate into one Open Ops platform repo/monorepo. GitHub is an Open Ops operator dependency for hosted merchants, not a merchant prerequisite.

Full worksheet: `docs/merchant-onboarding-requirements.md`.

## Get Started form

Added a hosted merchant intake form at `get-started.html`.

It asks for business basics, desired Open Ops modules, readiness for Square/BTCPay/Spark/Nostr/OpenClaw, domains, brand assets, screenshot status, and the custom onboarding question:

> If Open Ops could remove one recurring weekly headache from your business in the next 30 days, what would it be — and what would “fixed” look like?

The static form generates an intake packet with copy, JSON download, and email-draft handoff. Screenshot files can be provided separately and later added to the deck/site.
