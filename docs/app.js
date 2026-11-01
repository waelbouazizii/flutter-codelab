// Codelab page behavior: copy buttons on code blocks and step progress.
(function () {
  'use strict';

  var STORAGE_KEY = 'flutter-codelab-progress';

  function loadProgress() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(progress) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      // Storage unavailable (private mode, blocked): progress is not saved.
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
    var lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    var labels = lang === 'fr'
      ? { copy: 'Copier', copied: 'Copié !', failed: 'Échec' }
      : { copy: 'Copy', copied: 'Copied!', failed: 'Failed' };

    document.querySelectorAll('pre > code').forEach(function (code) {
      var pre = code.parentNode;
      var wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = labels.copy;
      btn.addEventListener('click', function () {
        copyText(code.textContent).then(function () {
          btn.textContent = labels.copied;
          btn.classList.add('copied');
        }, function () {
          btn.textContent = labels.failed;
        });
        setTimeout(function () {
          btn.textContent = labels.copy;
          btn.classList.remove('copied');
        }, 1500);
      });
      wrap.appendChild(btn);
    });
  }

  function setupProgress() {
    var lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
    var label = lang === 'fr' ? 'Étape terminée' : 'Step done';
    var steps = document.querySelectorAll('section.step[id^="step-"]');
    var bar = document.querySelector('.progress-bar');
    var progress = loadProgress();

    function updateBar() {
      if (!bar || steps.length === 0) return;
      var done = 0;
      steps.forEach(function (s) { if (progress[s.id]) done++; });
      bar.style.width = (100 * done / steps.length) + '%';
    }

    steps.forEach(function (step) {
      var toggle = document.createElement('label');
      toggle.className = 'step-done-toggle';
      var box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = !!progress[step.id];
      step.classList.toggle('is-done', box.checked);
      box.addEventListener('change', function () {
        progress[step.id] = box.checked;
        step.classList.toggle('is-done', box.checked);
        saveProgress(progress);
        updateBar();
      });
      toggle.appendChild(box);
      toggle.appendChild(document.createTextNode(label));
      step.appendChild(toggle);
    });

    updateBar();
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupCopyButtons();
    setupProgress();
  });
})();
