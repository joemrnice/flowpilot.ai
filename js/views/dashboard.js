// FlowPilot AI - Main Overview Dashboard View Controller

window.DashboardView = {
  render(container) {
    const data = window.FlowPilotData;
    const user = data.currentUser;
    const tasks = data.tasks;
    const projects = data.projects;
    const activity = data.activityLog;

    const completedPercent = Math.round((user.tasksCompletedToday / user.totalTasksToday) * 100);

    const html = `
      <div class="space-y-6 max-w-7xl mx-auto pb-10">
        <!-- AI Hero Command Banner -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl">
          <div class="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium text-indigo-100">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i> FlowPilot AI Co-pilot Active
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Good morning, ${user.name}</h2>
              <p class="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                You have completed <strong class="text-white font-bold">${user.tasksCompletedToday} of ${user.totalTasksToday} tasks</strong> today. Productivity score is running at <strong class="text-amber-300">${user.productivityScore}%</strong>.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button id="dash-plan-day-btn" class="px-4 py-2.5 rounded-xl bg-white text-brand-700 hover:bg-indigo-50 font-semibold text-xs transition-all shadow-lg hover:scale-105 flex items-center gap-2">
                <i data-lucide="sun" class="w-4 h-4 text-amber-500"></i> Plan My Day
              </button>
              <button id="dash-summary-btn" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs backdrop-blur-md transition-all flex items-center gap-2">
                <i data-lucide="sparkles" class="w-4 h-4"></i> Summarize Work
              </button>
            </div>
          </div>
        </div>

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Daily Completion Card -->
          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <span class="text-xs font-semibold uppercase tracking-wider">Today's Completion</span>
              <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-gray-900 dark:text-white">${completedPercent}%</span>
              <span class="text-xs font-medium text-emerald-500 flex items-center gap-1">+12% vs avg</span>
            </div>
            <div class="mt-3 w-full bg-gray-100 dark:bg-darkHover rounded-full h-2 overflow-hidden">
              <div class="bg-emerald-500 h-2 rounded-full transition-all duration-500" style="width: ${completedPercent}%"></div>
            </div>
          </div>

          <!-- Productivity Score -->
          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <span class="text-xs font-semibold uppercase tracking-wider">Productivity Score</span>
              <div class="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <i data-lucide="zap" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-gray-900 dark:text-white">${user.productivityScore}<span class="text-xs font-normal text-gray-400">/100</span></span>
              <span class="text-xs font-medium text-brand-500 flex items-center gap-1">Optimal State</span>
            </div>
            <div class="mt-3 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              ${user.streakDays} day focus streak active 🔥
            </div>
          </div>

          <!-- Active Projects -->
          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <span class="text-xs font-semibold uppercase tracking-wider">Active Projects</span>
              <div class="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <i data-lucide="folder-kanban" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-gray-900 dark:text-white">${projects.length}</span>
              <span class="text-xs font-medium text-indigo-500 font-mono">1 In Review</span>
            </div>
            <div class="mt-3 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              Average completion 60%
            </div>
          </div>

          <!-- AI Assist Stats -->
          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <span class="text-xs font-semibold uppercase tracking-wider">AI Operations Today</span>
              <div class="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <i data-lucide="bot" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-2xl font-extrabold text-gray-900 dark:text-white">${user.aiInteractionsToday}</span>
              <span class="text-xs font-medium text-purple-500 flex items-center gap-1">2.5 hrs saved</span>
            </div>
            <div class="mt-3 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              Auto task extraction active
            </div>
          </div>
        </div>

        <!-- Main Dashboard Split Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left 2-Column: Priority Tasks & Analytics Chart -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Priority Work List -->
            <div class="bg-white dark:bg-darkCard rounded-2xl border border-gray-200 dark:border-darkBorder p-5 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <i data-lucide="target" class="w-4 h-4 text-brand-500"></i>
                  <h3 class="font-bold text-sm text-gray-900 dark:text-white">Today's Top Priorities</h3>
                </div>
                <a href="#tasks" class="text-xs text-brand-600 dark:text-brand-400 font-medium hover:underline">View All Tasks →</a>
              </div>

              <div class="space-y-2.5">
                ${tasks.slice(0, 4).map(task => `
                  <div class="p-3 rounded-xl bg-gray-50 dark:bg-darkHover/60 border border-gray-200/60 dark:border-darkBorder/80 flex items-center justify-between gap-3 hover:border-brand-500/40 transition-colors">
                    <div class="flex items-center gap-3 min-w-0">
                      <button class="dash-toggle-task w-5 h-5 rounded-md border ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600'} flex items-center justify-center transition-colors" data-id="${task.id}">
                        ${task.completed ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                      </button>
                      <div class="min-w-0">
                        <span class="text-xs font-medium text-gray-900 dark:text-gray-100 block truncate ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}">${task.title}</span>
                        <span class="text-[10px] text-gray-400 block">${task.projectName} • Due ${task.dueDate}</span>
                      </div>
                    </div>
                    <span class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${
                      task.priority === 'urgent' ? 'bg-rose-500/10 text-rose-500' :
                      task.priority === 'high' ? 'bg-amber-500/10 text-amber-500' : 'bg-gray-500/10 text-gray-500'
                    }">${task.priority}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Weekly Velocity Productivity Chart -->
            <div class="bg-white dark:bg-darkCard rounded-2xl border border-gray-200 dark:border-darkBorder p-5 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <i data-lucide="trending-up" class="w-4 h-4 text-brand-500"></i>
                  <h3 class="font-bold text-sm text-gray-900 dark:text-white">Weekly Productivity & AI Output</h3>
                </div>
                <span class="text-xs text-gray-400 font-mono">Chart.js Engine</span>
              </div>
              <div class="h-64">
                <canvas id="dashboard-productivity-chart"></canvas>
              </div>
            </div>
          </div>

          <!-- Right Column: AI Daily Briefing Card & Activity Stream -->
          <div class="space-y-6">
            <!-- AI Daily Insight Briefing -->
            <div class="bg-gradient-to-br from-gray-900 via-darkCard to-indigo-950 text-white rounded-2xl p-5 border border-indigo-500/30 shadow-lg relative overflow-hidden">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400"></i> AI Generated Daily Brief
                </span>
                <span class="text-[10px] text-gray-400 font-mono">Updated 10m ago</span>
              </div>
              <p class="text-xs text-indigo-100 leading-relaxed font-sans">
                "Alex, focus on finishing the <strong>FlowPilot Command Palette UI Specs</strong> during morning deep work. Afterwards, review <strong>SOC2 Audit controls</strong> before 3:00 PM."
              </p>
              <div class="mt-4 pt-3 border-t border-indigo-500/20 flex items-center justify-between text-xs">
                <span class="text-gray-400 text-[11px]">3 Focus sessions planned</span>
                <button id="dash-open-ai-chat" class="text-amber-300 hover:underline font-semibold text-[11px]">Ask AI Assistant →</button>
              </div>
            </div>

            <!-- Activity Stream Timeline -->
            <div class="bg-white dark:bg-darkCard rounded-2xl border border-gray-200 dark:border-darkBorder p-5 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <i data-lucide="activity" class="w-4 h-4 text-brand-500"></i> Recent Activity
                </h3>
                <span class="text-[10px] bg-gray-100 dark:bg-darkHover px-2 py-0.5 rounded-full text-gray-500">Live</span>
              </div>

              <div class="space-y-3">
                ${activity.map(act => `
                  <div class="flex gap-3 items-start text-xs">
                    <div class="w-6 h-6 rounded-lg bg-gray-100 dark:bg-darkHover text-brand-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i data-lucide="${act.icon || 'circle'}" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-gray-800 dark:text-gray-200 font-medium leading-snug">${act.text}</p>
                      <span class="text-[10px] text-gray-400">${act.time}</span>
                    </div>
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

    this.bindEvents(container);
    this.renderChart();
  },

  bindEvents(container) {
    // Quick action buttons
    const planBtn = container.querySelector('#dash-plan-day-btn');
    if (planBtn) {
      planBtn.addEventListener('click', () => {
        window.App.navigateTo('ai-assistant', { initialPrompt: "Plan my day." });
      });
    }

    const summaryBtn = container.querySelector('#dash-summary-btn');
    if (summaryBtn) {
      summaryBtn.addEventListener('click', () => {
        window.App.navigateTo('ai-assistant', { initialPrompt: "Summarize my projects." });
      });
    }

    const askAiBtn = container.querySelector('#dash-open-ai-chat');
    if (askAiBtn) {
      askAiBtn.addEventListener('click', () => {
        window.AiFloating.open();
      });
    }

    // Task check toggles
    container.querySelectorAll('.dash-toggle-task').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const taskId = btn.getAttribute('data-id');
        const task = window.FlowPilotData.tasks.find(t => t.id === taskId);
        if (task) {
          const newStatus = task.completed ? 'todo' : 'done';
          await window.MockApi.mockUpdateTaskStatus(taskId, newStatus, !task.completed);
          window.App.showToast(`Updated task "${task.title}"`, 'success');
          this.render(container);
        }
      });
    });
  },

  renderChart() {
    const ctx = document.getElementById('dashboard-productivity-chart');
    if (!ctx) return;

    const chartData = window.FlowPilotData.analytics.weeklyData;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Tasks Completed',
            data: chartData.tasksCompleted,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 2
          },
          {
            label: 'AI Assists',
            data: chartData.aiAssists,
            borderColor: '#10b981',
            backgroundColor: 'transparent',
            borderDash: [4, 4],
            tension: 0.4,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { family: 'Inter', size: 11 },
              color: '#9ca3af'
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af', font: { family: 'Inter', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(156, 163, 175, 0.1)' },
            ticks: { color: '#9ca3af', font: { family: 'Inter', size: 10 } }
          }
        }
      }
    });
  }
};
