import Container from 'typedi';
import { Review } from '@libs/entities';
import { ReviewService } from '../../services';

const reviewService: ReviewService = Container.get(ReviewService);

export async function resolveReviewReference(
  reference: Pick<Review, 'id'>,
): Promise<Review | undefined> {
  return reviewService.readOneById(reference.id);
}
