# Open Ops Merchant Onboarding Requirements

This is the launch packet a new merchant must provide before Open Ops can be rebranded, configured, deployed, and submitted to app stores.

**Important framing:** for the hosted product, the merchant does **not** need GitHub, CI/CD, servers, or cloud operations. Open Ops operates the platform. The merchant provides business credentials, approval, brand assets, catalog data, staff procedures, and policy decisions.

> Security rule: collect the *names* of required credentials in onboarding, but never commit live secrets to Git. Store secrets in the Open Ops secret manager, cloud secret store, GitHub Actions secrets for operator-owned repos, server environment variables, Apple/Google consoles, BTCPay, Square, or the merchant password manager.

---

## 1. Deployment models

### A. Hosted managed option — recommended default

Open Ops owns and operates:

- Source repositories / monorepo
- CI/CD pipelines
- Static hosting for customer/staff web apps
- Cloud runtime for APIs and workers
- Database, backups, monitoring, logs, and deploys
- BTCPay/Spark/Nostr/OpenClaw integration glue, unless merchant wants to own those systems

Merchant provides:

- Domain/DNS approval or delegated subdomains
- Square credentials and catalog access
- BTCPay/Spark/Nostr credentials or approval to use Open Ops-managed infrastructure
- App store accounts if native apps ship under the merchant’s own developer accounts
- Brand assets, menu, staff procedures, inventory/rewards policies

### B. Dedicated cloud option

Open Ops runs the same stack in a merchant-owned cloud account or dedicated tenant.

Merchant additionally provides:

- Cloud account/project access, billing owner, region choice
- DNS zone access
- Secret manager access
- Backup/storage destination
- Compliance/security requirements

### C. Self-hosted / open-source option

The merchant or their technical team runs the stack themselves.

Merchant additionally needs:

- GitHub org/repo admin access
- CI/CD configuration
- Hosting/VPS/Kubernetes/server management
- Secret management
- Monitoring, backups, logging, deploys, and incident response

---

## 2. Repository strategy

### Recommended product architecture: one consolidated Open Ops platform repo

Yes — the current Trails ecosystem should be consolidated for a hosted product. The clean model is a single operator-owned monorepo with merchant configuration separated from source code.

Suggested structure:

| Package | Purpose |
|---|---|
| `apps/customer-pwa` | Branded customer PWA: ordering, wallet, rewards, chat, social |
| `apps/staff-ops` | Staff checklists, procedures, inventory, dashboard |
| `services/order-api` | Square ordering, payment links, BTCPay sats checkout, KDS routing |
| `services/ops-api` | Staff submissions, inventory, media, identity, reporting |
| `services/nostr-bridge` | Nostr relays, shop bot DMs, NIP-05 publishing, OpenClaw bridge |
| `plugins/btcpay-rewards` | BTCPay Bitcoin Rewards plugin or deployment bundle |
| `templates/ios` | Native iOS template, branded per merchant when needed |
| `templates/android` | Native Android template, branded per merchant when needed |
| `packages/shared` | Shared merchant config schemas, UI tokens, API clients, validation |
| `deploy/` | Docker Compose, Terraform, Caddy, GitHub Actions, cloud deployment scripts |
| `merchant-configs/{merchant}` | Non-secret merchant config: brand, domains, feature flags, copy, catalog mapping |

Secrets should live outside the repo in a secret manager. Merchant-specific config should be data-driven so adding a merchant does not require forking every app.

### Current source repositories to consolidate

These are operator/source repos, not merchant requirements for the hosted product.

| Current repository | Role in consolidated platform |
|---|---|
| `jpgaviria2/Open_Ops` | Pitch deck, public docs, sales material |
| `jpgaviria2/trailspwa` | Customer PWA source |
| `jpgaviria2/Trails-Coffee` | Native iOS app source/template |
| `jpgaviria2/Trails-Coffee-Android` | Native Android app source/template |
| `jpgaviria2/Coffeeshop-checklist` | Staff checklist and procedures app |
| `jpgaviria2/trails-api` | Staff/ops backend API |
| `jpgaviria2/Squareorder` | Direct order API and Square/BTCPay checkout service |
| `jpgaviria2/bitcoinrewards` | BTCPay Server Bitcoin Rewards plugin |
| `jpgaviria2/trails_landing` | Main website, public menu/NIP-05 assets, landing content |
| `jpgaviria2/Anmore` / `jpgaviria2/strfry` | Optional Nostr relay infrastructure |
| `jpgaviria2/btcpay-nostr-bridge` | Optional BTCPay → Nostr event bridge |

