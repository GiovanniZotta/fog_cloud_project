import { Container } from 'typedi';
import { Inventory } from '@libs/entities';
import { buildFederatedSchema } from '@libs/helpers';
import { Product } from '../entities';
import {
  InventoryResolver,
  resolveInventoryReference,
  resolveProductReference,
  ProductResolver,
} from './resolvers';

export const schema = buildFederatedSchema(
  {
    resolvers: [InventoryResolver, ProductResolver],
    orphanedTypes: [Inventory, Product],
    container: Container,
  },
  {
    Inventory: { __resolveReference: resolveInventoryReference },
    Product: { __resolveReference: resolveProductReference },
  },
);
