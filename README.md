# Open Ops — Merchant OS Pitch Deck

**Open Ops** is a world-class pitch deck for turning the Trails Coffee ecosystem into an open-source merchant operating system for independent businesses.

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

Because GitHub Pages is static, the form generates an intake packet client-side with copy, JSON download, and email-draft handoff. Add a real submission endpoint later if/when Open Ops has an intake API, Formspree/Tally endpoint, or CRM integration.

## Deployment

This repository includes a GitHub Pages workflow at `.github/workflows/pages.yml`.

On every push to `main`, the static deck in `site/` is uploaded and deployed to GitHub Pages.
