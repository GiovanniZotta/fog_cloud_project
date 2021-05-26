import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Review } from '@libs/entities';
import { ReviewService } from '../../services';
import { Product } from '../../entities';

@Resolver(() => Product)
@Service()
export class ProductResolver {
  @Inject()
  private readonly reviewService!: ReviewService;

  @FieldResolver(() => [Review], { description: `Product reviews` })
  reviews(@Root() product: Product): Promise<Review[]> {
    return this.reviewService.read({ productId: product.id });
  }
}
