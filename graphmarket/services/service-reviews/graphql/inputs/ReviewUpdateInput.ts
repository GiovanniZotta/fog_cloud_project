import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { GraphQLNonEmptyString } from '@libs/graphql/scalars';
import { Review } from '@libs/entities';

@InputType('ReviewUpdateInput', { description: `Review update input` })
export class ReviewUpdateInput implements Partial<Review> {
  @Field(() => GraphQLNonEmptyString, { nullable: true, description: `Review's title` })
  @Length(1, 64)
  title?: string;

  @Field(() => GraphQLNonEmptyString, { nullable: true, description: `Review's body` })
  @Length(1, 256)
  body?: string;
}
