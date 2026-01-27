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

export function DocsSendingLogs() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/docs" className="hover:text-emerald-300 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-slate-200">Sending Logs</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-4">
          Sending Logs
        </h1>
        <p className="text-slate-300 leading-relaxed">
          Learn how to send logs to CalmLogs from your application using
          different methods and programming languages.
        </p>
      </div>

      {/* API Endpoint */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">API Endpoint</h2>
        <div className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-emerald-400/10 text-emerald-300 text-xs font-medium">
              POST
            </span>
            <code className="text-sm text-slate-200">/api/logs</code>
          </div>
        </div>
      </div>

      {/* Request Format */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Request Format</h2>
        <p className="text-sm text-slate-300 mb-4">
          Send a JSON payload with your log data:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "level": "info",
  "message": "User logged in successfully",
  "timestamp": "2026-01-27T10:30:00Z",
  "metadata": {
    "userId": "user_123",
    "action": "login",
    "ip": "192.168.1.1"
  }
}`}
        />

        <div className="mt-6 rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5 bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Field</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Required</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "level", type: "string", required: "No", desc: "Log level (debug, info, warn, error)" },
                { name: "message", type: "string", required: "Yes", desc: "Log message content" },
                { name: "timestamp", type: "string", required: "No", desc: "ISO 8601 timestamp" },
                { name: "metadata", type: "object", required: "No", desc: "Additional key-value pairs" },
              ].map((field) => (
                <tr key={field.name}>
                  <td className="px-4 py-3">
                    <code className="text-xs text-emerald-300">{field.name}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-slate-400">{field.type}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">{field.required}</td>
                  <td className="px-4 py-3 text-xs text-slate-300">{field.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Examples */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Code Examples</h2>

        <h3 className="text-sm font-medium text-slate-200 mb-3">cURL</h3>
        <CodeBlock
          language="bash"
          code={`curl -X POST http://localhost:8000/api/logs \\
  -H "Content-Type: application/json" \\
  -d '{
    "level": "info",
    "message": "User action completed",
    "metadata": {"userId": "123"}
  }'`}
        />

        <h3 className="text-sm font-medium text-slate-200 mb-3 mt-6">JavaScript / TypeScript</h3>
        <CodeBlock
          language="typescript"
          code={`const sendLog = async (level: string, message: string, metadata?: object) => {
  const response = await fetch('http://localhost:8000/api/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    }),
  });
  
  return response.json();
};

// Usage
await sendLog('info', 'User signed in', { userId: 'user_123' });
await sendLog('error', 'Payment failed', { orderId: 'order_456' });`}
        />

        <h3 className="text-sm font-medium text-slate-200 mb-3 mt-6">Python</h3>
        <CodeBlock
          language="python"
          code={`import requests
from datetime import datetime

def send_log(level: str, message: str, metadata: dict = None):
    response = requests.post(
        'http://localhost:8000/api/logs',
        json={
            'level': level,
            'message': message,
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'metadata': metadata or {}
        }
    )
    return response.json()

# Usage
send_log('info', 'User signed in', {'userId': 'user_123'})
send_log('error', 'Payment failed', {'orderId': 'order_456'})`}
        />

        <h3 className="text-sm font-medium text-slate-200 mb-3 mt-6">Go</h3>
        <CodeBlock
          language="go"
          code={`package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "time"
)

type LogEntry struct {
    Level     string                 \`json:"level"\`
    Message   string                 \`json:"message"\`
    Timestamp string                 \`json:"timestamp"\`
    Metadata  map[string]interface{} \`json:"metadata,omitempty"\`
}

func SendLog(level, message string, metadata map[string]interface{}) error {
    entry := LogEntry{
        Level:     level,
        Message:   message,
        Timestamp: time.Now().UTC().Format(time.RFC3339),
        Metadata:  metadata,
    }
    
    body, _ := json.Marshal(entry)
    _, err := http.Post(
        "http://localhost:8000/api/logs",
        "application/json",
        bytes.NewBuffer(body),
    )
    return err
}

// Usage
func main() {
    SendLog("info", "User signed in", map[string]interface{}{
        "userId": "user_123",
    })
}`}
        />
      </div>

      {/* Response */}
      <div>
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Response</h2>
        <p className="text-sm text-slate-300 mb-4">
          A successful request returns:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "success": true,
  "message": "Log received",
  "id": "log_abc123xyz"
}`}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <Link
          to="/docs/installation"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Installation
        </Link>
        <Link
          to="/docs/log-levels"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
        >
          Log Levels
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
