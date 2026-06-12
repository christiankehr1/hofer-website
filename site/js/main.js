/* HOFER Landesprodukte — shared layout + behaviors.
   Header, footer and the RFQ dialog are injected here so all
   pages stay consistent from one source. */

(function () {
  'use strict';

  var PHONE = '+43 5577 84 740';
  var TEL = 'tel:+43557784740';
  var WHATSAPP = 'https://wa.me/43557784740?text=' + encodeURIComponent('Guten Tag, ich habe eine Anfrage zu');

  /* ---------- Header ---------- */
  var NAV_LINKS = [
    { id: 'home', label: 'Start', href: 'index.html' },
    { id: 'produkte', label: 'Produkte', href: 'produkte.html' },
    { id: 'dienstleistungen', label: 'Dienstleistungen', href: 'dienstleistungen.html' },
    { id: 'verzollung', label: 'Verzollung', href: 'verzollung.html' },
    { id: 'unternehmen', label: 'Unternehmen', href: 'unternehmen.html' },
    { id: 'kontakt', label: 'Kontakt', href: 'kontakt.html' },
  ];

  var LANGS = [
    { code: 'DE', label: 'Deutsch' },
    { code: 'EN', label: 'English' },
    { code: 'IT', label: 'Italiano' },
  ];

  function navLinkHtml(page, cls) {
    return NAV_LINKS.map(function (l) {
      var active = l.id === page;
      return '<a class="nav-link' + (active ? ' is-active' : '') + '" href="' + l.href + '"' +
        (active ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
    }).join('');
  }

  function langSwitcherHtml() {
    return '' +
      '<div class="lang" data-lang>' +
      '  <button class="lang__btn" type="button" aria-haspopup="listbox" aria-expanded="false">' +
      '    <i data-lucide="globe"></i><span data-lang-current>DE</span><i data-lucide="chevron-down"></i>' +
      '  </button>' +
      '  <ul class="lang__menu" role="listbox">' +
      LANGS.map(function (l, i) {
        return '<li><button class="lang__option' + (i === 0 ? ' is-active' : '') + '" type="button" role="option" data-lang-code="' + l.code + '" aria-selected="' + (i === 0) + '">' +
          l.label + (i === 0 ? '<i data-lucide="check"></i>' : '') + '</button></li>';
      }).join('') +
      '  </ul>' +
      '</div>';
  }

  function renderHeader(page) {
    var el = document.getElementById('site-header');
    if (!el) return;
    el.outerHTML = '' +
      '<header class="site-header">' +
      '  <div class="container site-header__inner">' +
      '    <a class="site-header__logo" href="index.html"><img src="assets/logo-hofer.png" alt="HOFER Landesprodukte"></a>' +
      '    <nav class="nav-desktop" aria-label="Hauptnavigation">' + navLinkHtml(page) + '</nav>' +
      '    <div class="nav-actions">' + langSwitcherHtml() +
      '      <button class="btn btn--sm" type="button" data-rfq-open>Anfrage stellen</button>' +
      '    </div>' +
      '    <button class="burger" type="button" aria-label="Menü" aria-expanded="false" data-burger><i data-lucide="menu"></i></button>' +
      '  </div>' +
      '  <div class="nav-mobile" data-mobile-menu>' +
      '    <nav aria-label="Mobile Navigation">' + navLinkHtml(page) +
      '      <div class="nav-mobile__footer">' + langSwitcherHtml() +
      '        <button class="btn btn--sm" type="button" data-rfq-open>Anfrage</button>' +
      '      </div>' +
      '    </nav>' +
      '  </div>' +
      '</header>';
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    var year = new Date().getFullYear();
    el.outerHTML = '' +
      '<footer class="site-footer">' +
      '  <div class="container site-footer__inner">' +
      '    <div class="site-footer__grid">' +
      '      <div class="site-footer__brand">' +
      '        <img src="assets/logo-hofer.png" alt="HOFER Landesprodukte">' +
      '        <p class="site-footer__address">Vorachstraße 150<br>A-6890 Lustenau<br>Österreich</p>' +
      '        <a class="site-footer__phone num" href="' + TEL + '">' + PHONE + '</a>' +
      '      </div>' +
      '      <div>' +
      '        <div class="site-footer__col-title">Produkte</div>' +
      '        <ul>' +
      '          <li><a href="produkte.html">Futtermittel</a></li>' +
      '          <li><a href="produkte.html">Einstreu</a></li>' +
      '          <li><a href="produkte.html">Düngemittel</a></li>' +
      '          <li><a href="produkte.html">Biogas-Substrate</a></li>' +
      '        </ul>' +
      '      </div>' +
      '      <div>' +
      '        <div class="site-footer__col-title">Dienstleistungen</div>' +
      '        <ul>' +
      '          <li><a href="dienstleistungen.html">Spezialtransporte</a></li>' +
      '          <li><a href="verzollung.html">Verzollung EU ↔ CH</a></li>' +
      '          <li><a href="dienstleistungen.html">Liefergebiet</a></li>' +
      '        </ul>' +
      '      </div>' +
      '      <div>' +
      '        <div class="site-footer__col-title">Unternehmen</div>' +
      '        <ul>' +
      '          <li><a href="unternehmen.html">Über uns</a></li>' +
      '          <li><a href="unternehmen.html">Firmengruppen</a></li>' +
      '          <li><a href="kontakt.html">Jobs</a></li>' +
      '          <li><a href="kontakt.html">Aktuelles</a></li>' +
      '        </ul>' +
      '      </div>' +
      '    </div>' +
      '    <div class="site-footer__legal">' +
      '      <span>© ' + year + ' HOFER Landesprodukte GmbH &amp; Co KG</span>' +
      '      <div class="site-footer__legal-links">' +
      '        <a href="#">Impressum</a><a href="#">Datenschutz</a><a href="#">AGB</a>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</footer>' +
      '<div class="sticky-call"><a href="' + TEL + '" aria-label="Anrufen: ' + PHONE + '"><i data-lucide="phone"></i> Anrufen · ' + PHONE + '</a></div>';
  }

  /* ---------- RFQ dialog (reusable 2-step Anfrage flow) ---------- */
  function renderRFQ() {
    var el = document.createElement('div');
    el.className = 'rfq';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Anfrage stellen');
    el.setAttribute('data-rfq', '');
    el.innerHTML = '' +
      '<div class="rfq__sheet">' +
      '  <div class="rfq__head">' +
      '    <div>' +
      '      <div class="overline overline--gold">Anfrage · unverbindlich</div>' +
      '      <div class="rfq__title">Angebot anfordern</div>' +
      '    </div>' +
      '    <button class="rfq__close" type="button" aria-label="Schließen" data-rfq-close><i data-lucide="x"></i></button>' +
      '  </div>' +
      '  <div class="rfq__body" data-rfq-form>' +
      '    <div class="rfq__steps">' +
      '      <span class="is-active" data-step-label="1">1 Produkt</span>' +
      '      <i data-lucide="chevron-right"></i>' +
      '      <span data-step-label="2">2 Kontakt</span>' +
      '    </div>' +
      '    <div data-step="1" class="is-active">' +
      '      <div class="field field--select">' +
      '        <label for="rfq-cat">Produktkategorie <span class="req">*</span></label>' +
      '        <select id="rfq-cat" required>' +
      '          <option value="" disabled selected>Bitte wählen …</option>' +
      HOFER_CATEGORIES.map(function (c) { return '<option>' + c.label + '</option>'; }).join('') +
      '          <option>Verzollung</option>' +
      '        </select>' +
      '        <span class="field__chevron"><i data-lucide="chevron-down"></i></span>' +
      '      </div>' +
      '      <div class="form-row">' +
      '        <div class="field"><label for="rfq-menge">Menge</label><input id="rfq-menge" type="text" placeholder="z. B. 24 t / 40 Ballen"></div>' +
      '        <div class="field"><label for="rfq-termin">Wunschtermin</label><input id="rfq-termin" type="text" placeholder="z. B. KW 32"></div>' +
      '      </div>' +
      '      <div class="field"><label for="rfq-ort">Lieferort</label><input id="rfq-ort" type="text" placeholder="PLZ / Ort, Land"></div>' +
      '      <button class="btn btn--full" type="button" data-rfq-next>Weiter zu Kontakt <i data-lucide="arrow-right"></i></button>' +
      '    </div>' +
      '    <div data-step="2">' +
      '      <div class="form-row">' +
      '        <div class="field"><label for="rfq-name">Name <span class="req">*</span></label><input id="rfq-name" type="text" required placeholder="Ihr Name"></div>' +
      '        <div class="field"><label for="rfq-betrieb">Betrieb</label><input id="rfq-betrieb" type="text" placeholder="Betriebsname"></div>' +
      '      </div>' +
      '      <div class="form-row">' +
      '        <div class="field"><label for="rfq-tel">Telefon <span class="req">*</span></label><input id="rfq-tel" type="tel" required placeholder="+43 …"></div>' +
      '        <div class="field"><label for="rfq-mail">E-Mail</label><input id="rfq-mail" type="email" placeholder="name@betrieb.at"></div>' +
      '      </div>' +
      '      <div class="field"><label for="rfq-note">Anmerkung</label><textarea id="rfq-note" rows="3" placeholder="Weitere Angaben (optional)"></textarea></div>' +
      '      <div style="display:flex;gap:0.75rem;">' +
      '        <button class="btn btn--secondary" type="button" data-rfq-back>Zurück</button>' +
      '        <button class="btn btn--full" type="button" data-rfq-send>Anfrage senden</button>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="rfq__success" data-rfq-success hidden>' +
      '    <span class="rfq__success-icon"><i data-lucide="check"></i></span>' +
      '    <h3>Anfrage gesendet</h3>' +
      '    <p>Wir melden uns werktags innerhalb von 24 Stunden mit einem Angebot. Bei Eile rufen Sie uns direkt an.</p>' +
      '    <div class="rfq__success-actions">' +
      '      <button class="btn btn--secondary" type="button" data-rfq-close>Schließen</button>' +
      '      <a class="btn" href="' + TEL + '"><i data-lucide="phone"></i> Anrufen</a>' +
      '    </div>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  /* ---------- Product cards ---------- */
  function productCardHtml(p) {
    var cat = HOFER_CATEGORIES.find(function (c) { return c.id === p.cat; });
    var avail = HOFER_AVAIL[p.avail];
    return '' +
      '<article class="product-card" data-cat="' + p.cat + '">' +
      '  <div class="product-card__media">' +
      '    <div class="placeholder placeholder--card placeholder--' + p.tone + ' placeholder--rounded-none" role="img" aria-label="' + p.name + '. ' + p.brief + '">' +
      '      <i data-lucide="image"></i>' +
      '      <div>' +
      '        <div class="placeholder__label">' + p.name + '</div>' +
      '        <div class="placeholder__brief"><i data-lucide="camera"></i><span>' + p.brief + '</span></div>' +
      '      </div>' +
      '    </div>' +
      (p.bio ? '<span class="product-card__bio">BIO</span>' : '') +
      '  </div>' +
      '  <div class="product-card__body">' +
      '    <span class="overline">' + cat.label + '</span>' +
      '    <h4>' + p.name + '</h4>' +
      '    <p class="product-card__desc">' + p.desc + '</p>' +
      '    <div class="product-card__foot">' +
      '      <span class="avail avail--' + avail.variant + '" role="status"><i data-lucide="' + avail.icon + '"></i>' + avail.label + '</span>' +
      '      <a class="product-card__cta" href="#" data-rfq-open data-rfq-product="' + p.name + '">Anfragen <i data-lucide="arrow-right"></i></a>' +
      '    </div>' +
      '  </div>' +
      '</article>';
  }

  function renderProducts() {
    document.querySelectorAll('[data-product-grid]').forEach(function (grid) {
      var limit = parseInt(grid.getAttribute('data-limit') || '0', 10);
      var list = limit ? HOFER_PRODUCTS.slice(0, limit) : HOFER_PRODUCTS;
      grid.innerHTML = list.map(productCardHtml).join('');
    });
  }

  /* ---------- Behaviors ---------- */
  function initBurger() {
    var burger = document.querySelector('[data-burger]');
    var menu = document.querySelector('[data-mobile-menu]');
    if (!burger || !menu) return;
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.innerHTML = '<i data-lucide="' + (open ? 'x' : 'menu') + '"></i>';
      lucide.createIcons();
    });
  }

  function initLang() {
    document.querySelectorAll('[data-lang]').forEach(function (root) {
      var btn = root.querySelector('.lang__btn');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = root.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
      root.querySelectorAll('[data-lang-code]').forEach(function (opt) {
        opt.addEventListener('click', function () {
          var code = opt.getAttribute('data-lang-code');
          root.querySelector('[data-lang-current]').textContent = code;
          root.querySelectorAll('[data-lang-code]').forEach(function (o) {
            var on = o === opt;
            o.classList.toggle('is-active', on);
            o.setAttribute('aria-selected', String(on));
            o.innerHTML = o.textContent + (on ? '<i data-lucide="check"></i>' : '');
          });
          root.classList.remove('is-open');
          lucide.createIcons();
        });
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('[data-lang].is-open').forEach(function (r) { r.classList.remove('is-open'); });
    });
  }

  function initRFQ(dialog) {
    var form = dialog.querySelector('[data-rfq-form]');
    var success = dialog.querySelector('[data-rfq-success]');
    var steps = dialog.querySelectorAll('[data-step]');
    var labels = dialog.querySelectorAll('[data-step-label]');
    var catSelect = dialog.querySelector('#rfq-cat');

    function setStep(n) {
      steps.forEach(function (s) { s.classList.toggle('is-active', s.getAttribute('data-step') === String(n)); });
      labels.forEach(function (l) { l.classList.toggle('is-active', parseInt(l.getAttribute('data-step-label'), 10) <= n); });
    }

    function open(product) {
      form.hidden = false;
      success.hidden = true;
      setStep(1);
      if (product) {
        var match = Array.prototype.find.call(catSelect.options, function (o) { return o.text === product; });
        if (match) { catSelect.value = match.value || match.text; }
        else {
          var prodCat = HOFER_PRODUCTS.find(function (p) { return p.name === product; });
          if (prodCat) {
            var cat = HOFER_CATEGORIES.find(function (c) { return c.id === prodCat.cat; });
            if (cat) catSelect.value = cat.label;
          }
        }
      }
      dialog.classList.add('is-open');
      document.body.classList.add('rfq-open');
      lucide.createIcons();
    }
    function close() {
      dialog.classList.remove('is-open');
      document.body.classList.remove('rfq-open');
    }

    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-rfq-open]');
      if (opener) {
        e.preventDefault();
        open(opener.getAttribute('data-rfq-product'));
        return;
      }
      if (e.target.closest('[data-rfq-close]')) { close(); return; }
      if (e.target === dialog) { close(); return; }
      if (e.target.closest('[data-rfq-next]')) { setStep(2); return; }
      if (e.target.closest('[data-rfq-back]')) { setStep(1); return; }
      if (e.target.closest('[data-rfq-send]')) {
        form.hidden = true;
        success.hidden = false;
        lucide.createIcons();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dialog.classList.contains('is-open')) close();
    });
  }

  function initAccordion() {
    document.querySelectorAll('.accordion__trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.accordion__item');
        var accordion = btn.closest('.accordion');
        var wasOpen = item.classList.contains('is-open');
        accordion.querySelectorAll('.accordion__item').forEach(function (i) {
          i.classList.remove('is-open');
          i.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function initFilters() {
    var chips = document.querySelectorAll('[data-filter]');
    if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          c.classList.toggle('is-active', c === chip);
          c.setAttribute('aria-selected', String(c === chip));
        });
        var f = chip.getAttribute('data-filter');
        document.querySelectorAll('[data-product-grid] .product-card').forEach(function (card) {
          card.style.display = (f === 'alle' || card.getAttribute('data-cat') === f) ? '' : 'none';
        });
      });
    });
  }

  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.hidden = true;
      var ok = document.querySelector('[data-contact-success]');
      if (ok) { ok.hidden = false; lucide.createIcons(); }
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page') || 'home';
    renderHeader(page);
    renderFooter();
    renderProducts();
    var dialog = renderRFQ();
    initBurger();
    initLang();
    initRFQ(dialog);
    initAccordion();
    initFilters();
    initContactForm();
    lucide.createIcons();
  });
})();
