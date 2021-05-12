import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Service } from 'typedi';
import { Product } from '@libs/entities';
import { ProductCreateInput, ProductUpdateInput } from '../graphql/inputs';
import { ReadProductsArgs } from '../graphql/args';
import { ProductRepository } from '../repositories';
import { logger } from '../logger';

@Service()
export class ProductService {
  @Transaction()
  public async create(
    product: ProductCreateInput,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Product> {
    const productRepository: ProductRepository = manager!.getCustomRepository(ProductRepository);

    const newProduct: Product = await productRepository.create(product);

    logger.info(`Created product ${newProduct.id}`);

    return newProduct;
  }

  @Transaction()
  public readOneById(
    id: string,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Product | undefined> {
    const productRepository: ProductRepository = manager!.getCustomRepository(ProductRepository);

    return productRepository.readOneById(id);
  }

  @Transaction()
  public read(
    options: ReadProductsArgs,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Product[]> {
    const productRepository: ProductRepository = manager!.getCustomRepository(ProductRepository);

    return productRepository.read(options);
  }

  @Transaction()
  public async update(
    id: string,
    product: ProductUpdateInput,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Product> {
    const productRepository: ProductRepository = manager!.getCustomRepository(ProductRepository);

    // Update product
    const productUpdated: Product = await productRepository.update(id, product);

    logger.info(`Updated product ${id}`);

    return productUpdated;
  }

  @Transaction()
  public async delete(id: string, @TransactionManager() manager?: EntityManager): Promise<Product> {
    const productRepository: ProductRepository = manager!.getCustomRepository(ProductRepository);

    // Delete product
    const product: Product = await productRepository.delete(id);

    logger.info(`Deleted product ${id}`);

    return product;
  }
}
