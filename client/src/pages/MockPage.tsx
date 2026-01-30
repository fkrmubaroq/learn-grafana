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
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  useHealth,
  useHello,
  useHeavyProcess,
  useUnstableProcess,
  useBatchProcess,
  useSendLog,
} from "@/hooks";
import type { SendLogRequest } from "@/services/api-types";

type ApiResponse = {
  data: unknown;
  status: number;
  duration: number;
  isError?: boolean;
} | null;

// ==========================================
// Reusable Components (outside of render)
// ==========================================

interface ApiCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  endpoint: string;
  method?: "GET" | "POST";
  children?: React.ReactNode;
  onCall: () => void;
  color?: "emerald" | "amber" | "rose" | "cyan";
  isActive: boolean;
  isLoading: boolean;
}

function ApiCard({
  title,
  description,
  icon: Icon,
  endpoint,
  method = "GET",
  children,
  onCall,
  color = "emerald",
  isActive,
  isLoading,
}: ApiCardProps) {
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
    <div
      className={`rounded-2xl border bg-slate-900/60 p-6 transition-all ${
        isActive
          ? "border-emerald-400/50 ring-2 ring-emerald-400/20"
          : "border-white/5"
      }`}
    >
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
        disabled={isLoading}
        className={`w-full rounded-full ${buttonClasses[color]} px-4 py-2 text-sm font-medium text-slate-950 shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isActive ? (
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
}

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (val: number | string) => void;
  type?: "number" | "text";
  min?: number;
  max?: number;
  step?: number;
}

function InputField({
  label,
  value,
  onChange,
  type = "number",
  min,
  max,
  step,
}: InputFieldProps) {
  return (
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
}

// ==========================================
// Main Component
// ==========================================

export function MockPage() {
  const [response, setResponse] = useState<ApiResponse>(null);
  const [activeEndpoint, setActiveEndpoint] = useState<string | null>(null);
  const [requestStartTime, setRequestStartTime] = useState<number>(0);

  // Form states
  const [heavyDuration, setHeavyDuration] = useState(3000);
  const [heavyIterations, setHeavyIterations] = useState(1000000);
  const [unstableDuration, setUnstableDuration] = useState(2000);
  const [failRate, setFailRate] = useState(0.3);
  const [batchItems, setBatchItems] = useState(5);
  const [batchDelay, setBatchDelay] = useState(100);
  const [logLevel, setLogLevel] = useState<SendLogRequest["level"]>("info");
  const [logMessage, setLogMessage] = useState("Test log from client");

  // Hooks
  const healthQuery = useHealth({ enabled: false });
  const helloQuery = useHello({ enabled: false });
  const heavyProcessMutation = useHeavyProcess();
  const unstableProcessMutation = useUnstableProcess();
  const batchProcessMutation = useBatchProcess();
  const sendLogMutation = useSendLog();

  // Helper to handle response
  const handleResponse = (data: unknown, isError = false) => {
    const duration = Date.now() - requestStartTime;
    setResponse({
      data,
      status: isError ? 500 : 200,
      duration,
      isError,
    });
    setActiveEndpoint(null);
  };

  // API call handlers
  const handleHealthCheck = async () => {
    setActiveEndpoint("/health");
    setRequestStartTime(Date.now());
    setResponse(null);

    const result = await healthQuery.refetch();
    if (result.data) {
      handleResponse(result.data);
    } else if (result.error) {
      handleResponse({ error: result.error.message }, true);
    }
  };

  const handleHello = async () => {
    setActiveEndpoint("/api/hello");
    setRequestStartTime(Date.now());
    setResponse(null);

    const result = await helloQuery.refetch();
    if (result.data) {
      handleResponse(result.data);
    } else if (result.error) {
      handleResponse({ error: result.error.message }, true);
    }
  };

  const handleHeavyProcess = () => {
    setActiveEndpoint("/api/heavy-process");
    setRequestStartTime(Date.now());
    setResponse(null);

    heavyProcessMutation.mutate(
      { duration: heavyDuration, iterations: heavyIterations },
      {
        onSuccess: (data) => handleResponse(data),
        onError: (error) => handleResponse({ error: error.message }, true),
      }
    );
  };

  const handleUnstableProcess = () => {
    setActiveEndpoint("/api/heavy-process-unstable");
    setRequestStartTime(Date.now());
    setResponse(null);

    unstableProcessMutation.mutate(
      { duration: unstableDuration, failRate },
      {
        onSuccess: (data) => handleResponse(data),
        onError: (error) => {
          const errorData = error.response?.data || { error: error.message };
          handleResponse(errorData, true);
        },
      }
    );
  };

  const handleBatchProcess = () => {
    setActiveEndpoint("/api/batch-process");
    setRequestStartTime(Date.now());
    setResponse(null);

    batchProcessMutation.mutate(
      {
        items: Array.from({ length: batchItems }, (_, i) => `item-${i}`),
        processingDelay: batchDelay,
      },
      {
        onSuccess: (data) => handleResponse(data),
        onError: (error) => handleResponse({ error: error.message }, true),
      }
    );
  };

  const handleSendLog = () => {
    setActiveEndpoint("/api/logs");
    setRequestStartTime(Date.now());
    setResponse(null);

    sendLogMutation.mutate(
      {
        level: logLevel,
        message: logMessage,
        data: { source: "MockPage", timestamp: Date.now() },
        source: "client-mock",
      },
      {
        onSuccess: (data) => handleResponse(data),
        onError: (error) => handleResponse({ error: error.message }, true),
      }
    );
  };

  // Check if any mutation is loading
  const isLoading =
    healthQuery.isFetching ||
    helloQuery.isFetching ||
    heavyProcessMutation.isPending ||
    unstableProcessMutation.isPending ||
    batchProcessMutation.isPending ||
    sendLogMutation.isPending;

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
        <p className="text-xs text-slate-500 mt-2">
          Using Axios + TanStack Query for API calls
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
          onCall={handleHealthCheck}
          color="emerald"
          isActive={activeEndpoint === "/health"}
          isLoading={isLoading}
        />

        {/* Hello API */}
        <ApiCard
          title="Hello API"
          description="Basic hello endpoint"
          icon={Server}
          endpoint="/api/hello"
          onCall={handleHello}
          color="cyan"
          isActive={activeEndpoint === "/api/hello"}
          isLoading={isLoading}
        />

        {/* Heavy Process */}
        <ApiCard
          title="Heavy Process"
          description="CPU-intensive mock process with configurable duration"
          icon={Zap}
          endpoint="/api/heavy-process"
          onCall={handleHeavyProcess}
          color="amber"
          isActive={activeEndpoint === "/api/heavy-process"}
          isLoading={isLoading}
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
          onCall={handleUnstableProcess}
          color="rose"
          isActive={activeEndpoint === "/api/heavy-process-unstable"}
          isLoading={isLoading}
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
          onCall={handleBatchProcess}
          color="cyan"
          isActive={activeEndpoint === "/api/batch-process"}
          isLoading={isLoading}
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
          onCall={handleSendLog}
          color="emerald"
          isActive={activeEndpoint === "/api/logs"}
          isLoading={isLoading}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Log Level
              </label>
              <select
                value={logLevel}
                onChange={(e) =>
                  setLogLevel(e.target.value as SendLogRequest["level"])
                }
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
              {response.isError ? (
                <XCircle className="w-5 h-5 text-rose-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
              Response
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <span
                className={`px-2 py-0.5 rounded-full ${
                  !response.isError
                    ? "bg-emerald-400/20 text-emerald-300"
                    : "bg-rose-400/20 text-rose-300"
                }`}
              >
                Status: {response.isError ? "Error" : "Success"}
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
