// Nav highlight & smooth scroll module
(function (global) {
  const NavHighlight = {
    // Initialize behavior: must be called after DOM loaded
    init() {
      this.links = Array.from(document.querySelectorAll('.nav-link'));
      this.sections = this.links
        .map(l => {
          const href = l.getAttribute('href');
          if (!href || !href.startsWith('#')) return null;
          return document.querySelector(href);
        })
        .filter(Boolean);

      this._bindClicks();
      this._createObserver();
    },

    // Add click handlers to nav links to enable smooth scrolling and close mobile menu.
    _bindClicks() {
      this.links.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              // Use smooth scroll via JS to ensure consistent behavior
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // If mobile menu is open, close it for better UX
              const mobile = document.getElementById('mobile-menu');
              if (mobile && mobile.classList.contains('menu-open')) {
                const hamburger = document.getElementById('hamburger');
                if (hamburger) hamburger.click();
              }
            }
          }
        });
      });
    },

    // Use IntersectionObserver to detect visible section and update nav link classes
    _createObserver() {
      if (!('IntersectionObserver' in window)) {
        // fallback: on scroll compute manually
        window.addEventListener('scroll', this._onScrollFallback.bind(this));
        this._onScrollFallback();
        return;
      }

      const options = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._setActiveForSection(entry.target.id);
          }
        });
      }, options);

      this.sections.forEach(sec => observer.observe(sec));
    },

    // Fallback for older browsers: choose closest section to top
    _onScrollFallback() {
      let closest = null;
      let minDist = Infinity;
      this.sections.forEach(s => {
        const rect = s.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < minDist) {
          minDist = dist;
          closest = s;
        }
      });
      if (closest) this._setActiveForSection(closest.id);
    },

    // Apply active classes to link that matches sectionId and remove from others
    _setActiveForSection(sectionId) {
      this.links.forEach(l => {
        const href = l.getAttribute('href');
        if (href === `#${sectionId}`) {
          l.classList.add('text-blue-500', 'font-bold');
        } else {
          l.classList.remove('text-blue-500', 'font-bold');
        }
      });
    }
  };

  global.NavHighlight = NavHighlight;
})(window);