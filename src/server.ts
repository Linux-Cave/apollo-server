import { Express } from 'express';
import { default as express } from 'express';
import { contentSecurityPolicy } from 'helmet';

import { create } from '@linuxcave/express';

import { config } from './config';
import { graphqlRoutes } from './graphql';
import { expressLogger } from './logger';

// Configurations
const { port } = config;

// Create Server
const app: Express = express();
create({
  app,
  port,
  initialize: (app: Express): void => {
    // Default Helmet CSP - https://github.com/helmetjs/helmet/blob/master/middlewares/content-security-policy/index.ts#L20
    // Extended for GraphQL Playground
    app.use(
      contentSecurityPolicy({
        directives: {
          'default-src': ["'self'"],
          'base-uri': ["'self'"],
          'block-all-mixed-content': [],
          'font-src': ["'self'", 'https:', 'data:'],
          'frame-ancestors': ["'self'"],
          'img-src': ["'self'"],
          'object-src': ["'none'"],
          'script-src': [
            "'self'",
            'https://cdn.jsdelivr.net/',
            "'unsafe-inline'"
          ],
          'script-src-attr': ["'none'"],
          'style-src': [
            "'self'",
            'https://cdn.jsdelivr.net/',
            'https://fonts.googleapis.com/',
            "'unsafe-inline'"
          ],
          'upgrade-insecure-requests': []
        }
      })
    );

    app.use(expressLogger);
    graphqlRoutes(app);
  },
  readiness: async (): Promise<void> => {
    /* NOP */
  },
  onSignal: async () => {
    /* NOP */
  }
});
