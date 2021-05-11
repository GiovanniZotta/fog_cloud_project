import { GraphQLSchema, specifiedDirectives } from 'graphql';
import gql from 'graphql-tag';
import { BuildSchemaOptions, createResolversMap, buildSchemaSync } from 'type-graphql';
import { addResolversToSchema, GraphQLResolverMap } from 'apollo-graphql';
import {
  printSchema,
  buildFederatedSchema as buildApolloFederationSchema,
} from '@apollo/federation';
import federationDirectives from '@apollo/federation/dist/directives';

/**
 * Build GraphQL federated schema.
 * Optionally pass a reference resolvers object.
 *
 * @param options - Build schema options
 * @param referenceResolvers - GraphQL reference resolvers
 * @returns GraphQL schema
 */
export function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, 'skipCheck'>,
  referenceResolvers?: GraphQLResolverMap<any>,
): GraphQLSchema {
  // Build basic schema
  const schema = buildSchemaSync({
    ...options,
    directives: [...specifiedDirectives, ...federationDirectives, ...(options.directives || [])],
    skipCheck: true,
  });

  // Build federated schema
  const federatedSchema = buildApolloFederationSchema({
    typeDefs: gql(printSchema(schema)),
    resolvers: createResolversMap(schema) as any,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }

  return federatedSchema;
}
