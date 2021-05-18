import Container from 'typedi';
import { Product } from '@libs/entities';
import { ProductService } from '../../services';

const productService: ProductService = !process.env.SCRIPT_GEN_GRAPHQL
  ? Container.get(ProductService)
  : (undefined as unknown as ProductService);

export async function resolveProductReference(
  reference: Pick<Product, 'id'>,
): Promise<Product | undefined> {
  return productService.readOneById(reference.id);
}
