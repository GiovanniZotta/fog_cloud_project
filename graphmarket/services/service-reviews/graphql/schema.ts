import { Container } from 'typedi';
import { ProductReference, Review } from '@libs/entities';
import { buildFederatedSchema } from '@libs/helpers';
import { ReviewResolver, resolveReviewReference } from './resolvers';
import { ProductReviewResolver } from './resolvers/ProductReviewResolver';

export const schema = buildFederatedSchema(
  {
    resolvers: [ReviewResolver, ProductReviewResolver],
    orphanedTypes: [Review, ProductReference],
    container: Container,
  },
  { Review: { __resolveReference: resolveReviewReference } },
);
