/* ============================================================
   HOFER LANDESPRODUKTE — landing page interactions
   GSAP + ScrollTrigger + Lenis + Three.js particle field
   (a golden grain-field swaying over Feldgrün)
   ============================================================ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarse = window.matchMedia('(pointer: coarse)').matches;
  var hasGSAP = typeof gsap !== 'undefined';
  var hasST = typeof ScrollTrigger !== 'undefined';

  if (hasGSAP && hasST) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Split text into characters ---------------- */
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var text = el.textContent;
    el.textContent = '';
    text.split('').forEach(function (ch) {
      var span = document.createElement('span');
      span.className = 'ch';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(span);
    });
  });

  /* ---------------- Smooth scroll (Lenis) ---------------- */
  var lenis = null;
  if (typeof Lenis !== 'undefined' && !prefersReduced) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.lenis = lenis; // exposed for debugging

    if (hasGSAP) {
      lenis.on('scroll', function () { if (hasST) ScrollTrigger.update(); });
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }

  /* ---------------- Mobile menu ---------------- */
  var burger = document.getElementById('burger');
  var menuEl = document.getElementById('menu');
  var menuOpen = false;
  function setMenu(open) {
    if (!burger || !menuEl) return;
    menuOpen = open;
    menuEl.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menuEl.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (lenis) { if (open) lenis.stop(); else lenis.start(); }
    if (open && hasGSAP && !prefersReduced) {
      gsap.fromTo('.menu__links a',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out', delay: 0.08 });
    }
    navState();
  }
  if (burger && menuEl) {
    burger.addEventListener('click', function () { setMenu(!menuOpen); });
  }

  // Anchor links work with Lenis
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (menuOpen) setMenu(false);
      if (lenis) lenis.scrollTo(target, { offset: 0 });
      else target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* ---------------- Lustenau clock ---------------- */
  var clockEl = document.getElementById('clock');
  function tick() {
    if (!clockEl) return;
    clockEl.textContent = new Intl.DateTimeFormat('de-AT', {
      timeZone: 'Europe/Vienna', hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(new Date());
  }
  tick();
  setInterval(tick, 1000);

  /* ---------------- Nav: light over light sections, dark over dark ---------------- */
  var nav = document.getElementById('nav');
  var hero = document.getElementById('hero');
  var darkSections = Array.prototype.slice.call(document.querySelectorAll('[data-nav-dark]'));
  function navState() {
    if (!nav) return;
    if (menuOpen) { nav.classList.remove('nav--light'); return; }
    var overDark = darkSections.some(function (s) {
      var r = s.getBoundingClientRect();
      return r.top < 70 && r.bottom > 0;
    });
    nav.classList.toggle('nav--light', !overDark);
  }
  window.addEventListener('scroll', navState, { passive: true });
  if (lenis) lenis.on('scroll', navState);
  navState();

  /* ---------------- Hero intro (kein Preloader auf dieser Seite) ---------------- */
  function heroIntro() {
    if (!hasGSAP) return;
    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.hero__title .ch',
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, stagger: 0.045 }, 0)
      .fromTo('.hero [data-reveal], .nav',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.2);
  }

  if (hasGSAP && !prefersReduced) {
    // Hide animated elements up-front, then play the hero intro right away
    // (no 0–100 loading screen).
    gsap.set('.hero__title .ch', { yPercent: 110 });
    gsap.set('.hero [data-reveal], .nav', { autoAlpha: 0 });
    heroIntro();
  }

  /* ---------------- Scroll reveals ---------------- */
  if (hasGSAP && hasST && !prefersReduced) {

    // Hero content drifts up + fades as you scroll away
    gsap.to('.hero__inner', {
      yPercent: -12, autoAlpha: 0.3, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 30%', scrub: true }
    });

    // Seasons: pinned horizontal scroll on desktop
    var seasonsTrack = document.getElementById('seasonsTrack');
    if (seasonsTrack) {
      var mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', function () {
        var dist = function () { return Math.max(0, seasonsTrack.scrollWidth - window.innerWidth); };
        gsap.to(seasonsTrack, {
          x: function () { return -dist(); }, ease: 'none',
          scrollTrigger: {
            trigger: '.seasons', start: 'top top',
            end: function () { return '+=' + dist(); },
            scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true
          }
        });
        gsap.to('.seasons__progress span', {
          scaleX: 1, ease: 'none',
          scrollTrigger: {
            trigger: '.seasons', start: 'top top',
            end: function () { return '+=' + dist(); },
            scrub: 1, invalidateOnRefresh: true
          }
        });
      });
    }

    // Re-measure pinned sections after full load (fonts/images) and once
    // resizes settle — a pinned section must never keep a stale viewport size.
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { ScrollTrigger.refresh(); }, 250);
    });

    // Generic reveals outside the hero
    gsap.utils.toArray('main section:not(.hero) [data-reveal]').forEach(function (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 36 }, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // Contact big type
    gsap.fromTo('.contact__title .ch', { yPercent: 110 }, {
      yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.04,
      scrollTrigger: { trigger: '.contact', start: 'top 70%' }
    });

    // Project cards
    gsap.utils.toArray('.project').forEach(function (card, idx) {
      gsap.fromTo(card, { autoAlpha: 0, y: 70 }, {
        autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', delay: (idx % 2) * 0.12,
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
    });

    // Parallax inside project visuals
    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      gsap.fromTo(el, { yPercent: -7 }, {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: el.closest('.project__visual'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // About text — word-by-word scrub
    var aboutText = document.getElementById('aboutText');
    if (aboutText) {
      var words = aboutText.textContent.split(' ');
      aboutText.innerHTML = words.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
      gsap.to('#aboutText .w', {
        opacity: 1, stagger: 0.06, ease: 'none',
        scrollTrigger: { trigger: aboutText, start: 'top 80%', end: 'bottom 45%', scrub: true }
      });
    }

    // Stats counters
    gsap.utils.toArray('.stat__num').forEach(function (el) {
      var target = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || '';
      var obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.6, ease: 'power2.out',
        onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; },
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // Service rows
    gsap.utils.toArray('.svc__row').forEach(function (row, idx) {
      gsap.fromTo(row, { autoAlpha: 0, x: -34 }, {
        autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: idx * 0.06,
        scrollTrigger: { trigger: row, start: 'top 92%' }
      });
    });

  } else {
    // Reduced motion / no GSAP: everything stays visible; fill final values
    document.querySelectorAll('.stat__num').forEach(function (el) {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
    var about = document.getElementById('aboutText');
    if (about) about.style.opacity = 1;
    var style = document.createElement('style');
    style.textContent = '.about__text .w{opacity:1!important}';
    document.head.appendChild(style);
  }

  /* ---------------- Seasons progress on mobile (native swipe) ---------------- */
  var sTrack = document.getElementById('seasonsTrack');
  var sBar = document.querySelector('.seasons__progress span');
  if (sTrack && sBar) {
    var trackProgress = function () {
      if (window.matchMedia('(min-width: 900px)').matches && hasGSAP && hasST && !prefersReduced) return;
      var max = sTrack.scrollWidth - sTrack.clientWidth;
      sBar.style.transform = 'scaleX(' + (max > 0 ? sTrack.scrollLeft / max : 1) + ')';
    };
    sTrack.addEventListener('scroll', trackProgress, { passive: true });
    trackProgress();
  }


  /* ---------------- Custom cursor + magnetic ---------------- */
  if (!isCoarse) {
    var cursor = document.getElementById('cursor');
    var label = document.getElementById('cursorLabel');
    if (cursor && hasGSAP) {
      var xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
      var yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });
      window.addEventListener('pointermove', function (e) {
        cursor.classList.add('cursor--on');
        xTo(e.clientX); yTo(e.clientY);
      }, { passive: true });

      document.querySelectorAll('[data-cursor]').forEach(function (el) {
        el.addEventListener('pointerenter', function () {
          var mode = el.dataset.cursor;
          cursor.classList.toggle('cursor--link', mode === 'link');
          cursor.classList.toggle('cursor--view', mode === 'view');
          label.textContent = mode === 'view' ? 'Mehr' : '';
        });
        el.addEventListener('pointerleave', function () {
          cursor.classList.remove('cursor--link', 'cursor--view');
          label.textContent = '';
        });
      });
    }

    // Magnetic buttons
    if (hasGSAP) {
      document.querySelectorAll('[data-magnetic]').forEach(function (el) {
        var strength = 0.35;
        el.addEventListener('pointermove', function (e) {
          var b = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - b.left - b.width / 2) * strength,
            y: (e.clientY - b.top - b.height / 2) * strength,
            duration: 0.4, ease: 'power3.out'
          });
        });
        el.addEventListener('pointerleave', function () {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        });
      });
    }
  }
})();
