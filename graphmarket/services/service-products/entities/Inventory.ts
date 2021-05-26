import { Directive, Field, ObjectType } from 'type-graphql';
import { GraphQLID } from '@libs/graphql';
import { Inventory as InventoryBase } from '@libs/entities';

@ObjectType('Inventory')
@Directive(`@key(fields: "productId")`)
@Directive(`@extends`)
export class Inventory implements Partial<InventoryBase> {
  @Field(() => GraphQLID)
  @Directive(`@external`)
  productId!: string;
}
