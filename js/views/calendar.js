// FlowPilot AI - Schedule & Calendar View Controller

window.CalendarView = {
  render(container) {
    const events = window.FlowPilotData.calendarEvents;

    const html = `
      <div class="space-y-6 max-w-7xl mx-auto pb-10">
        <!-- Calendar Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-darkCard p-4 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
          <div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">Smart Agenda & Focus Schedule</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Integrated meetings, focus time blocks, and AI daily planner</p>
          </div>

          <div class="flex items-center gap-2">
            <button id="calendar-plan-ai-btn" class="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold text-xs transition-colors flex items-center gap-1.5 border border-amber-500/20">
              <i data-lucide="sun" class="w-3.5 h-3.5"></i> AI Auto-Plan Schedule
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Calendar Agenda Timeline -->
          <div class="lg:col-span-2 bg-white dark:bg-darkCard p-6 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-gray-200 dark:border-darkBorder pb-4">
              <h4 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <i data-lucide="calendar" class="w-4 h-4 text-brand-500"></i> Upcoming Schedule (March 25 - 27)
              </h4>
              <span class="text-xs font-mono text-brand-500 font-semibold">5 Events Scheduled</span>
            </div>

            <div class="space-y-3">
              ${events.map(evt => `
                <div class="p-4 rounded-xl bg-gray-50 dark:bg-darkHover/60 border border-gray-200/60 dark:border-darkBorder flex items-center justify-between gap-4 hover:border-brand-500/30 transition-colors">
                  <div class="flex items-center gap-4 min-w-0">
                    <div class="text-center px-3 py-1.5 rounded-lg bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder min-w-[65px]">
                      <span class="text-[10px] uppercase font-bold text-brand-500 block">${evt.date.split('-')[1] === '03' ? 'MAR' : 'APR'}</span>
                      <span class="text-base font-extrabold text-gray-900 dark:text-white font-mono">${evt.date.split('-')[2]}</span>
                    </div>
                    <div class="min-w-0">
                      <h5 class="text-xs font-semibold text-gray-900 dark:text-white truncate">${evt.title}</h5>
                      <span class="text-[11px] text-gray-400 font-mono flex items-center gap-1.5 mt-0.5">
                        <i data-lucide="clock" class="w-3 h-3"></i> ${evt.time} • ${evt.location}
                      </span>
                    </div>
                  </div>
                  <span class="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                    evt.type === 'Focus Time' ? 'bg-amber-500/10 text-amber-500' :
                    evt.type === 'Security' ? 'bg-rose-500/10 text-rose-500' : 'bg-brand-500/10 text-brand-500'
                  }">${evt.type}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Column: AI Time Blocking Recommendations -->
          <div class="bg-white dark:bg-darkCard p-6 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm space-y-4">
            <h4 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-500"></i> AI Time-Blocking Suggestion
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Based on your task velocity and focus energy curve, FlowPilot AI recommends reserving <strong>10:30 AM - 12:30 PM</strong> for uninterrupted deep work.
            </p>
            <div class="p-3 bg-brand-50/50 dark:bg-brand-500/10 rounded-xl border border-brand-200 dark:border-brand-500/20 text-xs space-y-2">
              <span class="font-semibold text-brand-600 dark:text-brand-300 block">Recommended Focus:</span>
              <p class="text-gray-700 dark:text-gray-300">"Finalize FlowPilot Command Palette UI Specs & drag-and-drop task movement."</p>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();

    const planBtn = container.querySelector('#calendar-plan-ai-btn');
    if (planBtn) {
      planBtn.addEventListener('click', () => {
        window.App.navigateTo('ai-assistant', { initialPrompt: "Plan my day." });
      });
    }
  }
};
