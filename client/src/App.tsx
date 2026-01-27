import axios from "axios";
import { useState } from "react";

function App() {
  const [logs, setLogs] = useState<string>("");

  const handleLogs = () => {
    if (!logs.trim()) return;
    axios.post("http://localhost:8000/api/logs", { logs }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex flex-col">
      {/* Navigation */}
      <header className="border-b border-white/5 bg-slate-950/70 backdrop-blur sticky top-0 z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <span className="font-semibold tracking-tight text-slate-50">
              CalmLogs
            </span>
          </div>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#home" className="hover:text-emerald-300 transition-colors">
              Home
            </a>
            <a
              href="#features"
              className="hover:text-emerald-300 transition-colors"
            >
              Features
            </a>
            <a href="#logs" className="hover:text-emerald-300 transition-colors">
              Send Logs
            </a>
          </div>
          <a
            href="#logs"
            className="rounded-full bg-emerald-400/90 px-4 py-1.5 text-sm font-medium text-slate-950 shadow-sm hover:bg-emerald-300 transition-colors"
          >
            Get Started
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section
          id="home"
          className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 text-center md:flex-row md:text-left"
        >
          <div className="flex-1 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
              Calm • Observability • Control
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">
              Monitor your logs in a
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                {" "}
                calm
              </span>{" "}
              and elegant way.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              A minimal interface to send and inspect your application logs. No
              clutter, just the signal you care about, wrapped in a peaceful
              dark UI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="#logs"
                className="rounded-full bg-emerald-400/90 px-5 py-2 text-sm font-medium text-slate-950 shadow-sm hover:bg-emerald-300 transition-colors"
              >
                Send your first log
              </a>
              <a
                href="#features"
                className="text-sm text-slate-300 hover:text-emerald-300 transition-colors"
              >
                Learn more
              </a>
            </div>
          </div>

          <div className="mt-10 flex-1 md:mt-0">
            <div className="relative mx-auto max-w-md rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-xl shadow-black/40">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                <span>Live log preview</span>
                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
                  calm mode
                </span>
              </div>
              <div className="space-y-2 text-left font-mono text-[11px] leading-relaxed text-slate-200">
                <p className="text-emerald-300/90">
                  2026-01-23T10:12:45Z INFO Server running on port 8000
                </p>
                <p className="text-slate-300/90">
                  2026-01-23T10:12:47Z INFO POST /api/logs 200 - 32ms
                </p>
                <p className="text-slate-400/90">
                  2026-01-23T10:13:02Z DEBUG user=alice action=login
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-white/5 bg-slate-950/60">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
                Designed to stay out of your way
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Calm visuals, clear typography, and just enough contrast to keep
                you focused.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-5">
                <h3 className="text-sm font-medium text-slate-50">
                  Minimal UI
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  A clean layout with generous spacing and soft colors to reduce
                  cognitive load.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-5">
                <h3 className="text-sm font-medium text-slate-50">
                  Instant Logs
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Send logs with a single request and inspect them immediately in
                  your terminal.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-5">
                <h3 className="text-sm font-medium text-slate-50">
                  Calm Colors
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Carefully chosen palette that feels elegant during long
                  debugging sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logs form */}
        <section
          id="logs"
          className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row"
        >
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
              Send a log entry
            </h2>
            <p className="text-sm text-slate-300">
              Paste any JSON or plain text below. It will be sent to your backend
              at
              <code className="ml-1 rounded bg-slate-900/70 px-1.5 py-0.5 text-[11px] text-emerald-300">
                POST /api/logs
              </code>
              .
            </p>
          </div>

          <div className="flex-1">
            <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-5 shadow-lg shadow-black/30">
              <label
                htmlFor="logs"
                className="mb-2 block text-xs font-medium text-slate-200"
              >
                Logs payload
              </label>
              <textarea
                id="logs"
                value={logs}
                onChange={(e) => setLogs(e.target.value)}
                placeholder='{\"level\":\"info\",\"message\":\"User signed in\"}'
                className="mb-4 h-40 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none ring-emerald-400/40 focus:border-emerald-300/60 focus:ring-2"
              />
              <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                <span>Sent logs will appear in your server console.</span>
                <button
                  type="button"
                  onClick={handleLogs}
                  className="rounded-full bg-emerald-400/90 px-4 py-1.5 text-[11px] font-medium text-slate-950 hover:bg-emerald-300 transition-colors"
                >
                  Send logs
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-slate-400">
          <span>CalmLogs • Minimal log viewer</span>
          <span className="hidden md:inline">Built with React & Tailwind</span>
        </div>
      </footer>
    </div>
  );
}

export default App;