import { Directive, Field, ObjectType } from 'type-graphql';
import { GraphQLID } from '@libs/graphql';
import { Product as ProductBase } from '@libs/entities';

@ObjectType('Product')
@Directive(`@key(fields: "id")`)
@Directive('@extends')
export class Product implements Partial<ProductBase> {
  @Field(() => GraphQLID)
  @Directive('@external')
  id!: string;
}
