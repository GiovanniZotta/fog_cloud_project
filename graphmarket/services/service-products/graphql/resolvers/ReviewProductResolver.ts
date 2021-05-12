import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Product, ReviewReference } from '@libs/entities';
import { ProductService } from '@services/service-products/services';

@Resolver(() => ReviewReference)
@Service()
export class ReviewProductResolver {
  @Inject()
  private readonly productService!: ProductService;

  @FieldResolver(() => Product, { description: `Review's product` })
  async product(@Root() review: ReviewReference): Promise<Product | undefined> {
    const products = await this.productService.read({ reviewsIds: [review.id] });

    return products.length === 0 ? undefined : products[0];
  }
}
