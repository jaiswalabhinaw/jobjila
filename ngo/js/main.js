// ---------- Mobile menu toggle ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  const active = mobileMenu.classList.toggle('active');
  mobileMenu.setAttribute('aria-hidden', !active);
  // toggle aria-expanded on hamburger (for accessibility)
  hamburger.setAttribute('aria-expanded', active);
}

// Open/close on hamburger click
if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains('active')) {
    toggleMenu();
  }
});

// ---------- Fade-in on scroll ----------
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.15, rootMargin: '0px 0px -30px 0px' };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(f => appearOnScroll.observe(f));

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
    // close others
    document.querySelectorAll('.faq-item').forEach(el => {
      if (el !== item) el.classList.remove('active');
    });
  });
});

// ---------- Counter animation ----------
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target') || 0, 10);
      const duration = 1200;
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.innerText = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.innerText = target;
      };

      requestAnimationFrame(step);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));

// ---------- Smooth scrolling ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // close menu if open
      if (mobileMenu.classList.contains('active')) toggleMenu();
    }
  });
});
