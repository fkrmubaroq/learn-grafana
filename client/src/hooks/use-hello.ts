import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { HelloResponse } from "@/services/api-types";

export const helloKeys = {
  all: ["hello"] as const,
  get: () => [...helloKeys.all, "get"] as const,
};

export function useHello(options?: { enabled?: boolean }) {
  return useQuery<HelloResponse>({
    queryKey: helloKeys.get(),
    queryFn: () => api.getHello(),
    enabled: options?.enabled ?? true,
  });
}
