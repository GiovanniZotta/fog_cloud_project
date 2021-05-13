import { Directive, Field, ObjectType } from 'type-graphql';
import { GraphQLID } from '@libs/graphql';
import { Review as ReviewBase } from '@libs/entities';

@ObjectType('Review')
@Directive(`@key(fields: "id")`)
@Directive(`@extends`)
export class Review implements Partial<ReviewBase> {
  @Field(() => GraphQLID)
  @Directive(`@external`)
  id!: string;

  @Field(() => GraphQLID)
  @Directive(`@external`)
  productId!: string;
}
