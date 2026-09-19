// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const revealTargets = document.querySelectorAll(
  '.section-head, .about-grid, .stack-card, .domain-card, .lead-grid, .progress-card, .contact-card'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => io.observe(el));

// Efeito de "digitação" no terminal do hero
function typeInto(el, text, speed = 28) {
  return new Promise((resolve) => {
    if (!el) return resolve();
    let i = 0;
    el.textContent = '';
    const timer = setInterval(() => {
      el.textContent += text[i];
      i += 1;
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function runTerminal() {
  const out1 = document.getElementById('termOut1');
  const out2 = document.getElementById('termOut2');
  const cmd3 = document.getElementById('termCmd3');

  await typeInto(out1, 'backend developer, tech lead em teste', 22);
  await new Promise((r) => setTimeout(r, 350));
  await typeInto(out2, '"node" "typescript" "express" "typeorm" "aws"', 18);
  await new Promise((r) => setTimeout(r, 350));
  if (cmd3) {
    cmd3.classList.remove('blink-cursor');
    await typeInto(cmd3, 'open contato.md', 45);
    cmd3.classList.add('blink-cursor');
  }
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.getElementById('termOut1').textContent = 'backend developer, tech lead em teste';
  document.getElementById('termOut2').textContent = '"node" "typescript" "express" "typeorm" "aws"';
  document.getElementById('termCmd3').textContent = 'open contato.md';
  revealTargets.forEach((el) => el.classList.add('is-visible'));
} else {
  window.addEventListener('load', () => {
    setTimeout(runTerminal, 400);
  });
}
