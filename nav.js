// ── PAGE LOADER ───────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (loader) loader.classList.add('hidden');
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('loaded');
  }, 1200);
});

// ── SCROLL NAV ────────────────────────────────────────────
const nav = document.querySelector('.site-nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── ACTIVE NAV LINK ───────────────────────────────────────
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── MOBILE HAMBURGER ──────────────────────────────────────
const burger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) navLinks.classList.remove('open');
  });
}

// ── SCROLL ANIMATIONS ─────────────────────────────────────
const animEls = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
animEls.forEach(el => observer.observe(el));

// ── COUNTER ANIMATIONS ────────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = (eased * target).toFixed(decimals);
    el.textContent = prefix + val + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// ── TICKER DUPLICATE ──────────────────────────────────────
const ticker = document.querySelector('.ticker-inner');
if (ticker) {
  const clone = ticker.cloneNode(true);
  ticker.parentNode.appendChild(clone);
}

// ── PARALLAX HERO ─────────────────────────────────────────
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${offset * 0.25}px)`;
  }, { passive: true });
}
