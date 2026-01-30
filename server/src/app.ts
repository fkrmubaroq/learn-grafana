import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import client from "prom-client";

client.collectDefaultMetrics();
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

const app = express();
const PORT = 8000;

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Simple request logger middleware
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDuration.startTimer();
  
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });
  
  next();
};

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  console.log("Health check requested");
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Simple API endpoint
app.get("/api/hello", (_req: Request, res: Response) => {
  console.log("Hello endpoint called");
  res.json({ message: "Hello from server!", timestamp: new Date().toISOString() });
});

// Mock heavy process - CPU intensive simulation
app.get("/api/heavy-process", async (req: Request, res: Response) => {
  const duration = parseInt(req.query.duration as string) || 3000;
  const iterations = parseInt(req.query.iterations as string) || 1000000;

  console.log(`[HEAVY PROCESS] Starting - duration: ${duration}ms, iterations: ${iterations}`);

  const startTime = Date.now();

  // Simulate CPU-intensive work
  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
    
    // Yield to event loop periodically
    if (i % 100000 === 0) {
      await new Promise((resolve) => setImmediate(resolve));
    }
  }

  // Additional delay simulation
  await new Promise((resolve) => setTimeout(resolve, duration));

  const processingTime = Date.now() - startTime;

  console.log(`[HEAVY PROCESS] Completed - took ${processingTime}ms`);

  res.json({
    message: "Heavy process completed",
    processingTime: `${processingTime}ms`,
    iterations,
    result: result.toFixed(2),
    timestamp: new Date().toISOString(),
  });
});

// Mock heavy process with random failures
app.get("/api/heavy-process-unstable", async (req: Request, res: Response) => {
  const duration = parseInt(req.query.duration as string) || 2000;
  const failRate = parseFloat(req.query.failRate as string) || 0.3;

  console.log(`[UNSTABLE PROCESS] Starting - duration: ${duration}ms, failRate: ${failRate}`);

  const startTime = Date.now();

  await new Promise((resolve) => setTimeout(resolve, duration));

  // Random failure
  if (Math.random() < failRate) {
    const processingTime = Date.now() - startTime;
    console.error(`[UNSTABLE PROCESS] FAILED after ${processingTime}ms`);
    res.status(500).json({
      error: "Process failed unexpectedly",
      processingTime: `${processingTime}ms`,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const processingTime = Date.now() - startTime;
  console.log(`[UNSTABLE PROCESS] Completed - took ${processingTime}ms`);

  res.json({
    message: "Unstable process completed",
    processingTime: `${processingTime}ms`,
    timestamp: new Date().toISOString(),
  });
});

// Mock batch processing endpoint
app.post("/api/batch-process", async (req: Request, res: Response) => {
  const { items = [], processingDelay = 100 } = req.body;

  console.log(`[BATCH PROCESS] Starting - items: ${items.length}, delay: ${processingDelay}ms`);

  const startTime = Date.now();
  const results: { id: number; status: string; processedAt: string }[] = [];

  for (let i = 0; i < items.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, processingDelay));
    
    results.push({
      id: i,
      status: "processed",
      processedAt: new Date().toISOString(),
    });

    if ((i + 1) % 10 === 0) {
      console.log(`[BATCH PROCESS] Progress: ${i + 1}/${items.length}`);
    }
  }

  const processingTime = Date.now() - startTime;
  console.log(`[BATCH PROCESS] Completed - processed ${results.length} items in ${processingTime}ms`);

  res.json({
    message: "Batch processing completed",
    processingTime: `${processingTime}ms`,
    itemsProcessed: results.length,
    results,
    timestamp: new Date().toISOString(),
  });
});

// Logs endpoint - receive and log payload from client
app.post("/api/logs", (req: Request, res: Response) => {
  const { level = "info", message, data, source = "client" } = req.body;
  const timestamp = new Date().toISOString();

  const logEntry = {
    timestamp,
    level,
    source,
    message,
    data,
  };

  // Log based on level
  switch (level) {
    case "error":
      console.error(`[LOG][${source}][ERROR]`, message, data ? JSON.stringify(data) : "");
      break;
    case "warn":
      console.warn(`[LOG][${source}][WARN]`, message, data ? JSON.stringify(data) : "");
      break;
    case "debug":
      console.debug(`[LOG][${source}][DEBUG]`, message, data ? JSON.stringify(data) : "");
      break;
    default:
      console.log(`[LOG][${source}][INFO]`, message, data ? JSON.stringify(data) : "");
  }

  res.json({ 
    success: true, 
    received: logEntry,
    timestamp 
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
