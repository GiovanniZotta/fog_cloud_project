import { AbstractRepository, EntityRepository } from 'typeorm';
import { Product } from '@libs/entities';
import { ProductCreateInput, ProductUpdateInput } from '../graphql/inputs';

@EntityRepository(Product)
export class ProductRepository extends AbstractRepository<Product> {
  public create(product: ProductCreateInput): Promise<Product> {
    return this.repository.save(
      this.repository.create({
        name: product.name,
        description: product.description,
        image: product.name,
      }),
    );
  }

  public readOneById(id: string): Promise<Product | undefined> {
    return this.repository.findOne(id);
  }

  public read(): Promise<Product[]> {
    return this.repository.find();
  }

  public async update(id: string, product: ProductUpdateInput): Promise<Product> {
    // Check if product exists
    await this.repository.findOneOrFail(id);

    // Update and return
    return this.repository.save(
      this.repository.create({
        id,
        name: product.name,
        description: product.description,
        image: product.image,
      }),
    );
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
