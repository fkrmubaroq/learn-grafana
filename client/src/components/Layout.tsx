import { Link, Outlet, useLocation } from "react-router-dom";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/mock", label: "Mock API" },
  { href: "/docs", label: "Docs" },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex flex-col">
      {/* Navigation */}
      <header className="border-b border-white/5 bg-slate-950/70 backdrop-blur sticky top-0 z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <span className="font-semibold tracking-tight text-slate-50">
              CalmLogs
            </span>
          </Link>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`hover:text-emerald-300 transition-colors ${
                  location.pathname === link.href ||
                  (link.href !== "/" && location.pathname.startsWith(link.href))
                    ? "text-emerald-300"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/docs"
            className="rounded-full bg-emerald-400/90 px-4 py-1.5 text-sm font-medium text-slate-950 shadow-sm hover:bg-emerald-300 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-slate-400">
          <span>CalmLogs - Minimal log viewer</span>
          <span className="hidden md:inline">Built with React & Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
