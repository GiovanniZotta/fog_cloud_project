import { Container } from 'typedi';
import { Review } from '@libs/entities';
import { buildFederatedSchema } from '@libs/helpers';
import { Product } from '../entities';
import { ReviewResolver, resolveReviewReference, ProductResolver } from './resolvers';

export const schema = buildFederatedSchema(
  {
    resolvers: [ReviewResolver, ProductResolver],
    orphanedTypes: [Review, Product],
    container: Container,
  },
  { Review: { __resolveReference: resolveReviewReference } },
);
