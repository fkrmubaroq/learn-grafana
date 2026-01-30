// ==========================================
// Response Types
// ==========================================

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface HelloResponse {
  message: string;
  timestamp: string;
}

export interface HeavyProcessResponse {
  message: string;
  processingTime: string;
  iterations: number;
  result: string;
  timestamp: string;
}

export interface UnstableProcessResponse {
  message?: string;
  error?: string;
  processingTime: string;
  timestamp: string;
}

export interface BatchProcessResult {
  id: number;
  status: string;
  processedAt: string;
}

export interface BatchProcessResponse {
  message: string;
  processingTime: string;
  itemsProcessed: number;
  results: BatchProcessResult[];
  timestamp: string;
}

export interface SendLogResponse {
  success: boolean;
  received: {
    timestamp: string;
    level: string;
    source: string;
    message: string;
    data?: unknown;
  };
  timestamp: string;
}

// ==========================================
// Request Types
// ==========================================

export interface HeavyProcessParams {
  duration?: number;
  iterations?: number;
}

export interface UnstableProcessParams {
  duration?: number;
  failRate?: number;
}

export interface BatchProcessRequest {
  items: string[];
  processingDelay?: number;
}

export interface SendLogRequest {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  data?: Record<string, unknown>;
  source?: string;
}

// ==========================================
// API Response Wrapper (for hooks)
// ==========================================

export interface ApiResult<T> {
  data: T;
  status: number;
  duration: number;
}

export interface ApiError {
  message: string;
  status: number;
  duration: number;
}
