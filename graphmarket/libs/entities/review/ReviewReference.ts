import { Directive, Field, ObjectType } from 'type-graphql';
import { GraphQLID } from '@libs/graphql';
import { Review } from './Review';

@ObjectType('Review')
@Directive(`@key(fields: "id")`)
@Directive('@extends')
export class ReviewReference implements Partial<Review> {
  @Field(() => GraphQLID)
  @Directive('@external')
  id!: string;
}
