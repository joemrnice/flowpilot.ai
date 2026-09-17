// FlowPilot AI - Initial Mock Application State Data

window.FlowPilotData = {
  currentUser: {
    name: "Alex Vance",
    email: "alex.vance@flowpilot.ai",
    role: "Lead Product Designer & Strategist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    productivityScore: 94,
    tasksCompletedToday: 7,
    totalTasksToday: 9,
    streakDays: 14,
    aiInteractionsToday: 23
  },

  projects: [
    {
      id: "proj-1",
      title: "FlowPilot v2.0 Redesign",
      description: "Complete UI component library overhaul and AI workflow integration.",
      category: "Product & Design",
      status: "In Progress",
      progress: 78,
      dueDate: "2025-04-15",
      tasksCount: 18,
      completedTasksCount: 14,
      color: "indigo",
      lead: "Alex Vance",
      members: [
        { name: "Alex Vance", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
        { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
        { name: "Marcus Brody", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" }
      ],
      aiSummary: "Design system token migration is 90% complete. Next milestone is testing the floating AI command overlay across viewports."
    },
    {
      id: "proj-2",
      title: "Enterprise AI Security Audit",
      description: "SOC2 Compliance review and encrypted local storage architecture verification.",
      category: "Engineering & Ops",
      status: "In Review",
      progress: 92,
      dueDate: "2025-03-30",
      tasksCount: 12,
      completedTasksCount: 11,
      color: "emerald",
      lead: "Sarah Chen",
      members: [
        { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
        { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" }
      ],
      aiSummary: "All high-risk vector checks passed. Final sign-off required from compliance officer before release."
    },
    {
      id: "proj-3",
      title: "Q2 Growth & Marketing Engine",
      description: "Multi-channel AI campaign strategy and automated lead nurturing sequence.",
      category: "Marketing",
      status: "In Progress",
      progress: 45,
      dueDate: "2025-05-01",
      tasksCount: 20,
      completedTasksCount: 9,
      color: "amber",
      lead: "Elena Rostova",
      members: [
        { name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
        { name: "Alex Vance", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" }
      ],
      aiSummary: "Landing page messaging variations tested. AI content generator pipeline configured for weekly blog updates."
    },
    {
      id: "proj-4",
      title: "Smart Command Palette Engine",
      description: "Natural language query router for contextual app-wide actions.",
      category: "AI & Data",
      status: "Planning",
      progress: 25,
      dueDate: "2025-05-20",
      tasksCount: 15,
      completedTasksCount: 4,
      color: "purple",
      lead: "David Kim",
      members: [
        { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
        { name: "Marcus Brody", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" }
      ],
      aiSummary: "Intent classification model selected. Need mock dataset for edge case user queries."
    }
  ],

  tasks: [
    {
      id: "task-101",
      title: "Finalize FlowPilot Command Palette UI Specs",
      description: "Ensure Cmd+K shortcut works globally and auto-focuses input with smooth backdrop blur.",
      status: "done", // backlog, todo, in_progress, review, done
      priority: "high", // low, medium, high, urgent
      projectId: "proj-1",
      projectName: "FlowPilot v2.0 Redesign",
      dueDate: "2025-03-24",
      estimatedMinutes: 60,
      completed: true,
      tags: ["UI/UX", "Command Center", "Core"]
    },
    {
      id: "task-102",
      title: "Synthesize Q1 Customer Feedback Notes",
      description: "Use FlowPilot AI document analyzer to extract recurring feature requests and pain points.",
      status: "in_progress",
      priority: "urgent",
      projectId: "proj-3",
      projectName: "Q2 Growth & Marketing Engine",
      dueDate: "2025-03-25",
      estimatedMinutes: 90,
      completed: false,
      tags: ["AI Analysis", "Research"]
    },
    {
      id: "task-103",
      title: "Audit SOC2 Data Encryption Controls",
      description: "Review client-side encryption keys and verify state isolation in local storage.",
      status: "review",
      priority: "high",
      projectId: "proj-2",
      projectName: "Enterprise AI Security Audit",
      dueDate: "2025-03-26",
      estimatedMinutes: 120,
      completed: false,
      tags: ["Security", "Compliance"]
    },
    {
      id: "task-104",
      title: "Design Responsive Drag-and-Drop Task Board",
      description: "Implement SortableJS integration for seamless Kanban card movement between columns.",
      status: "in_progress",
      priority: "high",
      projectId: "proj-1",
      projectName: "FlowPilot v2.0 Redesign",
      dueDate: "2025-03-25",
      estimatedMinutes: 45,
      completed: false,
      tags: ["Frontend", "SortableJS", "Kanban"]
    },
    {
      id: "task-105",
      title: "Prepare Weekly Executive Progress Briefing",
      description: "Generate auto-summarized report covering top achievements, upcoming blockers, and sprint velocity.",
      status: "todo",
      priority: "medium",
      projectId: "proj-1",
      projectName: "FlowPilot v2.0 Redesign",
      dueDate: "2025-03-27",
      estimatedMinutes: 30,
      completed: false,
      tags: ["AI Briefing", "Reporting"]
    },
    {
      id: "task-106",
      title: "Configure Dark & Light SaaS Theme System",
      description: "Ensure high contrast, accessible typography, and smooth CSS color transitions across themes.",
      status: "done",
      priority: "medium",
      projectId: "proj-1",
      projectName: "FlowPilot v2.0 Redesign",
      dueDate: "2025-03-23",
      estimatedMinutes: 40,
      completed: true,
      tags: ["TailwindCSS", "Themes"]
    },
    {
      id: "task-107",
      title: "Review Intent Parsing for Natural Queries",
      description: "Train router to recognize commands like 'Show overdue work' and 'Plan my day' automatically.",
      status: "backlog",
      priority: "medium",
      projectId: "proj-4",
      projectName: "Smart Command Palette Engine",
      dueDate: "2025-04-02",
      estimatedMinutes: 180,
      completed: false,
      tags: ["NLP", "AI Engine"]
    },
    {
      id: "task-108",
      title: "Optimize Chart.js Dashboard Visualizations",
      description: "Build clean productivity trend chart with sleek gradients and clear tooltips.",
      status: "todo",
      priority: "low",
      projectId: "proj-1",
      projectName: "FlowPilot v2.0 Redesign",
      dueDate: "2025-03-28",
      estimatedMinutes: 50,
      completed: false,
      tags: ["Analytics", "Chart.js"]
    }
  ],

  notes: [
    {
      id: "note-1",
      title: "Q2 Product Strategy & AI Integration Vision",
      updatedAt: "2025-03-24T10:30:00Z",
      folder: "Strategy",
      tags: ["AI", "Vision", "Roadmap"],
      content: `### Executive Summary
FlowPilot AI aims to redefine personal productivity by embedding intelligence directly into every workspace interaction.

#### Key Focus Areas for Q2:
1. **Context-Aware AI Command Bar**: Users can invoke instant AI operations without leaving their active task.
2. **Unified Document Analysis**: Drag-and-drop PDFs, strategic memos, or specs to auto-extract actionable tasks and summary bullet points.
3. **Automated Sprint Velocity Summaries**: One-click generation of weekly progress reports for leadership.

#### Action Items to Extract:
- [ ] Schedule Q2 Roadmap alignment meeting with Sarah & David
- [ ] Prototype AI document chunking pipeline for large PDF files
- [ ] Finalize dark mode CSS variable palette for command palette drop-down`
    },
    {
      id: "note-2",
      title: "Architecture Specs: Front-End Command Engine",
      updatedAt: "2025-03-23T16:15:00Z",
      folder: "Engineering",
      tags: ["Architecture", "JS", "Design System"],
      content: `### System Principles
- **No Heavy Framework Overhead**: Vanilla JS ES6+ modular architecture for ultra-fast startup (<200ms load time).
- **Frontend Mock API Gateway**: All AI simulation functions wrapped in standard Promises with explicit backend integration markers.
- **Client-Side State Store**: Single reactive state object synchronized with localStorage for seamless UX.

#### Core Modules:
- \`aiEngine.js\`: Standardized prompt parsing and streaming response emulation.
- \`commandPalette.js\`: Global shortcut listener (Cmd+K) and interactive action trigger.
- \`taskBoard.js\`: Drag and drop column management using SortableJS.`
    },
    {
      id: "note-3",
      title: "Weekly AI Assistant Prompt Library & Workflows",
      updatedAt: "2025-03-22T09:00:00Z",
      folder: "Prompts",
      tags: ["AI Prompts", "Productivity"],
      content: `### Top Recommended Commands:
- "Summarize my active projects and highlight blockers"
- "Create an urgent task to review SOC2 compliance specs by tomorrow"
- "Analyze this document and extract key decisions"
- "Plan my day around 3 deep work focus sessions"
- "Prepare a weekly progress report for management"`
    }
  ],

  documents: [
    {
      id: "doc-1",
      title: "FlowPilot_Product_Requirement_Doc_v2.pdf",
      fileType: "PDF",
      fileSize: "2.4 MB",
      uploadedAt: "2025-03-24",
      status: "Analyzed",
      summary: "This PRD outlines the end-to-end spec for FlowPilot AI v2. Key focus includes frictionless task creation, ambient AI suggestions, and high-density productivity dashboards.",
      extractedTasks: [
        "Create task creation trigger in document viewer",
        "Implement Dark/Light mode switcher with persistence",
        "Add productivity score widget to dashboard overview"
      ],
      keyTakeaways: [
        "Productivity score is calculated based on task completion velocity and deep work time.",
        "AI Assistant should support simulated streaming response playback.",
        "All drag-and-drop column movements must maintain state instantly."
      ]
    },
    {
      id: "doc-2",
      title: "SOC2_Security_Compliance_Audit_2025.docx",
      fileType: "DOCX",
      fileSize: "1.8 MB",
      uploadedAt: "2025-03-22",
      status: "Analyzed",
      summary: "Full security report covering data retention, end-to-end encryption, and role-based client side permissions.",
      extractedTasks: [
        "Verify mock user permissions before displaying enterprise settings",
        "Add client-side data wipe feature in settings"
      ],
      keyTakeaways: [
        "Zero backend persistence during mock mode ensures complete data isolation.",
        "Local state should be clearly marked with backend integration hooks."
      ]
    },
    {
      id: "doc-3",
      title: "Q1_Productivity_Benchmarking_Report.pdf",
      fileType: "PDF",
      fileSize: "4.1 MB",
      uploadedAt: "2025-03-20",
      status: "Analyzed",
      summary: "Comparative analysis of productivity gain when using integrated AI assistant command bars vs standard chatbots.",
      extractedTasks: [
        "Display weekly productivity progress chart with Chart.js"
      ],
      keyTakeaways: [
        "Integrated command bars reduce context switching time by 42%.",
        "Quick action buttons ('Create Task', 'Save Note') double user conversion on AI suggestions."
      ]
    }
  ],

  calendarEvents: [
    {
      id: "evt-1",
      title: "Sprint Planning & AI Roadmap Sync",
      time: "09:00 AM - 10:00 AM",
      date: "2025-03-25",
      type: "Meeting",
      attendees: 4,
      location: "FlowPilot Video Room A"
    },
    {
      id: "evt-2",
      title: "Deep Work: Command Palette Component Polish",
      time: "10:30 AM - 12:30 PM",
      date: "2025-03-25",
      type: "Focus Time",
      attendees: 1,
      location: "Focused Workspace"
    },
    {
      id: "evt-3",
      title: "Design System Review with Sarah",
      time: "02:00 PM - 03:00 PM",
      date: "2025-03-25",
      type: "Review",
      attendees: 2,
      location: "Figma Huddle"
    },
    {
      id: "evt-4",
      title: "SOC2 Audit Final Checkpoint",
      time: "11:00 AM - 12:00 PM",
      date: "2025-03-26",
      type: "Security",
      attendees: 3,
      location: "Security Channel"
    },
    {
      id: "evt-5",
      title: "Weekly Leadership Briefing & AI Progress Report",
      time: "04:00 PM - 05:00 PM",
      date: "2025-03-27",
      type: "Executive",
      attendees: 6,
      location: "Boardroom / Zoom"
    }
  ],

  activityLog: [
    {
      id: "act-1",
      time: "10 mins ago",
      text: "Completed task 'Finalize FlowPilot Command Palette UI Specs'",
      type: "task_complete",
      icon: "check-circle-2"
    },
    {
      id: "act-2",
      time: "25 mins ago",
      text: "AI Assistant generated daily plan: '3 priority tasks identified'",
      type: "ai_action",
      icon: "sparkles"
    },
    {
      id: "act-3",
      time: "1 hour ago",
      text: "Uploaded document 'FlowPilot_Product_Requirement_Doc_v2.pdf'",
      type: "doc_upload",
      icon: "file-text"
    },
    {
      id: "act-4",
      time: "2 hours ago",
      text: "Moved 'Design Responsive Drag-and-Drop Task Board' to In Progress",
      type: "task_move",
      icon: "kanban"
    },
    {
      id: "act-5",
      time: "Yesterday",
      text: "Created note 'Q2 Product Strategy & AI Integration Vision'",
      type: "note_create",
      icon: "sticky-note"
    }
  ],

  analytics: {
    weeklyData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      tasksCompleted: [5, 8, 7, 9, 6, 3, 4],
      aiAssists: [12, 19, 15, 22, 18, 8, 10],
      focusHours: [4.5, 6.0, 5.5, 7.0, 5.0, 2.0, 3.0]
    },
    taskDistribution: {
      labels: ["Product & Design", "Engineering", "Marketing", "AI & Data"],
      values: [40, 30, 15, 15]
    },
    aiEfficiency: {
      tasksGeneratedByAI: 48,
      hoursSavedPerWeek: 12.5,
      docAnalysisCount: 14,
      accuracyRate: "98.4%"
    }
  },

  aiConversationHistory: [
    {
      id: "conv-1",
      sender: "user",
      timestamp: "09:15 AM",
      text: "Plan my day based on urgent deadlines and my scheduled meetings."
    },
    {
      id: "conv-2",
      sender: "ai",
      timestamp: "09:15 AM",
      text: "Good morning Alex! Here is your optimal productivity plan for today:\n\n1. **High Priority Focus (10:30 AM - 12:30 PM)**: Complete 'Design Responsive Drag-and-Drop Task Board' (Due Today).\n2. **Meeting Preparation (1:30 PM)**: Review Customer Feedback Notes before Design System Review at 2:00 PM.\n3. **Quick Win**: Review SOC2 Audit controls before end of day.",
      actionCard: {
        type: "day_plan",
        title: "Daily Focus Plan Created",
        items: [
          { label: "10:30 AM", detail: "Deep Work: Kanban Drag-and-Drop" },
          { label: "02:00 PM", detail: "Design System Review" },
          { label: "04:30 PM", detail: "SOC2 Compliance Check" }
        ]
      }
    }
  ]
};
