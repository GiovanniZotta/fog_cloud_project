import { URL } from 'url';
import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { GraphQLNonEmptyString, GraphQLURL } from '@libs/graphql/scalars';

@InputType('ProductCreateInput', { description: `Product create input` })
export class ProductCreateInput {
  @Field(() => GraphQLNonEmptyString, { description: `Product's name` })
  @Length(1, 256)
  name!: string;

  @Field(() => GraphQLNonEmptyString, { nullable: true, description: `Product's description` })
  @Length(1, 512)
  description?: string;

  @Field(() => GraphQLURL, { nullable: true, description: `Product's image` })
  image?: URL;
}
