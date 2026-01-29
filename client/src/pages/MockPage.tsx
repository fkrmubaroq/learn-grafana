import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Clock,
  Loader2,
  Play,
  Server,
  Zap,
  FileText,
  Send,
} from "lucide-react";

const API_BASE = "http://localhost:8000";

type ApiResponse = {
  data: unknown;
  status: number;
  duration: number;
} | null;

export function MockPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [response, setResponse] = useState<ApiResponse>(null);

  // Form states
  const [heavyDuration, setHeavyDuration] = useState(3000);
  const [heavyIterations, setHeavyIterations] = useState(1000000);
  const [unstableDuration, setUnstableDuration] = useState(2000);
  const [failRate, setFailRate] = useState(0.3);
  const [batchItems, setBatchItems] = useState(5);
  const [batchDelay, setBatchDelay] = useState(100);
  const [logLevel, setLogLevel] = useState("info");
  const [logMessage, setLogMessage] = useState("Test log from client");

  const callApi = async (
    endpoint: string,
    method: "GET" | "POST" = "GET",
    body?: object
  ) => {
    setLoading(endpoint);
    setResponse(null);
    const start = Date.now();

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      const duration = Date.now() - start;

      setResponse({ data, status: res.status, duration });
    } catch (error) {
      const duration = Date.now() - start;
      setResponse({
        data: { error: (error as Error).message },
        status: 0,
        duration,
      });
    } finally {
      setLoading(null);
    }
  };

  const ApiCard = ({
    title,
    description,
    icon: Icon,
    endpoint,
    method = "GET",
    children,
    onCall,
    color = "emerald",
  }: {
    title: string;
    description: string;
    icon: React.ElementType;
    endpoint: string;
    method?: "GET" | "POST";
    children?: React.ReactNode;
    onCall: () => void;
    color?: "emerald" | "amber" | "rose" | "cyan";
  }) => {
    const colorClasses = {
      emerald: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
      amber: "bg-amber-400/10 text-amber-300 border-amber-400/30",
      rose: "bg-rose-400/10 text-rose-300 border-rose-400/30",
      cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
    };

    const buttonClasses = {
      emerald: "bg-emerald-400/90 hover:bg-emerald-300",
      amber: "bg-amber-400/90 hover:bg-amber-300",
      rose: "bg-rose-400/90 hover:bg-rose-300",
      cyan: "bg-cyan-400/90 hover:bg-cyan-300",
    };

    return (
      <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-10 h-10 rounded-full ${colorClasses[color]} flex items-center justify-center`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
            <code className="text-xs text-slate-500 mt-2 block">
              {method} {endpoint}
            </code>
          </div>
        </div>

        {children && <div className="space-y-3 mb-4">{children}</div>}

        <button
          onClick={onCall}
          disabled={loading !== null}
          className={`w-full rounded-full ${buttonClasses[color]} px-4 py-2 text-sm font-medium text-slate-950 shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50`}
        >
          {loading === endpoint ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Call API
            </>
          )}
        </button>
      </div>
    );
  };

  const InputField = ({
    label,
    value,
    onChange,
    type = "number",
    min,
    max,
    step,
  }: {
    label: string;
    value: string | number;
    onChange: (val: number | string) => void;
    type?: "number" | "text" | "select";
    min?: number;
    max?: number;
    step?: number;
  }) => (
    <div>
      <label className="block text-xs font-medium text-slate-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
        min={min}
        max={max}
        step={step}
        className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-100 outline-none focus:border-emerald-300/60"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80 mb-4">
          API Testing
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50 mb-4">
          Mock{" "}
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            API Tester
          </span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto">
          Test all server API endpoints with customizable parameters. Monitor
          responses and processing times.
        </p>
      </div>

      {/* API Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Health Check */}
        <ApiCard
          title="Health Check"
          description="Simple health check endpoint"
          icon={Activity}
          endpoint="/health"
          onCall={() => callApi("/health")}
          color="emerald"
        />

        {/* Hello API */}
        <ApiCard
          title="Hello API"
          description="Basic hello endpoint"
          icon={Server}
          endpoint="/api/hello"
          onCall={() => callApi("/api/hello")}
          color="cyan"
        />

        {/* Heavy Process */}
        <ApiCard
          title="Heavy Process"
          description="CPU-intensive mock process with configurable duration"
          icon={Zap}
          endpoint="/api/heavy-process"
          onCall={() =>
            callApi(
              `/api/heavy-process?duration=${heavyDuration}&iterations=${heavyIterations}`
            )
          }
          color="amber"
        >
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Duration (ms)"
              value={heavyDuration}
              onChange={(v) => setHeavyDuration(v as number)}
              min={0}
              max={30000}
              step={500}
            />
            <InputField
              label="Iterations"
              value={heavyIterations}
              onChange={(v) => setHeavyIterations(v as number)}
              min={100000}
              max={10000000}
              step={100000}
            />
          </div>
        </ApiCard>

        {/* Unstable Process */}
        <ApiCard
          title="Unstable Process"
          description="Heavy process with random failures"
          icon={AlertTriangle}
          endpoint="/api/heavy-process-unstable"
          onCall={() =>
            callApi(
              `/api/heavy-process-unstable?duration=${unstableDuration}&failRate=${failRate}`
            )
          }
          color="rose"
        >
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Duration (ms)"
              value={unstableDuration}
              onChange={(v) => setUnstableDuration(v as number)}
              min={0}
              max={10000}
              step={500}
            />
            <InputField
              label="Fail Rate (0-1)"
              value={failRate}
              onChange={(v) => setFailRate(v as number)}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
        </ApiCard>

        {/* Batch Process */}
        <ApiCard
          title="Batch Process"
          description="Process multiple items sequentially"
          icon={Clock}
          endpoint="/api/batch-process"
          method="POST"
          onCall={() =>
            callApi("/api/batch-process", "POST", {
              items: Array.from({ length: batchItems }, (_, i) => `item-${i}`),
              processingDelay: batchDelay,
            })
          }
          color="cyan"
        >
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Number of Items"
              value={batchItems}
              onChange={(v) => setBatchItems(v as number)}
              min={1}
              max={100}
            />
            <InputField
              label="Delay per Item (ms)"
              value={batchDelay}
              onChange={(v) => setBatchDelay(v as number)}
              min={10}
              max={1000}
              step={10}
            />
          </div>
        </ApiCard>

        {/* Send Log */}
        <ApiCard
          title="Send Log"
          description="Send a log entry to the server"
          icon={FileText}
          endpoint="/api/logs"
          method="POST"
          onCall={() =>
            callApi("/api/logs", "POST", {
              level: logLevel,
              message: logMessage,
              data: { source: "MockPage", timestamp: Date.now() },
              source: "client-mock",
            })
          }
          color="emerald"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Log Level
              </label>
              <select
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-100 outline-none focus:border-emerald-300/60"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warn">Warn</option>
                <option value="error">Error</option>
              </select>
            </div>
            <InputField
              label="Message"
              value={logMessage}
              onChange={(v) => setLogMessage(v as string)}
              type="text"
            />
          </div>
        </ApiCard>
      </div>

      {/* Response Panel */}
      {response && (
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-300" />
              Response
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <span
                className={`px-2 py-0.5 rounded-full ${
                  response.status >= 200 && response.status < 300
                    ? "bg-emerald-400/20 text-emerald-300"
                    : response.status >= 400
                    ? "bg-rose-400/20 text-rose-300"
                    : "bg-amber-400/20 text-amber-300"
                }`}
              >
                Status: {response.status || "Error"}
              </span>
              <span className="text-slate-400">
                Duration: {response.duration}ms
              </span>
            </div>
          </div>
          <pre className="bg-slate-950/70 rounded-xl p-4 overflow-x-auto text-sm text-slate-300 border border-white/5">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
