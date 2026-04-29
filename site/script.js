const slides = Array.from(document.querySelectorAll('.slide'));
const slideCount = document.getElementById('slide-count');
const progressFill = document.getElementById('progress-fill');
const notesToggle = document.getElementById('notes-toggle');
const printButton = document.getElementById('print-button');

let current = getSlideFromHash();

function getSlideFromHash() {
  const raw = window.location.hash.replace('#', '');
  const parsed = Number.parseInt(raw, 10);
  if (Number.isFinite(parsed) && parsed >= 1 && parsed <= slides.length) {
    return parsed - 1;
  }
  return 0;
}

function render() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === current);
    slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
  });

  const human = current + 1;
  slideCount.textContent = `${human} / ${slides.length}`;
  progressFill.style.width = `${(human / slides.length) * 100}%`;

  const title = slides[current].dataset.title || `Slide ${human}`;
  document.title = `${human}. ${title} — Open Ops`;

  if (window.location.hash !== `#${human}`) {
    history.replaceState(null, '', `#${human}`);
  }
}

function go(delta) {
  current = Math.max(0, Math.min(slides.length - 1, current + delta));
  render();
}

function goTo(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  render();
}

window.addEventListener('keydown', (event) => {
  const tag = document.activeElement?.tagName?.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

  switch (event.key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
      event.preventDefault();
      go(1);
      break;
    case 'ArrowLeft':
    case 'PageUp':
      event.preventDefault();
      go(-1);
      break;
    case 'Home':
      event.preventDefault();
      goTo(0);
      break;
    case 'End':
      event.preventDefault();
      goTo(slides.length - 1);
      break;
    case 'n':
    case 'N':
      event.preventDefault();
      toggleNotes();
      break;
    case 'p':
    case 'P':
      event.preventDefault();
      window.print();
      break;
    default:
      break;
  }
});

window.addEventListener('hashchange', () => {
  current = getSlideFromHash();
  render();
});

let touchStartX = null;
window.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
});

window.addEventListener('touchend', (event) => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 60) {
    go(delta < 0 ? 1 : -1);
  }
  touchStartX = null;
});

function toggleNotes() {
  const showing = document.body.classList.toggle('show-notes');
  notesToggle.setAttribute('aria-pressed', showing ? 'true' : 'false');
}

notesToggle.addEventListener('click', toggleNotes);
printButton.addEventListener('click', () => window.print());

render();
