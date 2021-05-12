import { AbstractRepository, EntityRepository, In } from 'typeorm';
import { Product } from '@libs/entities';
import { ProductCreateInput, ProductUpdateInput } from '../graphql/inputs';
import { ReadProductsArgs } from '../graphql/args';

@EntityRepository(Product)
export class ProductRepository extends AbstractRepository<Product> {
  public create(product: ProductCreateInput): Promise<Product> {
    return this.manager.save(
      Product,
      this.manager.create(Product, {
        name: product.name,
        description: product.description,
        image: product.name,
      }),
    );
  }

  public readOneById(id: string): Promise<Product | undefined> {
    return this.manager.findOne(Product, id);
  }

  public read(options: ReadProductsArgs = {}): Promise<Product[]> {
    return this.manager.find(Product, {
      where: {
        // FIXME funziona o no?
        ...(options.reviewsIds && { reviewsIds: In(options.reviewsIds) }),
      },
    });
  }

  public async update(id: string, product: ProductUpdateInput): Promise<Product> {
    // Check if product exists
    await this.manager.findOneOrFail(Product, id);

    // Update
    await this.manager.update(Product, id, this.manager.create(Product, product));

    // Return updated product
    return this.manager.findOneOrFail(Product, id);
  }

  public async delete(id: string): Promise<Product> {
    // Check if product exists
    const product: Product = await this.manager.findOneOrFail(Product, id);

    // Delete
    await this.manager.delete(Product, id);

    // Return deleted product
    return product;
  }
}
