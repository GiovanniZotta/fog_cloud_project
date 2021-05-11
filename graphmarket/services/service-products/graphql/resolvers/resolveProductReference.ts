import { getManager } from 'typeorm';
import { Product } from '@libs/entities';

export async function resolveProductReference(
  reference: Pick<Product, 'id'>,
): Promise<Product | undefined> {
  return getManager().findOne(Product, reference.id);
}
