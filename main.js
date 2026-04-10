/**
 * Herman Ssimbwa CV — Interactive JavaScript
 * Handles: sidebar nav, mobile menu, scroll animations, active nav
 */

(function () {
  'use strict';

  /* ─── DOM References ─────────────────────────────────────── */
  const sidebar         = document.getElementById('sidebar');
  const menuToggle      = document.getElementById('menuToggle');
  const navLinks        = document.querySelectorAll('.nav-link');
  const sections        = document.querySelectorAll('.content-section, .hero-section');
  const revealElements  = document.querySelectorAll(
    '.timeline-card, .project-card, .cert-card, .referee-card, ' +
    '.pillar-card, .skill-category, .education-card, .hero-stats, ' +
    '.hero-title, .hero-subtitle, .hero-tag, .about-text'
  );

  /* ─── Mobile Sidebar Toggle ──────────────────────────────── */
  let overlay = null;

  function createOverlay () {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeSidebar);
  }

  function openSidebar () {
    sidebar.classList.add('open');
    overlay && overlay.classList.add('active');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar () {
    sidebar.classList.remove('open');
    overlay && overlay.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
  }

  function isMobile () { return window.innerWidth <= 768; }

  menuToggle.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  createOverlay();

  /* ─── Smooth Scroll ──────────────────────────────────────── */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      const offset = 24;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });

      if (isMobile()) closeSidebar();
    });
  });

  /* ─── Active Nav on Scroll ───────────────────────────────── */
  const sectionIds = Array.from(navLinks).map(function (l) {
    return l.getAttribute('data-section');
  });

  function updateActiveNav () {
    const scrollY = window.scrollY + 120;
    let current = sectionIds[0];

    sectionIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        current = id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
  }

  /* ─── Scroll Reveal ──────────────────────────────────────── */
  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger cards within the same parent
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.children).filter(
                function (c) { return c.classList.contains('reveal'); }
              )
            : [];
          const idx = siblings.indexOf(entry.target);
          const delay = idx >= 0 ? idx * 80 : 0;

          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  revealElements.forEach(function (el) { observer.observe(el); });

  /* ─── Scroll Listener ────────────────────────────────────── */
  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateActiveNav(); // initial call

  /* ─── Resize Handler ─────────────────────────────────────── */
  window.addEventListener('resize', function () {
    if (!isMobile() && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  /* ─── Animated Stat Counter ──────────────────────────────── */
  function animateCounter (el, target, suffix, duration) {
    const start    = 0;
    const startTs  = performance.now();
    const isFloat  = String(target).includes('.');

    function step (ts) {
      const elapsed  = ts - startTs;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value    = start + (target - start) * eased;

      el.textContent = (isFloat ? value.toFixed(2) : Math.floor(value)) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Observe stat numbers
  const statNumbers = document.querySelectorAll('.stat-number');

  const statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el   = entry.target;
          const text = el.textContent.trim();
          const num  = parseFloat(text.replace(/[^0-9.]/g, ''));
          const sfx  = text.replace(/[0-9.]/g, '');

          if (!isNaN(num)) {
            animateCounter(el, num, sfx, 1500);
          }
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(function (el) { statObserver.observe(el); });

  /* ─── Typing Effect for Hero Tag ─────────────────────────── */
  const heroTag = document.querySelector('.hero-tag');

  if (heroTag) {
    const original = heroTag.innerHTML;
    const textOnly = heroTag.textContent.trim();
    const icon     = heroTag.querySelector('i') ? heroTag.querySelector('i').outerHTML : '';
    let   charIdx  = 0;

    heroTag.innerHTML = icon + '<span class="typed-text"></span><span class="type-cursor">|</span>';

    const typedSpan  = heroTag.querySelector('.typed-text');
    const cursorSpan = heroTag.querySelector('.type-cursor');

    // cursor blink
    cursorSpan.style.cssText = 'animation: cursor-blink 0.8s step-end infinite; color: var(--accent-blue);';

    const styleEl = document.createElement('style');
    styleEl.textContent = '@keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }';
    document.head.appendChild(styleEl);

    function typeChar () {
      if (charIdx < textOnly.length) {
        // skip icon text portion
        typedSpan.textContent = textOnly.slice(0, charIdx + 1);
        charIdx++;
        setTimeout(typeChar, 45 + Math.random() * 35);
      } else {
        // remove cursor after done
        setTimeout(function () {
          cursorSpan.style.display = 'none';
        }, 800);
      }
    }

    // Start after a short delay
    setTimeout(typeChar, 600);
  }

  /* ─── Timeline item hover glow ───────────────────────────── */
  document.querySelectorAll('.timeline-item').forEach(function (item) {
    const dot = item.querySelector('.marker-dot');
    if (!dot) return;

    item.addEventListener('mouseenter', function () {
      dot.style.boxShadow = '0 0 18px rgba(47, 126, 247, 0.7)';
      dot.style.background = 'var(--accent-blue)';
    });

    item.addEventListener('mouseleave', function () {
      dot.style.boxShadow = '0 0 10px rgba(47, 126, 247, 0.4)';
      dot.style.background = 'var(--bg-base)';
    });
  });

  /* ─── Skill tag hover ripple ─────────────────────────────── */
  document.querySelectorAll('.skill-tag').forEach(function (tag) {
    tag.addEventListener('click', function () {
      tag.style.transform = 'scale(0.95)';
      setTimeout(function () { tag.style.transform = ''; }, 120);
    });
  });

  console.log('%c Herman Ssimbwa CV ', 'background:#2f7ef7;color:#fff;padding:4px 8px;border-radius:4px;font-weight:700;');
  console.log('%c IT Specialist & Digital Transformation Advisor ', 'color:#3a8cff;');

})();
