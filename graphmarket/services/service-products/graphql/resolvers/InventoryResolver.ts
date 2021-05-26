import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Product } from '@libs/entities';
import { ProductService } from '../../services';
import { Inventory } from '../../entities';

@Resolver(() => Inventory)
@Service()
export class InventoryResolver {
  @Inject()
  private readonly productService!: ProductService;

  @FieldResolver(() => Product, { description: `Inventory product` })
  product(@Root() inventory: Inventory): Promise<Product | undefined> {
    return this.productService.readOneById(inventory.productId);
  }
}
