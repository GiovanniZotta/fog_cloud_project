import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Product } from '@libs/entities';
import { GraphQLID } from '@libs/graphql';
import { ProductService } from '../../services';
import { ProductCreateInput, ProductUpdateInput } from '../inputs';

@Resolver(Product)
@Service()
export class ProductResolver {
  @Inject()
  private readonly productService!: ProductService;

  @Mutation(() => Product, { description: `Create a new product` })
  createProduct(@Arg('data', () => ProductCreateInput) data: ProductCreateInput): Promise<Product> {
    return this.productService.create(data);
  }

  @Query(() => Product, { nullable: true, description: `Return the product that matches the id` })
  product(@Arg('id', () => GraphQLID) id: string): Promise<Product | undefined> {
    return this.productService.readOneById(id);
  }

  // TODO args
  @Query(() => [Product], { description: `Return all products` })
  products(): Promise<Product[]> {
    return this.productService.read({});
  }

  @Mutation(() => Product, { description: `Update the product` })
  updateProduct(
    @Arg('id', () => GraphQLID) id: string,
    @Arg('data', () => ProductUpdateInput) data: ProductUpdateInput,
  ): Promise<Product> {
    return this.productService.update(id, data);
  }

  @Mutation(() => Product, { description: `Delete the product` })
  deleteProduct(@Arg('id', () => GraphQLID) id: string): Promise<Product> {
    return this.productService.delete(id);
  }
}
