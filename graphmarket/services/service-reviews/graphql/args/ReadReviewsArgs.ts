import { ArgsType, Field } from 'type-graphql';
import { Review } from '@libs/entities';
import { GraphQLID } from '@libs/graphql';

@ArgsType()
export class ReadReviewsArgs implements Partial<Review> {
  @Field(() => GraphQLID, { nullable: true, description: `Product identifier` })
  productId?: string;
}
