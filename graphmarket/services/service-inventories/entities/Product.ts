import { Directive, Field, ObjectType } from 'type-graphql';
import {
  GraphQLID,
  GraphQLNonNegativeInt,
  GraphQLPositiveInt,
  GraphQLUSCurrency,
} from '@libs/graphql';
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

  @Field(() => GraphQLUSCurrency, { description: `Product price` })
  @Directive(`@external`)
  price!: number;

  @Field(() => GraphQLNonNegativeInt, { description: `Product quantity` })
  quantity!: number;
}
