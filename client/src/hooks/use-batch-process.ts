import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { BatchProcessRequest, BatchProcessResponse } from "@/services/api-types";
import { AxiosError } from "axios";

export function useBatchProcess() {
  return useMutation<BatchProcessResponse, AxiosError, BatchProcessRequest>({
    mutationFn: (request) => api.postBatchProcess(request),
  });
}