---

## 3. Merchant accounts and credentials

### GitHub / deployment

**Hosted managed option:** GitHub is not required from the merchant. It is an Open Ops operator dependency.

Open Ops owns:

- Repository access
- GitHub Actions or equivalent CI/CD
- Deployment environments
- Internal build secrets
- Cloud runtime and release pipeline

Merchant only provides GitHub access if:

- They choose self-hosting
- They want source-code escrow/mirror access
- They want a dedicated repo under their own organization
- Their compliance policy requires it

Self-hosted merchants need:

- GitHub organization or repo owner account
- Repo admin access for Actions, Pages, environments, and secrets
- CI/CD secrets/variables for each deployment target
- Optional GitHub Pages custom domain settings

Operator/internal GitHub secrets and vars may include:

- `HOSTINGER_HOST`
- `HOSTINGER_USERNAME`
- `HOSTINGER_SSH_KEY`
- `HOSTINGER_REMOTE_PATH` or `HOSTINGER_PATH`
- `HOSTINGER_PORT`
- `VITE_CORE_API_BASE`
- `VITE_ORDER_API_PRIMARY`
- `VITE_ORDER_API_FALLBACK`
- `VITE_BREEZ_SPARK_API_KEY`
- `VITE_BREEZ_SPARK_NETWORK`
- `VITE_BREEZ_SPARK_LNURL_DOMAIN`
- `VITE_BREEZ_SPARK_STORAGE_DIR`
- `RUN_PRODUCTION_SMOKE`
- `RUN_PRODUCTION_BROWSER_SMOKE`

### Domains / DNS / TLS

Required:

- Registrar or DNS provider access, ideally Cloudflare
- Ability to create A, CNAME, TXT, and `.well-known` routes
- TLS certificates via Caddy, host provider, or Cloudflare

Recommended subdomains:

- `www.merchantdomain.com` / `merchantdomain.com` — public website
- `app.merchantdomain.com` — customer PWA
- `staff.merchantdomain.com` — staff checklist site
- `api.merchantdomain.com` — staff/identity/core API
- `order.merchantdomain.com` and/or `order2.merchantdomain.com` — direct order API
- `btcpay.merchantdomain.com` — BTCPay Server
- `pay.merchantdomain.com` — Lightning address / LNURL domain
- `relay.merchantdomain.com` — Nostr relay, if self-hosted
- `nostr-cache.merchantdomain.com` — cache/read relay, if used
- `media.merchantdomain.com` — media uploads
- `inventory.merchantdomain.com` — optional inventory dashboard

Required `.well-known` routes:

- `/.well-known/nostr.json` for NIP-05 names
- `/.well-known/lnurlp/{username}` or equivalent Lightning address proxy
- Apple/Android association files if deep links are enabled later

### Hosting / server

Required:

- Static hosting for PWA/staff/main site: Hostinger, GitHub Pages, Cloudflare Pages, Vercel, or equivalent
- Node-capable server for `Squareorder` and `trails-api`: VPS, Mac mini, Docker host, or managed container
- SSH access for deployment/restarts
- Reverse proxy: Caddy or Nginx
- Process manager: systemd, launchd, Docker Compose, or PM2
- Backup location for SQLite/database/media files
- Log rotation and uptime monitoring

Server environment variables used by current stack:

#### `Squareorder`

- `PORT`
- `NODE_ENV`
- `SQUARE_ACCESS_TOKEN`
- `SQUARE_LOCATION_ID`
- `BTCPAY_URL`
- `BTCPAY_STORE_ID`
- `BTCPAY_API_KEY`
- `BTCPAY_WEBHOOK_SECRET`
- `NOSTR_SHOP_BOT_PRIVATE_KEY`
- `NOSTR_PRIVATE_KEY` fallback, if used
- `NOSTR_RELAYS`
- `NOSTR_RELAY`
- `NOSTR_PUBLISH_TIMEOUT_MS`
- `FEDI_MINIAPP_ENABLED`, optional

#### `trails-api`

