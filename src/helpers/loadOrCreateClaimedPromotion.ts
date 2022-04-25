import { ClaimedPromotion } from '../../generated/schema';

export function loadOrCreateClaimedPromotion(id: string): ClaimedPromotion {
  let claimedPromotion = ClaimedPromotion.load(id);

  // create case
  if (claimedPromotion == null) {
    claimedPromotion = new ClaimedPromotion(id);
  }

  return claimedPromotion as ClaimedPromotion;
}
