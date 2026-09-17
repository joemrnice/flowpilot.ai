// FlowPilot AI - Mock Backend Integration Gateway API
// Includes explicit BACKEND markers and realistic async promises

window.MockApi = {
  // BACKEND: Fetch active user profile
  async mockFetchUserProfile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...window.FlowPilotData.currentUser });
      }, 150);
    });
  },

  // BACKEND: Connect AI provider/API here
  // Simulates AI streaming response or instant generated structure
  async mockGenerateAIResponse(prompt, context = {}) {
    // BACKEND: Replace with fetch('/api/ai/generate', { method: 'POST', body: JSON.stringify({ prompt, context }) })
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerPrompt = prompt.toLowerCase();
        let responseText = "";
        let actionCard = null;

        if (lowerPrompt.includes("summarize my projects") || lowerPrompt.includes("summarize projects")) {
          responseText = "Here is an executive summary of your active projects across all departments:\n\n" +
            "• **FlowPilot v2.0 Redesign** (78% Complete): Design system migration is 90% done. On track for release.\n" +
            "• **Enterprise AI Security Audit** (92% Complete): High-risk checks passed. Pending final sign-off.\n" +
            "• **Q2 Growth Engine** (45% Complete): Marketing landing page messaging variants in A/B testing.\n" +
            "• **Smart Command Palette** (25% Complete): NLP intent routing dataset under construction.";

          actionCard = {
            type: "report",
            title: "Project Portfolio Status",
            details: [
              "4 Active Projects",
              "1 Pending Compliance Sign-off",
              "Average Completion: 60%"
            ],
            suggestedAction: { label: "View All Projects", view: "projects" }
          };
        } else if (lowerPrompt.includes("create a task") || lowerPrompt.includes("create task")) {
          responseText = `I have parsed your prompt and created a structured task draft for you:`;
          actionCard = {
            type: "task_created",
            title: "Draft Task Created",
            taskData: {
              title: prompt.replace(/create task/i, "").replace(/create a task/i, "").trim() || "New Action Item from AI",
              priority: "high",
              projectId: "proj-1",
              projectName: "FlowPilot v2.0 Redesign",
              dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
            }
          };
        } else if (lowerPrompt.includes("show overdue work") || lowerPrompt.includes("overdue")) {
          const overdue = window.FlowPilotData.tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date());
          responseText = `You currently have ${overdue.length} high priority overdue items needing immediate attention.`;
          actionCard = {
            type: "overdue_list",
            title: "Overdue Work Items",
            items: overdue.length > 0 ? overdue.map(t => t.title) : ["Audit SOC2 Data Encryption Controls", "Synthesize Q1 Customer Feedback Notes"]
          };
        } else if (lowerPrompt.includes("plan my day") || lowerPrompt.includes("plan day")) {
          responseText = "I have reviewed your calendar, active deadlines, and energy curve for today. Here is your recommended schedule:\n\n" +
            "1. **Morning Focus (09:30 - 11:30)**: High-cognition deep work on FlowPilot v2.0 UI components.\n" +
            "2. **Midday Alignment (11:30 - 12:30)**: SOC2 Audit documentation review.\n" +
            "3. **Afternoon Execution (14:00 - 16:30)**: Review customer feedback notes and update team sprint board.";
          actionCard = {
            type: "day_plan",
            title: "Optimized Daily Agenda",
            items: [
              { label: "09:30 AM", detail: "Deep Work: UI Redesign Specs" },
              { label: "11:30 AM", detail: "SOC2 Compliance Audit" },
              { label: "02:00 PM", detail: "Team Sprint Alignment" }
            ]
          };
        } else if (lowerPrompt.includes("analyze") || lowerPrompt.includes("document")) {
          responseText = "Analyzed target document 'FlowPilot_Product_Requirement_Doc_v2.pdf':\n\n" +
            "• **Key Theme**: Streamlined single-command AI interface for SaaS workflows.\n" +
            "• **Extracted Actions**: 3 actionable tasks identified and ready to convert into work items.\n" +
            "• **Risk Level**: Low. Clear delivery milestone timeline established.";
          actionCard = {
            type: "doc_analysis",
            title: "Document Insights Extracted",
            keyPoints: [
              "Single-command AI interface pattern",
              "Dark/Light high contrast SaaS aesthetic",
              "Interactive drag-and-drop task tracking"
            ]
          };
        } else if (lowerPrompt.includes("prepare a weekly progress report") || lowerPrompt.includes("weekly report") || lowerPrompt.includes("prepare report")) {
          responseText = "### Executive Weekly Progress Report\n" +
            "**Period**: March 18 - March 24, 2025\n\n" +
            "**Highlights**:\n" +
            "- Completed 7 key tasks ahead of sprint deadline.\n" +
            "- Productivity Score reached 94/100 (+6% week-over-week).\n" +
            "- Security audit passed 11 of 12 controls.\n\n" +
            "**Next Week Focus**:\n" +
            "- Launch Smart Command Palette router testing.\n" +
            "- Finalize Q2 Growth Engine campaign assets.";
          actionCard = {
            type: "weekly_report",
            title: "Weekly Report Prepared",
            summary: "7 tasks completed | 94/100 Productivity | SOC2 Audit 92%"
          };
        } else {
          responseText = `FlowPilot AI processed your request: "${prompt}".\n\nI can help you convert this insight into a task, save it as a strategic note, or build an automated report. What would you like to do next?`;
          actionCard = {
            type: "general_suggestion",
            title: "AI Quick Actions Available",
            options: ["Create Task from this", "Save as Note", "Generate Executive Summary"]
          };
        }

        resolve({
          id: "msg-" + Date.now(),
          text: responseText,
          actionCard: actionCard,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }, 400);
    });
  },

  // BACKEND: Persist generated task
  async mockSaveTask(taskObj) {
    // BACKEND: Replace with fetch('/api/tasks', { method: 'POST', body: JSON.stringify(taskObj) })
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: "task-" + Date.now(),
          title: taskObj.title || "New Task",
          description: taskObj.description || "",
          status: taskObj.status || "todo",
          priority: taskObj.priority || "medium",
          projectId: taskObj.projectId || "proj-1",
          projectName: taskObj.projectName || "FlowPilot v2.0 Redesign",
          dueDate: taskObj.dueDate || new Date().toISOString().split('T')[0],
          estimatedMinutes: taskObj.estimatedMinutes || 45,
          completed: taskObj.status === "done",
          tags: taskObj.tags || ["AI-Generated"]
        };
        window.FlowPilotData.tasks.unshift(newTask);

        // Record in activity log
        window.FlowPilotData.activityLog.unshift({
          id: "act-" + Date.now(),
          time: "Just now",
          text: `Created task '${newTask.title}'`,
          type: "task_create",
          icon: "check-circle-2"
        });

        resolve({ success: true, task: newTask });
      }, 200);
    });
  },

  // BACKEND: Update task status/completion
  async mockUpdateTaskStatus(taskId, newStatus, isCompleted = false) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = window.FlowPilotData.tasks.find(t => t.id === taskId);
        if (task) {
          task.status = newStatus;
          task.completed = isCompleted || newStatus === "done";
          if (task.completed) {
            window.FlowPilotData.currentUser.tasksCompletedToday += 1;
          }
        }
        resolve({ success: true, task });
      }, 150);
    });
  },

  // BACKEND: Persist note created from AI or user
  async mockSaveNote(noteObj) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNote = {
          id: "note-" + Date.now(),
          title: noteObj.title || "Untitled Note",
          updatedAt: new Date().toISOString(),
          folder: noteObj.folder || "General",
          tags: noteObj.tags || ["AI Note"],
          content: noteObj.content || ""
        };
        window.FlowPilotData.notes.unshift(newNote);
        resolve({ success: true, note: newNote });
      }, 200);
    });
  },

  // BACKEND: Fetch projects list
  async mockFetchProjects() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...window.FlowPilotData.projects]);
      }, 150);
    });
  },

  // BACKEND: Fetch documents list
  async mockFetchDocuments() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...window.FlowPilotData.documents]);
      }, 150);
    });
  }
};
