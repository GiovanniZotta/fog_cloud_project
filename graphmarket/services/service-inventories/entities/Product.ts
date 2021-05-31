import { Directive, Field, ObjectType } from 'type-graphql';
import { GraphQLID, GraphQLNonNegativeInt, GraphQLPositiveInt } from '@libs/graphql';
import { Product as ProductBase } from '@libs/entities';

@ObjectType('Product')
@Directive(`@key(fields: "id")`)
@Directive(`@extends`)
export class Product implements Partial<ProductBase> {
  @Field(() => GraphQLID)
  @Directive(`@external`)
  id!: string;

  @Field(() => GraphQLPositiveInt, { description: `Product weight in grams` })
  @Directive(`@external`)
  weight!: number;

  @Field(() => GraphQLPositiveInt, { description: `Product price in cents` })
  @Directive(`@external`)
  price!: number;

  @Field(() => GraphQLNonNegativeInt, { description: `Product quantity` })
  quantity!: number;
}
