// Codelab page behavior: copy buttons, one-panel navigation, progress and language switch.
(function () {
  'use strict';

  var PROGRESS_KEY = 'flutter-codelab-progress';
  var LANG_KEY = 'flutter-codelab-lang';
  var SIDEBAR_KEY = 'flutter-codelab-sidebar';
  var lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';

  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      // Storage unavailable (private mode, blocked): the choice is not saved.
    }
  }

  function loadProgress() {
    try {
      var parsed = JSON.parse(storageGet(PROGRESS_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(area);
      }
    });
  }

  function setupCopyButtons() {
    var labels = lang === 'fr'
      ? { copy: 'Copier', copied: 'Copié !', failed: 'Échec' }
      : { copy: 'Copy', copied: 'Copied!', failed: 'Failed' };
    var copyHtml = '<i class="fa-regular fa-copy" aria-hidden="true"></i><span>' + labels.copy + '</span>';
    var copiedHtml = '<i class="fa-solid fa-check" aria-hidden="true"></i><span>' + labels.copied + '</span>';
    var failedHtml = '<i class="fa-solid fa-xmark" aria-hidden="true"></i><span>' + labels.failed + '</span>';

    document.querySelectorAll('pre > code').forEach(function (code) {
      var pre = code.parentNode;
      var wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.innerHTML = copyHtml;
      var timer = null;
      btn.addEventListener('click', function () {
        copyText(code.textContent).then(function () {
          btn.innerHTML = copiedHtml;
          btn.classList.add('copied');
        }, function () {
          btn.innerHTML = failedHtml;
        });
        clearTimeout(timer);
        timer = setTimeout(function () {
          btn.innerHTML = copyHtml;
          btn.classList.remove('copied');
        }, 1500);
      });
      wrap.appendChild(btn);
    });
  }

  function setupNavigation() {
    var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
    if (panels.length === 0) return;
    var ids = panels.map(function (p) { return p.id; });
    var navItems = document.querySelectorAll('.nav-item');
    var prevBtn = document.querySelector('.nav-btn[data-dir="-1"]');
    var nextBtn = document.querySelector('.nav-btn[data-dir="1"]');
    var title = document.getElementById('panel-title');
    var content = document.getElementById('content');
    var bar = document.querySelector('.progress-bar');
    var langLinks = document.querySelectorAll('.lang-toggle a[data-lang]');
    var menuBtn = document.querySelector('.menu-btn');
    var overlay = document.getElementById('overlay');
    var progress = loadProgress();
    var current = -1;
    var timeLeft = document.getElementById('time-left');
    var navTitles = Array.prototype.map.call(navItems, function (item) {
      var el = item.querySelector('.nav-title');
      return el ? el.textContent : '';
    });
    var labels = lang === 'fr'
      ? { prev: 'Précédent', next: 'Suivant', left: ' min restantes' }
      : { prev: 'Previous', next: 'Next', left: ' min left' };

    function remainingMinutes(index) {
      var total = 0;
      for (var i = index; i < panels.length; i++) {
        var d = panels[i].querySelector('.step-duration[data-min]');
        if (d) total += parseInt(d.getAttribute('data-min'), 10) || 0;
      }
      return total;
    }

    function addFooters() {
      panels.forEach(function (panel, i) {
        var footer = document.createElement('div');
        footer.className = 'step-footer';
        if (i > 0) {
          var prev = document.createElement('button');
          prev.type = 'button';
          prev.className = 'footer-btn';
          prev.innerHTML = '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i><span></span>';
          prev.lastChild.textContent = labels.prev;
          prev.addEventListener('click', function () { go(i - 1); });
          footer.appendChild(prev);
        }
        if (i < panels.length - 1) {
          var next = document.createElement('button');
          next.type = 'button';
          next.className = 'footer-btn primary';
          next.innerHTML = '<span></span><i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';
          next.firstChild.textContent = labels.next + (navTitles[i + 1] ? ': ' + navTitles[i + 1] : '');
          next.addEventListener('click', function () { go(i + 1); });
          footer.appendChild(next);
        }
        panel.appendChild(footer);
      });
    }

    function indexFromHash() {
      var index = ids.indexOf(window.location.hash.slice(1));
      return index === -1 ? 0 : index;
    }

    function show(index) {
      if (index === current) return;
      current = index;
      var id = ids[index];

      panels.forEach(function (p, i) { p.classList.toggle('is-active', i === index); });

      // Every step before the current panel counts as completed.
      for (var i = 0; i < index; i++) {
        if (ids[i] !== 'prerequisites') progress[ids[i]] = true;
      }
      storageSet(PROGRESS_KEY, JSON.stringify(progress));

      navItems.forEach(function (item) {
        var itemId = item.getAttribute('data-panel');
        var active = itemId === id;
        item.classList.toggle('is-active', active);
        item.classList.toggle('is-done', !!progress[itemId] || (itemId === 'prerequisites' && index > 0));
        if (active) {
          item.setAttribute('aria-current', 'step');
        } else {
          item.removeAttribute('aria-current');
        }
      });

      var heading = panels[index].querySelector('h2');
      if (title && heading) title.textContent = heading.textContent;
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === panels.length - 1;
      if (bar) bar.style.width = (100 * (index + 1) / panels.length) + '%';
      if (content) content.scrollTop = 0;
      if (timeLeft) {
        var left = remainingMinutes(index);
        timeLeft.hidden = !(left > 0 && id !== 'prerequisites');
        timeLeft.textContent = left + labels.left;
      }

      langLinks.forEach(function (a) {
        a.setAttribute('href', a.getAttribute('data-lang') + '.html#' + id);
      });
    }

    function go(index) {
      if (index < 0 || index >= panels.length) return;
      var hash = '#' + ids[index];
      if (window.location.hash !== hash) {
        history.pushState(null, '', hash);
      }
      show(index);
    }

    function setDrawer(open) {
      document.body.classList.toggle('drawer-open', open);
      if (overlay) overlay.hidden = !open;
      if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    navItems.forEach(function (item) {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        go(ids.indexOf(item.getAttribute('data-panel')));
        setDrawer(false);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); });
    // Desktop: the menu button hides / shows the sidebar (choice saved). Phone: it opens the drawer.
    var desktop = window.matchMedia('(min-width: 768px)');
    var menuLabels = lang === 'fr'
      ? { hide: 'Masquer le sommaire', show: 'Afficher le sommaire' }
      : { hide: 'Hide the contents', show: 'Show the contents' };

    function setCollapsed(collapsed) {
      document.body.classList.toggle('sidebar-collapsed', collapsed);
      if (menuBtn && desktop.matches) {
        menuBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        menuBtn.setAttribute('aria-label', collapsed ? menuLabels.show : menuLabels.hide);
        menuBtn.title = collapsed ? menuLabels.show : menuLabels.hide;
      }
    }

    if (menuBtn) {
      setCollapsed(storageGet(SIDEBAR_KEY) === 'collapsed');
      menuBtn.addEventListener('click', function () {
        if (desktop.matches) {
          var collapsed = !document.body.classList.contains('sidebar-collapsed');
          setCollapsed(collapsed);
          storageSet(SIDEBAR_KEY, collapsed ? 'collapsed' : 'open');
        } else {
          setDrawer(!document.body.classList.contains('drawer-open'));
        }
      });
    }
    if (overlay) overlay.addEventListener('click', function () { setDrawer(false); });

    document.addEventListener('keydown', function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      var target = event.target;
      var tag = target && target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (target && target.isContentEditable)) return;
      if (event.key === 'ArrowLeft') {
        go(current - 1);
      } else if (event.key === 'ArrowRight') {
        go(current + 1);
      } else if (event.key === 'Escape') {
        setDrawer(false);
      }
    });

    window.addEventListener('hashchange', function () { show(indexFromHash()); });
    window.addEventListener('popstate', function () { show(indexFromHash()); });

    langLinks.forEach(function (a) {
      a.addEventListener('click', function (event) {
        var target = a.getAttribute('data-lang');
        storageSet(LANG_KEY, target);
        if (target === lang) {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        window.location.href = target + '.html' + window.location.hash;
      });
    });

    addFooters();

    // No hash or an unknown one: show the prerequisites and put its hash in the URL.
    var startIndex = indexFromHash();
    if (window.location.hash !== '#' + ids[startIndex]) {
      history.replaceState(null, '', '#' + ids[startIndex]);
    }
    show(startIndex);

    // The browser's own jump to the #hash anchor can run after this script.
    window.addEventListener('load', function () {
      if (content) content.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupCopyButtons();
    setupNavigation();
  });
})();
