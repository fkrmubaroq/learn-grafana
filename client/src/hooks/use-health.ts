import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { HealthResponse } from "@/services/api-types";

export const healthKeys = {
  all: ["health"] as const,
  check: () => [...healthKeys.all, "check"] as const,
};

export function useHealth(options?: { enabled?: boolean }) {
  return useQuery<HealthResponse>({
    queryKey: healthKeys.check(),
    queryFn: () => api.getHealth(),
    enabled: options?.enabled ?? true,
  });
}
