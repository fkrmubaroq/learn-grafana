import { trace } from "@opentelemetry/api";
import { useEffect, useRef } from "react";

const tracer = trace.getTracer('react-frontend');

type Options = {
    spanNames: string[];
    onChange?: (option: OnChangeOption) => void;
}

type OnChangeOption = {
    spanName: string;
    value: string;
    tagName: string;
}
export function useTraceForm(formRef: React.RefObject<HTMLFormElement | null> , options: Options) {
    const username = localStorage.getItem("calmlogs_username");
    const dataRef = useRef<Record<string, string>>({});
    const submit = () => {
        const values: Record<string, string> = dataRef.current || {};
        if(!formRef.current) return;
        const form = formRef.current;
        if(!options.spanNames) return;
        options.spanNames.forEach(spanName => {
            const span = form.querySelector(`[name="${spanName}"]`)
            if(!span) return;
            values[spanName] = (span as HTMLInputElement).value;
        })

        const span = tracer.startSpan('form_submit',{
            attributes: {
                'data': JSON.stringify(values),
                'username': username || "anonymous",
            },
        });
        span.end();
    };

    useOnChange(formRef, options.spanNames, options?.onChange);


    return {submit};
}

function useOnChange(formRef: React.RefObject<HTMLFormElement | null> , spanNames: string[], onChange?: (option: OnChangeOption) => void) {
    const cleanupRefs = useRef<(() => void)[]>([]);
    useEffect(() => {
        if(!formRef.current) return;
        if(!spanNames) return;
        if(!onChange) return;
        const form = formRef.current;
        const callback = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            const tagName = target.tagName;
            const spanName = target.name;
            const option: OnChangeOption = {
                spanName,
                value,
                tagName,
            };
            onChange?.(option);
        }

        spanNames.forEach(spanName => {
            const span = form.querySelector(`[name="${spanName}"]`)
            if(!span) return;
            if(!onChange) return;
            span.addEventListener('change', callback);
            cleanupRefs.current.push(() => span.removeEventListener('change', callback));
        });
        return () => {
            if(!onChange) return;

            // eslint-disable-next-line react-hooks/exhaustive-deps
            cleanupRefs.current.forEach(cleanup => cleanup());
        };
    }, [formRef, spanNames, onChange])
}
