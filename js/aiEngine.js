// FlowPilot AI - Central AI Processing & Response Engine

window.AiEngine = {
  // BACKEND: Process query with natural language parsing or external AI stream
  async processQuery(promptText, onChunkCallback = null) {
    // BACKEND: Connect AI provider/API stream here
    const mockResult = await window.MockApi.mockGenerateAIResponse(promptText);

    if (onChunkCallback && typeof onChunkCallback === 'function') {
      const words = mockResult.text.split(' ');
      let currentText = '';
      for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? '' : ' ') + words[i];
        onChunkCallback(currentText, false);
        await new Promise(r => setTimeout(r, 25)); // Simulated typing stream
      }
      onChunkCallback(mockResult.text, true); // Completed stream
    }

    // Save to conversation history
    window.FlowPilotData.aiConversationHistory.push({
      id: "conv-user-" + Date.now(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: promptText
    });

    window.FlowPilotData.aiConversationHistory.push({
      id: mockResult.id,
      sender: "ai",
      timestamp: mockResult.timestamp,
      text: mockResult.text,
      actionCard: mockResult.actionCard
    });

    return mockResult;
  },

  // Helper to render Action Card HTML into messages
  renderActionCardHTML(card) {
    if (!card) return '';

    if (card.type === 'task_created') {
      return `
        <div class="mt-3 p-3.5 bg-white dark:bg-darkCard rounded-xl border border-brand-200 dark:border-brand-500/30 shadow-sm space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
              <i data-lucide="check-square" class="w-3.5 h-3.5"></i> Task Draft
            </span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-semibold uppercase">${card.taskData.priority}</span>
          </div>
          <div class="font-semibold text-xs text-gray-900 dark:text-white">${card.taskData.title}</div>
          <div class="text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between pt-1">
            <span>Project: ${card.taskData.projectName}</span>
            <span>Due: ${card.taskData.dueDate}</span>
          </div>
          <div class="pt-2 flex items-center gap-2">
            <button class="ai-action-btn flex-1 py-1.5 px-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5" data-action="confirm_task" data-title="${card.taskData.title}">
              <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Create Task
            </button>
            <button class="ai-action-btn py-1.5 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-darkHover dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium transition-colors" data-action="save_note" data-title="${card.taskData.title}">
              Save as Note
            </button>
          </div>
        </div>
      `;
    }

    if (card.type === 'day_plan') {
      return `
        <div class="mt-3 p-3.5 bg-white dark:bg-darkCard rounded-xl border border-amber-500/30 shadow-sm space-y-2">
          <div class="text-[11px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
            <i data-lucide="calendar-check" class="w-3.5 h-3.5"></i> ${card.title}
          </div>
          <div class="space-y-1.5 pt-1">
            ${card.items.map(item => `
              <div class="flex items-center justify-between text-xs p-1.5 rounded-lg bg-gray-50 dark:bg-darkHover/50">
                <span class="font-mono text-brand-600 dark:text-brand-400 font-semibold text-[11px]">${item.label}</span>
                <span class="text-gray-700 dark:text-gray-300">${item.detail}</span>
              </div>
            `).join('')}
          </div>
          <button class="ai-action-btn w-full mt-2 py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5" data-action="save_note" data-title="Daily Plan - ${new Date().toLocaleDateString()}" data-content="${card.items.map(i => i.label + ': ' + i.detail).join('\n')}">
            <i data-lucide="bookmark" class="w-3.5 h-3.5"></i> Save Plan to Notes
          </button>
        </div>
      `;
    }

    if (card.type === 'report' || card.type === 'weekly_report') {
      return `
        <div class="mt-3 p-3.5 bg-white dark:bg-darkCard rounded-xl border border-emerald-500/30 shadow-sm space-y-2">
          <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
            <i data-lucide="file-bar-chart" class="w-3.5 h-3.5"></i> ${card.title}
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-300">${card.summary || 'Executive progress briefing ready for review.'}</p>
          <div class="pt-1 flex gap-2">
            <button class="ai-action-btn flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5" data-action="save_note" data-title="${card.title}" data-content="${card.summary || 'Weekly Report Body'}">
              <i data-lucide="file-plus" class="w-3.5 h-3.5"></i> Save Report Note
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="mt-3 p-3 bg-white dark:bg-darkCard rounded-xl border border-gray-200 dark:border-darkBorder flex items-center justify-between">
        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${card.title}</span>
        <button class="ai-action-btn text-xs px-2.5 py-1 bg-brand-600 text-white rounded-lg hover:bg-brand-700" data-action="copy_response">Copy</button>
      </div>
    `;
  }
};
