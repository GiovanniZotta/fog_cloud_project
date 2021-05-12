import { GraphQLID } from '@libs/graphql';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ReadReviewsArgs {
  @Field(() => GraphQLID, { nullable: true, description: `Product identifier` })
  productId?: string;
}
