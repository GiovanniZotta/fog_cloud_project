import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Service } from 'typedi';
import { Review } from '@libs/entities';
import { ReviewCreateInput, ReviewUpdateInput } from '../graphql/inputs';
import { ReviewRepository } from '../repositories';
import { logger } from '../logger';

@Service()
export class ReviewService {
  @Transaction()
  public async create(
    review: ReviewCreateInput,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Review> {
    const reviewRepository: ReviewRepository = manager!.getCustomRepository(ReviewRepository);

    const newReview: Review = await reviewRepository.create(review);

    logger.info(`Created review ${newReview.id}`);

    return newReview;
  }

  @Transaction()
  public readOneById(
    id: string,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Review | undefined> {
    const reviewRepository: ReviewRepository = manager!.getCustomRepository(ReviewRepository);

    return reviewRepository.readOneById(id);
  }

  // TODO args
  @Transaction()
  public read(@TransactionManager() manager?: EntityManager): Promise<Review[]> {
    const reviewRepository: ReviewRepository = manager!.getCustomRepository(ReviewRepository);

    return reviewRepository.read();
  }

  @Transaction()
  public async update(
    id: string,
    review: ReviewUpdateInput,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Review> {
    const reviewRepository: ReviewRepository = manager!.getCustomRepository(ReviewRepository);

    // Update review
    const reviewUpdated: Review = await reviewRepository.update(id, review);

    logger.info(`Updated review ${id}`);

    return reviewUpdated;
  }

  @Transaction()
  public async delete(id: string, @TransactionManager() manager?: EntityManager): Promise<Review> {
    const reviewRepository: ReviewRepository = manager!.getCustomRepository(ReviewRepository);

    // Delete review
    const review: Review = await reviewRepository.delete(id);

    logger.info(`Deleted review ${id}`);

    return review;
  }
}
