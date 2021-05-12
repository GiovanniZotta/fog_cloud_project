import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { GraphQLID, GraphQLNonEmptyString } from '@libs/graphql/scalars';
import { Review } from '@libs/entities';

@InputType('ReviewCreateInput', { description: `Review create input` })
export class ReviewCreateInput implements Partial<Review> {
  @Field(() => GraphQLID, { description: `Review's product identifier` })
  productId!: string;

  @Field(() => GraphQLNonEmptyString, { description: `Review's title` })
  @Length(1, 64)
  title!: string;

  @Field(() => GraphQLNonEmptyString, { nullable: true, description: `Review's body` })
  @Length(1, 256)
  body?: string;
}
