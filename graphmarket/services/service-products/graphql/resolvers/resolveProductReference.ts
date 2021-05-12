import Container from 'typedi';
import { Product } from '@libs/entities';
import { ProductService } from '../../services';

const productService: ProductService = Container.get(ProductService);

export async function resolveProductReference(
  reference: Pick<Product, 'id'>,
): Promise<Product | undefined> {
  return productService.readOneById(reference.id);
}
