// FlowPilot AI - Document Analyzer View Controller

window.DocumentsView = {
  activeDocId: "doc-1",

  render(container) {
    // BACKEND: Fetch documents list
    const docs = window.FlowPilotData.documents;
    const activeDoc = docs.find(d => d.id === this.activeDocId) || docs[0];

    const html = `
      <div class="space-y-6 max-w-7xl mx-auto pb-10">
        <!-- Documents Header Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-darkCard p-4 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
          <div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">AI Document Analyzer Workspace</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Extract insights, action items, and executive summaries from uploaded specs and PDFs</p>
          </div>

          <div class="flex items-center gap-2">
            <label class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20 cursor-pointer transition-all flex items-center gap-1.5">
              <i data-lucide="upload-cloud" class="w-4 h-4"></i> Upload Document
              <input id="doc-upload-input" type="file" class="hidden">
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Document List Sidebar -->
          <div class="bg-white dark:bg-darkCard p-4 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm space-y-3">
            <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2">Uploaded Files (${docs.length})</span>
            <div class="space-y-2">
              ${docs.map(doc => `
                <div class="doc-item p-3.5 rounded-xl border transition-all cursor-pointer ${
                  doc.id === activeDoc.id
                    ? 'bg-brand-50/50 dark:bg-brand-500/10 border-brand-300 dark:border-brand-500/40'
                    : 'bg-gray-50/60 dark:bg-darkHover/40 border-gray-200/60 dark:border-darkBorder hover:border-gray-300'
                }" data-id="${doc.id}">
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <h5 class="text-xs font-semibold text-gray-900 dark:text-white truncate">${doc.title}</h5>
                    <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-200 dark:bg-darkHover text-gray-600 dark:text-gray-300">${doc.fileType}</span>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-gray-400">
                    <span>${doc.fileSize}</span>
                    <span class="text-emerald-500 font-semibold flex items-center gap-1"><i data-lucide="check" class="w-3 h-3"></i> ${doc.status}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Document Analysis Card Details -->
          <div class="lg:col-span-2 bg-white dark:bg-darkCard p-6 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm space-y-6">
            <!-- Title & Quick Stats -->
            <div class="flex items-start justify-between border-b border-gray-200 dark:border-darkBorder pb-4">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-brand-500 font-mono">${activeDoc.fileType} • Uploaded ${activeDoc.uploadedAt}</span>
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mt-1">${activeDoc.title}</h4>
              </div>

              <button id="doc-ask-ai-btn" class="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold border border-purple-500/20 flex items-center gap-1.5 transition-colors">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Analyze with AI
              </button>
            </div>

            <!-- Executive Summary -->
            <div class="space-y-2">
              <h5 class="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <i data-lucide="file-text" class="w-3.5 h-3.5 text-brand-500"></i> Executive AI Summary
              </h5>
              <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-darkHover/50 p-4 rounded-xl border border-gray-200/60 dark:border-darkBorder/60">
                ${activeDoc.summary}
              </p>
            </div>

            <!-- Key Takeaways -->
            <div class="space-y-2">
              <h5 class="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <i data-lucide="key" class="w-3.5 h-3.5 text-amber-500"></i> Strategic Key Takeaways
              </h5>
              <div class="space-y-2">
                ${activeDoc.keyTakeaways.map(kt => `
                  <div class="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5"></i>
                    <span>${kt}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Extracted Action Items -->
            <div class="space-y-2">
              <h5 class="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <i data-lucide="check-square" class="w-3.5 h-3.5 text-emerald-500"></i> Extracted Action Tasks
              </h5>
              <div class="space-y-2">
                ${activeDoc.extractedTasks.map(taskText => `
                  <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-darkHover/60 border border-gray-200/60 dark:border-darkBorder">
                    <span class="text-xs font-medium text-gray-800 dark:text-gray-200">${taskText}</span>
                    <button class="doc-convert-task-btn text-xs px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors flex items-center gap-1" data-title="${taskText}">
                      <i data-lucide="plus" class="w-3 h-3"></i> Add Task
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();

    this.bindEvents(container, activeDoc);
  },

  bindEvents(container, activeDoc) {
    container.querySelectorAll('.doc-item').forEach(item => {
      item.addEventListener('click', () => {
        this.activeDocId = item.getAttribute('data-id');
        this.render(container);
      });
    });

    const uploadInput = container.querySelector('#doc-upload-input');
    if (uploadInput) {
      uploadInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          window.FlowPilotData.documents.unshift({
            id: 'doc-' + Date.now(),
            title: file.name,
            fileType: file.name.split('.').pop().toUpperCase() || 'FILE',
            fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            uploadedAt: new Date().toISOString().split('T')[0],
            status: 'Analyzed',
            summary: `Automated AI analysis completed for newly uploaded file ${file.name}.`,
            extractedTasks: ["Review newly uploaded specification details"],
            keyTakeaways: ["Document ingested and processed via FlowPilot AI."]
          });

          window.App.showToast(`Uploaded and analyzed "${file.name}"`, "success");
          this.render(container);
        }
      });
    }

    const askAiBtn = container.querySelector('#doc-ask-ai-btn');
    if (askAiBtn) {
      askAiBtn.addEventListener('click', () => {
        window.App.navigateTo('ai-assistant', { initialPrompt: `Analyze this document: ${activeDoc.title}` });
      });
    }

    container.querySelectorAll('.doc-convert-task-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const title = btn.getAttribute('data-title');
        await window.MockApi.mockSaveTask({ title, priority: "high", status: "todo" });
        window.App.showToast(`Task created from document: "${title}"`, "success");
      });
    });
  }
};
