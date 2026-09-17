// FlowPilot AI - Global Command Palette (⌘K) Handler

window.CommandPalette = {
  init() {
    this.modal = document.getElementById('command-palette-modal');
    this.card = document.getElementById('command-palette-card');
    this.input = document.getElementById('command-palette-input');
    this.results = document.getElementById('command-palette-results');

    this.bindEvents();
  },

  bindEvents() {
    // Keydown listener for Cmd+K or Ctrl+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });

    // Close when clicking modal overlay
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Command suggestion click events
    this.results.addEventListener('click', (e) => {
      const btn = e.target.closest('.cmd-item');
      if (!btn) return;

      const cmdText = btn.getAttribute('data-cmd');
      const navTarget = btn.getAttribute('data-nav');

      if (cmdText) {
        this.close();
        // Switch to AI Assistant view or run command in Floating AI
        window.App.navigateTo('ai-assistant', { initialPrompt: cmdText });
      } else if (navTarget) {
        this.close();
        window.App.navigateTo(navTarget);
      }
    });

    // Handle enter key inside command input
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.input.value.trim()) {
        const query = this.input.value.trim();
        this.close();
        window.App.navigateTo('ai-assistant', { initialPrompt: query });
      }
    });
  },

  open() {
    this.modal.classList.remove('hidden');
    setTimeout(() => {
      this.card.classList.remove('scale-95', 'opacity-0');
      this.card.classList.add('scale-100', 'opacity-100');
      this.input.focus();
    }, 10);
  },

  close() {
    this.card.classList.remove('scale-100', 'opacity-100');
    this.card.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      this.modal.classList.add('hidden');
      this.input.value = '';
    }, 150);
  },

  toggle() {
    if (this.modal.classList.contains('hidden')) {
      this.open();
    } else {
      this.close();
    }
  }
};
