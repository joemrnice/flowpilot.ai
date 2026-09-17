// FlowPilot AI - Main Application Gateway & Controller

window.App = {
  currentView: 'dashboard',

  async init() {
    this.setupTheme();
    this.bindGlobalNavigation();

    // Initialize Global Interactive UI Modules
    window.CommandPalette.init();
    window.AiFloating.init();

    // Re-render Lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }

    // Handle hash route changes or default
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();
  },

  setupTheme() {
    const savedTheme = localStorage.getItem('flowpilot_theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('flowpilot_theme', isDark ? 'dark' : 'light');
        this.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} theme`, 'info');
      });
    }
  },

  bindGlobalNavigation() {
    // Sidebar toggle
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    if (toggleSidebarBtn && sidebar) {
      toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }

    // Mobile sidebar toggle
    const mobileSidebarBtn = document.getElementById('mobile-sidebar-toggle');
    if (mobileSidebarBtn && sidebar) {
      mobileSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
      });
    }

    // Quick Command Palette button click
    const quickCmdBtn = document.getElementById('quick-command-btn');
    if (quickCmdBtn) {
      quickCmdBtn.addEventListener('click', () => {
        window.CommandPalette.open();
      });
    }

    // Global Search Bar Cmd+K trigger
    const globalSearch = document.getElementById('global-search-input');
    if (globalSearch) {
      globalSearch.addEventListener('click', () => {
        window.CommandPalette.open();
      });
    }
  },

  handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    this.navigateTo(hash);
  },

  navigateTo(viewName, params = {}) {
    this.currentView = viewName;

    // Highlight sidebar links
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Header Titles
    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');

    const titles = {
      'dashboard': { title: 'Dashboard Overview', subtitle: 'AI insights, priority tasks, and daily productivity' },
      'ai-assistant': { title: 'AI Workspace Command Center', subtitle: 'Single-interface generative AI productivity router' },
      'tasks': { title: 'Task Workspace', subtitle: 'Kanban board & task lists with AI quick actions' },
      'projects': { title: 'Projects Command', subtitle: 'Active milestones, progress tracking, and AI summaries' },
      'calendar': { title: 'Schedule & Calendar', subtitle: 'Focus sessions, AI day planner, and agenda' },
      'notes': { title: 'Smart Notes Workspace', subtitle: 'Strategic notes with automated task extraction' },
      'documents': { title: 'Document Analyzer', subtitle: 'AI insights, key takeaway extraction, and file management' },
      'analytics': { title: 'Productivity Analytics', subtitle: 'Velocity, focus hours, and AI assist efficiency charts' },
      'settings': { title: 'Settings & Preferences', subtitle: 'AI models, preferences, theme, and profile' }
    };

    if (titles[viewName]) {
      if (titleEl) titleEl.textContent = titles[viewName].title;
      if (subtitleEl) subtitleEl.textContent = titles[viewName].subtitle;
    }

    // Render Target View
    const container = document.getElementById('view-container');
    container.innerHTML = '';

    const viewRenderers = {
      'dashboard': () => window.DashboardView && window.DashboardView.render(container),
      'ai-assistant': () => window.AiAssistantView && window.AiAssistantView.render(container, params),
      'tasks': () => window.TasksView && window.TasksView.render(container),
      'projects': () => window.ProjectsView && window.ProjectsView.render(container),
      'calendar': () => window.CalendarView && window.CalendarView.render(container),
      'notes': () => window.NotesView && window.NotesView.render(container),
      'documents': () => window.DocumentsView && window.DocumentsView.render(container),
      'analytics': () => window.AnalyticsView && window.AnalyticsView.render(container),
      'settings': () => window.SettingsView && window.SettingsView.render(container)
    };

    if (viewRenderers[viewName]) {
      viewRenderers[viewName]();
    } else {
      container.innerHTML = `<div class="p-8 text-center text-gray-500">View strictly coming soon...</div>`;
    }

    // Refresh icons
    if (window.lucide) {
      lucide.createIcons();
    }
  },

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toastId = 'toast-' + Date.now();
    const icons = {
      success: 'check-circle-2',
      error: 'alert-triangle',
      info: 'sparkles'
    };
    const bgColors = {
      success: 'bg-emerald-600 text-white',
      error: 'bg-rose-600 text-white',
      info: 'bg-brand-600 text-white'
    };

    const toastHTML = `
      <div id="${toastId}" class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl ${bgColors[type]} transform translate-y-4 opacity-0 transition-all duration-300 max-w-sm">
        <i data-lucide="${icons[type]}" class="w-4 h-4 flex-shrink-0"></i>
        <span class="text-xs font-medium">${message}</span>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    if (window.lucide) lucide.createIcons();

    const el = document.getElementById(toastId);
    setTimeout(() => {
      el.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    setTimeout(() => {
      el.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => el.remove(), 300);
    }, 3500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
