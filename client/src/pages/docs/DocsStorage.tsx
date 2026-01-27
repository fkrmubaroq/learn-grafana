import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, Database, HardDrive, Clock, Shield } from "lucide-react";
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

export function DocsStorage() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/docs" className="hover:text-emerald-300 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-slate-200">Log Storage</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Log Storage
        </h1>
        <p className="text-slate-300 leading-relaxed">
          Understand how CalmLogs stores and manages your log data using
          Grafana Loki's efficient storage architecture.
        </p>
      </div>

      {/* Storage Overview */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Storage Architecture</h2>
        <p className="text-sm text-slate-300 mb-4">
          CalmLogs uses Grafana Loki for log storage, which is designed for high
          efficiency and low cost:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: Database,
              title: "Index Storage",
              description: "Only labels are indexed, not the full log content. This significantly reduces storage and query costs.",
            },
            {
              icon: HardDrive,
              title: "Chunk Storage",
              description: "Log content is compressed and stored in chunks, optimized for sequential reads.",
            },
            {
              icon: Clock,
              title: "Time-based Partitioning",
              description: "Data is partitioned by time, enabling efficient retention policies and queries.",
            },
            {
              icon: Shield,
              title: "Multi-tenant Support",
              description: "Each tenant's data is isolated with configurable retention and access controls.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="p-5 rounded-xl border border-white/5 bg-slate-900/50">
                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="text-sm font-medium text-slate-50 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loki Configuration */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Loki Configuration</h2>
        <p className="text-sm text-slate-300 mb-4">
          Example Loki configuration for CalmLogs:
        </p>
        <CodeBlock
          language="yaml"
          code={`auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: 127.0.0.1
  path_prefix: /tmp/loki
  storage:
    filesystem:
      chunks_directory: /tmp/loki/chunks
      rules_directory: /tmp/loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

schema_config:
  configs:
    - from: 2020-10-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093

limits_config:
  retention_period: 744h  # 31 days`}
        />
      </div>

      {/* Retention Policies */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Retention Policies</h2>
        <p className="text-sm text-slate-300 mb-4">
          Configure how long logs are stored before automatic deletion:
        </p>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5 bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Environment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Recommended Retention</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { env: "Development", retention: "7 days", notes: "Quick iteration, limited storage" },
                { env: "Staging", retention: "14 days", notes: "Pre-production testing" },
                { env: "Production", retention: "30-90 days", notes: "Compliance and debugging" },
                { env: "Audit", retention: "1+ year", notes: "Regulatory requirements" },
              ].map((item) => (
                <tr key={item.env}>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-200">{item.env}</span>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-emerald-300">{item.retention}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Storage Optimization */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Storage Optimization</h2>
        <div className="space-y-4">
          {[
            {
              title: "Use meaningful labels sparingly",
              description: "High cardinality labels (like user IDs) increase index size. Keep labels to service, environment, and log level.",
            },
            {
              title: "Batch log writes",
              description: "Send logs in batches rather than individually to reduce overhead and improve compression.",
            },
            {
              title: "Enable compression",
              description: "Loki uses snappy compression by default. Consider gzip for higher compression at CPU cost.",
            },
            {
              title: "Monitor storage usage",
              description: "Set up alerts for storage capacity to prevent data loss from disk full conditions.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/50">
              <div className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-emerald-300">{index + 1}</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-50 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Backends */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Supported Backends</h2>
        <p className="text-sm text-slate-300 mb-4">
          Loki supports various storage backends for production deployments:
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { name: "Local Filesystem", desc: "Development and single-node setups" },
            { name: "Amazon S3", desc: "Highly scalable cloud storage" },
            { name: "Google Cloud Storage", desc: "GCP native integration" },
            { name: "Azure Blob Storage", desc: "Azure native integration" },
            { name: "MinIO", desc: "S3-compatible self-hosted option" },
          ].map((backend) => (
            <div key={backend.name} className="p-4 rounded-xl border border-white/5 bg-slate-900/50">
              <h3 className="text-sm font-medium text-slate-50 mb-1">{backend.name}</h3>
              <p className="text-xs text-slate-400">{backend.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-6">
        <h3 className="text-sm font-medium text-emerald-300 mb-2">Need help?</h3>
        <p className="text-xs text-slate-300 mb-4">
          If you have questions about storage configuration or need help optimizing
          your setup, check out our community resources:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://grafana.com/docs/loki/latest/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            Loki Documentation →
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            GitHub Discussions →
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Link
          to="/docs/filtering"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Advanced Filtering
        </Link>
        <Link
          to="/docs"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          Back to Introduction
        </Link>
      </div>
    </div>
  );
}
