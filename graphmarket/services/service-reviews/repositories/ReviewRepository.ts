import { AbstractRepository, EntityRepository } from 'typeorm';
import { Product, Review } from '@libs/entities';
import { ReviewCreateInput, ReviewUpdateInput } from '../graphql/inputs';

@EntityRepository(Review)
export class ReviewRepository extends AbstractRepository<Review> {
  public create(review: ReviewCreateInput): Promise<Review> {
    return this.manager.save(
      Review,
      this.manager.create(Review, {
        title: review.title,
        body: review.body,
        product: this.manager.create(Product, { id: review.productId }),
      }),
    );
  }

  public readOneById(id: string): Promise<Review | undefined> {
    return this.manager.findOne(Review, id);
  }

  // TODO find options
  public read(): Promise<Review[]> {
    return this.manager.find(Review);
  }

  public async update(id: string, review: ReviewUpdateInput): Promise<Review> {
    // Check if review exists
    await this.manager.findOneOrFail(Review, id);

    // Update
    await this.manager.update(
      Review,
      id,
      this.manager.create(Review, { title: review.title, body: review.body }),
    );

    // Return updated review
    return this.manager.findOneOrFail(Review, id);
  }

  public async delete(id: string): Promise<Review> {
    // Check if review exists
    const review: Review = await this.manager.findOneOrFail(Review, id);

    // Delete
    await this.manager.delete(Review, id);

    // Return deleted review
    return review;
  }
}
