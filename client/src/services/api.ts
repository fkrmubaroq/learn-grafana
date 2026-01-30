import apiClient from "./api-client";
import type {
  HealthResponse,
  HelloResponse,
  HeavyProcessResponse,
  HeavyProcessParams,
  UnstableProcessResponse,
  UnstableProcessParams,
  BatchProcessResponse,
  BatchProcessRequest,
  SendLogResponse,
  SendLogRequest,
} from "./api-types";

// ==========================================
// API Functions
// ==========================================

export const api = {
  // Health Check
  getHealth: async (): Promise<HealthResponse> => {
    const { data } = await apiClient.get<HealthResponse>("/health");
    return data;
  },

  // Hello
  getHello: async (): Promise<HelloResponse> => {
    const { data } = await apiClient.get<HelloResponse>("/api/hello");
    return data;
  },

  // Heavy Process
  getHeavyProcess: async (params?: HeavyProcessParams): Promise<HeavyProcessResponse> => {
    const { data } = await apiClient.get<HeavyProcessResponse>("/api/heavy-process", {
      params: {
        duration: params?.duration ?? 3000,
        iterations: params?.iterations ?? 1000000,
      },
    });
    return data;
  },

  // Unstable Process
  getUnstableProcess: async (params?: UnstableProcessParams): Promise<UnstableProcessResponse> => {
    const { data } = await apiClient.get<UnstableProcessResponse>("/api/heavy-process-unstable", {
      params: {
        duration: params?.duration ?? 2000,
        failRate: params?.failRate ?? 0.3,
      },
    });
    return data;
  },

  // Batch Process
  postBatchProcess: async (request: BatchProcessRequest): Promise<BatchProcessResponse> => {
    const { data } = await apiClient.post<BatchProcessResponse>("/api/batch-process", {
      items: request.items,
      processingDelay: request.processingDelay ?? 100,
    });
    return data;
  },

  // Send Log
  postLog: async (request: SendLogRequest): Promise<SendLogResponse> => {
    const { data } = await apiClient.post<SendLogResponse>("/api/logs", {
      level: request.level,
      message: request.message,
      data: request.data,
      source: request.source ?? "client",
    });
    return data;
  },
};

export default api;
