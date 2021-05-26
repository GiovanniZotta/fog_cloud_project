import { Container } from 'typedi';
import { Product } from '@libs/entities';
import { buildFederatedSchema } from '@libs/helpers';
import { Review, Inventory } from '../entities';
import {
  resolveProductReference,
  ProductResolver,
  ReviewResolver,
  InventoryResolver,
} from './resolvers';

export const schema = buildFederatedSchema(
  {
    resolvers: [ProductResolver, ReviewResolver, InventoryResolver],
    orphanedTypes: [Product, Review, Inventory],
    container: Container,
  },
  { Product: { __resolveReference: resolveProductReference } },
);
