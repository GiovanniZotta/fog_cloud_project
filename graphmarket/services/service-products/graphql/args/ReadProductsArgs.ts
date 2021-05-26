import { ArgsType, Field } from 'type-graphql';
import { Product } from '@libs/entities';
import { GraphQLNonEmptyString } from '@libs/graphql';

@ArgsType()
export class ReadProductsArgs implements Partial<Product> {
  @Field(() => GraphQLNonEmptyString, { nullable: true, description: `Product name` })
  name?: string;
}
