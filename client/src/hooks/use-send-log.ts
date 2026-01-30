import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { SendLogRequest, SendLogResponse } from "@/services/api-types";
import { AxiosError } from "axios";

export function useSendLog() {
  return useMutation<SendLogResponse, AxiosError, SendLogRequest>({
    mutationFn: (request) => api.postLog(request),
  });
}
