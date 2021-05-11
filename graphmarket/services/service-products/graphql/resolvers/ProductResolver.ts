import { getManager } from 'typeorm';
import { Query, Resolver } from 'type-graphql';
import { Product } from '@libs/entities';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  // eslint-disable-next-line class-methods-use-this
  async products(): Promise<Product[]> {
    return getManager().find(Product);
  }
}
