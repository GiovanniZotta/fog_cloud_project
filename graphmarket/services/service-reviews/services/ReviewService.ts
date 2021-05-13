import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Review } from '@libs/entities';
import { ReviewCreateInput, ReviewUpdateInput } from '../graphql/inputs';
import { ReadReviewsArgs } from '../graphql/args';
import { ReviewRepository } from '../repositories';
import { logger } from '../logger';

@Service()
export class ReviewService {
  @InjectRepository()
  private readonly reviewRepository!: ReviewRepository;

  @Transactional({ propagation: Propagation.REQUIRED })
  public async create(review: ReviewCreateInput): Promise<Review> {
    const newReview: Review = await this.reviewRepository.create(review);

    logger.info(`Created review ${newReview.id}`);

    return newReview;
  }

  @Transactional({ propagation: Propagation.SUPPORTS })
  public readOneById(id: string): Promise<Review | undefined> {
    return this.reviewRepository.readOneById(id);
  }

  @Transactional({ propagation: Propagation.SUPPORTS })
  public read(options: ReadReviewsArgs): Promise<Review[]> {
    return this.reviewRepository.read(options);
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  public async update(id: string, review: ReviewUpdateInput): Promise<Review> {
    const reviewUpdated: Review = await this.reviewRepository.update(id, review);

    logger.info(`Updated review ${id}`);

    return reviewUpdated;
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  public async delete(id: string): Promise<Review> {
    const review: Review = await this.reviewRepository.delete(id);

    logger.info(`Deleted review ${id}`);

    return review;
  }
}
