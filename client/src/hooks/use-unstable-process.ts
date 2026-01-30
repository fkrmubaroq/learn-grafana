import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { UnstableProcessParams, UnstableProcessResponse } from "@/services/api-types";
import { AxiosError } from "axios";

export function useUnstableProcess() {
  return useMutation<UnstableProcessResponse, AxiosError, UnstableProcessParams | undefined>({
    mutationFn: (params) => api.getUnstableProcess(params),
  });
}
