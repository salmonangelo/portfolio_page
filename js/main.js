// Main initializer: wire mobile menu, initialize other modules after DOM is ready
(function () {
  // Mobile nav behaviors
  const MobileNav = {
    init() {
      this.hamburger = document.getElementById('hamburger');
      this.mobileMenu = document.getElementById('mobile-menu');
      this.hamburgerOpenIcon = document.getElementById('hamburger-open');
      this.hamburgerCloseIcon = document.getElementById('hamburger-close');

      if (!this.hamburger || !this.mobileMenu) return;
      this._bind();
    },

    // Toggle menu open/close, update aria attributes and animate with Tailwind
    _bind() {
      document.addEventListener('click', (e) => {
        // close when clicking outside mobile menu
        if (this.mobileMenu.classList.contains('menu-open')) {
          const inside = this.mobileMenu.contains(e.target) || this.hamburger.contains(e.target);
          if (!inside) this._toggle();
        }
      });

      this.hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        this._toggle();
      });
    },

    _toggle() {
      const expanded = this.hamburger.getAttribute('aria-expanded') === 'true';
      if (!expanded) {
        this.mobileMenu.classList.add('menu-open');
        this.hamburger.setAttribute('aria-expanded', 'true');
        this.hamburgerOpenIcon.classList.add('hidden');
        this.hamburgerCloseIcon.classList.remove('hidden');
      } else {
        this.mobileMenu.classList.remove('menu-open');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.hamburgerOpenIcon.classList.remove('hidden');
        this.hamburgerCloseIcon.classList.add('hidden');
      }
    }
  };

  // Wait for DOMContentLoaded and initialize all modules in order
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation highlighting and smooth scroll
    if (window.NavHighlight && typeof window.NavHighlight.init === 'function') {
      window.NavHighlight.init();
    }

    // Initialize modal component (sets up openers)
    if (window.ModalComp && typeof window.ModalComp.init === 'function') {
      window.ModalComp.init();
    }

    // Initialize carousel
    if (window.Carousel && typeof window.Carousel.init === 'function') {
      window.Carousel.init();
    }

    // Init mobile menu
    MobileNav.init();

    // Optional: ensure all project-card buttons open modal through ModalComp API
    // (Already wired by ModalComp.init)
  });
})();