- `PORT`
- `DB_PATH`
- `ENCRYPTION_KEY`
- `ADMIN_TOKEN`
- `CHECKLIST_TOKEN`
- `DASHBOARD_API_KEY`
- `LOG_LEVEL`
- `SQUARE_ACCESS_TOKEN`
- `SQUARE_LOCATION_ID`
- `SQUARE_API_BASE`
- `SHOP_MGMT_NSEC`
- `MEDIA_PUBLIC_BASE_URL`
- `MEDIA_STORAGE_PATH`
- `MEDIA_MAX_BYTES`
- `MATON_API_KEY`
- `MATON_DRIVE_CONNECTION_ID`
- `MATON_SHEETS_CONNECTION_ID`
- `INVENTORY_SHEET_ID`
- `DISCREPANCY_SHEET_ID`
- `DISCREPANCY_SHEET_TAB`

### Square

Required:

- Square account in the merchant’s country
- Production Square application
- Production `SQUARE_ACCESS_TOKEN`
- `SQUARE_LOCATION_ID`
- Catalog with categories, items, variations, modifiers, taxes, images, and availability
- Pickup/fulfillment settings
- KDS enabled if kitchen routing is required
- Webhook/signature key if using Square webhooks for rewards or sync

Likely Square API permissions:

- Catalog read
- Orders read/write
- Payments read/write
- Checkout/payment links
- Inventory read
- Locations read
- Customers read/write, optional
- Webhooks, optional but recommended

Merchant must provide:

- Menu structure and cleanup rules
- Tax rules
- Pickup lead time / prep time windows
- Sold-out inventory policy
- KDS naming/printing rules
- Test item or sandbox location for verification

### BTCPay Server / sats rewards

Required:

- BTCPay Server instance or hosted BTCPay access
- Merchant store created in BTCPay
- `BTCPAY_URL`
- `BTCPAY_STORE_ID`
- `BTCPAY_API_KEY`
- `BTCPAY_WEBHOOK_SECRET`
- Lightning node connected and funded, or supported Lightning backend
- Bitcoin Rewards plugin installed from `jpgaviria2/bitcoinrewards`
- Pull payments enabled for reward claims
- Reward settings: percentage, minimum, cap, expiry, cleanup policy
- Square webhook URL configured for external POS rewards, if using Square-triggered rewards
- Email/notification templates, if sending reward notifications

Recommended BTCPay API permissions:

- View/manage store invoices
- Create invoices
- View invoice payment methods
- View rates
- Manage pull payments / payouts if rewards are paid automatically
- Manage store webhooks
- Store settings read, if available

Operational requirements:

- Lightning inbound/outbound liquidity plan
- Reward liability budget
- BTC/CAD or local currency rate source
- Refund/reversal policy
- Accounting/export process
- Backup and restore plan for BTCPay wallet/node

### Breez SDK / Spark wallet, if enabled

Required:

- Breez SDK Spark API key
- Mainnet/testnet decision
- Lightning address domain, e.g. `pay.merchantdomain.com`
- DNS/CNAME or proxy required by Breez/Spark LNURL setup
- Wallet backup/recovery policy
- Customer custody UX and legal/privacy language

Current PWA env names:

- `VITE_ENABLE_SPARK_WEB`
- `VITE_ENABLE_SPARK_WALLET_SUMMARY_FALLBACK`
- `VITE_BREEZ_SPARK_API_KEY`
- `VITE_BREEZ_SPARK_NETWORK`
- `VITE_BREEZ_SPARK_SYNC_INTERVAL_SECS`
- `VITE_BREEZ_SPARK_LNURL_DOMAIN`
- `VITE_BREEZ_SPARK_STORAGE_DIR`
- `VITE_BREEZ_SPARK_DEV_MNEMONIC` — development only, never production

### Nostr

Required:

- Merchant shop Nostr keypair: `nsec` and `npub`/hex pubkey
- Shop bot private key for encrypted order/status DMs
- Staff management Nostr keypair for checklist submissions
- Relay list: primary write relay, DM relay(s), fallback public relays
- NIP-05 domain and `nostr.json` management
- Approved staff/customer pubkeys, where applicable
- Content publishing policy for social/events/fundraisers/marketplace

Current stack expects:

- `NOSTR_SHOP_BOT_PRIVATE_KEY`
- `NOSTR_RELAYS`
- `SHOP_MGMT_NSEC`
- Public shop pubkey compiled/configured in apps/PWA
- Verified domains list compiled/configured in apps/PWA
- Optional cache relay such as `nostr-cache.merchantdomain.com`

### OpenClaw / AI assistant

Required:

