import { Field, InputType } from 'type-graphql';
import { IsPositive, Min } from 'class-validator';
import { GraphQLNonNegativeInt, GraphQLPositiveInt } from '@libs/graphql/scalars';

@InputType('InventoryUpdateInput', { description: `Inventory update input` })
export class InventoryUpdateInput {
  @Field(() => GraphQLPositiveInt, { nullable: true, description: `Product weight in grams` })
  @IsPositive()
  weight?: number;

  @Field(() => GraphQLPositiveInt, { nullable: true, description: `Product price in cents` })
  @IsPositive()
  price?: number;

  @Field(() => GraphQLNonNegativeInt, { nullable: true, description: `Product quantity` })
  @Min(0)
  quantity?: number;
}
