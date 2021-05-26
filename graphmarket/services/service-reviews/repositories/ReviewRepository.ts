import { AbstractRepository, EntityRepository } from 'typeorm';
import { Review } from '@libs/entities';
import { ReviewCreateInput, ReviewUpdateInput } from '../graphql/inputs';
import { ReadReviewsArgs } from '../graphql/args';

@EntityRepository(Review)
export class ReviewRepository extends AbstractRepository<Review> {
  public create(review: ReviewCreateInput): Promise<Review> {
    return this.repository.save({
      title: review.title,
      product: { id: review.productId },
      ...(review.body && { body: review.body }),
    });
  }

  public readOneById(id: string): Promise<Review | undefined> {
    return this.repository.findOne(id);
  }

  public read(options: ReadReviewsArgs = {}): Promise<Review[]> {
    return this.repository.find({
      where: {
        ...(options.productId && { product: { id: options.productId } }),
      },
    });
  }

  public async update(id: string, review: ReviewUpdateInput): Promise<Review> {
    // Check if review exists
    await this.repository.findOneOrFail(id);

    // Update and return
    return this.repository.save({
      id,
      ...(review.title && { title: review.title }),
      ...(review.body && { body: review.body }),
    });
  }

  public async delete(id: string): Promise<Review> {
    // Check if review exists
    const review: Review = await this.repository.findOneOrFail(id);

    // Delete
    await this.repository.delete(id);

    // Return deleted review
    return review;
  }
}
