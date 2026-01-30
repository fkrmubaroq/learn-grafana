import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { HeavyProcessParams, HeavyProcessResponse } from "@/services/api-types";
import { AxiosError } from "axios";

export function useHeavyProcess() {
  return useMutation<HeavyProcessResponse, AxiosError, HeavyProcessParams | undefined>({
    mutationFn: (params) => api.getHeavyProcess(params),
  });
}
