// FlowPilot AI - Productivity Analytics View Controller

window.AnalyticsView = {
  render(container) {
    const analytics = window.FlowPilotData.analytics;

    const html = `
      <div class="space-y-6 max-w-7xl mx-auto pb-10">
        <!-- Analytics Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-darkCard p-4 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
          <div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">Productivity & AI Velocity Analytics</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Quantitative focus metrics, completion velocity, and AI efficiency stats</p>
          </div>

          <span class="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            +18% Efficiency Gains
          </span>
        </div>

        <!-- Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Tasks Completed (Week)</span>
            <div class="mt-2 text-2xl font-extrabold text-gray-900 dark:text-white">42 Tasks</div>
            <span class="text-xs text-emerald-500 font-medium">+8 vs last week</span>
          </div>

          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Hours Saved by AI</span>
            <div class="mt-2 text-2xl font-extrabold text-brand-500">${analytics.aiEfficiency.hoursSavedPerWeek} hrs</div>
            <span class="text-xs text-brand-500 font-medium">Auto-summaries & extraction</span>
          </div>

          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Deep Work Time</span>
            <div class="mt-2 text-2xl font-extrabold text-purple-500">33.0 hrs</div>
            <span class="text-xs text-purple-500 font-medium">6.6 hrs / day avg</span>
          </div>

          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">AI Accuracy Rate</span>
            <div class="mt-2 text-2xl font-extrabold text-amber-500">${analytics.aiEfficiency.accuracyRate}</div>
            <span class="text-xs text-amber-500 font-medium">Prompt intent precision</span>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Weekly Work Output Chart -->
          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm space-y-3">
            <h4 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <i data-lucide="bar-chart-2" class="w-4 h-4 text-brand-500"></i> Daily Focus Hours & Output
            </h4>
            <div class="h-64">
              <canvas id="analytics-focus-chart"></canvas>
            </div>
          </div>

          <!-- Task Distribution Chart -->
          <div class="bg-white dark:bg-darkCard p-5 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm space-y-3">
            <h4 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <i data-lucide="pie-chart" class="w-4 h-4 text-purple-500"></i> Task Distribution by Category
            </h4>
            <div class="h-64 flex items-center justify-center">
              <canvas id="analytics-dist-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();

    this.renderCharts();
  },

  renderCharts() {
    const data = window.FlowPilotData.analytics;

    // Focus Bar Chart
    const focusCtx = document.getElementById('analytics-focus-chart');
    if (focusCtx) {
      new Chart(focusCtx, {
        type: 'bar',
        data: {
          labels: data.weeklyData.labels,
          datasets: [{
            label: 'Focus Hours',
            data: data.weeklyData.focusHours,
            backgroundColor: '#6366f1',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
            y: { grid: { color: 'rgba(156, 163, 175, 0.1)' }, ticks: { color: '#9ca3af', font: { size: 10 } } }
          }
        }
      });
    }

    // Pie Distribution Chart
    const distCtx = document.getElementById('analytics-dist-chart');
    if (distCtx) {
      new Chart(distCtx, {
        type: 'doughnut',
        data: {
          labels: data.taskDistribution.labels,
          datasets: [{
            data: data.taskDistribution.values,
            backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#a855f7'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: { color: '#9ca3af', font: { family: 'Inter', size: 11 }, boxWidth: 12 }
            }
          }
        }
      });
    }
  }
};
