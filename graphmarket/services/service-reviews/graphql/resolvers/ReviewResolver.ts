import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Review } from '@libs/entities';
import { GraphQLID } from '@libs/graphql';
import { ReviewService } from '../../services';
import { ReviewCreateInput, ReviewUpdateInput } from '../inputs';
import { ReadReviewsArgs } from '../args';

@Resolver(Review)
@Service()
export class ReviewResolver {
  @Inject()
  private readonly reviewService!: ReviewService;

  @Mutation(() => Review, { nullable: true, description: `Create a new review` })
  createReview(@Arg('data', () => ReviewCreateInput) data: ReviewCreateInput): Promise<Review> {
    return this.reviewService.create(data);
  }

  @Query(() => Review, { nullable: true, description: `Return the review that matches the id` })
  review(@Arg('id', () => GraphQLID) id: string): Promise<Review | undefined> {
    return this.reviewService.readOneById(id);
  }

  @Query(() => [Review], { description: `Return all reviews` })
  reviews(@Args() args: ReadReviewsArgs): Promise<Review[]> {
    return this.reviewService.read(args);
  }

  @Mutation(() => Review, { nullable: true, description: `Update the review` })
  updateReview(
    @Arg('id', () => GraphQLID) id: string,
    @Arg('data', () => ReviewUpdateInput) data: ReviewUpdateInput,
  ): Promise<Review> {
    return this.reviewService.update(id, data);
  }

  @Mutation(() => Review, { nullable: true, description: `Delete the review` })
  deleteReview(@Arg('id', () => GraphQLID) id: string): Promise<Review> {
    return this.reviewService.delete(id);
  }
}
