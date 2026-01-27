import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Copy, Check, Search } from "lucide-react";
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

export function DocsSearch() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/docs" className="hover:text-emerald-300 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-slate-200">Search & Filter</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Search & Filter
        </h1>
        <p className="text-slate-300 leading-relaxed">
          Learn how to efficiently search and filter your logs using Grafana's
          powerful LogQL query language.
        </p>
      </div>

      {/* Basic Search */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Basic Search</h2>
        <p className="text-sm text-slate-300 mb-4">
          The simplest way to search logs is by selecting a label stream:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="order-service"}`}
        />
        <p className="text-sm text-slate-300 mt-4 mb-4">
          Add text filtering with a pipe:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="order-service"} |= "error"`}
        />
      </div>

      {/* Search Operators */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Search Operators</h2>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5 bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Operator</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { op: "|=", desc: "Contains (case sensitive)", example: '|= "error"' },
                { op: "!=", desc: "Does not contain", example: '!= "debug"' },
                { op: "|~", desc: "Regex match", example: "|~ `error|warn`" },
                { op: "!~", desc: "Regex does not match", example: "!~ `health.*check`" },
              ].map((item) => (
                <tr key={item.op}>
                  <td className="px-4 py-3">
                    <code className="text-xs text-emerald-300">{item.op}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">{item.desc}</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-slate-400">{item.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Label Filtering */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Label Filtering</h2>
        <p className="text-sm text-slate-300 mb-4">
          Filter by multiple labels to narrow down results:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="order-service", environment="production", level="error"}`}
        />
        <p className="text-sm text-slate-300 mt-4 mb-4">
          Use regex for flexible label matching:
        </p>
        <CodeBlock
          language="logql"
          code={`{service=~"order-.*|payment-.*"}`}
        />
      </div>

      {/* JSON Parsing */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">JSON Parsing</h2>
        <p className="text-sm text-slate-300 mb-4">
          Extract and filter on JSON fields in your logs:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="order-service"} | json | level="error"`}
        />
        <p className="text-sm text-slate-300 mt-4 mb-4">
          Extract specific fields:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="order-service"} | json | line_format "{{.message}} - user={{.metadata_userId}}"`}
        />
      </div>

      {/* Common Queries */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Common Queries</h2>
        <div className="space-y-4">
          {[
            {
              title: "All errors in the last hour",
              query: '{level="error"} | json',
            },
            {
              title: "Logs from a specific user",
              query: '{service="api"} | json | metadata_userId="user_123"',
            },
            {
              title: "Payment failures",
              query: '{service="payment-service"} |= "failed" | json',
            },
            {
              title: "High latency requests",
              query: '{service="api"} | json | duration > 1000',
            },
            {
              title: "Error rate per service",
              query: 'sum(rate({level="error"}[5m])) by (service)',
            },
          ].map((item, index) => (
            <div key={index} className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-emerald-300" />
                <h3 className="text-sm font-medium text-slate-50">{item.title}</h3>
              </div>
              <code className="text-xs text-slate-400 block bg-slate-950/70 px-3 py-2 rounded-lg">
                {item.query}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-6">
        <h3 className="text-sm font-medium text-emerald-300 mb-3">Pro Tips</h3>
        <ul className="space-y-2">
          {[
            "Use labels for initial filtering - it's much faster than text search",
            "Add time range constraints to reduce the amount of data scanned",
            "Use | json early in your pipeline to enable label-based filtering",
            "Save commonly used queries in Grafana dashboards",
          ].map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-emerald-300 mt-0.5">-</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Link
          to="/docs/log-format"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Log Format
        </Link>
        <Link
          to="/docs/filtering"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          Advanced Filtering
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
