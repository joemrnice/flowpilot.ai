// FlowPilot AI - Interactive Task Workspace View (Kanban + SortableJS & List View)

window.TasksView = {
  currentLayout: 'kanban', // 'kanban' | 'list'
  filterPriority: 'all',
  filterProject: 'all',

  render(container) {
    const tasks = window.FlowPilotData.tasks;
    const projects = window.FlowPilotData.projects;

    const html = `
      <div class="space-y-6 max-w-7xl mx-auto pb-10">
        <!-- Task Header Toolbar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-darkCard p-4 rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm">
          <!-- View Switcher & Filters -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Kanban vs List Switcher -->
            <div class="flex bg-gray-100 dark:bg-darkHover p-1 rounded-xl">
              <button id="task-view-kanban" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${this.currentLayout === 'kanban' ? 'bg-white dark:bg-darkCard text-brand-600 dark:text-brand-400 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">
                <i data-lucide="kanban" class="w-3.5 h-3.5"></i> Board
              </button>
              <button id="task-view-list" class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${this.currentLayout === 'list' ? 'bg-white dark:bg-darkCard text-brand-600 dark:text-brand-400 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">
                <i data-lucide="list-todo" class="w-3.5 h-3.5"></i> List
              </button>
            </div>

            <!-- Priority Filter Dropdown -->
            <select id="task-filter-priority" class="bg-gray-100 dark:bg-darkHover border-none text-xs font-medium rounded-xl px-3 py-2 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent Priority</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <!-- Project Filter Dropdown -->
            <select id="task-filter-project" class="bg-gray-100 dark:bg-darkHover border-none text-xs font-medium rounded-xl px-3 py-2 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="all">All Projects</option>
              ${projects.map(p => `<option value="${p.id}">${p.title}</option>`).join('')}
            </select>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-2">
            <button id="task-ai-extract-btn" class="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-semibold text-xs transition-colors flex items-center gap-1.5 border border-purple-500/20">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> AI Task Generator
            </button>
            <button id="open-create-task-modal" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <i data-lucide="plus" class="w-4 h-4"></i> Create Task
            </button>
          </div>
        </div>

        <!-- Dynamic Task Board / List View Container -->
        <div id="tasks-content-area">
          ${this.currentLayout === 'kanban' ? this.renderKanbanHTML(tasks) : this.renderListHTML(tasks)}
        </div>
      </div>

      <!-- Create/Edit Task Modal -->
      <div id="task-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
        <div class="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-gray-200 dark:border-darkBorder pb-3">
            <h3 class="font-bold text-base text-gray-900 dark:text-white">Create New Work Task</h3>
            <button id="close-task-modal-btn" class="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="create-task-form" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Task Title</label>
              <input id="modal-task-title" type="text" placeholder="e.g., Finalize SOC2 Encryption Specs" required class="w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Project</label>
                <select id="modal-task-project" class="w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
                  ${projects.map(p => `<option value="${p.id}">${p.title}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                <select id="modal-task-priority" class="w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
                  <option value="low">Low</option>
                  <option value="medium" selected>Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                <input id="modal-task-duedate" type="text" placeholder="Select date" class="flatpickr-input w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Status Column</label>
                <select id="modal-task-status" class="w-full bg-gray-100 dark:bg-darkHover text-xs px-3 py-2.5 rounded-xl border border-transparent focus:border-brand-500 outline-none">
                  <option value="backlog">Backlog</option>
                  <option value="todo" selected>To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">In Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <div class="pt-3 flex justify-end gap-2">
              <button type="button" id="cancel-task-modal-btn" class="px-4 py-2 rounded-xl bg-gray-100 dark:bg-darkHover text-gray-700 dark:text-gray-300 font-semibold text-xs hover:bg-gray-200">Cancel</button>
              <button type="submit" class="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20">Save Task</button>
            </div>
          </form>
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();

    // Initialize Flatpickr for due date input
    if (window.flatpickr) {
      flatpickr('#modal-task-duedate', {
        dateFormat: 'Y-m-d',
        defaultDate: new Date()
      });
    }

    this.bindEvents(container);
    if (this.currentLayout === 'kanban') {
      this.initSortableJS();
    }
  },

  getFilteredTasks(tasks) {
    return tasks.filter(t => {
      if (this.filterPriority !== 'all' && t.priority !== this.filterPriority) return false;
      if (this.filterProject !== 'all' && t.projectId !== this.filterProject) return false;
      return true;
    });
  },

  renderKanbanHTML(allTasks) {
    const filtered = this.getFilteredTasks(allTasks);

    const columns = [
      { id: 'backlog', title: 'Backlog', color: 'border-gray-400' },
      { id: 'todo', title: 'To Do', color: 'border-blue-500' },
      { id: 'in_progress', title: 'In Progress', color: 'border-brand-500' },
      { id: 'review', title: 'In Review', color: 'border-purple-500' },
      { id: 'done', title: 'Done', color: 'border-emerald-500' }
    ];

    return `
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        ${columns.map(col => {
          const colTasks = filtered.filter(t => t.status === col.id);
          return `
            <div class="bg-gray-100/60 dark:bg-darkCard/50 p-3 rounded-2xl border border-gray-200/80 dark:border-darkBorder/80 flex flex-col min-h-[500px]">
              <!-- Column Header -->
              <div class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-darkBorder mb-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full border-2 ${col.color}"></span>
                  <h4 class="font-bold text-xs text-gray-900 dark:text-gray-100">${col.title}</h4>
                </div>
                <span class="text-[10px] font-mono font-bold bg-white dark:bg-darkHover px-2 py-0.5 rounded-full text-gray-500">${colTasks.length}</span>
              </div>

              <!-- Kanban Column Drop Area -->
              <div class="kanban-column flex-1 space-y-3" data-status="${col.id}">
                ${colTasks.map(task => this.renderTaskCardHTML(task)).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderTaskCardHTML(task) {
    const priorityColors = {
      urgent: 'bg-rose-500/10 text-rose-500',
      high: 'bg-amber-500/10 text-amber-500',
      medium: 'bg-brand-500/10 text-brand-500',
      low: 'bg-gray-500/10 text-gray-400'
    };

    return `
      <div class="task-card bg-white dark:bg-darkCard p-3.5 rounded-xl border border-gray-200/80 dark:border-darkBorder shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group" data-id="${task.id}">
        <div class="flex items-start justify-between gap-2 mb-2">
          <span class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${priorityColors[task.priority] || ''}">${task.priority}</span>
          <button class="task-delete-btn opacity-0 group-hover:opacity-100 text-gray-400 hover:text-rose-500 p-0.5 transition-opacity" data-id="${task.id}">
            <i data-lucide="trash" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <h5 class="text-xs font-semibold text-gray-900 dark:text-white leading-snug mb-2">${task.title}</h5>

        <div class="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100 dark:border-darkBorder/60">
          <span class="truncate max-w-[110px]">${task.projectName}</span>
          <span class="font-mono flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> ${task.dueDate}</span>
        </div>
      </div>
    `;
  },

  renderListHTML(allTasks) {
    const filtered = this.getFilteredTasks(allTasks);

    return `
      <div class="bg-white dark:bg-darkCard rounded-2xl border border-gray-200 dark:border-darkBorder shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-200 dark:border-darkBorder bg-gray-50/50 dark:bg-darkHover/30 grid grid-cols-12 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          <div class="col-span-1">Status</div>
          <div class="col-span-5">Task Title</div>
          <div class="col-span-3">Project</div>
          <div class="col-span-2">Due Date</div>
          <div class="col-span-1 text-right">Priority</div>
        </div>

        <div class="divide-y divide-gray-200/60 dark:divide-darkBorder">
          ${filtered.map(task => `
            <div class="p-4 grid grid-cols-12 items-center text-xs hover:bg-gray-50/80 dark:hover:bg-darkHover/40 transition-colors">
              <div class="col-span-1">
                <button class="list-toggle-task w-5 h-5 rounded-md border ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600'} flex items-center justify-center transition-colors" data-id="${task.id}">
                  ${task.completed ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                </button>
              </div>
              <div class="col-span-5 font-semibold text-gray-900 dark:text-gray-100 ${task.completed ? 'line-through text-gray-400' : ''}">${task.title}</div>
              <div class="col-span-3 text-gray-500 dark:text-gray-400">${task.projectName}</div>
              <div class="col-span-2 text-gray-400 font-mono">${task.dueDate}</div>
              <div class="col-span-1 text-right font-semibold uppercase text-[10px] text-amber-500">${task.priority}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  bindEvents(container) {
    // Switch views
    const kanbanBtn = container.querySelector('#task-view-kanban');
    const listBtn = container.querySelector('#task-view-list');
    if (kanbanBtn && listBtn) {
      kanbanBtn.addEventListener('click', () => {
        this.currentLayout = 'kanban';
        this.render(container);
      });
      listBtn.addEventListener('click', () => {
        this.currentLayout = 'list';
        this.render(container);
      });
    }

    // Filter selects
    const prioSelect = container.querySelector('#task-filter-priority');
    const projSelect = container.querySelector('#task-filter-project');
    if (prioSelect) {
      prioSelect.value = this.filterPriority;
      prioSelect.addEventListener('change', (e) => {
        this.filterPriority = e.target.value;
        this.render(container);
      });
    }
    if (projSelect) {
      projSelect.value = this.filterProject;
      projSelect.addEventListener('change', (e) => {
        this.filterProject = e.target.value;
        this.render(container);
      });
    }

    // Modal triggers
    const openModalBtn = container.querySelector('#open-create-task-modal');
    const modal = container.querySelector('#task-modal');
    const closeModalBtn = container.querySelector('#close-task-modal-btn');
    const cancelModalBtn = container.querySelector('#cancel-task-modal-btn');

    if (openModalBtn && modal) {
      openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    }
    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
    if (cancelModalBtn && modal) {
      cancelModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    // Form submit
    const createForm = container.querySelector('#create-task-form');
    if (createForm) {
      createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = container.querySelector('#modal-task-title').value.trim();
        const projectId = container.querySelector('#modal-task-project').value;
        const priority = container.querySelector('#modal-task-priority').value;
        const dueDate = container.querySelector('#modal-task-duedate').value;
        const status = container.querySelector('#modal-task-status').value;

        const projObj = window.FlowPilotData.projects.find(p => p.id === projectId);

        // BACKEND: Persist saved task
        await window.MockApi.mockSaveTask({
          title,
          projectId,
          projectName: projObj ? projObj.title : "General",
          priority,
          dueDate,
          status
        });

        modal.classList.add('hidden');
        window.App.showToast(`Task "${title}" created successfully`, 'success');
        this.render(container);
      });
    }

    // AI Extract Trigger
    const aiExtractBtn = container.querySelector('#task-ai-extract-btn');
    if (aiExtractBtn) {
      aiExtractBtn.addEventListener('click', () => {
        window.App.navigateTo('ai-assistant', { initialPrompt: "Create a task to review Q2 performance and update sprint board" });
      });
    }
  },

  initSortableJS() {
    if (!window.Sortable) return;

    const columns = document.querySelectorAll('.kanban-column');
    columns.forEach(col => {
      new Sortable(col, {
        group: 'kanban-board',
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: async (evt) => {
          const itemEl = evt.item;
          const taskId = itemEl.getAttribute('data-id');
          const newStatus = evt.to.getAttribute('data-status');

          // BACKEND: Update task status in database
          await window.MockApi.mockUpdateTaskStatus(taskId, newStatus);
          window.App.showToast(`Moved task to ${newStatus.replace('_', ' ').toUpperCase()}`, 'info');
        }
      });
    });
  }
};
