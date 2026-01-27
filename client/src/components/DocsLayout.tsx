import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Zap, 
  Settings, 
  Code, 
  Terminal, 
  Database,
  Search,
  Filter,
  AlertCircle,
  ChevronRight
} from "lucide-react";

const sidebarSections = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction", icon: BookOpen },
      { href: "/docs/quickstart", label: "Quick Start", icon: Zap },
      { href: "/docs/installation", label: "Installation", icon: Settings },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { href: "/docs/sending-logs", label: "Sending Logs", icon: Terminal },
      { href: "/docs/log-levels", label: "Log Levels", icon: AlertCircle },
      { href: "/docs/log-format", label: "Log Format", icon: Code },
    ],
  },
  {
    title: "Features",
    items: [
      { href: "/docs/search", label: "Search & Filter", icon: Search },
      { href: "/docs/filtering", label: "Advanced Filtering", icon: Filter },
      { href: "/docs/storage", label: "Log Storage", icon: Database },
    ],
  },
];

export function DocsLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-130px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-950/50 hidden md:block">
        <div className="sticky top-[73px] p-6 overflow-y-auto max-h-[calc(100vh-130px)]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-300" />
              Documentation
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Learn how to use CalmLogs
            </p>
          </div>

          <nav className="space-y-6">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-50"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                          {isActive && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <details className="group">
          <summary className="list-none cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-emerald-400/90 flex items-center justify-center shadow-lg hover:bg-emerald-300 transition-colors">
              <BookOpen className="w-5 h-5 text-slate-950" />
            </div>
          </summary>
          <div className="absolute bottom-14 right-0 w-64 rounded-xl border border-white/10 bg-slate-900 p-4 shadow-xl">
            <nav className="space-y-4 max-h-80 overflow-y-auto">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = location.pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            to={item.href}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                              isActive
                                ? "bg-emerald-400/10 text-emerald-300"
                                : "text-slate-300 hover:bg-slate-800/50"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </details>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 md:px-12 max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
}
