import { Directive, FieldResolver, Resolver, Root } from 'type-graphql';
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
  @Directive(`@requires(fields: "productId")`)
  product(@Root() review: Review): Promise<Product | undefined> {
    return this.productService.readOneById(review.productId);
  }
}
