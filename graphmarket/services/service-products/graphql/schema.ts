import { Container } from 'typedi';
import { Product } from '@libs/entities';
import { buildFederatedSchema } from '@libs/helpers';
import { Review } from '../entities';
import { resolveProductReference, ProductResolver, ReviewResolver } from './resolvers';

export const schema = buildFederatedSchema(
  {
    resolvers: [ProductResolver, ReviewResolver],
    orphanedTypes: [Product, Review],
    container: Container,
  },
  { Product: { __resolveReference: resolveProductReference } },
);
