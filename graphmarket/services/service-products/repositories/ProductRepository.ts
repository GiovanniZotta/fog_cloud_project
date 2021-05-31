import { AbstractRepository, EntityRepository, ILike } from 'typeorm';
import { Product } from '@libs/entities';
import { ProductCreateInput, ProductUpdateInput } from '../graphql/inputs';
import { ReadProductsArgs } from '../graphql/args';

@EntityRepository(Product)
export class ProductRepository extends AbstractRepository<Product> {
  public create(product: ProductCreateInput): Promise<Product> {
    return this.repository.save({
      name: product.name,
      price: product.price,
      weight: product.weight,
      ...(product.description && { description: product.description }),
      ...(product.image && { image: product.image.href }),
    });
  }

  public readOneById(id: string): Promise<Product | undefined> {
    return this.repository.findOne(id);
  }

  public read(options: ReadProductsArgs = {}): Promise<Product[]> {
    return this.repository.find({
      where: {
        ...(options.name && { name: ILike(`%${options.name}%`) }),
      },
    });
  }

  public async update(id: string, product: ProductUpdateInput): Promise<Product> {
    // Check if product exists
    await this.repository.findOneOrFail(id);

    // Update
    await this.repository.update(id, {
      ...(product.name && { name: product.name }),
      ...(product.description && { description: product.description }),
      ...(product.image && { image: product.image }),
      ...(product.price && { price: product.price }),
      ...(product.weight && { weight: product.weight }),
    });

    // Return
    return this.repository.findOneOrFail(id);
  }

  public async delete(id: string): Promise<Product> {
    // Check if product exists
    const product: Product = await this.repository.findOneOrFail(id);

    // Delete
    await this.repository.delete(id);

    // Return deleted product
    return product;
  }
}
