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

export function DocsInstallation() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/docs" className="hover:text-emerald-300 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-slate-200">Installation</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Installation Guide
        </h1>
        <p className="text-slate-300 leading-relaxed">
          This guide covers different installation methods for CalmLogs,
          from Docker to manual setup.
        </p>
      </div>

      {/* Docker Installation */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">
          Docker Installation (Recommended)
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          The easiest way to get started is using Docker Compose. This method
          sets up all required services automatically.
        </p>

        <h3 className="text-sm font-medium text-slate-200 mb-3">1. Create docker-compose.yml</h3>
        <CodeBlock
          language="yaml"
          code={`version: '3.8'

services:
  server:
    build: ./server
    ports:
      - "8000:8000"
    environment:
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318

  client:
    build: ./client
    ports:
      - "5173:5173"

  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    volumes:
      - ./configs/otel-collector.yaml:/etc/otelcol-contrib/config.yaml
    ports:
      - "4317:4317"
      - "4318:4318"

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./configs/loki.yaml:/etc/loki/local-config.yaml
    command: -config.file=/etc/loki/local-config.yaml

  tempo:
    image: grafana/tempo:latest
    ports:
      - "3200:3200"
    volumes:
      - ./configs/tempo.yaml:/etc/tempo/config.yaml
    command: -config.file=/etc/tempo/config.yaml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin`}
        />

        <h3 className="text-sm font-medium text-slate-200 mb-3 mt-6">2. Start the services</h3>
        <CodeBlock
          language="bash"
          code={`docker-compose up -d`}
        />
      </div>

      {/* Manual Installation */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">
          Manual Installation
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          For development or custom setups, you can install components manually.
        </p>

        <h3 className="text-sm font-medium text-slate-200 mb-3">Server Setup</h3>
        <CodeBlock
          language="bash"
          code={`cd server
pnpm install
pnpm dev`}
        />

        <h3 className="text-sm font-medium text-slate-200 mb-3 mt-6">Client Setup</h3>
        <CodeBlock
          language="bash"
          code={`cd client
pnpm install
pnpm dev`}
        />
      </div>

      {/* Environment Variables */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">
          Environment Variables
        </h2>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5 bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Variable</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Default</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "PORT", default: "8000", desc: "Server port" },
                { name: "OTEL_EXPORTER_OTLP_ENDPOINT", default: "http://localhost:4318", desc: "OTEL collector endpoint" },
                { name: "LOKI_URL", default: "http://localhost:3100", desc: "Loki server URL" },
                { name: "VITE_API_URL", default: "http://localhost:8000", desc: "API URL for client" },
              ].map((env) => (
                <tr key={env.name}>
                  <td className="px-4 py-3">
                    <code className="text-xs text-emerald-300">{env.name}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-slate-400">{env.default}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">{env.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">
          Verify Installation
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          Run these commands to verify everything is working:
        </p>
        <CodeBlock
          language="bash"
          code={`# Check server health
curl http://localhost:8000/health

# Send a test log
curl -X POST http://localhost:8000/api/logs \\
  -H "Content-Type: application/json" \\
  -d '{"level": "info", "message": "Installation successful!"}'

# Check Grafana
open http://localhost:3000`}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Link
          to="/docs/quickstart"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quick Start
        </Link>
        <Link
          to="/docs/sending-logs"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          Sending Logs
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
