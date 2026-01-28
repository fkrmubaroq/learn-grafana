import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

import {
    CompositePropagator,
    W3CBaggagePropagator,
    W3CTraceContextPropagator,
} from '@opentelemetry/core';

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

export default function initTracing() {
  const provider = new WebTracerProvider({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: 'react-frontend',
    }),
    spanProcessors: [
      new BatchSpanProcessor(
        new OTLPTraceExporter({
          url: 'http://localhost:4318/v1/traces',
        }),
      ),
    ],
  });

  provider.register({
    contextManager: new ZoneContextManager(),
    propagator: new CompositePropagator({
      propagators: [
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator(),
      ],
    }),
  });

  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
    //   new UserInteractionInstrumentation({
    //     eventNames: ['click','change','focus'], // biar nggak noisy
    //   }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: /.*/,
      }),
    ],
  });
}
