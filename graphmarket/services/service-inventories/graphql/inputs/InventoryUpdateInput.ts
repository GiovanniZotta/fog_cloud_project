import { Field, InputType } from 'type-graphql';
import { GraphQLNonNegativeInt } from '@libs/graphql/scalars';

@InputType('InventoryUpdateInput', { description: `Inventory update input` })
export class InventoryUpdateInput {
  @Field(() => GraphQLNonNegativeInt, { nullable: true, description: `Product quantity` })
  quantity?: number;
}
