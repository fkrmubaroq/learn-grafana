import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer('react-frontend');

export function useTraceForm() {
    const username = localStorage.getItem("calmlogs_username");

    const submit = (payload: Record<string, string>) => {
        const span = tracer.startSpan('form_submit',{
            attributes: {
                'data': JSON.stringify(payload),
                'username': username || "anonymous",
            },
        });
        span.end();
    };

    return {submit};
}
