import { PromotionCreated, TWABRewards } from '../../generated/TWABRewards/TWABRewards';
import { setPromotion, setTicket } from '../helpers/promotion';
import { loadOrCreateAccount } from '../helpers/loadOrCreateAccount';
import { loadOrCreatePromotion } from '../helpers/loadOrCreatePromotion';
import { loadOrCreateTicket } from '../helpers/loadOrCreateTicket';

export function handlePromotionCreated(event: PromotionCreated): void {
  const promotionId = event.params.promotionId;

  const twabRewardsContract = TWABRewards.bind(event.address);
  const promotion = loadOrCreatePromotion(promotionId.toHexString());

  const promotionInfo = twabRewardsContract.getPromotion(promotionId);
  setPromotion(promotion, promotionInfo);

  const ticketAddress = twabRewardsContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());

  const creator = loadOrCreateAccount(promotionInfo.creator.toHexString());
  setTicket(creator, ticketAddress);
  setTicket(promotion, ticketAddress);

  creator.save();
  promotion.save();
}
