import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl border border-white/5 bg-slate-950/70 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-slate-900/50">
        <span className="text-xs text-slate-400">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs text-slate-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function DocsQuickStart() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/docs" className="hover:text-emerald-300 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-slate-200">Quick Start</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Quick Start Guide
        </h1>
        <p className="text-slate-300 leading-relaxed">
          Get CalmLogs up and running in your project in just a few minutes.
          Follow this guide to start sending your first logs.
        </p>
      </div>

      {/* Prerequisites */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Prerequisites</h2>
        <ul className="space-y-2">
          {[
            "Docker and Docker Compose installed",
            "Node.js 18+ (for the example application)",
            "Basic understanding of HTTP APIs",
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-5 h-5 rounded-full bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-emerald-300">{index + 1}</span>
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Step 1 */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center text-sm text-emerald-300">
            1
          </span>
          Clone the Repository
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          Start by cloning the CalmLogs repository to your local machine:
        </p>
        <CodeBlock
          language="bash"
          code={`git clone https://github.com/your-username/calmlogs.git
cd calmlogs`}
        />
      </div>

      {/* Step 2 */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center text-sm text-emerald-300">
            2
          </span>
          Start the Stack
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          Use Docker Compose to start all the required services:
        </p>
        <CodeBlock
          language="bash"
          code={`docker-compose up -d`}
        />
        <p className="text-sm text-slate-400 mt-3">
          This will start the following services:
        </p>
        <ul className="mt-2 space-y-1">
          {[
            { name: "CalmLogs API", port: "8000" },
            { name: "CalmLogs Client", port: "5173" },
            { name: "Grafana", port: "3000" },
            { name: "Loki", port: "3100" },
            { name: "Tempo", port: "3200" },
            { name: "OTEL Collector", port: "4317/4318" },
          ].map((service) => (
            <li key={service.name} className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300">{service.name}</span>
              <span className="text-slate-500">- port {service.port}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Step 3 */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center text-sm text-emerald-300">
            3
          </span>
          Send Your First Log
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          You can send logs using a simple HTTP POST request:
        </p>
        <CodeBlock
          language="bash"
          code={`curl -X POST http://localhost:8000/api/logs \\
  -H "Content-Type: application/json" \\
  -d '{"level": "info", "message": "Hello from CalmLogs!"}'`}
        />
        <p className="text-sm text-slate-300 mt-4 mb-4">
          Or use the web interface at{" "}
          <code className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 text-xs">
            http://localhost:5173
          </code>
        </p>
      </div>

      {/* Step 4 */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center text-sm text-emerald-300">
            4
          </span>
          View in Grafana
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          Open Grafana at{" "}
          <code className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 text-xs">
            http://localhost:3000
          </code>{" "}
          and navigate to Explore → Loki to see your logs.
        </p>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 p-6">
          <p className="text-xs text-slate-400 mb-2">Default Grafana credentials:</p>
          <div className="flex gap-4">
            <div>
              <span className="text-xs text-slate-500">Username:</span>
              <code className="ml-2 text-sm text-emerald-300">admin</code>
            </div>
            <div>
              <span className="text-xs text-slate-500">Password:</span>
              <code className="ml-2 text-sm text-emerald-300">admin</code>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-6">
        <h3 className="text-sm font-medium text-emerald-300 mb-2">What's next?</h3>
        <p className="text-xs text-slate-300 mb-4">
          Now that you have CalmLogs running, learn more about:
        </p>
        <ul className="space-y-2">
          <li>
            <Link
              to="/docs/sending-logs"
              className="text-sm text-emerald-300 hover:text-emerald-200 flex items-center gap-2 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Sending logs programmatically
            </Link>
          </li>
          <li>
            <Link
              to="/docs/log-levels"
              className="text-sm text-emerald-300 hover:text-emerald-200 flex items-center gap-2 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Understanding log levels
            </Link>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Link
          to="/docs"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Introduction
        </Link>
        <Link
          to="/docs/installation"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          Installation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
