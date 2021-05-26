import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Product } from '@libs/entities';
import { ProductCreateInput, ProductUpdateInput } from '../graphql/inputs';
import { ReadProductsArgs } from '../graphql/args';
import { ProductRepository } from '../repositories';
import { logger } from '../logger';

@Service()
export class ProductService {
  @InjectRepository()
  private readonly productRepository!: ProductRepository;

  @Transactional({ propagation: Propagation.REQUIRED })
  public async create(product: ProductCreateInput): Promise<Product> {
    const newProduct: Product = await this.productRepository.create(product);

    logger.info(`Created product ${newProduct.id}`);

    return newProduct;
  }

  @Transactional({ propagation: Propagation.SUPPORTS })
  public readOneById(id: string): Promise<Product | undefined> {
    return this.productRepository.readOneById(id);
  }

  @Transactional({ propagation: Propagation.SUPPORTS })
  public read(options: ReadProductsArgs): Promise<Product[]> {
    return this.productRepository.read(options);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  public async update(id: string, product: ProductUpdateInput): Promise<Product> {
    const productUpdated: Product = await this.productRepository.update(id, product);

    logger.info(`Updated product ${id}`);

    return productUpdated;
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  public async delete(id: string): Promise<Product> {
    const product: Product = await this.productRepository.delete(id);

    logger.info(`Deleted product ${id}`);

    return product;
  }
}
