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

export function DocsLogFormat() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/docs" className="hover:text-emerald-300 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-slate-200">Log Format</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Log Format
        </h1>
        <p className="text-slate-300 leading-relaxed">
          CalmLogs supports multiple log formats to fit your needs.
          Whether you prefer structured JSON or simple text, we've got you covered.
        </p>
      </div>

      {/* JSON Format */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">JSON Format (Recommended)</h2>
        <p className="text-sm text-slate-300 mb-4">
          Structured JSON logs are the most powerful format, enabling rich filtering
          and searching capabilities:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "level": "info",
  "message": "Order processed successfully",
  "timestamp": "2026-01-27T10:30:00.000Z",
  "service": "order-service",
  "traceId": "abc123xyz",
  "spanId": "def456uvw",
  "metadata": {
    "orderId": "order_789",
    "userId": "user_123",
    "amount": 99.99,
    "currency": "USD",
    "items": 3
  }
}`}
        />
      </div>

      {/* Schema Reference */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Schema Reference</h2>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5 bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Field</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "level", type: "string", desc: "Log severity: debug, info, warn, error" },
                { name: "message", type: "string", desc: "Human-readable log message" },
                { name: "timestamp", type: "string", desc: "ISO 8601 timestamp with timezone" },
                { name: "service", type: "string", desc: "Service/application name" },
                { name: "traceId", type: "string", desc: "Distributed tracing ID" },
                { name: "spanId", type: "string", desc: "Current span ID" },
                { name: "metadata", type: "object", desc: "Additional structured data" },
              ].map((field) => (
                <tr key={field.name}>
                  <td className="px-4 py-3">
                    <code className="text-xs text-emerald-300">{field.name}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-slate-400">{field.type}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">{field.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plain Text */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Plain Text Format</h2>
        <p className="text-sm text-slate-300 mb-4">
          For simple use cases, you can send plain text logs:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "logs": "2026-01-27 10:30:00 INFO Order processed successfully orderId=order_789"
}`}
        />
        <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
          <p className="text-xs text-amber-300">
            <strong>Note:</strong> Plain text logs have limited filtering capabilities.
            We recommend using JSON format for production environments.
          </p>
        </div>
      </div>

      {/* OpenTelemetry Format */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">OpenTelemetry Format</h2>
        <p className="text-sm text-slate-300 mb-4">
          CalmLogs natively supports OpenTelemetry log data model:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "resourceLogs": [{
    "resource": {
      "attributes": [{
        "key": "service.name",
        "value": { "stringValue": "order-service" }
      }]
    },
    "scopeLogs": [{
      "scope": { "name": "my-logger" },
      "logRecords": [{
        "timeUnixNano": "1706348400000000000",
        "severityNumber": 9,
        "severityText": "INFO",
        "body": { "stringValue": "Order processed" },
        "attributes": [{
          "key": "orderId",
          "value": { "stringValue": "order_789" }
        }],
        "traceId": "abc123...",
        "spanId": "def456..."
      }]
    }]
  }]
}`}
        />
      </div>

      {/* Best Practices */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Formatting Best Practices</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Use consistent field names",
              description: "Stick to camelCase or snake_case throughout your logs.",
            },
            {
              title: "Include timestamps",
              description: "Always include ISO 8601 timestamps with timezone info.",
            },
            {
              title: "Add trace context",
              description: "Include traceId and spanId for distributed tracing.",
            },
            {
              title: "Keep messages concise",
              description: "Put details in metadata, keep messages readable.",
            },
          ].map((practice, index) => (
            <div key={index} className="p-4 rounded-xl border border-white/5 bg-slate-900/50">
              <h3 className="text-sm font-medium text-slate-50 mb-1">{practice.title}</h3>
              <p className="text-xs text-slate-400">{practice.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Link
          to="/docs/log-levels"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Log Levels
        </Link>
        <Link
          to="/docs/search"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          Search & Filter
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
