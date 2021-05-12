import { GraphQLID } from '@libs/graphql';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ReadProductsArgs {
  @Field(() => [GraphQLID], { nullable: true, description: `Reviews identifiers` })
  reviewsIds?: string[];
}
