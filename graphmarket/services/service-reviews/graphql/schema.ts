import { Container } from 'typedi';
import { Review } from '@libs/entities';
import { buildFederatedSchema } from '@libs/helpers';
import { ReviewResolver, resolveReviewReference } from './resolvers';

export const schema = buildFederatedSchema(
  { resolvers: [ReviewResolver], orphanedTypes: [Review], container: Container },
  { Review: { __resolveReference: resolveReviewReference } },
);
