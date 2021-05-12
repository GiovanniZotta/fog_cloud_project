import { Directive, Field, ObjectType } from 'type-graphql';
import { GraphQLID } from '@libs/graphql';
import { Product } from './Product';

@ObjectType('Product')
@Directive(`@key(fields: "id")`)
@Directive('@extends')
export class ProductReference implements Partial<Product> {
  @Field(() => GraphQLID)
  @Directive('@external')
  id!: string;
}
