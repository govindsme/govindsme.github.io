/* Govindarajan Vishnuchithan — site interactions (vanilla JS, no dependencies) */
(function () {
    'use strict';

    /* Mark JS availability so CSS can enable JS-only behaviors */
    document.documentElement.classList.add('js');

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Sticky header shadow ---------- */
    var header = document.querySelector('.site-header');
    if (header) {
        var onScroll = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- Mobile navigation ---------- */
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        var setMenu = function (open) {
            toggle.setAttribute('aria-expanded', String(open));
            menu.classList.toggle('is-open', open);
        };
        toggle.addEventListener('click', function () {
            setMenu(toggle.getAttribute('aria-expanded') !== 'true');
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { setMenu(false); }
        });
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) { setMenu(false); }
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav')) { setMenu(false); }
        });
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealEls.forEach(function (el) { el.classList.add('is-visible'); });
        } else {
            var revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
            revealEls.forEach(function (el) { revealObserver.observe(el); });
        }
    }

    /* ---------- Animated counters ---------- */
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        var renderFinal = function (el) {
            var target = parseFloat(el.getAttribute('data-count'));
            var prefix = el.getAttribute('data-prefix') || '';
            var suffix = el.getAttribute('data-suffix') || '';
            var isFloat = target % 1 !== 0;
            el.textContent = prefix + (isFloat ? target.toFixed(1) : String(target)) + suffix;
        };
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            counters.forEach(renderFinal);
        } else {
            var counterObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) { return; }
                    var el = entry.target;
                    counterObserver.unobserve(el);
                    var target = parseFloat(el.getAttribute('data-count'));
                    var prefix = el.getAttribute('data-prefix') || '';
                    var suffix = el.getAttribute('data-suffix') || '';
                    var isFloat = target % 1 !== 0;
                    var duration = 1400;
                    var start = null;
                    var tick = function (now) {
                        if (start === null) { start = now; }
                        var p = Math.min((now - start) / duration, 1);
                        var eased = 1 - Math.pow(1 - p, 3);
                        var val = eased * target;
                        el.textContent = prefix + (isFloat ? val.toFixed(1) : String(Math.round(val))) + suffix;
                        if (p < 1) { requestAnimationFrame(tick); }
                    };
                    requestAnimationFrame(tick);
                });
            }, { threshold: 0.5 });
            counters.forEach(function (el) { counterObserver.observe(el); });
        }
    }

    /* ---------- Contact form (Formspree, async with fallback) ---------- */
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var result = document.getElementById('formMessage');
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending…';
            submitBtn.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    var purpose = form.elements.purpose ? form.elements.purpose.value : 'general';
                    var msg = purpose === 'resume'
                        ? 'Your resume request has been recorded.'
                        : 'Your message has been recorded.';
                    result.innerHTML = '<div class="form-success" role="status"><strong>Thank you.</strong> ' + msg + ' A response will be shared shortly.</div>';
                    form.reset();
                } else {
                    result.innerHTML = '<div class="form-error" role="alert">Something went wrong. Please try again or reach out via LinkedIn.</div>';
                }
            }).catch(function () {
                result.innerHTML = '<div class="form-error" role="alert">Network error. Please try again or reach out via LinkedIn.</div>';
            }).finally(function () {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
})();
