import { gql } from 'apollo-server-express';

import { delay as delayFunction } from '@linuxcave/express';

export const typeDefs = gql`
  type ApolloServer {
    helloWorld(delay: Int = 1000): String!
  }

  extend type Query {
    helloWorld(delay: Int = 1000): String!
    apolloServer: ApolloServer!
  }
`;

const helloWorld = async (
  _: unknown,
  { delay }: { delay: number }
): Promise<string> => {
  await delayFunction(delay);
  return 'Hello World!';
};

export const resolvers = {
  Query: {
    helloWorld,
    apolloServer: () => ({})
  },
  ApolloServer: {
    helloWorld
  }
};
