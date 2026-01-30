import { trace } from '@opentelemetry/api';
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for heavy processes
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const span = trace.getActiveSpan();
    if(config.data){
      console.log("INTERCEPT",span?.spanContext().traceId)
      span?.setAttribute("payload", JSON.stringify(config.data));
    }
    const startTime = Date.now();
    (config as AxiosRequestConfig & { metadata: { startTime: number } }).metadata = { startTime };
    
    // Add username from localStorage if available
    const username = localStorage.getItem("calmlogs_username");
    if (username) {
      config.headers["X-Username"] = username;
    }

    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data || "");
    return config;
  },
  (error) => {
    console.error("[API] Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as AxiosRequestConfig & { metadata?: { startTime: number } };
    const duration = config.metadata ? Date.now() - config.metadata.startTime : 0;
    
    console.log(`[API] ${response.status} ${config.method?.toUpperCase()} ${config.url} (${duration}ms)`);
    return response;
  },
  (error: AxiosError) => {
    const config = error.config as AxiosRequestConfig & { metadata?: { startTime: number } };
    const duration = config?.metadata ? Date.now() - config.metadata.startTime : 0;
    
    console.error(`[API] Error ${error.response?.status || "Network"} ${config?.method?.toUpperCase()} ${config?.url} (${duration}ms)`, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
