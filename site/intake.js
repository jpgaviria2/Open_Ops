const CONTACT_EMAIL = 'jp@trailscoffee.com';

const form = document.getElementById('merchant-intake-form');
const output = document.getElementById('intake-output');
const summaryEl = document.getElementById('intake-summary');
const copyButton = document.getElementById('copy-intake');
const downloadButton = document.getElementById('download-intake');
const emailLink = document.getElementById('email-intake');
const copyStatus = document.getElementById('copy-status');

let latestPayload = null;
let latestSummary = '';

function getCheckedValues(name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function getValue(name) {
  const field = form.elements[name];
  return typeof field?.value === 'string' ? field.value.trim() : '';
}

function buildPayload() {
  return {
    submitted_at: new Date().toISOString(),
    business: {
      name: getValue('businessName'),
      contact_name: getValue('contactName'),
      email: getValue('email'),
      website_or_social: getValue('website'),
      business_type: getValue('businessType'),
      locations: getValue('locations'),
      pos_system: getValue('posSystem'),
    },
    requested_modules: getCheckedValues('modules'),
    custom_onboarding_question: {
      question:
        'If Open Ops could remove one recurring weekly headache from your business in the next 30 days, what would it be — and what would fixed look like?',
      answer: getValue('weeklyHeadache'),
    },
    readiness: {
      square: getValue('squareReadiness'),
      bitcoin_rewards: getValue('bitcoinReadiness'),
      timeline: getValue('timeline'),
      domains: getValue('domains'),
    },
    assets: {
      brand_assets: getValue('brandAssets'),
      screenshots_status: getValue('screenshotsStatus'),
      screenshot_links_or_notes: getValue('screenshotNotes'),
    },
    notes: getValue('notes'),
  };
}

function formatList(items) {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : '- Not selected yet';
}

function buildSummary(payload) {
  return `Open Ops merchant intake

Business
- Name: ${payload.business.name || '—'}
- Contact: ${payload.business.contact_name || '—'}
- Email: ${payload.business.email || '—'}
- Website/social: ${payload.business.website_or_social || '—'}
- Type: ${payload.business.business_type || '—'}
- Locations: ${payload.business.locations || '—'}
- POS: ${payload.business.pos_system || '—'}

Requested modules
${formatList(payload.requested_modules)}

Custom onboarding question
Question: ${payload.custom_onboarding_question.question}
Answer: ${payload.custom_onboarding_question.answer || '—'}

Readiness
- Square: ${payload.readiness.square || '—'}
- Bitcoin/rewards: ${payload.readiness.bitcoin_rewards || '—'}
- Timeline: ${payload.readiness.timeline || '—'}
- Domains: ${payload.readiness.domains || '—'}

Assets and screenshots
- Brand assets: ${payload.assets.brand_assets || '—'}
- Screenshots: ${payload.assets.screenshots_status || '—'}
- Screenshot links/notes: ${payload.assets.screenshot_links_or_notes || '—'}

Notes
${payload.notes || '—'}

Generated: ${payload.submitted_at}`;
}

function updateEmailLink(payload, summary) {
  const businessName = payload.business.name || 'New merchant';
  const subject = encodeURIComponent(`Open Ops intake — ${businessName}`);
  const body = encodeURIComponent(`${summary}\n\nScreenshot files can be attached to this email or sent separately.`);
  emailLink.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  latestPayload = buildPayload();
  latestSummary = buildSummary(latestPayload);
  summaryEl.value = latestSummary;
  output.hidden = false;
  updateEmailLink(latestPayload, latestSummary);
  copyStatus.textContent = 'Intake packet generated.';
  output.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

copyButton.addEventListener('click', async () => {
  if (!latestSummary) return;
  try {
    await navigator.clipboard.writeText(latestSummary);
    copyStatus.textContent = 'Copied intake packet to clipboard.';
  } catch {
    summaryEl.select();
    document.execCommand('copy');
    copyStatus.textContent = 'Copied intake packet to clipboard.';
  }
});

downloadButton.addEventListener('click', () => {
  if (!latestPayload) return;
  const slug = (latestPayload.business.name || 'merchant')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'merchant';
  const blob = new Blob([JSON.stringify(latestPayload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `open-ops-intake-${slug}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  copyStatus.textContent = 'Downloaded JSON intake packet.';
});

form.addEventListener('reset', () => {
  latestPayload = null;
  latestSummary = '';
  output.hidden = true;
  copyStatus.textContent = '';
});
