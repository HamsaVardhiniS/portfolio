// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== TYPED HERO SUBTITLE =====
const phrases = [
  "Building reliable ML systems",
  "Bridging math and code",
  "Currently: Research Intern @ IIITB",
  "Turning signals into decisions"
];
const typedEl = document.getElementById('typedText');
let phraseIndex = 0;
let charIndex = phrases[0].length;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    charIndex++;
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      charIndex = 0;
    }
  }
  typedEl.textContent = phrases[phraseIndex].slice(0, charIndex);
  setTimeout(typeLoop, deleting ? 35 : 55);
}
setTimeout(typeLoop, 1200);

// ===== CURSOR-AWARE BACKGROUND BLOB =====
const blob = document.getElementById('bgBlob');
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function moveBlob() {
  const currentTransform = blob.style.transform || 'translate(0px,0px)';
  const targetX = mouseX * 0.08;
  const targetY = mouseY * 0.08;
  blob.style.transform = `translate(${targetX}px, ${targetY}px)`;
  requestAnimationFrame(moveBlob);
}
moveBlob();

// ===== PROJECT FILTER PILLS =====
const pills = document.querySelectorAll('.pill');
const miniCards = document.querySelectorAll('.mini-card');
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.dataset.filter;
    miniCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SKILL CHIP <-> PROJECT HIGHLIGHT =====
const chips = document.querySelectorAll('.chip');
const allCardsWithTags = document.querySelectorAll('.feature-card, .mini-card');

chips.forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    const tag = chip.dataset.tag;
    let matched = false;
    allCardsWithTags.forEach(card => {
      const cardTags = card.dataset.tags || '';
      if (cardTags.includes(tag)) {
        matched = true;
      }
    });
    if (matched) {
      allCardsWithTags.forEach(card => {
        const cardTags = card.dataset.tags || '';
        if (!cardTags.includes(tag)) {
          card.classList.add('dim');
        }
      });
    }
  });
  chip.addEventListener('mouseleave', () => {
    allCardsWithTags.forEach(card => card.classList.remove('dim'));
  });
});
