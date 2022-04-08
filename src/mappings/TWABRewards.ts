import {
  PromotionCreated,
  PromotionDestroyed,
  PromotionEnded,
  PromotionExtended,
  TWABRewards,
} from '../../generated/TWABRewards/TWABRewards';
import { setPromotion, setPromotionDestroyedAt, setPromotionEndedAt, setTicket } from '../helpers/promotion';
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

export function handlePromotionEnded(event: PromotionEnded): void {
  const promotionId = event.params.promotionId;

  const twabRewardsContract = TWABRewards.bind(event.address);
  const promotion = loadOrCreatePromotion(promotionId.toHexString());

  const promotionInfo = twabRewardsContract.getPromotion(promotionId);
  setPromotion(promotion, promotionInfo);
  setPromotionEndedAt(promotion, event.block.timestamp);

  const ticketAddress = twabRewardsContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());

  const creator = loadOrCreateAccount(promotionInfo.creator.toHexString());
  setTicket(creator, ticketAddress);
  setTicket(promotion, ticketAddress);

  creator.save();
  promotion.save();
}

export function handlePromotionDestroyed(event: PromotionDestroyed): void {
  const promotionId = event.params.promotionId;

  const twabRewardsContract = TWABRewards.bind(event.address);
  const promotion = loadOrCreatePromotion(promotionId.toHexString());

  const promotionInfo = twabRewardsContract.getPromotion(promotionId);
  setPromotion(promotion, promotionInfo);
  setPromotionDestroyedAt(promotion, event.block.timestamp);

  const ticketAddress = twabRewardsContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());

  const creator = loadOrCreateAccount(promotionInfo.creator.toHexString());
  setTicket(creator, ticketAddress);
  setTicket(promotion, ticketAddress);

  creator.save();
  promotion.save();
}

export function handlePromotionExtended(event: PromotionExtended): void {
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