- Merchant OpenClaw workspace or hosted assistant account
- Bot identity and approved contact channels
- Nostr DM bot key if customers/staff use Nostr chat
- Procedures/checklists/training docs imported as assistant context
- Owner escalation channel: Telegram, WhatsApp, email, or dashboard
- Permission policy: what AI can read, write, send, or approve

Merchant-specific AI setup:

- Brand tone and assistant name
- Owner contact and escalation preferences
- Staff roles and manager contacts
- Business hours and emergency rules
- “Never do without approval” list: refunds, public posts, staff messages, payment actions, etc.

### Apple iOS

Required:

- Apple Developer Program membership
- Apple Team ID
- Bundle ID, e.g. `com.merchant.app`
- App Store Connect app record
- App Store Connect API key: Key ID, Issuer ID, `.p8` private key
- Signing certificates / provisioning profiles or Xcode automatic signing access
- App capabilities: camera, Keychain, network access, associated domains if needed
- Export compliance answer
- Privacy nutrition labels
- Support URL, privacy policy URL, marketing URL
- App age rating and content rights answers

Required assets:

- App icon 1024×1024 PNG
- iPhone screenshots for required device classes
- Optional iPad screenshots if iPad supported
- App name, subtitle, keywords, promotional text, description
- Review notes and demo account/test flow if needed

### Android / Google Play

Required:

- Google Play Developer account
- Package/application ID, e.g. `com.merchant.app`
- Android signing key / upload key
- Keystore file and passwords stored securely outside Git
- Play App Signing setup
- Google Play Console app record
- Service account JSON if automating release uploads
- Data safety form
- Privacy policy URL
- Content rating questionnaire
- Target API / 16KB page alignment considerations for native libraries

Required assets:

- High-res icon 512×512
- Feature graphic 1024×500
- Phone screenshots
- Short and full descriptions
- App category/tags/contact email
- Optional release notes and internal testing group

### Google Sheets / Maton / reporting, if using inventory/discrepancies

Required:

- Google account or shared drive
- Inventory master spreadsheet
- Discrepancy log spreadsheet/tab
- Maton API key and Google Drive/Sheets connection IDs, or equivalent Google API service account
- Sheet IDs and tab names
- Access policy for staff vs owner dashboards

Env names used now:

- `MATON_API_KEY`
- `MATON_DRIVE_CONNECTION_ID`
- `MATON_SHEETS_CONNECTION_ID`
- `INVENTORY_SHEET_ID`
- `DISCREPANCY_SHEET_ID`
- `DISCREPANCY_SHEET_TAB`

### Email / notifications, optional

Required if sending emails:

- SMTP provider credentials
- From address
- Reply-to/support address
- Domain SPF/DKIM/DMARC
- Reward notification templates
- Staff/owner alert templates

---

## 4. Merchant assets to provide

### Brand assets

- Legal business name
- Public display name
- Short app name
- Tagline / one-liner
- Logo in SVG and high-resolution PNG
- App icon source file
- Android adaptive icon foreground/background, if possible
- PWA icons: 192×192, 512×512, maskable 512×512
- Brand color palette: primary, secondary, background, accent
- Fonts or typography preference
- Avatar/profile image for Nostr/social
- Banner image for social/Nostr/profile pages
- Cafe/storefront/team/product photography

### App store / public listing assets

- Short description
- Full description
- Keywords/search terms
- Category
- Support URL
- Privacy policy URL
- Terms URL, if applicable
- Contact email
- Demo/test instructions for reviewers
- iOS screenshots
- Android screenshots
- Google Play feature graphic
- Age/content rating answers
- Data safety/privacy answers

### Website / PWA content

- Home page copy
- About/story copy
- Menu categories and descriptions
- Item photos
- Event/fundraiser/marketplace policy
- Bitcoin education copy, if enabled
- FAQ
- Support/contact details
- Store location, map link, hours, holiday closures

### Menu / ordering inputs

- Square catalog access or CSV export
- Categories
- Items
- Variations/sizes
- Modifiers and modifier limits
- Prices
- Taxes
- Availability/sold-out rules
- Pickup time rules
- Lead times by daypart
- Customer notes policy
- KDS/order naming preferences
- Refund/cancellation policy

### Staff operations inputs

- Staff roster
- Roles and permissions
- Manager list
- Manager Nostr pubkeys, if using Nostr auth
- Opening checklist
- Closing checklist
- Inventory handover checklist
- Cleaning checklist
- Recipes and prep procedures
- Training cards
- Food safety procedures
- Equipment maintenance procedures
- Photos of correct station setup
- Escalation rules: who to notify and when

