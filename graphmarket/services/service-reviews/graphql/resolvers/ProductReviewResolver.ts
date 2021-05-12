import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { ProductReference, Review } from '@libs/entities';
import { ReviewService } from '../../services';

@Resolver(() => ProductReference)
@Service()
export class ProductReviewResolver {
  @Inject()
  private readonly reviewService!: ReviewService;

  @FieldResolver(() => [Review], { description: `Product's reviews` })
  reviews(@Root() product: ProductReference): Promise<Review[]> {
    return this.reviewService.read({ productId: product.id });
  }
}
