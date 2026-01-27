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

export function DocsFiltering() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/docs" className="hover:text-emerald-300 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-slate-200">Advanced Filtering</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Advanced Filtering
        </h1>
        <p className="text-slate-300 leading-relaxed">
          Master advanced LogQL techniques for complex log analysis,
          aggregations, and metrics extraction.
        </p>
      </div>

      {/* Pattern Matching */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Pattern Matching</h2>
        <p className="text-sm text-slate-300 mb-4">
          Extract structured data from unstructured logs using pattern:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="nginx"} | pattern "<ip> - - [<timestamp>] \\"<method> <path> <_>\\" <status> <size>"`}
        />
        <p className="text-sm text-slate-300 mt-4 mb-4">
          Then filter on extracted fields:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="nginx"} 
  | pattern "<ip> - - [<timestamp>] \\"<method> <path> <_>\\" <status> <size>"
  | status >= 400`}
        />
      </div>

      {/* Line Formatting */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Line Formatting</h2>
        <p className="text-sm text-slate-300 mb-4">
          Transform log output for better readability:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="api"} | json | line_format "{{.level | upper}} [{{.timestamp}}] {{.message}}"`}
        />
        <p className="text-sm text-slate-300 mt-4 mb-4">
          Available template functions:
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { func: "upper", desc: "Convert to uppercase" },
            { func: "lower", desc: "Convert to lowercase" },
            { func: "title", desc: "Title case" },
            { func: "trunc N", desc: "Truncate to N characters" },
            { func: "substr S E", desc: "Substring from S to E" },
            { func: "replace OLD NEW", desc: "Replace text" },
          ].map((item) => (
            <div key={item.func} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-slate-900/50">
              <code className="text-xs text-emerald-300">{item.func}</code>
              <span className="text-xs text-slate-400">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aggregations */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Log Aggregations</h2>
        <p className="text-sm text-slate-300 mb-4">
          Aggregate logs to extract metrics:
        </p>

        <h3 className="text-sm font-medium text-slate-200 mb-3">Count logs per interval</h3>
        <CodeBlock
          language="logql"
          code={`count_over_time({service="api"}[5m])`}
        />

        <h3 className="text-sm font-medium text-slate-200 mb-3 mt-6">Rate of logs</h3>
        <CodeBlock
          language="logql"
          code={`rate({service="api", level="error"}[1m])`}
        />

        <h3 className="text-sm font-medium text-slate-200 mb-3 mt-6">Sum by label</h3>
        <CodeBlock
          language="logql"
          code={`sum by (service) (count_over_time({level="error"}[5m]))`}
        />

        <h3 className="text-sm font-medium text-slate-200 mb-3 mt-6">Top 10 error sources</h3>
        <CodeBlock
          language="logql"
          code={`topk(10, sum by (service) (count_over_time({level="error"}[1h])))`}
        />
      </div>

      {/* Metric Extraction */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Metric Extraction</h2>
        <p className="text-sm text-slate-300 mb-4">
          Extract numeric values from logs and compute statistics:
        </p>
        <CodeBlock
          language="logql"
          code={`{service="api"} | json | unwrap duration | avg_over_time([5m])`}
        />
        <p className="text-sm text-slate-300 mt-4 mb-4">
          Available aggregation functions:
        </p>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5 bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Function</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { func: "avg_over_time", desc: "Average value over time range" },
                { func: "sum_over_time", desc: "Sum of values over time range" },
                { func: "min_over_time", desc: "Minimum value" },
                { func: "max_over_time", desc: "Maximum value" },
                { func: "quantile_over_time", desc: "Percentile calculation" },
                { func: "stddev_over_time", desc: "Standard deviation" },
              ].map((item) => (
                <tr key={item.func}>
                  <td className="px-4 py-3">
                    <code className="text-xs text-emerald-300">{item.func}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complex Example */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Complex Query Example</h2>
        <p className="text-sm text-slate-300 mb-4">
          Combining multiple techniques for advanced analysis:
        </p>
        <CodeBlock
          language="logql"
          code={`# Find P99 response time for each endpoint in the last hour
{service="api"} 
  | json 
  | method="POST" 
  | path=~"/api/v1/.*"
  | unwrap duration
  | quantile_over_time(0.99, [1h]) by (path)`}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Link
          to="/docs/search"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Search & Filter
        </Link>
        <Link
          to="/docs/storage"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          Log Storage
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
