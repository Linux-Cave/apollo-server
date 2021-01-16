import { GraphQLResponse } from 'apollo-server-types';
import {
  createTestClient,
  ApolloServerTestClient
} from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

import { generateSchema } from '../src/graphql/';

describe('apollo-server', () => {
  const schema: GraphQLSchema = generateSchema();
  const client: ApolloServerTestClient = createTestClient(
    new ApolloServer({ schema })
  );

  describe('basic', () => {
    test('query helloWorld', async () => {
      const query = gql`
        query {
          helloWorld
        }
      `;
      const res: GraphQLResponse = await client.query({ query });
      expect(res?.data?.helloWorld).toEqual('Hello World!');
    });

    test('query apolloServer.helloWorld', async () => {
      const query = gql`
        query {
          apolloServer {
            helloWorld
          }
        }
      `;
      const res: GraphQLResponse = await client.query({ query });
      expect(res?.data?.apolloServer?.helloWorld).toEqual('Hello World!');
    });
  });
});
