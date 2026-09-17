// FlowPilot AI - Settings & Preferences View Controller

window.SettingsView = {
  render(container) {
    const user = window.FlowPilotData.currentUser;

    const html = `
      <div class="space-y-6 max-w-4xl mx-auto pb-10">
        <!-- Settings Header -->
        <div class="bg-white dark:bg-darkCard p-6 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm space-y-6">
          <h3 class="font-bold text-base text-gray-900 dark:text-white pb-3 border-b border-gray-200 dark:border-darkBorder">
            Profile & AI Engine Settings
          </h3>

          <!-- Profile Form -->
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <img src="${user.avatar}" alt="${user.name}" class="w-16 h-16 rounded-full object-cover ring-4 ring-brand-500/20">
              <div>
                <h4 class="font-bold text-sm text-gray-900 dark:text-white">${user.name}</h4>
                <span class="text-xs text-gray-400">${user.role}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input type="text" value="${user.name}" class="w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input type="email" value="${user.email}" class="w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
              </div>
            </div>
          </div>

          <!-- AI Model Configuration -->
          <div class="pt-6 border-t border-gray-200 dark:border-darkBorder space-y-4">
            <h4 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <i data-lucide="bot" class="w-4 h-4 text-brand-500"></i> AI Provider & Model Configuration
            </h4>

            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">AI Assistant Model</label>
                <select class="w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
                  <option value="gpt-4o" selected>GPT-4o Omnimodal (Recommended for complex reasoning)</option>
                  <option value="claude-3-5">Claude 3.5 Sonnet (Optimized for technical writing)</option>
                  <option value="local-llama">Local Llama 3 70B (On-device encrypted simulation)</option>
                </select>
              </div>

              <!-- BACKEND: Connect AI provider/API here -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Custom API Endpoint (Optional)</label>
                <input type="text" placeholder="https://api.openai.com/v1 or local endpoint..." class="w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
              </div>
            </div>
          </div>

          <!-- Appearance Theme -->
          <div class="pt-6 border-t border-gray-200 dark:border-darkBorder space-y-4">
            <h4 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <i data-lucide="sun" class="w-4 h-4 text-amber-500"></i> Appearance & Interface
            </h4>

            <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-darkHover/60 border border-gray-200/60 dark:border-darkBorder">
              <div>
                <span class="text-xs font-semibold text-gray-900 dark:text-white block">Dark Mode</span>
                <span class="text-[11px] text-gray-400">Toggle dark / light high-contrast SaaS aesthetic</span>
              </div>

              <button id="settings-theme-toggle" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm">
                Toggle Theme
              </button>
            </div>
          </div>

          <div class="pt-4 flex justify-end">
            <button id="save-settings-btn" class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();

    this.bindEvents(container);
  },

  bindEvents(container) {
    const themeBtn = container.querySelector('#settings-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('flowpilot_theme', isDark ? 'dark' : 'light');
        window.App.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} theme`, 'info');
      });
    }

    const saveBtn = container.querySelector('#save-settings-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        window.App.showToast("Settings saved successfully", "success");
      });
    }
  }
};
