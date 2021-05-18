import Container from 'typedi';
import { Review } from '@libs/entities';
import { ReviewService } from '../../services';

const reviewService: ReviewService = !process.env.SCRIPT_GEN_GRAPHQL
  ? Container.get(ReviewService)
  : (undefined as unknown as ReviewService);

export async function resolveReviewReference(
  reference: Pick<Review, 'id'>,
): Promise<Review | undefined> {
  return reviewService.readOneById(reference.id);
}
