// Modal component module
(function (global) {
  const Modal = {
    // Public init method
    init() {
      this._bindOpeners();
      this._activeModal = null;
    },

    // Attach click handlers to .open-project buttons
    _bindOpeners() {
      const openers = Array.from(document.querySelectorAll('.open-project'));
      openers.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-project');
          this.open(id);
        });
      });
    },

    // Build modal DOM dynamically and show it
    open(projectId = '') {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 opacity-0';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      // Modal content container
      const dialog = document.createElement('div');
      dialog.className = 'modal-content bg-white rounded-lg max-w-3xl w-full mx-4 transform opacity-0 scale-95 p-6';
      dialog.setAttribute('tabindex', '-1');

      // Header with close button
      const header = document.createElement('div');
      header.className = 'flex justify-between items-start';
      const title = document.createElement('h3');
      title.className = 'text-xl font-semibold';
      title.textContent = `Project ${projectId} — Details`;
      const closeBtn = document.createElement('button');
      closeBtn.className = 'ml-4 text-gray-500 hover:text-gray-700';
      closeBtn.setAttribute('aria-label', 'Close modal');
      closeBtn.innerHTML = '✕';

      header.appendChild(title);
      header.appendChild(closeBtn);

      // Body content (placeholder) — you can replace with real content
      const body = document.createElement('div');
      body.className = 'mt-4 space-y-4';
      body.innerHTML = `
        <div class="w-full h-64 bg-gray-100 rounded overflow-hidden">
          <img src="assets/images/project_${projectId}.jpg" alt="Project ${projectId}" class="w-full h-full object-cover" />
        </div>
        <p class="text-gray-600">Detailed description for project ${projectId}. Replace this placeholder with real project details, links and technologies used.</p>
      `;

      // Footer
      const footer = document.createElement('div');
      footer.className = 'mt-4 flex justify-end gap-2';
      const closeFooterBtn = document.createElement('button');
      closeFooterBtn.className = 'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300';
      closeFooterBtn.textContent = 'Close';
      footer.appendChild(closeFooterBtn);

      // Assemble
      dialog.appendChild(header);
      dialog.appendChild(body);
      dialog.appendChild(footer);
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      // Force reflow then add enter classes for fade-in
      requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        dialog.classList.remove('opacity-0', 'scale-95');
        dialog.classList.add('opacity-100');
      });

      // Save active modal for focus management
      this._activeModal = { overlay, dialog, closeBtn, closeFooterBtn };

      // Event listeners
      overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay) this.close();
      });
      closeBtn.addEventListener('click', () => this.close());
      closeFooterBtn.addEventListener('click', () => this.close());

      this._trapFocus();
      this._bindEsc();
    },

    // Close modal and cleanup
    close() {
      if (!this._activeModal) return;
      const { overlay, dialog } = this._activeModal;

      // exit animation
      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0');
      dialog.classList.remove('opacity-100');
      dialog.classList.add('opacity-0', 'scale-95');

      // remove after animation
      setTimeout(() => {
        if (overlay.parentElement) overlay.parentElement.removeChild(overlay);
        this._activeModal = null;
      }, 220);

      // remove ESC listener
      if (this._escHandler) {
        document.removeEventListener('keydown', this._escHandler);
        this._escHandler = null;
      }
    },

    // Bind ESC key to close modal
    _bindEsc() {
      this._escHandler = (e) => {
        if (e.key === 'Escape') this.close();
      };
      document.addEventListener('keydown', this._escHandler);
    },

    // Focus trap: keep focus within modal dialog
    _trapFocus() {
      if (!this._activeModal) return;
      const dialog = this._activeModal.dialog;
      // find focusable elements inside modal
      const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      let focusables = Array.from(dialog.querySelectorAll(focusableSelectors));
      // ensure dialog itself is focusable
      if (!focusables.length) {
        dialog.setAttribute('tabindex', '0');
        focusables = [dialog];
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      // focus first element
      requestAnimationFrame(() => first.focus());

      // handle Tab and Shift+Tab
      const keyHandler = (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };

      dialog.addEventListener('keydown', keyHandler);

      // cleanup when modal closes
      const cleanupObserver = new MutationObserver(() => {
        if (!document.body.contains(dialog)) {
          dialog.removeEventListener('keydown', keyHandler);
          cleanupObserver.disconnect();
        }
      });
      cleanupObserver.observe(document.body, { childList: true });
    }
  };

  global.ModalComp = Modal;
})(window);


