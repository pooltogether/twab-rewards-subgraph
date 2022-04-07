import { Promotion } from '../../generated/schema';

export function loadOrCreatePromotion(id: string): Promotion {
  let promotion = Promotion.load(id);

  // create case
  if (promotion == null) {
    promotion = new Promotion(id);
  }

  return promotion as Promotion;
}
