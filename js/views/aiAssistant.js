// FlowPilot AI - Dedicated AI Command Center Workspace View

window.AiAssistantView = {
  render(container, params = {}) {
    // BACKEND: Load authenticated user conversation
    const history = window.FlowPilotData.aiConversationHistory;

    const html = `
      <div class="h-[calc(100vh-6.5rem)] flex flex-col bg-white dark:bg-darkCard rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm overflow-hidden">
        <!-- AI Workspace Command Topbar -->
        <div class="p-4 border-b border-gray-200 dark:border-darkBorder flex items-center justify-between bg-gray-50/50 dark:bg-darkHover/30">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <i data-lucide="bot" class="w-4 h-4"></i>
            </div>
            <div>
              <h2 class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                FlowPilot AI Core Engine
                <span class="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20">GPT-4o Simulated</span>
              </h2>
              <p class="text-[11px] text-gray-500 dark:text-gray-400">Contextual command interface & workflow automation</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button id="ai-clear-history-btn" class="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-darkBorder text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkHover text-xs font-medium transition-colors flex items-center gap-1.5">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear Chat
            </button>
          </div>
        </div>

        <!-- Chat Output Timeline -->
        <div id="ai-workspace-messages" class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          ${history.map(msg => this.renderMessageHTML(msg)).join('')}
        </div>

        <!-- Suggested Quick Commands Toolbar -->
        <div class="px-6 py-2 border-t border-gray-200/60 dark:border-darkBorder/60 bg-gray-50/30 dark:bg-darkHover/20 flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex-shrink-0">Suggested:</span>
          <button class="ai-suggest-chip text-xs bg-white dark:bg-darkCard hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-gray-200 dark:border-darkBorder px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 flex-shrink-0 transition-colors" data-cmd="Summarize my projects.">
            "Summarize my projects."
          </button>
          <button class="ai-suggest-chip text-xs bg-white dark:bg-darkCard hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-gray-200 dark:border-darkBorder px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 flex-shrink-0 transition-colors" data-cmd="Create a task from this note.">
            "Create a task from this note."
          </button>
          <button class="ai-suggest-chip text-xs bg-white dark:bg-darkCard hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-gray-200 dark:border-darkBorder px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 flex-shrink-0 transition-colors" data-cmd="Show overdue work.">
            "Show overdue work."
          </button>
          <button class="ai-suggest-chip text-xs bg-white dark:bg-darkCard hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-gray-200 dark:border-darkBorder px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 flex-shrink-0 transition-colors" data-cmd="Plan my day.">
            "Plan my day."
          </button>
          <button class="ai-suggest-chip text-xs bg-white dark:bg-darkCard hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-gray-200 dark:border-darkBorder px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 flex-shrink-0 transition-colors" data-cmd="Prepare a weekly progress report.">
            "Prepare a weekly progress report."
          </button>
        </div>

        <!-- Prompt Input Bar -->
        <div class="p-4 border-t border-gray-200 dark:border-darkBorder bg-white dark:bg-darkCard">
          <form id="ai-workspace-form" class="flex gap-3">
            <div class="relative flex-1">
              <textarea id="ai-workspace-input" rows="1" placeholder="Ask FlowPilot AI to draft tasks, analyze documents, plan your day, or summarize progress..." class="w-full bg-gray-100 dark:bg-darkHover text-sm px-4 py-3 rounded-xl border border-transparent focus:border-brand-500 outline-none resize-none transition-all custom-scrollbar"></textarea>
            </div>
            <button type="submit" class="px-5 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-2 flex-shrink-0">
              <i data-lucide="sparkles" class="w-4 h-4"></i> Send Command
            </button>
          </form>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();

    this.bindEvents(container);

    // If initialPrompt was provided via route
    if (params.initialPrompt) {
      this.executePrompt(params.initialPrompt);
    }
  },

  renderMessageHTML(msg) {
    if (msg.sender === 'user') {
      return `
        <div class="flex justify-end gap-3 max-w-3xl ml-auto">
          <div class="bg-brand-600 text-white p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md">
            ${msg.text}
          </div>
          <div class="w-8 h-8 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
            AV
          </div>
        </div>
      `;
    }

    const actionCardHTML = msg.actionCard ? window.AiEngine.renderActionCardHTML(msg.actionCard) : '';

    return `
      <div class="flex gap-4 max-w-3xl">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <i data-lucide="sparkles" class="w-4 h-4"></i>
        </div>
        <div class="flex-1 bg-gray-50 dark:bg-darkHover/60 p-4 rounded-2xl border border-gray-200/60 dark:border-darkBorder/80 text-xs sm:text-sm leading-relaxed space-y-3">
          <div class="text-gray-900 dark:text-gray-100 font-normal leading-relaxed whitespace-pre-wrap">${msg.text.replace(/\n/g, '<br>')}</div>
          ${actionCardHTML}
          <div class="pt-2 flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-200/40 dark:border-darkBorder/40">
            <span>${msg.timestamp}</span>
            <button class="ai-copy-btn hover:text-gray-600 dark:hover:text-white transition-colors flex items-center gap-1" data-text="${encodeURIComponent(msg.text)}">
              <i data-lucide="copy" class="w-3 h-3"></i> Copy Response
            </button>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents(container) {
    const form = container.querySelector('#ai-workspace-form');
    const input = container.querySelector('#ai-workspace-input');
    const messagesBox = container.querySelector('#ai-workspace-messages');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
          this.executePrompt(text);
          input.value = '';
        }
      });
    }

    // Suggested chips
    container.querySelectorAll('.ai-suggest-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) this.executePrompt(cmd);
      });
    });

    // Clear history
    const clearBtn = container.querySelector('#ai-clear-history-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.FlowPilotData.aiConversationHistory = [];
        this.render(container);
        window.App.showToast("Conversation history cleared", "info");
      });
    }

    // Interactive action cards buttons
    messagesBox.addEventListener('click', async (e) => {
      const copyBtn = e.target.closest('.ai-copy-btn');
      if (copyBtn) {
        const text = decodeURIComponent(copyBtn.getAttribute('data-text'));
        navigator.clipboard.writeText(text);
        window.App.showToast("Response copied to clipboard", "info");
      }

      const actionBtn = e.target.closest('.ai-action-btn');
      if (actionBtn) {
        const action = actionBtn.getAttribute('data-action');
        const title = actionBtn.getAttribute('data-title') || "AI Item";
        const content = actionBtn.getAttribute('data-content') || "";

        if (action === 'confirm_task') {
          // BACKEND: Persist generated task
          await window.MockApi.mockSaveTask({ title, priority: "high", status: "todo" });
          window.App.showToast(`Task created: "${title}"`, "success");
        } else if (action === 'save_note') {
          // BACKEND: Save as note
          await window.MockApi.mockSaveNote({ title, content: content || title, folder: "AI Generated" });
          window.App.showToast(`Saved note: "${title}"`, "success");
        }
      }
    });
  },

  async executePrompt(promptText) {
    const messagesBox = document.getElementById('ai-workspace-messages');
    if (!messagesBox) return;

    // Append User Message Bubble
    const userMsgHTML = `
      <div class="flex justify-end gap-3 max-w-3xl ml-auto">
        <div class="bg-brand-600 text-white p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md">
          ${promptText}
        </div>
        <div class="w-8 h-8 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
          AV
        </div>
      </div>
    `;
    messagesBox.insertAdjacentHTML('beforeend', userMsgHTML);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Append Streaming Placeholder Bubble
    const streamId = 'stream-' + Date.now();
    const streamHTML = `
      <div class="flex gap-4 max-w-3xl">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <i data-lucide="sparkles" class="w-4 h-4"></i>
        </div>
        <div class="flex-1 bg-gray-50 dark:bg-darkHover/60 p-4 rounded-2xl border border-gray-200/60 dark:border-darkBorder/80 text-xs sm:text-sm leading-relaxed space-y-3">
          <div id="${streamId}-text" class="text-gray-900 dark:text-gray-100 font-normal leading-relaxed">
            <span class="typing-dots flex gap-1.5 py-1">
              <span class="w-2 h-2 rounded-full bg-brand-500"></span>
              <span class="w-2 h-2 rounded-full bg-brand-500"></span>
              <span class="w-2 h-2 rounded-full bg-brand-500"></span>
            </span>
          </div>
          <div id="${streamId}-card"></div>
        </div>
      </div>
    `;
    messagesBox.insertAdjacentHTML('beforeend', streamHTML);
    if (window.lucide) lucide.createIcons();
    messagesBox.scrollTop = messagesBox.scrollHeight;

    const textEl = document.getElementById(`${streamId}-text`);
    const cardEl = document.getElementById(`${streamId}-card`);

    // BACKEND: Connect AI provider/API here
    const result = await window.AiEngine.processQuery(promptText, (partialText, isFinished) => {
      textEl.innerHTML = partialText.replace(/\n/g, '<br>');
      messagesBox.scrollTop = messagesBox.scrollHeight;
    });

    if (result.actionCard) {
      cardEl.innerHTML = window.AiEngine.renderActionCardHTML(result.actionCard);
      if (window.lucide) lucide.createIcons();
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }
  }
};
