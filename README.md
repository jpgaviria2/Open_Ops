# CounterStack — Merchant OS Pitch Deck

**CounterStack** is the customer-facing hosted merchant operating system concept born from the Trails Coffee ecosystem. `Open_Ops` remains the repository/internal codename.

Live deck target: `https://jpgaviria2.github.io/Open_Ops/`

## What the deck covers

- Trails Coffee as the live reference implementation
- iOS, Android, and PWA customer app capabilities
- Mobile ordering, wallet, chat, social, events, and customer loyalty
- BTCPay Server stack for sats rewards and Lightning checkout
- Nostr identity, encrypted DMs, and merchant-owned community
- OpenClaw AI chat as the merchant control surface
- Staff checklist site, procedures, inventory, waste, and discrepancy tracking
- Square sales sync, owner briefings, forecasting, and financial/ops updates
- Packaging, business model, target customers, roadmap, and ask
- Final-page merchant launch packet: required credentials, assets, operating inputs, and repos

## Merchant onboarding worksheet

A detailed implementation checklist lives at:

`docs/merchant-onboarding-requirements.md`

It covers hosted vs self-hosted deployment models, required merchant credentials/assets, domains, Square, BTCPay Server, Breez/Spark, Nostr, OpenClaw, iOS, Android, staff ops, inventory, app store assets, and the operator repository consolidation plan.

## Presenting

Open `site/index.html` locally or use the GitHub Pages URL after deployment.

Keyboard controls:

- `→` / `Space`: next slide
- `←`: previous slide
- `N`: toggle speaker notes
- `P`: print/export to PDF

## Get Started form

The hosted merchant intake form lives at:

`site/get-started.html`

Live after deployment:

`https://jpgaviria2.github.io/Open_Ops/get-started.html`

The form currently generates an intake packet client-side with copy, JSON download, and email-draft handoff. This keeps the public demo lightweight while the hosted CounterStack intake backend can be wired behind the same form when ready.

## Deployment

This repository includes a GitHub Pages workflow at `.github/workflows/pages.yml`.

On every push to `main`, the static deck in `site/` is uploaded and deployed to GitHub Pages.

## Product screenshots

JP-provided Trails Coffee app screenshots are stored in:

`site/assets/screenshots/`

They power the **Live product proof** deck slide and the product gallery on `get-started.html`.

Second screenshot batch added: marketplace, wallet receive, wallet settings/identity, wallet backup, and chat/order-help screens. The deck now includes two live product proof slides and the Get Started gallery includes all 15 screenshots.

## Architecture and naming

Added a customer-facing architecture map at:

`site/architecture.html`

Live after deployment:

`https://jpgaviria2.github.io/Open_Ops/architecture.html`

The architecture page frames the hosted platform as **CounterStack** (recommended working name) and maps all layers: customer surfaces, merchant/staff surfaces, AI/workflow, commerce, Bitcoin rewards/wallet, Nostr identity/community, data/operating memory, and hosted cloud infrastructure.
