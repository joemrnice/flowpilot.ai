// FlowPilot AI - Global Floating AI Drawer Handler

window.AiFloating = {
  init() {
    this.drawer = document.getElementById('floating-ai-drawer');
    this.openBtn = document.getElementById('open-floating-ai-btn');
    this.closeBtn = document.getElementById('close-floating-ai-btn');
    this.form = document.getElementById('floating-ai-form');
    this.input = document.getElementById('floating-ai-input');
    this.messagesContainer = document.getElementById('floating-ai-messages');

    this.bindEvents();
  },

  bindEvents() {
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.open());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Global shortcut Cmd+J or Ctrl+J to toggle floating AI drawer
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        this.toggle();
      }
    });

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.input.value.trim();
        if (text) {
          this.sendPrompt(text);
          this.input.value = '';
        }
      });
    }

    // Quick suggestion pill buttons inside floating AI
    this.messagesContainer.addEventListener('click', async (e) => {
      const suggestBtn = e.target.closest('.quick-ai-suggest');
      if (suggestBtn) {
        const prompt = suggestBtn.getAttribute('data-prompt');
        if (prompt) this.sendPrompt(prompt);
      }

      const actionBtn = e.target.closest('.ai-action-btn');
      if (actionBtn) {
        const action = actionBtn.getAttribute('data-action');
        const title = actionBtn.getAttribute('data-title') || "AI Item";
        const content = actionBtn.getAttribute('data-content') || "";

        if (action === 'confirm_task') {
          await window.MockApi.mockSaveTask({ title, priority: "high", status: "todo" });
          window.App.showToast(`Task created: "${title}"`, "success");
          if (window.App.currentView === 'tasks' && window.TasksView.render) {
            window.TasksView.render();
          }
        } else if (action === 'save_note') {
          await window.MockApi.mockSaveNote({ title, content: content || title, folder: "AI Generated" });
          window.App.showToast(`Saved note: "${title}"`, "success");
        } else if (action === 'copy_response') {
          navigator.clipboard.writeText(title);
          window.App.showToast("Copied response to clipboard!", "info");
        }
      }
    });
  },

  open() {
    this.drawer.classList.remove('translate-x-full');
    this.input.focus();
  },

  close() {
    this.drawer.classList.add('translate-x-full');
  },

  toggle() {
    if (this.drawer.classList.contains('translate-x-full')) {
      this.open();
    } else {
      this.close();
    }
  },

  async sendPrompt(promptText) {
    // Render user message bubble
    const userMsgHTML = `
      <div class="flex justify-end gap-2">
        <div class="bg-brand-600 text-white p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed shadow-sm">
          ${promptText}
        </div>
      </div>
    `;
    this.messagesContainer.insertAdjacentHTML('beforeend', userMsgHTML);
    this.scrollToBottom();

    // Render skeleton streaming bubble
    const aiMsgId = 'floating-ai-msg-' + Date.now();
    const aiMsgHTML = `
      <div class="flex gap-3">
        <div class="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-500 flex items-center justify-center flex-shrink-0 mt-0.5">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
        </div>
        <div class="flex-1 bg-gray-100 dark:bg-darkHover/80 p-3 rounded-2xl text-xs space-y-2 leading-relaxed">
          <p id="${aiMsgId}-text" class="text-gray-900 dark:text-gray-100 font-medium flex items-center gap-1.5">
            <span class="typing-dots flex gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            </span>
          </p>
          <div id="${aiMsgId}-card"></div>
        </div>
      </div>
    `;
    this.messagesContainer.insertAdjacentHTML('beforeend', aiMsgHTML);
    if (window.lucide) lucide.createIcons();
    this.scrollToBottom();

    const textEl = document.getElementById(`${aiMsgId}-text`);
    const cardEl = document.getElementById(`${aiMsgId}-card`);

    const responseObj = await window.AiEngine.processQuery(promptText, (partialText, isFinished) => {
      textEl.innerHTML = partialText.replace(/\n/g, '<br>');
      this.scrollToBottom();
    });

    if (responseObj.actionCard) {
      cardEl.innerHTML = window.AiEngine.renderActionCardHTML(responseObj.actionCard);
      if (window.lucide) lucide.createIcons();
      this.scrollToBottom();
    }
  },

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
};
