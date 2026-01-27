import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import {
    CompositePropagator,
    W3CBaggagePropagator,
    W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
  
  const initTracing = async () => {
    const { ZoneContextManager } = await import('@opentelemetry/context-zone');
  
    const provider = new WebTracerProvider({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'react-frontend',
      }),
      spanProcessors: [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            // adjust to your collector / backend
            url: 'http://localhost:4318/v1/traces',
          }),
          { scheduledDelayMillis: 500 },
        ),
      ],
    });
  
    const contextManager = new ZoneContextManager();
  
    provider.register({
      contextManager,
      propagator: new CompositePropagator({
        propagators: [
          new W3CBaggagePropagator(),
          new W3CTraceContextPropagator(),
        ],
      }),
    });
  
    registerInstrumentations({
      tracerProvider: provider,
      instrumentations: [
        getWebAutoInstrumentations({
          '@opentelemetry/instrumentation-fetch': {
            // ensure trace headers are propagated on your API calls
            propagateTraceHeaderCorsUrls: /.*/,
            clearTimingResources: true,
          },
        }),
      ],
    });
  };
  
  export default initTracing;