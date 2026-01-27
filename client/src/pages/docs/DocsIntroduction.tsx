import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Zap, Code } from "lucide-react";

export function DocsIntroduction() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80 mb-3">
          Documentation
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Welcome to CalmLogs
        </h1>
        <p className="text-slate-300 leading-relaxed">
          CalmLogs is a minimal, elegant logging interface designed to help you monitor
          your application logs without the clutter. Built with observability in mind,
          it integrates seamlessly with modern logging stacks.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          to="/docs/quickstart"
          className="group rounded-xl border border-white/5 bg-slate-900/50 p-5 hover:border-emerald-400/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-emerald-300" />
          </div>
          <h3 className="text-sm font-medium text-slate-50 mb-1 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
            Quick Start
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400">
            Get up and running in under 5 minutes
          </p>
        </Link>
        <Link
          to="/docs/sending-logs"
          className="group rounded-xl border border-white/5 bg-slate-900/50 p-5 hover:border-emerald-400/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center mb-3">
            <Code className="w-5 h-5 text-emerald-300" />
          </div>
          <h3 className="text-sm font-medium text-slate-50 mb-1 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
            API Reference
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400">
            Learn how to send logs programmatically
          </p>
        </Link>
        <Link
          to="/docs/log-levels"
          className="group rounded-xl border border-white/5 bg-slate-900/50 p-5 hover:border-emerald-400/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5 text-emerald-300" />
          </div>
          <h3 className="text-sm font-medium text-slate-50 mb-1 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
            Core Concepts
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400">
            Understand log levels and formatting
          </p>
        </Link>
      </div>

      {/* Features Overview */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Key Features</h2>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden">
          <ul className="divide-y divide-white/5">
            {[
              {
                title: "Minimal Interface",
                description: "Clean, distraction-free UI for focused debugging",
              },
              {
                title: "Real-time Logging",
                description: "See your logs appear instantly as they're generated",
              },
              {
                title: "OpenTelemetry Support",
                description: "Full integration with the OpenTelemetry ecosystem",
              },
              {
                title: "Grafana Stack Integration",
                description: "Works seamlessly with Loki, Tempo, and Prometheus",
              },
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-4 p-4">
                <div className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-emerald-300">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-50">{feature.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Architecture */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Architecture</h2>
        <p className="text-sm text-slate-300 mb-4">
          CalmLogs is built on top of a robust observability stack:
        </p>
        <div className="rounded-xl border border-white/5 bg-slate-950/70 p-6 font-mono text-xs">
          <pre className="text-slate-300 overflow-x-auto">
{`┌─────────────────┐     ┌──────────────────┐
│  Your App       │────▶│  CalmLogs API    │
└─────────────────┘     └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │  OTEL Collector  │
                        └────────┬─────────┘
                                 │
            ┌────────────────────┼────────────────────┐
            ▼                    ▼                    ▼
   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
   │    Loki     │      │    Tempo    │      │ Prometheus  │
   │   (Logs)    │      │  (Traces)   │      │  (Metrics)  │
   └─────────────┘      └─────────────┘      └─────────────┘
            │                    │                    │
            └────────────────────┼────────────────────┘
                                 ▼
                        ┌──────────────────┐
                        │     Grafana      │
                        │   (Dashboard)    │
                        └──────────────────┘`}
          </pre>
        </div>
      </div>

      {/* Next Step */}
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-6">
        <h3 className="text-sm font-medium text-emerald-300 mb-2">Ready to get started?</h3>
        <p className="text-xs text-slate-300 mb-4">
          Follow our quick start guide to set up CalmLogs in your project.
        </p>
        <Link
          to="/docs/quickstart"
          className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
        >
          Continue to Quick Start
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
