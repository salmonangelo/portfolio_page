// Simple carousel module with autoplay, pause on hover, controls and dots
(function (global) {
  const Carousel = {
    init() {
      this.container = document.getElementById('carousel');
      if (!this.container) return;

      this.track = this.container.querySelector('.carousel-track');
      this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
      this.prevBtn = this.container.querySelector('.carousel-prev');
      this.nextBtn = this.container.querySelector('.carousel-next');
      this.dotsContainer = this.container.querySelector('.carousel-dots');
      this.current = 0;
      this.interval = null;
      this.autoplayDelay = 4000;

      this._setup();
      this._goTo(0);
      this._startAutoplay();
    },

    // Create dots and bind buttons
    _setup() {
      // create dots
      this.dotsContainer.innerHTML = '';
      this.slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'w-3 h-3 rounded-full bg-gray-300';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          this._goTo(i);
          this._restartAutoplay();
        });
        this.dotsContainer.appendChild(dot);
      });

      // bind prev/next
      this.prevBtn.addEventListener('click', () => { this.prev(); this._restartAutoplay(); });
      this.nextBtn.addEventListener('click', () => { this.next(); this._restartAutoplay(); });

      // pause on hover
      this.container.addEventListener('mouseenter', () => this._pauseAutoplay());
      this.container.addEventListener('mouseleave', () => this._startAutoplay());

      // resize handler to ensure slides width correct
      window.addEventListener('resize', () => this._updateTrackPosition());
    },

    // Go to slide index
    _goTo(index) {
      this.current = (index + this.slides.length) % this.slides.length;
      const slideWidth = this.slides[0].getBoundingClientRect().width;
      const offset = this.current * slideWidth;
      this.track.style.transform = `translateX(-${offset}px)`;
      this._updateDots();
    },

    next() { this._goTo(this.current + 1); },
    prev() { this._goTo(this.current - 1); },

    // Update dots styling to show active
    _updateDots() {
      const dots = Array.from(this.dotsContainer.children);
      dots.forEach((d, i) => {
        d.classList.toggle('bg-blue-500', i === this.current);
        d.classList.toggle('bg-gray-300', i !== this.current);
      });
    },

    // Autoplay
    _startAutoplay() {
      if (this.interval) return;
      this.interval = setInterval(() => { this.next(); }, this.autoplayDelay);
    },
    _pauseAutoplay() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    _restartAutoplay() {
      this._pauseAutoplay();
      this._startAutoplay();
    },

    // Recompute translation on resize
    _updateTrackPosition() {
      this._goTo(this.current);
    }
  };

  global.Carousel = Carousel;
})(window);