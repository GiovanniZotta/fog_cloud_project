import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Product } from '@libs/entities';
import { ProductService } from '../../services';
import { Review } from '../../entities';

@Resolver(() => Review)
@Service()
export class ReviewResolver {
  @Inject()
  private readonly productService!: ProductService;

  @FieldResolver(() => Product, { description: `Review's product` })
  async product(@Root() review: Review): Promise<Product | undefined> {
    const products = await this.productService.read({ reviewsIds: [review.id] });

    return products.length === 0 ? undefined : products[0];
  }
}
