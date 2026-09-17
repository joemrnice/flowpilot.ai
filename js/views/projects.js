// FlowPilot AI - Projects Command View Controller

window.ProjectsView = {
  render(container) {
    // BACKEND: Fetch active projects list
    const projects = window.FlowPilotData.projects;

    const html = `
      <div class="space-y-6 max-w-7xl mx-auto pb-10">
        <!-- Projects Top Header Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-darkCard p-4 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
          <div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">Active Projects Command Hub</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Track progress, team velocity, and AI project summaries</p>
          </div>

          <div class="flex items-center gap-2">
            <button id="projects-ai-summary-btn" class="px-3.5 py-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 font-semibold text-xs transition-colors flex items-center gap-1.5 border border-brand-500/20">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Generate Portfolio Brief
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${projects.map(p => `
            <div class="bg-white dark:bg-darkCard p-6 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <!-- Project Header -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20">${p.category}</span>
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    p.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500' :
                    p.status === 'In Review' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                  }">${p.status}</span>
                </div>
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">${p.title}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">${p.description}</p>
              </div>

              <!-- AI Project Insight Card -->
              <div class="p-3 bg-gray-50 dark:bg-darkHover/60 rounded-xl border border-gray-200/60 dark:border-darkBorder/60 space-y-1">
                <span class="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1">
                  <i data-lucide="sparkles" class="w-3 h-3"></i> AI Milestone Analysis
                </span>
                <p class="text-xs text-gray-700 dark:text-gray-300 italic">${p.aiSummary}</p>
              </div>

              <!-- Progress Bar & Members -->
              <div class="space-y-3 pt-2 border-t border-gray-100 dark:border-darkBorder">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-700 dark:text-gray-300">Completion</span>
                  <span class="font-bold font-mono text-brand-600 dark:text-brand-400">${p.progress}%</span>
                </div>
                <div class="w-full bg-gray-100 dark:bg-darkHover rounded-full h-2 overflow-hidden">
                  <div class="bg-gradient-to-r from-brand-600 to-indigo-500 h-2 rounded-full" style="width: ${p.progress}%"></div>
                </div>

                <div class="flex items-center justify-between pt-2">
                  <div class="flex -space-x-2">
                    ${p.members.map(m => `
                      <img src="${m.avatar}" title="${m.name}" alt="${m.name}" class="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-darkCard">
                    `).join('')}
                  </div>
                  <span class="text-[11px] text-gray-400 font-mono">Due ${p.dueDate}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();

    this.bindEvents(container);
  },

  bindEvents(container) {
    const summaryBtn = container.querySelector('#projects-ai-summary-btn');
    if (summaryBtn) {
      summaryBtn.addEventListener('click', () => {
        window.App.navigateTo('ai-assistant', { initialPrompt: "Summarize my projects." });
      });
    }
  }
};
