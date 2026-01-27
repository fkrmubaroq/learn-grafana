import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, AlertCircle, Info, AlertTriangle, Bug } from "lucide-react";

export function DocsLogLevels() {
  const logLevels = [
    {
      level: "debug",
      icon: Bug,
      color: "text-slate-400",
      bgColor: "bg-slate-400/10",
      description: "Detailed information for debugging purposes. Use for tracing code execution, variable values, etc.",
      example: 'debug("Processing user request", { requestId: "req_123", params: {...} })',
    },
    {
      level: "info",
      icon: Info,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      description: "General information about application operation. Normal events like user actions, completed tasks.",
      example: 'info("User logged in successfully", { userId: "user_123" })',
    },
    {
      level: "warn",
      icon: AlertTriangle,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      description: "Warning messages for potentially problematic situations. Non-critical issues that might need attention.",
      example: 'warn("High memory usage detected", { memoryUsage: "85%" })',
    },
    {
      level: "error",
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      description: "Error conditions that should be investigated. Failures, exceptions, and critical issues.",
      example: 'error("Payment processing failed", { orderId: "order_456", error: "Insufficient funds" })',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/docs" className="hover:text-emerald-300 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-slate-200">Log Levels</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Log Levels
        </h1>
        <p className="text-slate-300 leading-relaxed">
          Understanding log levels helps you categorize and filter logs effectively.
          CalmLogs supports four standard log levels, from least to most severe.
        </p>
      </div>

      {/* Log Levels Overview */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Overview</h2>
        <div className="space-y-4">
          {logLevels.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.level}
                className="rounded-xl border border-white/5 bg-slate-900/50 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-sm font-semibold uppercase ${item.color}`}>
                        {item.level}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{item.description}</p>
                    <div className="rounded-lg bg-slate-950/70 px-4 py-2">
                      <code className="text-xs text-slate-400">{item.example}</code>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Hierarchy */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Level Hierarchy</h2>
        <p className="text-sm text-slate-300 mb-4">
          Log levels follow a severity hierarchy. When filtering logs, selecting a level
          includes all logs of that level and higher severity:
        </p>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 p-6">
          <div className="flex items-center justify-between text-xs">
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-slate-400/10 flex items-center justify-center mb-2 mx-auto">
                <Bug className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-slate-400 font-medium">DEBUG</span>
              <p className="text-slate-500 mt-1">Lowest</p>
            </div>
            <div className="text-slate-600">→</div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-emerald-400/10 flex items-center justify-center mb-2 mx-auto">
                <Info className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-emerald-400 font-medium">INFO</span>
              <p className="text-slate-500 mt-1">Normal</p>
            </div>
            <div className="text-slate-600">→</div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-amber-400/10 flex items-center justify-center mb-2 mx-auto">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-amber-400 font-medium">WARN</span>
              <p className="text-slate-500 mt-1">Attention</p>
            </div>
            <div className="text-slate-600">→</div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-red-400/10 flex items-center justify-center mb-2 mx-auto">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-red-400 font-medium">ERROR</span>
              <p className="text-slate-500 mt-1">Highest</p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Best Practices</h2>
        <div className="space-y-4">
          {[
            {
              title: "Use DEBUG sparingly in production",
              description: "Debug logs can generate significant volume. Enable them only when troubleshooting specific issues.",
            },
            {
              title: "INFO for business events",
              description: "Log important business events like user sign-ups, orders placed, or successful payments at INFO level.",
            },
            {
              title: "WARN for recoverable issues",
              description: "Use warnings for issues that don't break functionality but indicate potential problems.",
            },
            {
              title: "ERROR for failures that need action",
              description: "Reserve ERROR for issues that require immediate investigation or intervention.",
            },
            {
              title: "Include context with every log",
              description: "Always include relevant IDs (user, request, transaction) to make logs searchable and traceable.",
            },
          ].map((practice, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/50">
              <div className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-emerald-300">{index + 1}</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-50 mb-1">{practice.title}</h3>
                <p className="text-xs text-slate-400">{practice.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Link
          to="/docs/sending-logs"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Sending Logs
        </Link>
        <Link
          to="/docs/log-format"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          Log Format
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
