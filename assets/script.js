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

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function runTerminal() {
  const out1 = document.getElementById('termOut1');
  const out2 = document.getElementById('termOut2');
  const cmd3 = document.getElementById('termCmd3');
  if (!out1 || !out2 || !cmd3) return;

  const text1 = out1.textContent;
  const text2 = out2.textContent;
  const text3 = cmd3.textContent;

  await typeInto(out1, text1, 22);
  await new Promise((r) => setTimeout(r, 350));
  await typeInto(out2, text2, 18);
  await new Promise((r) => setTimeout(r, 350));
  await typeInto(cmd3, text3, 45);
  cmd3.classList.add('blink-cursor');
}

if (!prefersReducedMotion) {
  window.addEventListener('load', () => {
    setTimeout(runTerminal, 400);
  });
}
