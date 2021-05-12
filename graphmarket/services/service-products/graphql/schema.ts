import { Container } from 'typedi';
import { Product, ReviewReference } from '@libs/entities';
import { buildFederatedSchema } from '@libs/helpers';
import { resolveProductReference, ProductResolver, ReviewProductResolver } from './resolvers';

export const schema = buildFederatedSchema(
  {
    resolvers: [ProductResolver, ReviewProductResolver],
    orphanedTypes: [Product, ReviewReference],
    container: Container,
  },
  { Product: { __resolveReference: resolveProductReference } },
);
