// FlowPilot AI - Smart Notes Workspace View Controller

window.NotesView = {
  activeNoteId: "note-1",

  render(container) {
    const notes = window.FlowPilotData.notes;
    const activeNote = notes.find(n => n.id === this.activeNoteId) || notes[0];

    const html = `
      <div class="h-[calc(100vh-6.5rem)] flex gap-6 max-w-7xl mx-auto pb-6">
        <!-- Left Sidebar Note Navigation -->
        <div class="w-80 bg-white dark:bg-darkCard rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm flex flex-col overflow-hidden">
          <div class="p-4 border-b border-gray-200 dark:border-darkBorder flex items-center justify-between">
            <h3 class="font-bold text-sm text-gray-900 dark:text-white">Smart Notes Workspace</h3>
            <button id="create-new-note-btn" class="p-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1">
              <i data-lucide="plus" class="w-4 h-4"></i> New
            </button>
          </div>

          <!-- Note List -->
          <div class="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            ${notes.map(note => `
              <div class="note-item p-3 rounded-xl border transition-all cursor-pointer ${
                note.id === activeNote.id
                  ? 'bg-brand-50/50 dark:bg-brand-500/10 border-brand-300 dark:border-brand-500/40'
                  : 'bg-gray-50/60 dark:bg-darkHover/40 border-gray-200/60 dark:border-darkBorder hover:border-gray-300'
              }" data-id="${note.id}">
                <h4 class="text-xs font-semibold text-gray-900 dark:text-white truncate mb-1">${note.title}</h4>
                <div class="flex items-center justify-between text-[10px] text-gray-400">
                  <span class="px-2 py-0.5 rounded-md bg-gray-200/60 dark:bg-darkHover font-medium">${note.folder}</span>
                  <span>${new Date(note.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right Note Editor Workspace -->
        <div class="flex-1 bg-white dark:bg-darkCard rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm flex flex-col overflow-hidden">
          <!-- Editor Topbar -->
          <div class="p-4 border-b border-gray-200 dark:border-darkBorder flex items-center justify-between bg-gray-50/50 dark:bg-darkHover/30">
            <input id="note-title-input" type="text" value="${activeNote.title}" class="bg-transparent text-base font-bold text-gray-900 dark:text-white outline-none flex-1 mr-4">

            <div class="flex items-center gap-2">
              <button id="note-extract-tasks-btn" class="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-purple-500/20">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Extract AI Tasks
              </button>
              <button id="save-active-note-btn" class="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm">
                Save
              </button>
            </div>
          </div>

          <!-- Note Content Area -->
          <div class="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <textarea id="note-content-editor" class="w-full h-full bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed resize-none">${activeNote.content}</textarea>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();

    this.bindEvents(container, activeNote);
  },

  bindEvents(container, activeNote) {
    // Switch active note
    container.querySelectorAll('.note-item').forEach(item => {
      item.addEventListener('click', () => {
        this.activeNoteId = item.getAttribute('data-id');
        this.render(container);
      });
    });

    // Create note
    const createBtn = container.querySelector('#create-new-note-btn');
    if (createBtn) {
      createBtn.addEventListener('click', async () => {
        const res = await window.MockApi.mockSaveNote({ title: "New Strategic Note", content: "### Notes Header\n\n- Add strategic bullet point here", folder: "General" });
        this.activeNoteId = res.note.id;
        window.App.showToast("Created new note", "success");
        this.render(container);
      });
    }

    // Extract Tasks AI Trigger
    const extractBtn = container.querySelector('#note-extract-tasks-btn');
    if (extractBtn) {
      extractBtn.addEventListener('click', () => {
        window.App.navigateTo('ai-assistant', { initialPrompt: `Create a task from this note: ${activeNote.title}` });
      });
    }

    // Save note
    const saveBtn = container.querySelector('#save-active-note-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const titleVal = container.querySelector('#note-title-input').value;
        const contentVal = container.querySelector('#note-content-editor').value;

        activeNote.title = titleVal;
        activeNote.content = contentVal;
        activeNote.updatedAt = new Date().toISOString();

        window.App.showToast("Note saved successfully", "success");
        this.render(container);
      });
    }
  }
};
