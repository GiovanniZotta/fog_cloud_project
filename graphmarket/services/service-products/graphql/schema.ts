import { Product } from '@libs/entities';
import { buildFederatedSchema } from '@libs/helpers';
import { resolveProductReference, ProductResolver } from './resolvers';

export const schema = buildFederatedSchema(
  { resolvers: [ProductResolver], orphanedTypes: [Product] },
  { Product: { __resolveReference: resolveProductReference } },
);
