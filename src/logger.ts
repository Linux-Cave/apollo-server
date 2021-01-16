import tracer from 'dd-trace';
import { default as pino } from 'pino';
import { default as expressPino } from 'express-pino-logger';

import { config } from './config';

// Configuration
const { service } = config;

// Datadog tracer
tracer.init({
  analytics: true
});

// Datadog plugins
tracer.use('dns', {
  analytics: true
});

tracer.use('fs', {
  analytics: true
});

tracer.use('express', {
  analytics: true
});

tracer.use('graphql', {
  analytics: true
});

tracer.use('http', {
  analytics: true
});

export const logger = pino({
  name: service
});
export const expressLogger = expressPino({ logger });
