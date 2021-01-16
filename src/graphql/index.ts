import type { Express, Request, Response } from 'express';
import { gql } from 'apollo-server-express';
import type { GraphQLSchema } from 'graphql';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';

import { config } from '../config';
import {
  typeDefs as hellowWorldTypes,
  resolvers as helloWorldeResolvers
} from './schemas/';

// Configurations
const { endpoint } = config;

// Schema
const baseTypes = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const generateSchema = (): GraphQLSchema => {
  return applyMiddleware(
    makeExecutableSchema({
      typeDefs: [baseTypes, hellowWorldTypes],
      resolvers: [helloWorldeResolvers]
    })
  );
};

export function graphqlRoutes(app: Express): void {
  app.get('/', (_: Request, res: Response) => {
    res.redirect('/graphql');
  });

  const schema: GraphQLSchema = generateSchema();
  const server: ApolloServer = new ApolloServer({
    schema,
    playground: {
      tabs: [
        {
          endpoint: `${endpoint}/graphql`,
          query: `query {\n\thelloWorld\n\tapolloServer {\n\t\thelloWorld\n\t}\n}`
        }
      ]
    },
    introspection: true
  });

  server.applyMiddleware({
    app
  });
}