### Inventory / forecasting inputs

- Inventory item list
- Units of measure
- Par levels
- Suppliers/vendors
- Reorder thresholds
- Waste categories
- Discrepancy categories
- Forecast items, e.g. pastries, milk, beans
- Weather/location assumptions
- Reporting cadence
- Cost and margin fields, if financial reporting is in scope

### Rewards / Bitcoin policy inputs

- Reward percentage
- Maximum reward cap
- Minimum purchase/reward threshold
- Reward expiry policy
- Return/refund adjustment policy
- Customer education language
- Liability/accounting treatment
- Lightning liquidity budget
- Whether rewards are BTCPay pull payments, Spark wallet credits, or both

---

## 5. Merchant-specific code/config that must be parameterized

Current Trails-specific values that must be changed per merchant:

- App names: `Trails Coffee`, `Trails`, `Open Ops` case study copy
- iOS bundle ID: currently `me.anmore.trails-coffee`
- Android application ID: currently `me.anmore.trailscoffee`
- Domains: `trailscoffee.com`, `app.trailscoffee.com`, `api.trailscoffee.com`, `order.trailscoffee.com`, `order2.trailscoffee.com`, `btcpay.anmore.me`, `pay.trailscoffee.com`, `relay.anmore.me`, `nostr-cache.trailscoffee.com`, `media.trailscoffee.com`
- Nostr shop pubkey and approved pubkeys
- Verified NIP-05 domains
- Square location ID and access token
- BTCPay URL/store/API key
- Breez Spark API key and LNURL domain
- Hosting/deployment credentials — Open Ops/operator-owned for hosted plans; merchant-owned for self-hosted plans
- Staff checklist names, task labels, role names, and procedure content
- Inventory items, forecast rules, alert thresholds
- App icons, PWA manifest, screenshots, theme colors
- Privacy/support URLs and app store metadata

---

## 6. Recommended onboarding sequence

1. **Merchant discovery**
   - Confirm business model, locations, POS, staff workflows, ordering goals, rewards goals, and Bitcoin comfort level.

2. **Accounts and domains**
   - For hosted plans: collect domain/DNS approval plus Square, BTCPay/Spark/Nostr, Apple/Google, and OpenClaw approvals/credentials as needed. GitHub/cloud/server access stays with Open Ops unless the merchant chooses self-hosting.

3. **Brand and assets**
   - Collect logo, colors, app icons, photos, app descriptions, screenshots plan, privacy/support URLs.

4. **Commerce setup**
   - Connect Square catalog/orders/inventory; configure pickup rules; deploy `Squareorder`; verify payment link flow and Square/KDS routing.

5. **BTCPay rewards setup**
   - Install Bitcoin Rewards plugin; configure store, API key, webhooks, reward %, caps, pull payments, Lightning liquidity, and test reward claims.

6. **Identity and chat setup**
   - Generate merchant Nostr keys; configure relays, NIP-05, shop bot, OpenClaw, approved staff/manager identities.

7. **Customer app setup**
   - Rebrand PWA, iOS, and Android; configure API endpoints, domains, wallet/Spark settings, icons, screenshots, and app store metadata.

8. **Staff ops setup**
   - Import checklists, procedures, roles, staff list, inventory/par levels, discrepancy flow, reporting dashboards.

9. **Security pass**
   - Verify no live secrets are committed; rotate any exposed credentials; lock operator secrets/environments; confirm tenant isolation, backup, and access control.

10. **Launch verification**
    - Run PWA build/tests/smokes, API health checks, Square sandbox/live test order, BTCPay invoice/reward test, Nostr DM test, checklist submission test, app builds, TestFlight/internal Play testing.

---

## 7. Minimal pilot checklist

A merchant can pilot Open Ops with a smaller package:

- Domain + DNS approval/delegation
- Open Ops hosted tenant configuration
- Square access token + location ID
- Menu/catalog + pickup rules
- PWA brand assets/icons
- Staff opening/closing checklist
- Owner/admin token
- Privacy/support URLs

Then add advanced modules:

- BTCPay sats rewards
- Native iOS/Android apps
- Nostr identity/chat
- OpenClaw owner assistant
- Inventory/discrepancy Google Sheets integration
- Full app store releases
